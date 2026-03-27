import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-pink-50 font-sans text-gray-800">
      <header className="bg-pink-100 shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Exercise Tracker</h1>
        <nav className="flex items-center space-x-4">
          <Link to="/exercises" className="hover:text-pink-700">Exercises</Link>
          {user && (
            <>
              <span className="text-sm text-gray-600">{user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-pink-500 text-white px-3 py-1 rounded text-sm hover:bg-pink-600"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        <Outlet />
      </main>

      <footer className="bg-pink-100 p-4 text-center text-gray-600">
        Footer info
      </footer>
    </div>
  );
}
