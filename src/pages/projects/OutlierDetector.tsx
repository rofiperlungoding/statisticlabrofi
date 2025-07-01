import React from 'react';
import { Shield } from 'lucide-react';

const OutlierDetector: React.FC = () => {
  return (
    <div className="container-main section-padding">
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4">Outlier Detector App</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Detect and visualize outliers using Z-score and IQR methods with interactive plots.
        </p>
      </div>
      <div className="card p-8 text-center">
        <Shield className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
        <h3 className="text-subtitle text-primary mb-2">Coming Soon</h3>
        <p className="text-body text-secondary">This project is under development.</p>
      </div>
    </div>
  );
};

export default OutlierDetector;