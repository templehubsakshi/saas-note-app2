import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md text-white p-4 flex justify-between items-center shadow-lg">
      <h1 className="font-bold text-xl tracking-wide select-none cursor-default">Notes SaaS</h1>
      <div className="flex space-x-4 items-center">
        {user ? (
          <>
            <Link
              to="/notes"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer font-medium"
            >
              Notes
            </Link>

            {/* Admin-only links */}
            {user.role.toLowerCase() === "admin" && (
              <>
                <Link
                  to="/upgrade"
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer font-medium"
                >
                  Upgrade
                </Link>
                <Link
                  to="/invite"
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer font-medium"
                >
                  Invite User
                </Link>
              </>
            )}

            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-red-500/90 hover:bg-red-600 transition-colors cursor-pointer font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg bg-red-600/10 hover:bg-red-600/80 transition-colors cursor-pointer text-white font-semibold"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
