import { useState, useEffect } from 'react';
import { HiMenu, HiX, HiSun, HiMoon } from 'react-icons/hi';
import toast from 'react-hot-toast';
import useAuth from '@/hooks/useAuth';
import logImage from '../assets/Logo/Signature Elite Logo .png';
import { Link, NavLink, useNavigate } from 'react-router';

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  // Dark/Light Mode handle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast.success('Logged out!');
      navigate('/');
    } catch (err) {
      toast.error('Error logging out', err);
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-blue-600 dark:text-blue-400 font-bold'
      : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition';

  // Routes based on logged in or logged out
  const navLinks = (
    <>
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/all-properties" className={navLinkClass}>
        All Properties
      </NavLink>

      {user ? (
        <>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl text-gray-800 dark:text-white"
          >
            <img
              src={logImage}
              alt="Logo"
              className="h-10 w-10 rounded-full shadow-md"
            />
            <span className="hidden sm:inline">Signature Elite</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks}

            {/* Dark/Light Mode */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-xl text-gray-800 dark:text-gray-200 hover:text-blue-500"
            >
              {darkMode ? <HiSun /> : <HiMoon />}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL || 'https://github.com/shadcn.png'}
                  alt={user.displayName || 'User'}
                  title={user.displayName || 'User'}
                  className="h-9 w-9 rounded-full border border-gray-300 shadow-sm"
                />
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 cursor-pointer"
                >
                  LogOut
                </button>
              </div>
            ) : (
              <div className="hidden md:flex gap-2">
                <Link to="/login">
                  <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 cursor-pointer">
                    LogIn
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 cursor-pointer">
                    SignUp
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden flex gap-2 items-center">
            {/* Dark/Light Mode */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-xl text-gray-800 dark:text-gray-200"
            >
              {darkMode ? <HiSun /> : <HiMoon />}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-800 dark:text-white text-2xl"
              aria-label="Toggle menu"
            >
              {menuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 bg-white dark:bg-gray-900 shadow-sm">
            <nav className="flex flex-col gap-3 text-lg font-medium">
              {navLinks}
            </nav>

            {user ? (
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex items-center gap-3">
                  <img
                    src={user.photoURL || 'https://github.com/shadcn.png'}
                    alt={user.displayName || 'User'}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-sm text-gray-800 dark:text-white">
                    {user.displayName}
                  </span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="text-red-500 hover:underline text-sm text-left"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-4">
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    LogIn
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                  <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    SignUp
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Spacer so page content is not hidden behind navbar */}
      <div className="h-[64px]"></div>
    </>
  );
};

export default Navbar;
