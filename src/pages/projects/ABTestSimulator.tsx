import React, { useState, useMemo } from 'react';
import { TestTube, Calculator, TrendingUp, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ReferenceLine } from 'recharts';

const ABTestSimulator: React.FC = () => {
  const [groupA, setGroupA] = useState({ name: 'Control', conversions: 85, total: 1000 });
  const [groupB, setGroupB] = useState({ name: 'Treatment', conversions: 105, total: 1000 });
  const [significanceLevel, setSignificanceLevel] = useState(0.05);

  const results = useMemo(() => {
    const pA = groupA.conversions / groupA.total;
    const pB = groupB.conversions / groupB.total;
    const pooledP = (groupA.conversions + groupB.conversions) / (groupA.total + groupB.total);
    
    // Standard error
    const se = Math.sqrt(pooledP * (1 - pooledP) * (1/groupA.total + 1/groupB.total));
    
    // Z-score
    const zScore = (pB - pA) / se;
    
    // Two-tailed p-value
    const pValue = 2 * (1 - normalCDF(Math.abs(zScore)));
    
    // Effect size (Cohen's h)
    const effectSize = 2 * (Math.asin(Math.sqrt(pB)) - Math.asin(Math.sqrt(pA)));
    
    // Confidence interval for difference in proportions
    const seDiff = Math.sqrt((pA * (1 - pA)) / groupA.total + (pB * (1 - pB)) / groupB.total);
    const criticalValue = 1.96; // for 95% CI
    const diff = pB - pA;
    const ciLower = diff - criticalValue * seDiff;
    const ciUpper = diff + criticalValue * seDiff;
    
    return {
      pA: pA * 100,
      pB: pB * 100,
      difference: (pB - pA) * 100,
      zScore,
      pValue,
      effectSize,
      isSignificant: pValue < significanceLevel,
      confidenceInterval: [ciLower * 100, ciUpper * 100],
      relativeLift: ((pB - pA) / pA) * 100
    };
  }, [groupA, groupB, significanceLevel]);

  // Normal CDF approximation
  function normalCDF(x: number): number {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x > 0 ? 1 - prob : prob;
  }

  const chartData = [
    {
      group: groupA.name,
      conversions: groupA.conversions,
      total: groupA.total,
      rate: results.pA,
      nonConversions: groupA.total - groupA.conversions
    },
    {
      group: groupB.name,
      conversions: groupB.conversions,
      total: groupB.total,
      rate: results.pB,
      nonConversions: groupB.total - groupB.conversions
    }
  ];

  // Distribution data for p-value visualization
  const distributionData = Array.from({ length: 200 }, (_, i) => {
    const x = (i - 100) / 25; // -4 to 4 range
    const y = Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
    return { x, y, isSignificant: Math.abs(x) >= Math.abs(results.zScore) };
  });

  return (
    <div className="container-main section-padding space-section">
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4">A/B Test Simulator</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Calculate statistical significance, p-values, and confidence intervals for your A/B testing scenarios.
        </p>
      </div>

      <div className="space-section">
        {/* Input Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Group A */}
          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4 flex items-center">
              <TestTube className="w-5 h-5 mr-2 text-blue-500" />
              Group A (Control)
            </h3>
            <div className="space-element">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Group Name
                </label>
                <input
                  type="text"
                  value={groupA.name}
                  onChange={(e) => setGroupA(prev => ({ ...prev, name: e.target.value }))}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Conversions
                </label>
                <input
                  type="number"
                  value={groupA.conversions}
                  onChange={(e) => setGroupA(prev => ({ ...prev, conversions: Number(e.target.value) }))}
                  className="input"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Total Visitors
                </label>
                <input
                  type="number"
                  value={groupA.total}
                  onChange={(e) => setGroupA(prev => ({ ...prev, total: Number(e.target.value) }))}
                  className="input"
                  min="1"
                />
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Conversion Rate: <span className="font-semibold">{results.pA.toFixed(2)}%</span>
                </p>
              </div>
            </div>
          </div>

          {/* Group B */}
          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4 flex items-center">
              <TestTube className="w-5 h-5 mr-2 text-green-500" />
              Group B (Treatment)
            </h3>
            <div className="space-element">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Group Name
                </label>
                <input
                  type="text"
                  value={groupB.name}
                  onChange={(e) => setGroupB(prev => ({ ...prev, name: e.target.value }))}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Conversions
                </label>
                <input
                  type="number"
                  value={groupB.conversions}
                  onChange={(e) => setGroupB(prev => ({ ...prev, conversions: Number(e.target.value) }))}
                  className="input"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Total Visitors
                </label>
                <input
                  type="number"
                  value={groupB.total}
                  onChange={(e) => setGroupB(prev => ({ ...prev, total: Number(e.target.value) }))}
                  className="input"
                  min="1"
                />
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-300">
                  Conversion Rate: <span className="font-semibold">{results.pB.toFixed(2)}%</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Significance Level */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-4">Test Parameters</h3>
          <div className="max-w-md">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Significance Level (α)
            </label>
            <select
              value={significanceLevel}
              onChange={(e) => setSignificanceLevel(Number(e.target.value))}
              className="input"
            >
              <option value={0.01}>0.01 (99% confidence)</option>
              <option value={0.05}>0.05 (95% confidence)</option>
              <option value={0.1}>0.10 (90% confidence)</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-6 flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            Statistical Results
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
              <h4 className="font-medium text-neutral-900 dark:text-white mb-2">P-Value</h4>
              <p className={`text-lg font-semibold ${results.isSignificant ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {results.pValue.toFixed(6)}
              </p>
            </div>
            
            <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
              <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Z-Score</h4>
              <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                {results.zScore.toFixed(4)}
              </p>
            </div>
            
            <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
              <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Effect Size</h4>
              <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                {results.effectSize.toFixed(4)}
              </p>
            </div>
            
            <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
              <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Relative Lift</h4>
              <p className={`text-lg font-semibold ${results.relativeLift > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {results.relativeLift.toFixed(2)}%
              </p>
            </div>
          </div>

          <div className={`p-4 rounded-lg border-l-4 ${results.isSignificant 
            ? 'bg-green-50 dark:bg-green-900/30 border-green-500' 
            : 'bg-red-50 dark:bg-red-900/30 border-red-500'
          }`}>
            <div className="flex items-center">
              <AlertCircle className={`w-5 h-5 mr-2 ${results.isSignificant ? 'text-green-600' : 'text-red-600'}`} />
              <p className={`font-medium ${results.isSignificant ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                {results.isSignificant ? 'Statistically Significant' : 'Not Statistically Significant'}
              </p>
            </div>
            <p className={`text-sm mt-1 ${results.isSignificant ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
              {results.isSignificant 
                ? `The difference in conversion rates is statistically significant at α = ${significanceLevel}`
                : `The difference in conversion rates is not statistically significant at α = ${significanceLevel}`
              }
            </p>
            <p className="text-sm mt-2 text-neutral-600 dark:text-neutral-400">
              95% Confidence Interval: [{results.confidenceInterval[0].toFixed(2)}%, {results.confidenceInterval[1].toFixed(2)}%]
            </p>
          </div>
        </div>

        {/* Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conversion Rates Comparison */}
          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4">Conversion Rates Comparison</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="group" stroke="#737373" fontSize={12} />
                  <YAxis stroke="#737373" fontSize={12} />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'rate' ? `${value.toFixed(2)}%` : value,
                      name === 'rate' ? 'Conversion Rate' : name
                    ]}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                    }}
                  />
                  <Bar dataKey="rate" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Distribution and P-Value */}
          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4">Normal Distribution & P-Value</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={distributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="x" stroke="#737373" fontSize={12} />
                  <YAxis stroke="#737373" fontSize={12} />
                  <Tooltip 
                    formatter={(value) => [value.toFixed(4), 'Density']}
                    labelFormatter={(value) => `Z-Score: ${value.toFixed(2)}`}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                    }}
                  />
                  <Line 
                    dataKey="y" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    dot={false}
                  />
                  <ReferenceLine 
                    x={results.zScore} 
                    stroke="#ef4444" 
                    strokeDasharray="5 5"
                    label={{ value: "Z-Score", position: "top" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ABTestSimulator;