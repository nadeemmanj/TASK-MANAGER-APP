import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-line bg-navy">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
        <Link to="/" className="font-display text-lg tracking-tight text-paper sm:text-xl">
          Task  <span className="text-orange-500">Manager</span>
        </Link>
        {user && (
          <div className="flex items-center gap-2 font-body text-sm text-primary-light sm:gap-5">
            <span className="hidden max-w-[8rem] truncate sm:inline">{user.name}</span>
            <button
              onClick={logout}
              className="shrink-0 rounded-sm border border-primary-light/30 px-2.5 py-1.5 text-xs text-paper transition-colors hover:border-primary-light hover:bg-navy-dark sm:px-3 sm:text-sm"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
