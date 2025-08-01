import React from 'react';
import { Users } from 'lucide-react';

const SamplingBias: React.FC = () => {
  return (
    <div className="container-main section-padding">
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4">Sampling Bias Simulator</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Simulate different sampling methods and visualize their bias effects on results.
        </p>
      </div>
      <div className="card p-8 text-center">
        <Users className="w-16 h-16 text-slate-500 mx-auto mb-4" />
        <h3 className="text-subtitle text-primary mb-2">Coming Soon</h3>
        <p className="text-body text-secondary">This project is under development.</p>
      </div>
    </div>
  );
};

export default SamplingBias;