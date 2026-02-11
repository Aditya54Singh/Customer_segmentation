import { Link } from "react-router-dom";
import heroimage from "../assets/heroimage.jpg";

function Landing() {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${heroimage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="px-8 md:px-20 w-full max-w-3xl">

          <div className="flex flex-col min-h-[70vh] justify-between">
            
            {/* Top content */}
            <div>


              <p className="text-lg text-gray-200 max-w-xl">
                
              </p>
            </div>

            {/* Buttons moved lower */}
            <div className="flex flex-col sm:flex-row gap-4 pb-8">
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg
                           text-lg font-medium text-center hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>

              <Link
                to="/login"
                className="border border-white text-white px-8 py-3 rounded-lg
                           text-lg font-medium text-center hover:bg-white hover:text-black transition"
              >
                Login
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Landing;
