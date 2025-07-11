
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, TrendingUp, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleHashLink = (hash: string) => {
    if (window.location.pathname !== '/') {
      navigate('/' + hash); // Navigate to homepage + scroll
    } else {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#about', label: 'About' },
    { href: '/#features', label: 'Features' },
    { href: '/#gallery', label: 'Gallery' },
    { href: '/#contact', label: 'Contact' },
  ];
  {navLinks.map((link) => (
    <button
      key={link.href}
      onClick={() => handleHashLink(link.href)}
      className="text-gray-600 hover:text-primary-600 transition-colors font-medium"
    >
      {link.label}
    </button>
  ))}

  return (
    <nav className="bg-[#fdfbf7] backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-primary-600 rounded-lg group-hover:scale-105 transition-transform">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">FxStreampro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                // key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-primary-600 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>{user.fullName}</span>
                </Link>
                {/* <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button> */}
              </div>
            ) : (
              <>
              <Link to="/login">
                {/* <Button
                  className="bg-transparent border-2 border-[#ffb703] text-[#ffb703] 
                             hover:bg-[#ffb703] hover:text-white 
                             rounded-full px-6 py-2 font-semibold 
                             transition-all duration-300 ease-in-out 
                             hover:scale-105 shadow-md"
                >
                  Login
                </Button> */}
              </Link>
            
              <Link to="/signup">
                {/* <Button
                  className="bg-[#16697a] text-white 
                             hover:bg-[#ffb703] hover:text-[#16697a] 
                             rounded-full px-6 py-2 font-semibold 
                             transition-all duration-300 ease-in-out 
                             hover:scale-105 shadow-md ml-4"
                >
                  Get Started
                </Button> */}
              </Link>
            </>
            
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-primary-600 transition-colors font-medium px-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {user ? (
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <Link
                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                    className="block text-gray-600 hover:text-primary-600 transition-colors px-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  {/* <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block text-gray-600 hover:text-primary-600 transition-colors px-2 text-left"
                  >
                    Logout
                  </button> */}
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <Link
                    to="/login"
                    className="block w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    {/* <Button variant="outline" className="w-full">Login</Button> */}
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    {/* <Button className="w-full">Get Started</Button> */}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
