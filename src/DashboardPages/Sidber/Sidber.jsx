import { useState, useEffect } from 'react';
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlinePlus,
  AiOutlineAppstore,
  AiOutlineCheckSquare,
  AiOutlineSolution,
  AiOutlineTeam,
  AiOutlineAudit,
  AiOutlineShop,
  AiOutlineDollarCircle,
} from 'react-icons/ai';
import { GrLogout } from 'react-icons/gr';
import { FcSettings } from 'react-icons/fc';
import { HiSun, HiMoon } from 'react-icons/hi';

import useAuth from '@/hooks/useAuth';
import useUserRole from '@/hooks/useUserRole';
import LoadingSpinner from '@/SheardComponents/LoadingSpinner';
import logImage from '../../assets/Logo/Signature Elite Logo .png';
import { Link, NavLink } from 'react-router';

const Sidebar = () => {
  const { signOutUser } = useAuth();
  const [role, isRoleLoading] = useUserRole();
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [collapsed, setCollapsed] = useState(false); // desktop collapse
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  if (isRoleLoading) return <LoadingSpinner />;

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setCollapsed(!collapsed);

  // Active and normal link styles
  const activeClass =
    'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold rounded px-3 py-2 flex items-center gap-3';
  const normalClass =
    'hover:bg-gray-200 dark:hover:bg-gray-700 rounded px-3 py-2 flex items-center gap-3 text-gray-700 dark:text-gray-300';

  const profileLink = '/dashboard/profile';

  // Sidebar menu items per role
  const menus = {
    user: [
      { label: 'My Profile', to: '/dashboard/profile', icon: AiOutlineUser },
      { label: 'Wishlist', to: '/dashboard/wishlist', icon: AiOutlineHeart },
      {
        label: 'My Property Bought',
        to: '/dashboard/property-bought',
        icon: AiOutlineShoppingCart,
      },
      {
        label: 'My Reviews',
        to: '/dashboard/my-reviews',
        icon: AiOutlineAudit,
      },
      { label: 'My Offers', to: '/dashboard/my-offers', icon: AiOutlineAudit },
    ],
    agent: [
      { label: 'My Profile', to: '/dashboard/profile', icon: AiOutlineUser },
      {
        label: 'Add Property',
        to: '/dashboard/add-property',
        icon: AiOutlinePlus,
      },
      {
        label: 'My Properties',
        to: '/dashboard/my-properties',
        icon: AiOutlineAppstore,
      },
      {
        label: 'My Sold Properties',
        to: '/dashboard/my-sold-properties',
        icon: AiOutlineDollarCircle,
      },
      {
        label: 'Requested Properties',
        to: '/dashboard/requested-properties',
        icon: AiOutlineCheckSquare,
      },
    ],
    admin: [
      { label: 'My Profile', to: '/dashboard/profile', icon: AiOutlineUser },
      {
        label: 'Manage Properties',
        to: '/dashboard/manage-properties',
        icon: AiOutlineAppstore,
      },
      {
        label: 'Manage Users',
        to: '/dashboard/manage-users',
        icon: AiOutlineTeam,
      },
      {
        label: 'Manage Reviews',
        to: '/dashboard/manage-reviews',
        icon: AiOutlineAudit,
      },
      {
        label: 'Advertise Property',
        to: '/dashboard/advertise-property',
        icon: AiOutlineShop,
      },
    ],
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-md md:hidden flex justify-between items-center p-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <img
            src={logImage}
            alt="Logo"
            className="h-12 w-12 rounded-full shadow"
          />
          <h1 className="text-gray-900 dark:text-white">Signature Elite</h1>
        </Link>
        <button
          onClick={toggleMenu}
          className="text-gray-700 dark:text-gray-300"
        >
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 ${
          collapsed ? 'w-20' : 'w-64'
        } bg-white dark:bg-gray-900 border-r dark:border-gray-700 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-all duration-300 ease-in-out flex flex-col justify-between`}
      >
        {/* Logo & Collapse Button */}
        <div className="p-4 flex items-center justify-between border-b dark:border-gray-700">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl overflow-hidden"
          >
            <img
              src={logImage}
              alt="Logo"
              className="h-10 w-10 rounded-full shadow"
            />
            {!collapsed && (
              <h1 className="text-gray-900 dark:text-white">Signature Elite</h1>
            )}
          </Link>
          <button
            onClick={toggleCollapse}
            className="hidden md:block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            title={collapsed ? 'Expand' : 'Collapse'}
          >
            {collapsed ? (
              <AiOutlineMenu size={20} />
            ) : (
              <AiOutlineClose size={20} />
            )}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {(menus[role] || []).map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
              onClick={() => setIsOpen(false)}
              title={collapsed ? label : undefined}
            >
              <Icon size={20} />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t dark:border-gray-700 p-4 space-y-2">
          {/* Dark/Light Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-gray-300 w-full"
            title={collapsed ? 'Toggle Theme' : undefined}
          >
            {darkMode ? <HiSun size={20} /> : <HiMoon size={20} />}
            {!collapsed && (
              <span className="font-medium">{darkMode ? 'Light' : 'Dark'}</span>
            )}
          </button>

          {/* Profile */}
          <Link
            to={profileLink}
            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-gray-300"
            onClick={() => setIsOpen(false)}
            title={collapsed ? 'Profile' : undefined}
          >
            <FcSettings size={20} />
            {!collapsed && <span className="font-medium">Profile</span>}
          </Link>

          {/* Logout */}
          <button
            onClick={signOutUser}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded"
            title={collapsed ? 'Logout' : undefined}
          >
            <GrLogout size={18} />
            {!collapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
