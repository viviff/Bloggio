
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ArticleForm from '@/components/article/ArticleForm';

const NewArticle: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Générer un nouvel article</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Remplissez le formulaire ci-dessous pour créer un nouvel article de qualité.
        </p>
        
        <ArticleForm />
      </div>
    </DashboardLayout>
  );
};

export default NewArticle;
