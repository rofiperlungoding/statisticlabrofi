import React from 'react';
import { Timer } from 'lucide-react';

const RealTimeDashboard: React.FC = () => {
  return (
    <div className="container-main section-padding">
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4">Real-Time Data Dashboard</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Create live dashboards with real-time data updates and interactive KPI monitoring.
        </p>
      </div>
      <div className="card p-8 text-center">
        <Timer className="w-16 h-16 text-rose-500 mx-auto mb-4" />
        <h3 className="text-subtitle text-primary mb-2">Coming Soon</h3>
        <p className="text-body text-secondary">This project is under development.</p>
      </div>
    </div>
  );
};

export default RealTimeDashboard;