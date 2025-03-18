
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 py-8 mt-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <Link to="/" className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-medium text-lg">ArticleGen</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-6 md:mb-0">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground transition-colors">
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-xs text-gray-600 dark:text-gray-400">
            © {currentYear} ArticleGen. All rights reserved. Made with{' '}
            <Heart className="inline-block h-3 w-3 text-red-500 align-middle" />{' '}
            by ArticleGen.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
