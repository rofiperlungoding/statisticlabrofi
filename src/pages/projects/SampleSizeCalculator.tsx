import React, { useState } from 'react';
import { Users, Target, Calculator } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ResultDisplay from '../../components/ResultDisplay';
import { calculateSampleSizeForMean, calculateSampleSizeForProportion, approximateInverseNormalCDF, exportToCSV, exportToPDF } from '../../utils/statistics';

const SampleSizeCalculator: React.FC = () => {
  const [calculationType, setCalculationType] = useState<'mean' | 'proportion' | 'comparison'>('mean');
  const [confidenceLevel, setConfidenceLevel] = useState(0.95);
  const [marginOfError, setMarginOfError] = useState<string>('');
  const [standardDeviation, setStandardDeviation] = useState<string>('');
  const [proportion, setProportion] = useState<string>('0.5');
  const [effectSize, setEffectSize] = useState<string>('');
  const [power, setPower] = useState(0.8);
  const [alpha, setAlpha] = useState(0.05);
  const [results, setResults] = useState<any>(null);

  const calculateMeanSampleSize = () => {
    const moe = parseFloat(marginOfError);
    const std = parseFloat(standardDeviation);
    
    if (isNaN(moe) || isNaN(std) || moe <= 0 || std <= 0) {
      return;
    }

    const sampleSize = calculateSampleSizeForMean(moe, std, confidenceLevel);
    
    setResults({
      type: 'Sample Size for Mean',
      sampleSize,
      marginOfError: moe,
      standardDeviation: std,
      confidenceLevel: confidenceLevel * 100,
      zValue: approximateInverseNormalCDF(1 - (1 - confidenceLevel) / 2),
      interpretation: `You need a sample size of ${sampleSize} to estimate the population mean within ±${moe} with ${(confidenceLevel * 100)}% confidence.`
    });
  };

  const calculateProportionSampleSize = () => {
    const moe = parseFloat(marginOfError);
    const p = parseFloat(proportion);
    
    if (isNaN(moe) || isNaN(p) || moe <= 0 || p < 0 || p > 1) {
      return;
    }

    const sampleSize = calculateSampleSizeForProportion(moe, p, confidenceLevel);
    
    setResults({
      type: 'Sample Size for Proportion',
      sampleSize,
      marginOfError: moe,
      proportion: p,
      confidenceLevel: confidenceLevel * 100,
      zValue: approximateInverseNormalCDF(1 - (1 - confidenceLevel) / 2),
      interpretation: `You need a sample size of ${sampleSize} to estimate the population proportion within ±${(moe * 100)}% with ${(confidenceLevel * 100)}% confidence.`
    });
  };

  const calculateComparisonSampleSize = () => {
    const effect = parseFloat(effectSize);
    
    if (isNaN(effect) || effect <= 0) {
      return;
    }

    const zAlpha = approximateInverseNormalCDF(1 - alpha / 2);
    const zBeta = approximateInverseNormalCDF(power);
    
    const sampleSize = Math.ceil(2 * Math.pow((zAlpha + zBeta) / effect, 2));
    
    setResults({
      type: 'Sample Size for Comparison',
      sampleSizePerGroup: sampleSize,
      totalSampleSize: sampleSize * 2,
      effectSize: effect,
      power: power * 100,
      alpha: alpha * 100,
      interpretation: `You need ${sampleSize} participants per group (${sampleSize * 2} total) to detect an effect size of ${effect} with ${(power * 100)}% power and ${(alpha * 100)}% significance level.`
    });
  };

  const generateSensitivityData = () => {
    if (!results) return [];
    
    const data = [];
    const baseValue = calculationType === 'mean' ? parseFloat(standardDeviation) : 
                      calculationType === 'proportion' ? parseFloat(proportion) : parseFloat(effectSize);
    
    for (let i = 0.5; i <= 2; i += 0.1) {
      const adjustedValue = baseValue * i;
      let sampleSize: number;
      
      switch (calculationType) {
        case 'mean':
          sampleSize = calculateSampleSizeForMean(parseFloat(marginOfError), adjustedValue, confidenceLevel);
          break;
        case 'proportion':
          sampleSize = calculateSampleSizeForProportion(parseFloat(marginOfError), adjustedValue, confidenceLevel);
          break;
        case 'comparison':
          const zAlpha = approximateInverseNormalCDF(1 - alpha / 2);
          const zBeta = approximateInverseNormalCDF(power);
          sampleSize = Math.ceil(2 * Math.pow((zAlpha + zBeta) / adjustedValue, 2));
          break;
        default:
          sampleSize = 0;
      }
      
      data.push({
        parameter: adjustedValue.toFixed(2),
        sampleSize,
        multiplier: i.toFixed(1)
      });
    }
    
    return data;
  };

  const sensitivityData = generateSensitivityData();

  const handleExport = (format: 'csv' | 'pdf' | 'json') => {
    if (!results) return;

    const timestamp = new Date().toISOString().split('T')[0];
    
    switch (format) {
      case 'csv':
        const csvData = [{
          calculation_type: results.type,
          sample_size: results.sampleSize || results.totalSampleSize,
          ...results
        }];
        exportToCSV(csvData, `sample-size-calculation-${timestamp}.csv`);
        break;
        
      case 'pdf':
        const reportContent = `
SAMPLE SIZE CALCULATION REPORT
Generated: ${new Date().toLocaleDateString()}

CALCULATION TYPE: ${results.type}

PARAMETERS:
${calculationType === 'mean' ? `
Margin of Error: ${results.marginOfError}
Standard Deviation: ${results.standardDeviation}
Confidence Level: ${results.confidenceLevel}%
Z-Value: ${results.zValue.toFixed(4)}
` : calculationType === 'proportion' ? `
Margin of Error: ${results.marginOfError}
Expected Proportion: ${results.proportion}
Confidence Level: ${results.confidenceLevel}%
Z-Value: ${results.zValue.toFixed(4)}
` : `
Effect Size: ${results.effectSize}
Power: ${results.power}%
Alpha Level: ${results.alpha}%
`}

RESULT:
${results.sampleSize ? `Required Sample Size: ${results.sampleSize}` : `
Sample Size per Group: ${results.sampleSizePerGroup}
Total Sample Size: ${results.totalSampleSize}
`}

INTERPRETATION:
${results.interpretation}
        `;
        exportToPDF(reportContent, `sample-size-report-${timestamp}.pdf`);
        break;
    }
  };

  return (
    <div className="container-main section-padding space-section">
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4">Sample Size Calculator</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Calculate required sample sizes for different types of statistical studies with power analysis.
        </p>
      </div>

      <div className="space-section">
        {/* Calculation Type Selection */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-4">Study Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setCalculationType('mean')}
              className={`p-4 rounded-lg border text-left ${
                calculationType === 'mean' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              <Target className="w-6 h-6 text-blue-500 mb-2" />
              <h4 className="font-medium text-primary mb-2">Estimate Mean</h4>
              <p className="text-sm text-secondary">Sample size for estimating a population mean</p>
            </button>
            <button
              onClick={() => setCalculationType('proportion')}
              className={`p-4 rounded-lg border text-left ${
                calculationType === 'proportion' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              <Users className="w-6 h-6 text-green-500 mb-2" />
              <h4 className="font-medium text-primary mb-2">Estimate Proportion</h4>
              <p className="text-sm text-secondary">Sample size for estimating a population proportion</p>
            </button>
            <button
              onClick={() => setCalculationType('comparison')}
              className={`p-4 rounded-lg border text-left ${
                calculationType === 'comparison' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              <Calculator className="w-6 h-6 text-purple-500 mb-2" />
              <h4 className="font-medium text-primary mb-2">Compare Groups</h4>
              <p className="text-sm text-secondary">Sample size for comparing two groups (power analysis)</p>
            </button>
          </div>
        </div>

        {/* Input Parameters */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-4">Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {calculationType !== 'comparison' && (
              <>
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
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Margin of Error
                  </label>
                  <input
                    type="number"
                    value={marginOfError}
                    onChange={(e) => setMarginOfError(e.target.value)}
                    className="input"
                    placeholder={calculationType === 'mean' ? 'e.g., 2.5' : 'e.g., 0.05'}
                    step={calculationType === 'mean' ? '0.1' : '0.01'}
                  />
                </div>
              </>
            )}

            {calculationType === 'mean' && (
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Standard Deviation (σ)
                </label>
                <input
                  type="number"
                  value={standardDeviation}
                  onChange={(e) => setStandardDeviation(e.target.value)}
                  className="input"
                  placeholder="e.g., 10"
                  step="0.1"
                />
              </div>
            )}

            {calculationType === 'proportion' && (
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Expected Proportion (p)
                </label>
                <input
                  type="number"
                  value={proportion}
                  onChange={(e) => setProportion(e.target.value)}
                  className="input"
                  placeholder="e.g., 0.5"
                  min="0"
                  max="1"
                  step="0.01"
                />
              </div>
            )}

            {calculationType === 'comparison' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Effect Size (Cohen's d)
                  </label>
                  <input
                    type="number"
                    value={effectSize}
                    onChange={(e) => setEffectSize(e.target.value)}
                    className="input"
                    placeholder="e.g., 0.5"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Statistical Power
                  </label>
                  <select
                    value={power}
                    onChange={(e) => setPower(Number(e.target.value))}
                    className="input"
                  >
                    <option value={0.8}>80%</option>
                    <option value={0.9}>90%</option>
                    <option value={0.95}>95%</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Significance Level (α)
                  </label>
                  <select
                    value={alpha}
                    onChange={(e) => setAlpha(Number(e.target.value))}
                    className="input"
                  >
                    <option value={0.01}>0.01</option>
                    <option value={0.05}>0.05</option>
                    <option value={0.1}>0.10</option>
                  </select>
                </div>
              </>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={() => {
                switch (calculationType) {
                  case 'mean':
                    calculateMeanSampleSize();
                    break;
                  case 'proportion':
                    calculateProportionSampleSize();
                    break;
                  case 'comparison':
                    calculateComparisonSampleSize();
                    break;
                }
              }}
              className="btn-primary"
              disabled={
                (calculationType === 'mean' && (!marginOfError || !standardDeviation)) ||
                (calculationType === 'proportion' && (!marginOfError || !proportion)) ||
                (calculationType === 'comparison' && (!effectSize))
              }
            >
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Sample Size
            </button>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResultDisplay
              title="Sample Size Results"
              results={results}
              interpretation={results.interpretation}
              onExport={handleExport}
            />

            <div className="card p-6">
              <h3 className="text-subtitle text-primary mb-4">Key Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
                    <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
                      {results.sampleSize ? 'Sample Size' : 'Total Sample Size'}
                    </h4>
                    <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                      {results.sampleSize || results.totalSampleSize}
                    </p>
                  </div>
                  {results.sampleSizePerGroup && (
                    <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
                      <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Per Group</h4>
                      <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
                        {results.sampleSizePerGroup}
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">Study Design</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200">{results.type}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sensitivity Analysis */}
        {results && sensitivityData.length > 0 && (
          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4">Sensitivity Analysis</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              How sample size changes with different parameter values
            </p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sensitivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis 
                    dataKey="multiplier" 
                    stroke="#737373" 
                    fontSize={12}
                    label={{ 
                      value: `Parameter Multiplier (Current: ${
                        calculationType === 'mean' ? standardDeviation : 
                        calculationType === 'proportion' ? proportion : effectSize
                      })`, 
                      position: 'insideBottom', 
                      offset: -5 
                    }}
                  />
                  <YAxis 
                    stroke="#737373" 
                    fontSize={12}
                    label={{ value: 'Sample Size', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    formatter={(value, name) => [value, 'Sample Size']}
                    labelFormatter={(value) => `Multiplier: ${value}`}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                    }}
                  />
                  <Bar dataKey="sampleSize" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Guide */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-4">Sample Size Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-body text-secondary">
            <div>
              <h4 className="font-medium text-primary mb-2">Mean Estimation</h4>
              <ul className="space-y-1 text-sm">
                <li>• Requires known or estimated standard deviation</li>
                <li>• Larger margin of error = smaller sample size</li>
                <li>• Higher confidence = larger sample size</li>
                <li>• Formula: n = (Z × σ / E)²</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Proportion Estimation</h4>
              <ul className="space-y-1 text-sm">
                <li>• Use p = 0.5 for maximum sample size</li>
                <li>• More conservative estimate</li>
                <li>• Common for surveys and polls</li>
                <li>• Formula: n = (Z² × p × (1-p)) / E²</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Group Comparison</h4>
              <ul className="space-y-1 text-sm">
                <li>• Effect size: small (0.2), medium (0.5), large (0.8)</li>
                <li>• Power: probability of detecting true effect</li>
                <li>• Alpha: probability of Type I error</li>
                <li>• Sample size per group needed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleSizeCalculator;