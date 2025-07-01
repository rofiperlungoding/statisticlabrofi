import React, { useState } from 'react';
import { Target, Calculator } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import DataInput from '../../components/DataInput';
import ResultDisplay from '../../components/ResultDisplay';
import { calculateZScore, calculateZScoreFromSample, calculateMean, calculateStandardDeviation, approximateNormalCDF } from '../../utils/statistics';

const ZScoreCalculator: React.FC = () => {
  const [calculationType, setCalculationType] = useState<'single' | 'population' | 'sample'>('single');
  const [value, setValue] = useState<string>('');
  const [populationMean, setPopulationMean] = useState<string>('');
  const [populationStd, setPopulationStd] = useState<string>('');
  const [sampleData, setSampleData] = useState<number[]>([]);
  const [results, setResults] = useState<any>(null);

  const calculateSingleZScore = () => {
    const val = parseFloat(value);
    const mean = parseFloat(populationMean);
    const std = parseFloat(populationStd);

    if (isNaN(val) || isNaN(mean) || isNaN(std) || std <= 0) {
      return;
    }

    const zScore = calculateZScore(val, mean, std);
    const probability = approximateNormalCDF(zScore);
    const percentile = probability * 100;

    setResults({
      zScore,
      probability,
      percentile,
      value: val,
      mean,
      standardDeviation: std,
      interpretation: getZScoreInterpretation(zScore)
    });
  };

  const calculatePopulationZScores = (data: number[]) => {
    const mean = parseFloat(populationMean);
    const std = parseFloat(populationStd);

    if (isNaN(mean) || isNaN(std) || std <= 0) {
      return;
    }

    const zScores = data.map(val => calculateZScore(val, mean, std));
    const outliers = data.filter((_, i) => Math.abs(zScores[i]) > 2);

    setResults({
      mean,
      standardDeviation: std,
      dataPoints: data.length,
      zScores: zScores.slice(0, 10), // Show first 10
      outliers: outliers.length,
      extremeOutliers: data.filter((_, i) => Math.abs(zScores[i]) > 3).length,
      interpretation: `${outliers.length} values are outliers (|z| > 2), ${data.filter((_, i) => Math.abs(zScores[i]) > 3).length} are extreme outliers (|z| > 3)`
    });
  };

  const calculateSampleZScores = (data: number[]) => {
    const sampleMean = calculateMean(data);
    const sampleStd = calculateStandardDeviation(data);
    const zScores = data.map(val => calculateZScore(val, sampleMean, sampleStd));
    const outliers = data.filter((_, i) => Math.abs(zScores[i]) > 2);

    setResults({
      sampleMean,
      sampleStandardDeviation: sampleStd,
      dataPoints: data.length,
      zScores: zScores.slice(0, 10), // Show first 10
      outliers: outliers.length,
      extremeOutliers: data.filter((_, i) => Math.abs(zScores[i]) > 3).length,
      interpretation: `Sample-based z-scores calculated. ${outliers.length} values are outliers (|z| > 2)`
    });
  };

  const getZScoreInterpretation = (zScore: number): string => {
    if (Math.abs(zScore) < 1) {
      return 'This value is within 1 standard deviation of the mean (typical).';
    } else if (Math.abs(zScore) < 2) {
      return 'This value is between 1-2 standard deviations from the mean (somewhat unusual).';
    } else if (Math.abs(zScore) < 3) {
      return 'This value is between 2-3 standard deviations from the mean (unusual, potential outlier).';
    } else {
      return 'This value is more than 3 standard deviations from the mean (very unusual, likely outlier).';
    }
  };

  const generateNormalCurve = () => {
    const points = [];
    for (let x = -4; x <= 4; x += 0.1) {
      const y = Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
      points.push({ x, y });
    }
    return points;
  };

  const curveData = generateNormalCurve();

  return (
    <div className="container-main section-padding space-section">
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4">Z-Score Calculator</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Calculate z-scores for individual values or datasets to identify outliers and understand data distribution.
        </p>
      </div>

      <div className="space-section">
        {/* Calculation Type Selection */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-4">Calculation Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setCalculationType('single')}
              className={`p-4 rounded-lg border text-left ${
                calculationType === 'single' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              <h4 className="font-medium text-primary mb-2">Single Value</h4>
              <p className="text-sm text-secondary">Calculate z-score for one value with known population parameters</p>
            </button>
            <button
              onClick={() => setCalculationType('population')}
              className={`p-4 rounded-lg border text-left ${
                calculationType === 'population' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              <h4 className="font-medium text-primary mb-2">Dataset vs Population</h4>
              <p className="text-sm text-secondary">Calculate z-scores for multiple values using known population parameters</p>
            </button>
            <button
              onClick={() => setCalculationType('sample')}
              className={`p-4 rounded-lg border text-left ${
                calculationType === 'sample' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              <h4 className="font-medium text-primary mb-2">Sample Z-Scores</h4>
              <p className="text-sm text-secondary">Calculate z-scores using sample mean and standard deviation</p>
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {calculationType === 'single' && (
            <div className="card p-6">
              <h3 className="text-subtitle text-primary mb-4">Single Value Z-Score</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Value
                  </label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="input"
                    placeholder="Enter the value"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Population Mean (μ)
                  </label>
                  <input
                    type="number"
                    value={populationMean}
                    onChange={(e) => setPopulationMean(e.target.value)}
                    className="input"
                    placeholder="Enter population mean"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Population Standard Deviation (σ)
                  </label>
                  <input
                    type="number"
                    value={populationStd}
                    onChange={(e) => setPopulationStd(e.target.value)}
                    className="input"
                    placeholder="Enter population standard deviation"
                  />
                </div>
                <button
                  onClick={calculateSingleZScore}
                  className="btn-primary w-full"
                  disabled={!value || !populationMean || !populationStd}
                >
                  Calculate Z-Score
                </button>
              </div>
            </div>
          )}

          {calculationType === 'population' && (
            <>
              <div className="card p-6">
                <h3 className="text-subtitle text-primary mb-4">Population Parameters</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Population Mean (μ)
                    </label>
                    <input
                      type="number"
                      value={populationMean}
                      onChange={(e) => setPopulationMean(e.target.value)}
                      className="input"
                      placeholder="Enter population mean"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Population Standard Deviation (σ)
                    </label>
                    <input
                      type="number"
                      value={populationStd}
                      onChange={(e) => setPopulationStd(e.target.value)}
                      className="input"
                      placeholder="Enter population standard deviation"
                    />
                  </div>
                </div>
              </div>
              <DataInput
                onDataSubmit={(data) => {
                  setSampleData(data);
                  calculatePopulationZScores(data);
                }}
                label="Dataset"
                placeholder="Enter your data values separated by commas"
              />
            </>
          )}

          {calculationType === 'sample' && (
            <DataInput
              onDataSubmit={(data) => {
                setSampleData(data);
                calculateSampleZScores(data);
              }}
              label="Sample Data"
              placeholder="Enter your data values separated by commas"
              validation={(data) => {
                if (data.length < 3) return 'Please enter at least 3 values for sample calculations';
                return null;
              }}
            />
          )}

          {/* Visualization */}
          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Normal Distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={curveData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis 
                    dataKey="x" 
                    stroke="#737373" 
                    fontSize={12}
                    label={{ value: 'Z-Score', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis stroke="#737373" fontSize={12} />
                  <Tooltip 
                    formatter={(value) => [value.toFixed(4), 'Density']}
                    labelFormatter={(value) => `Z = ${value.toFixed(2)}`}
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
                  <ReferenceLine x={0} stroke="#ef4444" strokeDasharray="2 2" />
                  <ReferenceLine x={-2} stroke="#fbbf24" strokeDasharray="2 2" />
                  <ReferenceLine x={2} stroke="#fbbf24" strokeDasharray="2 2" />
                  {results && calculationType === 'single' && (
                    <ReferenceLine 
                      x={results.zScore} 
                      stroke="#10b981" 
                      strokeWidth={3}
                      label={{ value: "Your Value", position: "top" }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Results */}
        {results && (
          <ResultDisplay
            title="Z-Score Results"
            results={results}
            interpretation={results.interpretation}
            onExport={(format) => {
              // Export logic here
              console.log('Export:', format);
            }}
          />
        )}

        {/* Help Guide */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-4">Z-Score Interpretation Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-body text-secondary">
            <div>
              <h4 className="font-medium text-primary mb-2">Z-Score Ranges</h4>
              <ul className="space-y-1 text-sm">
                <li><strong>|z| &lt; 1:</strong> Within normal range (68% of data)</li>
                <li><strong>1 ≤ |z| &lt; 2:</strong> Somewhat unusual (27% of data)</li>
                <li><strong>2 ≤ |z| &lt; 3:</strong> Unusual, potential outlier (4% of data)</li>
                <li><strong>|z| ≥ 3:</strong> Very unusual, likely outlier (0.3% of data)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Applications</h4>
              <ul className="space-y-1 text-sm">
                <li>Identify outliers in datasets</li>
                <li>Compare values from different distributions</li>
                <li>Quality control in manufacturing</li>
                <li>Standardize test scores</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZScoreCalculator;