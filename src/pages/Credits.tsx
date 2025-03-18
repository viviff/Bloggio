
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CreditSystem from '@/components/credits/CreditSystem';

const Credits: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Credits</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Purchase credits to generate more articles. Each article costs 1 credit.
        </p>
        
        <CreditSystem />
      </div>
    </DashboardLayout>
  );
};

export default Credits;
