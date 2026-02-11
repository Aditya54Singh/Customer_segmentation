import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <main className="flex-1 flex items-center justify-center w-full">
        {/* 🔧 removed max-w-5xl */}
        <div className="w-full px-0">
          <Outlet />
        </div>
      </main>

      <footer className="text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Customer Segmentation Platform
      </footer>
    </div>
  );
};

export default PublicLayout;
