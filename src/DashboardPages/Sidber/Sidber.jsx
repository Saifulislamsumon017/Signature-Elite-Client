import { useState } from 'react';
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

import useAuth from '@/hooks/useAuth';
import useUserRole from '@/hooks/useUserRole';
import LoadingSpinner from '@/SheardComponents/LoadingSpinner';
import logImage from '../../assets/Logo/Signature Elite Logo .png';
import { Link, NavLink } from 'react-router';

const Sidebar = () => {
  const { user, signOutUser } = useAuth();
  const [role, isRoleLoading] = useUserRole();
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [collapsed, setCollapsed] = useState(false); // desktop collapse

  if (isRoleLoading) return <LoadingSpinner />;

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setCollapsed(!collapsed);

  // Classes for active/normal links
  const activeClass =
    'bg-blue-100 text-blue-700 font-semibold rounded px-3 py-2 flex items-center gap-3';
  const normalClass =
    'hover:bg-gray-200 rounded px-3 py-2 flex items-center gap-3';

  // All roles will use this:
  const profileLink = '/dashboard/profile'; // Profile link for all roles

  // Sidebar menus with icons
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
      <div className="bg-white border-b shadow-md md:hidden flex justify-between items-center p-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <img
            src={logImage}
            alt="Logo"
            className="h-12 w-12 rounded-full shadow"
          />
          <h1>Signature Elite</h1>
        </Link>
        <button onClick={toggleMenu} className="text-gray-700">
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 ${
          collapsed ? 'w-20' : 'w-64'
        } bg-gray-50 border-r transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-all duration-300 ease-in-out flex flex-col justify-between`}
      >
        {/* Logo & Collapse Button */}
        <div className="p-4 flex items-center justify-between border-b">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl overflow-hidden"
          >
            <img
              src={logImage}
              alt="Logo"
              className="h-10 w-10 rounded-full shadow"
            />
            {!collapsed && <h1>Signature Elite</h1>}
          </Link>
          <button
            onClick={toggleCollapse}
            className="hidden md:block text-gray-600 hover:text-blue-600"
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
        <div className="border-t p-4 space-y-2">
          <Link
            to={profileLink}
            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 rounded"
            onClick={() => setIsOpen(false)}
            title={collapsed ? 'Profile' : undefined}
          >
            <FcSettings size={20} />
            {!collapsed && <span className="font-medium">Profile</span>}
          </Link>
          <button
            onClick={signOutUser}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded"
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
