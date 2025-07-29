import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import { Link } from 'react-router';
import logImage from '../assets/Logo/Signature Elite Logo .png';

const Footer = () => {
  return (
    <footer className="bg-white mt-[100px] dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo & Branding */}
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

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link
            to="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Home
          </Link>
          <Link
            to="/all-properties"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            All Properties
          </Link>
          <Link
            to="/dashboard"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Dashboard
          </Link>
          <Link
            to="/login"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Sign Up
          </Link>
        </nav>

        {/* Social Media Icons */}
        <div className="flex gap-5 text-gray-500 dark:text-gray-400 text-2xl">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <FiFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <FiTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <FiInstagram />
          </a>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 mt-4 py-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Signature Elite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
