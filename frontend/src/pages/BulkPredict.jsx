import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ScatterChart,
  Scatter, Legend
} from "recharts";
import API from "../api";

function BulkPredict() {
  const [file, setFile] = useState(null);
  const [clusterDist, setClusterDist] = useState(null);
  const [summary, setSummary] = useState([]);
  const [pcaData, setPcaData] = useState([]);
  const [loading, setLoading] = useState(false);
  const CLUSTER_COLORS = [
    "#6366F1", // indigo
    "#22C55E", // green
    "#F59E0B", // amber
    "#EF4444"  // red
  ];


  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/predict/bulk", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      const data = res.data;

      setClusterDist(data.cluster_distribution);
      setSummary(data.summary);
      setPcaData(data.pca_points);

      // Auto-download CSV
      const csvBlob = new Blob(
        [convertToCSV(data.csv_data)],
        { type: "text/csv" }
      );

      const url = window.URL.createObjectURL(csvBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "segmented_customers.csv";
      a.click();

    } catch (err) {
      console.error(err);
      alert("Bulk prediction failed.");
    } finally {
      setLoading(false);
    }
  };


  const convertToCSV = (rows) => {
    if (!rows.length) return "";

    const headers = Object.keys(rows[0]);
    const csvRows = [
      headers.join(","),
      ...rows.map(r => headers.map(h => r[h]).join(","))
    ];

    return csvRows.join("\n");
  };

  const clusterChartData = clusterDist
    ? Object.entries(clusterDist).map(([k, v]) => ({
      cluster: `Cluster ${k}`,
      percentage: (v * 100).toFixed(1)
    }))
    : [];

  return (
    <div className="max-w-5xl mx-auto mt-16 space-y-10">
      <h1 className="text-2xl font-bold">
        Bulk Customer Segmentation
      </h1>

      <input
        type="file"
        accept=".csv,.xlsx"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Processing..." : "Upload & Predict"}
      </button>

      {/* 📊 Cluster Distribution */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Cluster Distribution
        </h2>

        <BarChart width={500} height={300} data={clusterChartData}>
          <XAxis dataKey="cluster" stroke="#374151" />
          <YAxis stroke="#374151" />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", borderRadius: 8 }}
          />
          <Bar
            dataKey="percentage"
            fill="#6366F1"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </div>


      {/* 📊 PCA Visualization */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          PCA Cluster Visualization
        </h2>

        <ScatterChart width={650} height={400}>
          <XAxis
            dataKey="pca_1"
            name="PCA 1"
            stroke="#374151"
          />
          <YAxis
            dataKey="pca_2"
            name="PCA 2"
            stroke="#374151"
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{ backgroundColor: "#fff", borderRadius: 8 }}
          />
          <Legend />

          {[...new Set(pcaData.map(d => d.cluster_id))].map((c, idx) => (
            <Scatter
              key={c}
              name={`Cluster ${c}`}
              data={pcaData.filter(d => d.cluster_id === c)}
              fill={CLUSTER_COLORS[idx % CLUSTER_COLORS.length]}
            />
          ))}
        </ScatterChart>
      </div>

    </div>
  );
}

export default BulkPredict;
