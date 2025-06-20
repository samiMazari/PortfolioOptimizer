
import { Link } from 'react-router-dom';
import { TrendingUp, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Sami-Portfolio-Optimizer</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Enhance your investment strategy with our advanced portfolio optimization tools 
              based on Modern Portfolio Theory. Make data-driven investment decisions.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>mazarimohamedsami@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+33 780 824 078 </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>Paris, France</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/optimizer" className="block text-gray-300 hover:text-white transition-colors">
                Portfolio Optimizer
              </Link>
              <Link to="/how-it-works" className="block text-gray-300 hover:text-white transition-colors">
                How It Works
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact Me
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <div className="space-y-2">
              <a href="https://www.economist.com/topics/finance-and-economics" className="block text-gray-300 hover:text-white transition-colors">
                Documentation
              </a>
              <a href="https://fr.finance.yahoo.com/" className="block text-gray-300 hover:text-white transition-colors">
                API Reference
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2024 PortfolioOptimizer. All rights reserved to Mohamed Sami Mazari.
            </p>
            <p className="text-gray-300 text-sm mt-2 md:mt-0">
              Mohamed Sami Mazari
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
