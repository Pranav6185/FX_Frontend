
import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary-600 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">FxStreampro</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional trading education for the next generation of traders. Master the markets with expert guidance and proven strategies.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
              <li><Link to="/signup" className="text-gray-400 hover:text-white transition-colors">Sign Up</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-400">Forex Trading</span></li>
              <li><span className="text-gray-400">Stock Market</span></li>
              <li><span className="text-gray-400">Cryptocurrency</span></li>
              <li><span className="text-gray-400">Risk Management</span></li>
              <li><span className="text-gray-400">Technical Analysis</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="text-gray-400 text-sm">info@fxstreampro.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary-400" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary-400" />
                <span className="text-gray-400 text-sm">New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 FxStreampro. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="/terms-and-privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms-and-privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </Link>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Cookie Policy
                </a>
              </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
