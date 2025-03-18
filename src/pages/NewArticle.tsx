
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ArticleForm from '@/components/article/ArticleForm';

const NewArticle: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Generate New Article</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Fill out the form below to create a new high-quality article.
        </p>
        
        <ArticleForm />
      </div>
    </DashboardLayout>
  );
};

export default NewArticle;
