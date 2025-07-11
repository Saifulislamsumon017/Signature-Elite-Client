import useAuth from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import { Link, NavLink, useNavigate } from 'react-router';
import logImage from '../assets/Signature Elite Logo .png';

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast.success('Logged out!');
      navigate('/');
    } catch (err) {
      toast.error('Error logging out');
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-600';

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <img
            src={logImage}
            alt="Logo"
            className="h-12 w-12 rounded-full shadow"
          />
          <h1>Signature Elite</h1>
        </Link>
        <div className="flex items-center gap-4">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/all-properties" className={navLinkClass}>
            All Properties
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
          {!user && (
            <NavLink to="/login" className="text-blue-600 font-semibold">
              Login
            </NavLink>
          )}
          {user && (
            <div className="flex items-center gap-2">
              <img
                src={user.photoURL || '/default-avatar.png'}
                alt="Avatar"
                className="h-8 w-8 rounded-full"
              />
              <span className="hidden md:inline text-sm">
                {user.displayName}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
