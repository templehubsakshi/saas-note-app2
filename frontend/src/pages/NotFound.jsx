import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex h-screen justify-center items-center bg-gray-900 relative overflow-hidden">

    {/* Decorative background shapes */}
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
    </div>

    {/* Glassy Card */}
    <div className="relative bg-gray-800/80 backdrop-blur-md text-white p-10 rounded-2xl shadow-2xl flex flex-col items-center gap-4 z-10">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-gray-300 text-lg">Page Not Found</p>
      <Link
        to="/notes"
        className="px-4 py-2 rounded-lg bg-blue-600/80 hover:bg-blue-700 transition-colors cursor-pointer text-white font-semibold"
      >
        Go Back
      </Link>
    </div>
  </div>
);

export default NotFound;
