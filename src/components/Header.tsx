import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="flex items-center w-full px-4 py-3">
        {/* Left Home Link */}
        <Link to="/" className="text-xl font-semibold w-1/4 ml-4 text-gray-900 hover:text-light-blue">
          Home
        </Link>

        {/* Centered Links */}
        <div className="flex justify-between w-2/4 mx-12 space-x-8">
          <Link to="/wedding" className="text-gray-800 hover:text-light-blue font-medium">
            Our wedding
          </Link>
          <Link to="/wow" className="text-gray-800 hover:text-light-blue font-medium">
            WoW Guild
          </Link>
          <Link to="/league" className="text-gray-800 hover:text-light-blue font-medium">
            My League Stats
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
