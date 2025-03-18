
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
        <h1 className="text-3xl font-bold">Edit Article Structure</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Review and modify the generated structure before proceeding to article creation.
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
