
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ArticleEditor from '@/components/article/ArticleEditor';

const EditArticle: React.FC = () => {
  const location = useLocation();
  const { articleData, articleId } = location.state || {};
  
  // Redirect if no article data is available
  if (!articleData || !articleId) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Modifier l'article généré</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Révisez et affinez votre article avant de le publier ou de le télécharger.
        </p>
        
        <ArticleEditor 
          articleData={articleData}
          articleId={articleId}
        />
      </div>
    </DashboardLayout>
  );
};

export default EditArticle;
