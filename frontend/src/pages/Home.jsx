import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

function Home() {
  return (
    <div className="space-y-24">

      {/* ================= Project Overview ================= */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-sm"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          📊 Customer Segmentation & Analytics Platform
        </h1>
        <p className="text-gray-600 max-w-4xl leading-relaxed">
          This platform is a production-style machine learning system that transforms
          raw customer behavioral data into actionable business segments using
          K-Means clustering. It supports both real-time single predictions and
          secure bulk CSV uploads, enriched with interactive visual analytics
          and PCA-based explainability.
        </p>
      </motion.section>

      {/* ================= SDLC Model ================= */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          🔁 Software Development Lifecycle
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "📝", label: "Requirement Analysis" },
            { icon: "🏗️", label: "Architecture Design" },
            { icon: "⚙️", label: "Full-Stack Development" },
            { icon: "🧪", label: "Model Validation & Testing" },
            { icon: "🚀", label: "Deployment Ready" },
            { icon: "🔄", label: "Continuous Improvement" }
          ].map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm
                         flex flex-col items-center text-center gap-3
                         hover:shadow-md"
            >
              <span className="text-4xl">{step.icon}</span>
              <span className="font-medium text-gray-700">
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ================= Applied to This Project ================= */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gray-50 p-8 rounded-2xl"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          🧠 How SDLC Was Applied
        </h2>

        <div className="space-y-4 text-gray-600 max-w-4xl">
          {[
            "Identified customer behavioral features and segmentation objectives.",
            "Designed modular architecture separating ML training, backend inference, and frontend analytics.",
            "Engineered derived features (Total Spending, Engagement Score, Family Size).",
            "Aligned training and inference pipelines to prevent preprocessing drift.",
            "Validated clustering performance using distribution analysis and PCA visualization.",
            "Implemented JWT-secured APIs for secure and scalable usage."
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <strong>{i + 1}.</strong> {text}
            </motion.p>
          ))}
        </div>
      </motion.section>

      {/* ================= System Data Flow ================= */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-10 flex items-center gap-2">
          🔗 System Data Flow
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {[
            "🖥️ User / CSV Input",
            "🌐 JWT-Protected Flask API",
            "🤖 ML Feature Engineering",
            "📦 K-Means Inference",
            "📊 Analytics & PCA Visualization"
          ].map((step, i) => (
            <motion.div
              key={step}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="bg-white px-6 py-4 rounded-xl shadow-sm text-center font-medium text-gray-700 min-w-[180px]">
                {step}
              </div>

              {i < 4 && (
                <motion.div
                  className="hidden md:block absolute top-1/2 -right-10 text-indigo-500"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  ➜
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ================= Engineering Decisions ================= */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-sm"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          🛠️ Key Engineering Decisions
        </h2>

        <ul className="list-disc list-inside text-gray-600 space-y-3 max-w-4xl">
          <li>Maintained strict alignment between training and inference pipelines.</li>
          <li>Separated ML lifecycle (training) from API inference layer.</li>
          <li>Used StandardScaler for normalized feature space consistency.</li>
          <li>Added distance-based confidence scoring for interpretability.</li>
          <li>Integrated PCA for explainable 2D cluster visualization.</li>
          <li>Designed modular, scalable, and recruiter-friendly architecture.</li>
        </ul>
      </motion.section>

    </div>
  );
}

export default Home;
