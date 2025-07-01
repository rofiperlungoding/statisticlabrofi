import React from 'react';
import { Layers } from 'lucide-react';

const PCAReducer: React.FC = () => {
  return (
    <div className="container-main section-padding">
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4">PCA Dimensionality Reducer</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Reduce high-dimensional data to 2D/3D with principal component analysis visualization.
        </p>
      </div>
      <div className="card p-8 text-center">
        <Layers className="w-16 h-16 text-amber-500 mx-auto mb-4" />
        <h3 className="text-subtitle text-primary mb-2">Coming Soon</h3>
        <p className="text-body text-secondary">This project is under development.</p>
      </div>
    </div>
  );
};

export default PCAReducer;