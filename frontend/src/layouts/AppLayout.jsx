import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <Outlet />
      </main>

    </div>
  );
}

export default AppLayout;
