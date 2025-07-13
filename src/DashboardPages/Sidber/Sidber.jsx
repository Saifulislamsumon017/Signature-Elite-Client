import { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { GrLogout } from 'react-icons/gr';
import { FcSettings } from 'react-icons/fc';
import useAuth from '@/hooks/useAuth';
import useUserRole from '@/hooks/useUserRole';
import LoadingSpinner from '@/SheardComponents/LoadingSpinner';
import MenuItem from './MenuItem/MenuItem';
import logImage from '../../assets/Logo/Signature Elite Logo .png';
import { Link, NavLink } from 'react-router';

const Sidebar = () => {
  const { signOutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [role, isRoleLoading] = useUserRole();

  if (isRoleLoading) return <LoadingSpinner />;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Header */}
      <div className="bg-white border-b shadow-md md:hidden flex justify-between items-center p-4">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <img
                src={logImage}
                alt="Logo"
                className="h-12 w-12 rounded-full shadow"
              />
              <h1>Signature Elite</h1>
            </Link>
          </div>
        </div>
        <button
          onClick={toggleMenu}
          className="text-gray-700 focus:outline-none"
        >
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-50 border-r transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-200 ease-in-out flex flex-col justify-between`}
      >
        {/* Logo */}
        <div className="p-4 flex justify-center border-b">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <img
              src={logImage}
              alt="Logo"
              className="h-12 w-12 rounded-full shadow"
            />
            <h1>Signature Elite</h1>
          </Link>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-col p-4 space-y-2">
            {/* {role === 'user' && <CustomerMenu />}
            {role === 'agent' && <SellerMenu />}
            {role === 'admin' && <AdminMenu />} */}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="border-t p-4 space-y-2">
          <MenuItem
            icon={FcSettings}
            label="Profile"
            address="/dashboard/profile"
          />
          <button
            onClick={signOutUser}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            <GrLogout size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
