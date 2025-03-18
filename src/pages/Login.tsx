
import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Login: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-16 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Bienvenue</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Connectez-vous pour accéder à vos articles et crédits
            </p>
          </div>
          
          <AuthForm type="login" />
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Vous n'avez pas encore de compte ?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
