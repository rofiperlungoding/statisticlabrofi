import React, { useState } from 'react';
import { TestTube, Users, UserCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ReferenceLine } from 'recharts';
import DataInput from '../../components/DataInput';
import ResultDisplay from '../../components/ResultDisplay';
import { oneSampleTTest, twoSampleTTest, pairedTTest, approximateTCDF } from '../../utils/statistics';

const TTestCalculator: React.FC = () => {
  const [testType, setTestType] = useState<'one-sample' | 'two-sample' | 'paired'>('one-sample');
  const [populationMean, setPopulationMean] = useState<string>('');
  const [equalVariances, setEqualVariances] = useState(true);
  const [significanceLevel, setSignificanceLevel] = useState(0.05);
  const [data1, setData1] = useState<number[]>([]);
  const [data2, setData2] = useState<number[]>([]);
  const [results, setResults] = useState<any>(null);

  const performOneSampleTest = (data: number[]) => {
    const popMean = parseFloat(populationMean);
    if (isNaN(popMean)) return;

    const result = oneSampleTTest(data, popMean);
    setResults({
      ...result,
      testType: 'One-Sample T-Test',
      sampleSize: data.length,
      populationMean: popMean,
      isSignificant: result.pValue! < significanceLevel
    });
  };

  const performTwoSampleTest = () => {
    if (data1.length === 0 || data2.length === 0) return;

    const result = twoSampleTTest(data1, data2, equalVariances);
    setResults({
      ...result,
      testType: equalVariances ? 'Two-Sample T-Test (Equal Variances)' : 'Welch\'s T-Test (Unequal Variances)',
      sample1Size: data1.length,
      sample2Size: data2.length,
      isSignificant: result.pValue! < significanceLevel
    });
  };

  const performPairedTest = () => {
    if (data1.length === 0 || data2.length === 0) return;
    if (data1.length !== data2.length) {
      alert('Paired t-test requires equal sample sizes');
      return;
    }

    const result = pairedTTest(data1, data2);
    setResults({
      ...result,
      testType: 'Paired T-Test',
      sampleSize: data1.length,
      isSignificant: result.pValue! < significanceLevel
    });
  };

  const generateTDistribution = (df: number) => {
    const points = [];
    for (let t = -4; t <= 4; t += 0.1) {
      const y = Math.exp(-0.5 * Math.log(1 + (t * t) / df) * (df + 1)) / 
               (Math.sqrt(df * Math.PI) * Math.exp(Math.log(Math.abs(Math.gamma((df + 1) / 2))) - Math.log(Math.abs(Math.gamma(df / 2)))));
      points.push({ t, density: y || 0 });
    }
    return points;
  };

  const getCriticalValue = (df: number, alpha: number) => {
    // Approximation for t-critical value
    if (df >= 30) return alpha === 0.05 ? 1.96 : alpha === 0.01 ? 2.576 : 1.645;
    
    const tValues: { [key: number]: { [key: number]: number } } = {
      1: { 0.05: 12.706, 0.01: 63.657, 0.1: 6.314 },
      2: { 0.05: 4.303, 0.01: 9.925, 0.1: 2.920 },
      3: { 0.05: 3.182, 0.01: 5.841, 0.1: 2.353 },
      4: { 0.05: 2.776, 0.01: 4.604, 0.1: 2.132 },
      5: { 0.05: 2.571, 0.01: 4.032, 0.1: 2.015 },
      10: { 0.05: 2.228, 0.01: 3.169, 0.1: 1.812 },
      15: { 0.05: 2.131, 0.01: 2.947, 0.1: 1.753 },
      20: { 0.05: 2.086, 0.01: 2.845, 0.1: 1.725 },
      25: { 0.05: 2.060, 0.01: 2.787, 0.1: 1.708 }
    };
    
    return tValues[df]?.[alpha] || 1.96;
  };

  return (
    <div className="container-main section-padding space-section">
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4">T-Test Calculator</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Perform one-sample, two-sample, and paired t-tests with comprehensive statistical analysis.
        </p>
      </div>

      <div className="space-section">
        {/* Test Type Selection */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-4">Select T-Test Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setTestType('one-sample')}
              className={`p-4 rounded-lg border text-left ${
                testType === 'one-sample' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              <TestTube className="w-6 h-6 text-blue-500 mb-2" />
              <h4 className="font-medium text-primary mb-2">One-Sample</h4>
              <p className="text-sm text-secondary">Compare sample mean to known population mean</p>
            </button>
            <button
              onClick={() => setTestType('two-sample')}
              className={`p-4 rounded-lg border text-left ${
                testType === 'two-sample' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              <Users className="w-6 h-6 text-green-500 mb-2" />
              <h4 className="font-medium text-primary mb-2">Two-Sample</h4>
              <p className="text-sm text-secondary">Compare means of two independent groups</p>
            </button>
            <button
              onClick={() => setTestType('paired')}
              className={`p-4 rounded-lg border text-left ${
                testType === 'paired' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              <UserCheck className="w-6 h-6 text-purple-500 mb-2" />
              <h4 className="font-medium text-primary mb-2">Paired</h4>
              <p className="text-sm text-secondary">Compare paired observations (before/after)</p>
            </button>
          </div>
        </div>

        {/* Test Parameters */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-4">Test Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
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
            
            {testType === 'one-sample' && (
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Population Mean (μ₀)
                </label>
                <input
                  type="number"
                  value={populationMean}
                  onChange={(e) => setPopulationMean(e.target.value)}
                  className="input"
                  placeholder="Enter hypothesized mean"
                />
              </div>
            )}
            
            {testType === 'two-sample' && (
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Assume Equal Variances
                </label>
                <select
                  value={equalVariances.toString()}
                  onChange={(e) => setEqualVariances(e.target.value === 'true')}
                  className="input"
                >
                  <option value="true">Yes (Pooled t-test)</option>
                  <option value="false">No (Welch's t-test)</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Data Input */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {testType === 'one-sample' ? (
            <DataInput
              onDataSubmit={(data) => {
                setData1(data);
                performOneSampleTest(data);
              }}
              label="Sample Data"
              placeholder="Enter your sample values separated by commas"
              validation={(data) => {
                if (data.length < 2) return 'Please enter at least 2 values';
                if (!populationMean) return 'Please set the population mean first';
                return null;
              }}
            />
          ) : (
            <>
              <DataInput
                onDataSubmit={(data) => {
                  setData1(data);
                  if (testType === 'two-sample' && data2.length > 0) {
                    performTwoSampleTest();
                  } else if (testType === 'paired' && data2.length > 0) {
                    performPairedTest();
                  }
                }}
                label={testType === 'paired' ? 'Before/Group 1 Data' : 'Group 1 Data'}
                placeholder="Enter values for first group"
              />
              <DataInput
                onDataSubmit={(data) => {
                  setData2(data);
                  if (testType === 'two-sample' && data1.length > 0) {
                    performTwoSampleTest();
                  } else if (testType === 'paired' && data1.length > 0) {
                    performPairedTest();
                  }
                }}
                label={testType === 'paired' ? 'After/Group 2 Data' : 'Group 2 Data'}
                placeholder="Enter values for second group"
              />
            </>
          )}
        </div>

        {/* Results and Visualization */}
        {results && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResultDisplay
              title="T-Test Results"
              results={{
                testType: results.testType,
                tStatistic: results.testStatistic,
                degreesOfFreedom: results.degreesOfFreedom,
                pValue: results.pValue,
                criticalValue: getCriticalValue(results.degreesOfFreedom, significanceLevel),
                significanceLevel,
                isSignificant: results.isSignificant,
                conclusion: results.isSignificant ? 'Reject null hypothesis' : 'Fail to reject null hypothesis'
              }}
              interpretation={results.interpretation}
              onExport={(format) => {
                console.log('Export:', format);
              }}
            />

            <div className="card p-6">
              <h3 className="text-subtitle text-primary mb-4">T-Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={generateTDistribution(results.degreesOfFreedom)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis 
                      dataKey="t" 
                      stroke="#737373" 
                      fontSize={12}
                      label={{ value: 't-statistic', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis stroke="#737373" fontSize={12} />
                    <Tooltip 
                      formatter={(value) => [value.toFixed(4), 'Density']}
                      labelFormatter={(value) => `t = ${value.toFixed(2)}`}
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e5e5',
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                      }}
                    />
                    <Line 
                      dataKey="density" 
                      stroke="#3b82f6" 
                      strokeWidth={2} 
                      dot={false}
                    />
                    <ReferenceLine 
                      x={results.testStatistic} 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      label={{ value: "Test Statistic", position: "top" }}
                    />
                    <ReferenceLine 
                      x={getCriticalValue(results.degreesOfFreedom, significanceLevel)} 
                      stroke="#fbbf24" 
                      strokeDasharray="5 5"
                      label={{ value: "Critical Value", position: "top" }}
                    />
                    <ReferenceLine 
                      x={-getCriticalValue(results.degreesOfFreedom, significanceLevel)} 
                      stroke="#fbbf24" 
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Help Guide */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-4">T-Test Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-body text-secondary">
            <div>
              <h4 className="font-medium text-primary mb-2">One-Sample T-Test</h4>
              <ul className="space-y-1 text-sm">
                <li>Tests if sample mean differs from known population mean</li>
                <li>Null hypothesis: μ = μ₀</li>
                <li>Use when population standard deviation is unknown</li>
                <li>Requires normally distributed data</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Two-Sample T-Test</h4>
              <ul className="space-y-1 text-sm">
                <li>Compares means of two independent groups</li>
                <li>Null hypothesis: μ₁ = μ₂</li>
                <li>Pooled: assumes equal variances</li>
                <li>Welch's: unequal variances (more robust)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Paired T-Test</h4>
              <ul className="space-y-1 text-sm">
                <li>Compares paired observations</li>
                <li>Before/after measurements</li>
                <li>Controls for individual differences</li>
                <li>More powerful than two-sample test</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TTestCalculator;