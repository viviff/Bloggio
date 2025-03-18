
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  CreditCard, 
  PlusCircle,
  Settings,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      name: 'Tableau de bord',
      path: '/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: 'Nouvel article',
      path: '/new-article',
      icon: <PlusCircle className="h-5 w-5" />,
    },
    {
      name: 'Crédits',
      path: '/credits',
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      name: 'Paramètres',
      path: '/settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
      {/* Sidebar - Mobile: bottom navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-around items-center h-16 px-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-md transition-colors ${
                isActive(item.path)
                  ? 'text-primary dark:text-primary-foreground'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Sidebar - Desktop: left navigation */}
      <div className="hidden md:block w-64 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 h-full">
        <div className="flex flex-col h-full p-4">
          <div className="space-y-1 mb-8">
            <div className="px-3 py-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {user?.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
            </div>
            <div className="bg-primary/10 dark:bg-primary/20 rounded-md px-3 py-1.5 text-sm font-medium flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Crédits</span>
              <span className="font-semibold text-primary">{user?.credits}</span>
            </div>
          </div>
          
          <nav className="space-y-1 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="pt-4 mt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="px-3 py-2">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {user?.role === 'admin' ? 'Administrateur' : 'Utilisateur standard'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 pb-16 md:pb-0 page-container overflow-auto">
        <div className="animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
