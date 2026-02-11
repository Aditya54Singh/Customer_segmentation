import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import AppLayout from "./layouts/AppLayout";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Predict from "./pages/Predict";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import About from "./pages/About";
import BulkPredict from "./pages/BulkPredict";

function App() {
  // temporary auth flag
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route
          element={
            isAuthenticated ? <AppLayout /> : <Navigate to="/login" />
          }
        >

          <Route path="/home" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/bulk-predict" element={<BulkPredict />} /> 
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
