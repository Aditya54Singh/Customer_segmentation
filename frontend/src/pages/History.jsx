import { useEffect, useState } from "react";
import API from "../api";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await API.get("/history");
        setHistory(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
        } else {
          setError("Failed to load history.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);


  if (loading) {
    return <p className="text-gray-500">Loading history...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-8 max-w-6xl">

      <h1 className="text-3xl font-bold text-gray-800">
        Prediction History
      </h1>

      {history.length === 0 ? (
        <div className="bg-white rounded-xl p-6 shadow-sm text-center text-gray-500">
          No predictions yet. Run a segmentation to see results here.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm text-gray-600">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">
                  Persona
                </th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">
                  Macro Segment
                </th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">
                  Confidence
                </th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(item.created_at).toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {item.persona}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {item.macro_segment}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {(item.confidence * 100).toFixed(0)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default History;
