import { useLocation, useNavigate } from "react-router-dom";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  RadarChart, Radar, PolarGrid, PolarAngleAxis
} from "recharts";

const COLORS = ["#2563eb", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

function Analytics() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return (
      <div className="text-center mt-20">
        <p className="text-gray-600">No analytics data found.</p>
        <button
          onClick={() => navigate("/predict")}
          className="mt-4 text-blue-600 underline"
        >
          Go to Predict
        </button>
      </div>
    );
  }

  /* ---------------- Chart Data ---------------- */

  const spendingData = [
  { name: "Wines", value: Number(data.MntWines) || 0 },
  { name: "Fruits", value: Number(data.MntFruits) || 0 },
  { name: "Meat", value: Number(data.MntMeatProducts) || 0 },
  { name: "Fish", value: Number(data.MntFishProducts) || 0 },
  { name: "Sweets", value: Number(data.MntSweetProducts) || 0 },
  { name: "Gold", value: Number(data.MntGoldProds) || 0 }
];


  const engagementData = [
    { name: "Web Visits", value: data.NumWebVisitsMonth },
    { name: "Web Purchases", value: data.NumWebPurchases },
    { name: "Store Purchases", value: data.NumStorePurchases },
    { name: "Recency (Days)", value: data.Recency }
  ];

  const radarData = [
    { metric: "Income", value: data.Income },
    { metric: "Spending", value: spendingData.reduce((a, b) => a + b.value, 0) },
    { metric: "Purchases", value: data.NumWebPurchases + data.NumStorePurchases },
    { metric: "Engagement", value: data.NumWebVisitsMonth }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Customer Analytics</h1>

      {/* -------- Summary Card (UNCHANGED) -------- */}
      <div className="bg-white rounded-xl shadow p-6 mb-12">
        <h2 className="text-xl font-semibold mb-2">{data.persona}</h2>
        <p className="text-gray-600 mb-4">{data.description}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Stat label="Segment" value={data.macro_segment} />
          <Stat label="Cluster" value={data.cluster_id} />
          <Stat label="Confidence" value={`${Math.round(data.confidence * 100)}%`} />
          <Stat label="Action" value={data.recommended_action} />
        </div>

        {/* Confidence Bar */}
        <div className="mt-6">
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-blue-600 rounded"
              style={{ width: `${Math.round(data.confidence * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* -------- Charts Section -------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Spending Pie */}
        <ChartCard title="Spending Breakdown">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={spendingData} dataKey="value" outerRadius={110} label>
                {spendingData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Engagement Bar */}
        <ChartCard title="Engagement Overview">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Radar Profile */}
        <ChartCard title="Customer Profile" full>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <Radar
                dataKey="value"
                stroke="#2563eb"
                fill="#2563eb"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-medium">{value}</p>
    </div>
  );
}

function ChartCard({ title, children, full }) {
  return (
    <div
      className={`bg-white p-6 rounded-xl shadow ${
        full ? "md:col-span-2" : ""
      }`}
    >
      <h2 className="font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default Analytics;
