import { useState } from "react";
import API from "../api";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Predict() {
  const [formData, setFormData] = useState({
    Age: "",
    Income: "",
    Recency: "",
    NumWebVisitsMonth: "",
    Kidhome: 0,
    Teenhome: 0,
    NumWebPurchases: "",
    NumStorePurchases: "",
    MntWines: "",
    MntFruits: "",
    MntMeatProducts: "",
    MntFishProducts: "",
    MntSweetProducts: "",
    MntGoldProds: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to continue.");
      setLoading(false);
      return;
    }

    try {
      const res = await API.post("/predict", formData);
      setResult(res.data);
      navigate("/analytics", {
        state: {
          ...res.data,   
          ...formData    
        }
      });

    } catch {
      setError("Prediction failed. Please check inputs.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="max-w-6xl mx-auto space-y-12">

      {/* PAGE HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-gray-800">
          Customer Segmentation
        </h1>
        <p className="text-gray-600 mt-2">
          Enter customer details to predict their behavioral segment
        </p>
      </motion.div>

      {/* FORM */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 space-y-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >

        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Grid>
            <Input name="Age" label="Age" onChange={handleChange} />
            <Input name="Income" label="Income" onChange={handleChange} />
            <Input name="Recency" label="Days Since Last Purchase" onChange={handleChange} />
            <Input name="NumWebVisitsMonth" label="Web Visits / Month" onChange={handleChange} />
          </Grid>
        </Section>

        {/* FAMILY */}
        <Section title="Family Information">
          <Grid>
            <Input name="Kidhome" label="Kids at Home" onChange={handleChange} />
            <Input name="Teenhome" label="Teenagers at Home" onChange={handleChange} />
          </Grid>
        </Section>

        {/* PURCHASE */}
        <Section title="Purchase Behavior">
          <Grid>
            <Input name="NumWebPurchases" label="Web Purchases" onChange={handleChange} />
            <Input name="NumStorePurchases" label="Store Purchases" onChange={handleChange} />
          </Grid>
        </Section>

        {/* SPENDING */}
        <Section title="Spending Breakdown">
          <Grid cols={3}>
            <Input name="MntWines" label="Wine" onChange={handleChange} />
            <Input name="MntFruits" label="Fruits" onChange={handleChange} />
            <Input name="MntMeatProducts" label="Meat" onChange={handleChange} />
            <Input name="MntFishProducts" label="Fish" onChange={handleChange} />
            <Input name="MntSweetProducts" label="Sweets" onChange={handleChange} />
            <Input name="MntGoldProds" label="Gold Products" onChange={handleChange} />
          </Grid>
        </Section>

        {/* SUBMIT */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full bg-indigo-600 text-white py-4 rounded-xl text-lg font-semibold"
        >
          {loading ? "Predicting..." : "Predict Customer Segment"}
        </motion.button>

        {error && <p className="text-red-500 text-center">{error}</p>}
      </motion.form>

      {/* RESULT */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">
            Prediction Result
          </h2>

          <p className="text-lg">
            <strong>Persona:</strong> {result.persona}
          </p>
          <p className="text-lg">
            <strong>Segment:</strong> {result.macro_segment}
          </p>

          {/* CONFIDENCE BAR */}
          <div className="mt-4">
            <p className="mb-1">
              Confidence: {(result.confidence * 100).toFixed(0)}%
            </p>
            <div className="w-full bg-white/30 rounded-full h-3">
              <motion.div
                className="bg-white h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${result.confidence * 100}%` }}
              />
            </div>
          </div>

          <p className="mt-4 text-white/90">
            {result.description}
          </p>
        </motion.div>
      )}
    </div>
  );
}

/* ---------- Reusable UI Components ---------- */

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-xl font-semibold text-gray-700 mb-4">
      {title}
    </h3>
    {children}
  </div>
);

const Grid = ({ children, cols = 2 }) => (
  <div className={`grid grid-cols-${cols} gap-4`}>
    {children}
  </div>
);

const Input = ({ name, label, onChange }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <input
      name={name}
      onChange={onChange}
      className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
    />
  </div>
);

export default Predict;
