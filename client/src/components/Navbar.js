import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            FixedGear Shop
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-indigo-200">
              Home
            </Link>
            <Link to="/products" className="hover:text-indigo-200">
              Products
            </Link>
            <Link to="/cart" className="hover:text-indigo-200">
              Cart
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 