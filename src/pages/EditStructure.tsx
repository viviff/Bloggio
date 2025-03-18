
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ArticleStructure from '@/components/article/ArticleStructure';

const EditStructure: React.FC = () => {
  const location = useLocation();
  const { articleData, structureId } = location.state || {};
  
  // Redirect if no article data is available
  if (!articleData || !structureId) {
    return <Navigate to="/new-article" />;
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Modifier la structure de l'article</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Révisez et modifiez la structure générée avant de passer à la création de l'article.
        </p>
        
        <ArticleStructure 
          articleData={articleData}
          structureId={structureId}
        />
      </div>
    </DashboardLayout>
  );
};

export default EditStructure;
