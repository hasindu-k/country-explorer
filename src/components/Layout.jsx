import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import LogoutConfirmDialog from "./LogoutConfirmDialog";
import { toast } from "react-toastify";

const Layout = ({ children }) => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-white shadow-md p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Link to={"/"}>
            <h1 className="text-2xl font-semibold">Explore World Countries</h1>
          </Link>
          {isAuthenticated && (
            <Link
              to="/favorites"
              className="bg-pink-100 text-pink-700 px-3 py-1 rounded-md text-sm hover:bg-pink-200"
            >
              ❤️ Favorites
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-600">
                Logged in as: <strong>{user?.email}</strong>
              </span>
              <LogoutConfirmDialog
                onConfirm={() => {
                  logout();
                  toast.success("Logged out successfully");
                }}
              />
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      </header>

      <main className="px-4 py-6">{children}</main>
    </div>
  );
};

export default Layout;
