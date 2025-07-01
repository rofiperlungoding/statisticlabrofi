import React from 'react';
import { Grid } from 'lucide-react';

const ConfusionMatrix: React.FC = () => {
  return (
    <div className="container-main section-padding">
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4">Confusion Matrix Builder</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Build confusion matrices and calculate accuracy, precision, recall, and F1 scores.
        </p>
      </div>
      <div className="card p-8 text-center">
        <Grid className="w-16 h-16 text-fuchsia-500 mx-auto mb-4" />
        <h3 className="text-subtitle text-primary mb-2">Coming Soon</h3>
        <p className="text-body text-secondary">This project is under development.</p>
      </div>
    </div>
  );
};

export default ConfusionMatrix;