import { Outlet, Link } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen bg-pink-50 font-sans text-gray-800">
      <header className="bg-pink-100 shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">My App Header</h1>
        <nav className="space-x-4">
          <Link to="/exercises" className="hover:text-pink-700">Exercises</Link>
          <Link to="/" className="hover:text-pink-700">Home</Link>
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
