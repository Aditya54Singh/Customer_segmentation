import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

function About() {
  return (
    <div className="space-y-20 max-w-6xl">

      {/* ================= Header ================= */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          About This Project
        </h1>
        <p className="text-gray-600 max-w-3xl leading-relaxed">
          A production-oriented customer segmentation platform built with
          machine learning and modern web technologies, focused on
          interpretability, scalability, and real-world usability.
        </p>
      </motion.section>

      {/* ================= Tech Stack ================= */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Technology Stack
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Machine Learning",
              items: ["K-Means Clustering", "Scikit-learn"],
              icon: "🤖"
            },
            {
              title: "Backend",
              items: ["Flask", "REST APIs"],
              icon: "🌐"
            },
            {
              title: "Frontend",
              items: ["React", "Tailwind CSS"],
              icon: "🎨"
            },
            {
              title: "Database",
              items: ["MySQL (Planned)"],
              icon: "🗄️"
            },
            {
              title: "Analytics",
              items: ["Power BI (Planned)"],
              icon: "📊"
            },
            {
              title: "Deployment",
              items: ["Netlify", "Render / Railway"],
              icon: "🚀"
            }
          ].map((tech, i) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-sm
                         hover:shadow-md transition"
            >
              <div className="text-3xl mb-4">{tech.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-2">
                {tech.title}
              </h3>
              <ul className="text-gray-600 space-y-1">
                {tech.items.map(item => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ================= Data Flow ================= */}


      {/* ================= Design Philosophy ================= */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-sm"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Design Philosophy
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-600">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">
              Modularity
            </h4>
            <p>
              Each system layer is independently maintainable, enabling
              faster iteration and easier debugging.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2">
              Interpretability
            </h4>
            <p>
              Clustering results are designed to be business-readable
              instead of opaque black-box predictions.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2">
              Scalability
            </h4>
            <p>
              The architecture supports future extensions such as
              analytics dashboards and large-scale deployments.
            </p>
          </div>
        </div>
      </motion.section>

    </div>
  );
}

export default About;
