import React, { useState } from 'react';
import { Target, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';
import DataInput from '../../components/DataInput';
import ResultDisplay from '../../components/ResultDisplay';
import { calculateConfidenceInterval, calculateMean, calculateStandardDeviation, approximateInverseNormalCDF, approximateInverseTCDF, gamma } from '../../utils/statistics';

const ConfidenceIntervalCalculator: React.FC = () => {
  const [intervalType, setIntervalType] = useState<'mean' | 'proportion'>('mean');
  const [confidenceLevel, setConfidenceLevel] = useState(0.95);
  const [knownStd, setKnownStd] = useState<string>('');
  const [useKnownStd, setUseKnownStd] = useState(false);
  const [sampleData, setSampleData] = useState<number[]>([]);
  const [sampleSize, setSampleSize] = useState<string>('');
  const [sampleMean, setSampleMean] = useState<string>('');
  const [sampleStd, setSampleStd] = useState<string>('');
  const [successes, setSuccesses] = useState<string>('');
  const [results, setResults] = useState<any>(null);

  const calculateMeanInterval = (data?: number[]) => {
    let n: number, mean: number, std: number;
    
    if (data && data.length > 0) {
      // Calculate from raw data
      n = data.length;
      mean = calculateMean(data);
      std = calculateStandardDeviation(data);
    } else {
      // Use summary statistics
      n = parseInt(sampleSize);
      mean = parseFloat(sampleMean);
      std = useKnownStd ? parseFloat(knownStd) : parseFloat(sampleStd);
      
      if (isNaN(n) || isNaN(mean) || isNaN(std) || n <= 0 || std <= 0) {
        return;
      }
    }

    const alpha = 1 - confidenceLevel;
    const standardError = std / Math.sqrt(n);
    
    let criticalValue: number;
    let distributionType: string;
    
    if (useKnownStd || n >= 30) {
      // Use z-distribution
      criticalValue = approximateInverseNormalCDF(1 - alpha/2);
      distributionType = 'Normal (Z)';
    } else {
      // Use t-distribution
      criticalValue = approximateInverseTCDF(1 - alpha/2, n - 1);
      distributionType = 'T-distribution';
    }
    
    const marginOfError = criticalValue * standardError;
    const lower = mean - marginOfError;
    const upper = mean + marginOfError;
    
    setResults({
      type: 'Mean Confidence Interval',
      confidenceLevel: confidenceLevel * 100,
      sampleSize: n,
      sampleMean: mean,
      standardError,
      criticalValue,
      marginOfError,
      lowerBound: lower,
      upperBound: upper,
      distributionType,
      interpretation: `We are ${(confidenceLevel * 100)}% confident that the true population mean lies between ${lower.toFixed(4)} and ${upper.toFixed(4)}.`
    });
  };

  const calculateProportionInterval = () => {
    const n = parseInt(sampleSize);
    const x = parseInt(successes);
    
    if (isNaN(n) || isNaN(x) || n <= 0 || x < 0 || x > n) {
      return;
    }
    
    const proportion = x / n;
    const alpha = 1 - confidenceLevel;
    const zCritical = approximateInverseNormalCDF(1 - alpha/2);
    
    // Wilson score interval (more accurate for small samples)
    const z2 = zCritical * zCritical;
    const denominator = 1 + z2 / n;
    const center = (proportion + z2 / (2 * n)) / denominator;
    const margin = zCritical * Math.sqrt((proportion * (1 - proportion) + z2 / (4 * n)) / n) / denominator;
    
    const lower = Math.max(0, center - margin);
    const upper = Math.min(1, center + margin);
    
    setResults({
      type: 'Proportion Confidence Interval',
      confidenceLevel: confidenceLevel * 100,
      sampleSize: n,
      successes: x,
      sampleProportion: proportion,
      criticalValue: zCritical,
      marginOfError: margin,
      lowerBound: lower,
      upperBound: upper,
      distributionType: 'Normal (Z)',
      interpretation: `We are ${(confidenceLevel * 100)}% confident that the true population proportion lies between ${(lower * 100).toFixed(2)}% and ${(upper * 100).toFixed(2)}%.`
    });
  };

  const generateDistribution = () => {
    const points = [];
    const range = intervalType === 'proportion' ? [-4, 4] : [-4, 4];
    
    for (let x = range[0]; x <= range[1]; x += 0.1) {
      let y: number;
      
      if (results?.distributionType === 'Normal (Z)' || intervalType === 'proportion') {
        y = Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
      } else {
        // T-distribution approximation
        const df = results?.sampleSize - 1 || 10;
        y = Math.exp(-0.5 * Math.log(1 + (x * x) / df) * (df + 1)) / 
            (Math.sqrt(df * Math.PI) * Math.exp(Math.log(Math.abs(gamma((df + 1) / 2))) - Math.log(Math.abs(gamma(df / 2)))));
      }
      
      points.push({ x, y: y || 0 });
    }
    return points;
  };

  const distributionData = generateDistribution();

  return (
    <div className="container-main section-padding space-section">
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4">Confidence Interval Calculator</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Calculate confidence intervals for population means and proportions with visual distribution display.
        </p>
      </div>

      <div className="space-section">
        {/* Interval Type Selection */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-4">Interval Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setIntervalType('mean')}
              className={`p-4 rounded-lg border text-left ${
                intervalType === 'mean' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              <TrendingUp className="w-6 h-6 text-blue-500 mb-2" />
              <h4 className="font-medium text-primary mb-2">Population Mean (μ)</h4>
              <p className="text-sm text-secondary">Confidence interval for the average value of a continuous variable</p>
            </button>
            <button
              onClick={() => setIntervalType('proportion')}
              className={`p-4 rounded-lg border text-left ${
                intervalType === 'proportion' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              <Target className="w-6 h-6 text-green-500 mb-2" />
              <h4 className="font-medium text-primary mb-2">Population Proportion (p)</h4>
              <p className="text-sm text-secondary">Confidence interval for the percentage or probability of success</p>
            </button>
          </div>
        </div>

        {/* Parameters */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-4">Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Confidence Level
              </label>
              <select
                value={confidenceLevel}
                onChange={(e) => setConfidenceLevel(Number(e.target.value))}
                className="input"
              >
                <option value={0.90}>90%</option>
                <option value={0.95}>95%</option>
                <option value={0.99}>99%</option>
              </select>
            </div>

            {intervalType === 'mean' && (
              <div className="md:col-span-2">
                <label className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={useKnownStd}
                    onChange={(e) => setUseKnownStd(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Population standard deviation is known
                  </span>
                </label>
                {useKnownStd && (
                  <input
                    type="number"
                    value={knownStd}
                    onChange={(e) => setKnownStd(e.target.value)}
                    className="input"
                    placeholder="Enter known population standard deviation"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Data Input */}
        {intervalType === 'mean' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DataInput
              onDataSubmit={(data) => {
                setSampleData(data);
                calculateMeanInterval(data);
              }}
              label="Raw Data (Optional)"
              placeholder="Enter your data values (will auto-calculate mean and std)"
            />

            <div className="card p-6">
              <h3 className="text-subtitle text-primary mb-4">Summary Statistics</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Sample Size (n)
                  </label>
                  <input
                    type="number"
                    value={sampleSize}
                    onChange={(e) => setSampleSize(e.target.value)}
                    className="input"
                    placeholder="Enter sample size"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Sample Mean (x̄)
                  </label>
                  <input
                    type="number"
                    value={sampleMean}
                    onChange={(e) => setSampleMean(e.target.value)}
                    className="input"
                    placeholder="Enter sample mean"
                  />
                </div>
                {!useKnownStd && (
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Sample Standard Deviation (s)
                    </label>
                    <input
                      type="number"
                      value={sampleStd}
                      onChange={(e) => setSampleStd(e.target.value)}
                      className="input"
                      placeholder="Enter sample standard deviation"
                    />
                  </div>
                )}
                <button
                  onClick={() => calculateMeanInterval()}
                  className="btn-primary w-full"
                  disabled={!sampleSize || !sampleMean || (!useKnownStd && !sampleStd) || (useKnownStd && !knownStd)}
                >
                  Calculate Interval
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="card p-6 max-w-md mx-auto">
            <h3 className="text-subtitle text-primary mb-4">Proportion Data</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Sample Size (n)
                </label>
                <input
                  type="number"
                  value={sampleSize}
                  onChange={(e) => setSampleSize(e.target.value)}
                  className="input"
                  placeholder="Total number of observations"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Number of Successes (x)
                </label>
                <input
                  type="number"
                  value={successes}
                  onChange={(e) => setSuccesses(e.target.value)}
                  className="input"
                  placeholder="Number of positive outcomes"
                />
              </div>
              <button
                onClick={calculateProportionInterval}
                className="btn-primary w-full"
                disabled={!sampleSize || !successes}
              >
                Calculate Interval
              </button>
            </div>
          </div>
        )}

        {/* Results and Visualization */}
        {results && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResultDisplay
              title="Confidence Interval"
              results={{
                type: results.type,
                confidenceLevel: `${results.confidenceLevel}%`,
                lowerBound: results.lowerBound,
                upperBound: results.upperBound,
                marginOfError: results.marginOfError,
                criticalValue: results.criticalValue,
                distributionUsed: results.distributionType,
                ...(intervalType === 'mean' ? {
                  sampleMean: results.sampleMean,
                  standardError: results.standardError
                } : {
                  sampleProportion: results.sampleProportion,
                  sampleSize: results.sampleSize,
                  successes: results.successes
                })
              }}
              interpretation={results.interpretation}
              onExport={(format) => {
                console.log('Export:', format);
              }}
            />

            <div className="card p-6">
              <h3 className="text-subtitle text-primary mb-4">Distribution Visualization</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={distributionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis 
                      dataKey="x" 
                      stroke="#737373" 
                      fontSize={12}
                      label={{ value: results.distributionType, position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis stroke="#737373" fontSize={12} />
                    <Tooltip 
                      formatter={(value) => [value.toFixed(4), 'Density']}
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
                    <ReferenceArea
                      x1={-results.criticalValue}
                      x2={results.criticalValue}
                      fill="#3b82f6"
                      fillOpacity={0.1}
                      label="Confidence Region"
                    />
                    <ReferenceLine 
                      x={results.criticalValue} 
                      stroke="#10b981" 
                      strokeDasharray="5 5"
                    />
                    <ReferenceLine 
                      x={-results.criticalValue} 
                      stroke="#10b981" 
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-muted text-center">
                Shaded area represents the {(results.confidenceLevel)}% confidence region
              </div>
            </div>
          </div>
        )}

        {/* Help Guide */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-4">Confidence Interval Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-body text-secondary">
            <div>
              <h4 className="font-medium text-primary mb-2">Interpretation</h4>
              <ul className="space-y-1 text-sm">
                <li>• 95% CI: If we repeated this study 100 times, 95 intervals would contain the true parameter</li>
                <li>• Wider intervals = less precision but more confidence</li>
                <li>• Larger samples = narrower intervals</li>
                <li>• Use t-distribution when σ is unknown and n &lt; 30</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Applications</h4>
              <ul className="space-y-1 text-sm">
                <li>• Estimate population parameters</li>
                <li>• Quality control in manufacturing</li>
                <li>• Medical research and clinical trials</li>
                <li>• Market research and polling</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfidenceIntervalCalculator;