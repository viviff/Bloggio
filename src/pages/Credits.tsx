
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CreditSystem from '@/components/credits/CreditSystem';

const Credits: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Crédits</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Achetez des crédits pour générer plus d'articles. Chaque article coûte 1 crédit.
        </p>
        
        <CreditSystem />
      </div>
    </DashboardLayout>
  );
};

export default Credits;
