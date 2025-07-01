import React, { useState } from 'react';
import { Target, Calculator, TestTube, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, BarChart, Bar } from 'recharts';
import DataInput from '../../components/DataInput';
import FileUpload from '../../components/FileUpload';
import ResultDisplay from '../../components/ResultDisplay';
import Papa from 'papaparse';
import { oneSampleTTest, twoSampleTTest, pairedTTest, chiSquareTest, oneWayANOVA, approximateTCDF, approximateChiSquareCDF, approximateNormalCDF, gamma, exportToCSV, exportToPDF } from '../../utils/statistics';

const HypothesisTesting: React.FC = () => {
  const [testType, setTestType] = useState<'t-test' | 'chi-square' | 'anova'>('t-test');
  const [tTestType, setTTestType] = useState<'one-sample' | 'two-sample' | 'paired'>('one-sample');
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [results, setResults] = useState<any>(null);
  const [alpha, setAlpha] = useState(0.05);

  // T-test specific states
  const [group1Data, setGroup1Data] = useState<number[]>([]);
  const [group2Data, setGroup2Data] = useState<number[]>([]);
  const [populationMean, setPopulationMean] = useState<string>('');

  // Chi-square specific states
  const [observed, setObserved] = useState<string>('');
  const [expected, setExpected] = useState<string>('');

  // ANOVA specific states
  const [anovaGroups, setAnovaGroups] = useState<{ [key: string]: number[] }>({});

  const handleFileSelect = (file: File) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        setData(results.data as any[]);
        setColumns(Object.keys(results.data[0] || {}));
      }
    });
  };

  const performTTest = () => {
    let result: any;
    
    switch (tTestType) {
      case 'one-sample':
        if (group1Data.length === 0 || !populationMean) return;
        result = oneSampleTTest(group1Data, parseFloat(populationMean));
        break;
      case 'two-sample':
        if (group1Data.length === 0 || group2Data.length === 0) return;
        result = twoSampleTTest(group1Data, group2Data);
        break;
      case 'paired':
        if (group1Data.length === 0 || group2Data.length === 0 || group1Data.length !== group2Data.length) return;
        result = pairedTTest(group1Data, group2Data);
        break;
    }

    setResults({
      ...result,
      testType: `${tTestType} t-test`,
      alpha,
      isSignificant: result.pValue! < alpha,
      criticalValue: getCriticalTValue(result.degreesOfFreedom!, alpha),
      distributionData: generateTDistribution(result.degreesOfFreedom!)
    });
  };

  const performChiSquareTest = () => {
    const observedData = observed.split(',').map(x => parseFloat(x.trim()));
    const expectedData = expected.split(',').map(x => parseFloat(x.trim()));
    
    if (observedData.length !== expectedData.length || observedData.some(isNaN) || expectedData.some(isNaN)) {
      alert('Please enter valid observed and expected values');
      return;
    }

    const result = chiSquareTest(observedData, expectedData);
    
    setResults({
      ...result,
      testType: 'Chi-square test',
      alpha,
      isSignificant: result.pValue! < alpha,
      observedData,
      expectedData,
      distributionData: generateChiSquareDistribution(result.degreesOfFreedom!)
    });
  };

  const performANOVA = () => {
    const groups = Object.values(anovaGroups).filter(group => group.length > 0);
    if (groups.length < 2) {
      alert('Please enter data for at least 2 groups');
      return;
    }

    const result = oneWayANOVA(groups);
    
    setResults({
      ...result,
      testType: 'One-way ANOVA',
      alpha,
      isSignificant: result.pValue! < alpha,
      groups: Object.keys(anovaGroups).map((name, i) => ({
        name,
        data: groups[i] || [],
        mean: groups[i] ? groups[i].reduce((sum, val) => sum + val, 0) / groups[i].length : 0
      })),
      distributionData: generateFDistribution(groups.length - 1, groups.reduce((sum, group) => sum + group.length, 0) - groups.length)
    });
  };

  const getCriticalTValue = (df: number, alpha: number): number => {
    // Approximation for critical t-value
    const tValues: { [key: number]: { [key: number]: number } } = {
      1: { 0.05: 12.706, 0.01: 63.657, 0.1: 6.314 },
      2: { 0.05: 4.303, 0.01: 9.925, 0.1: 2.920 },
      5: { 0.05: 2.571, 0.01: 4.032, 0.1: 2.015 },
      10: { 0.05: 2.228, 0.01: 3.169, 0.1: 1.812 },
      20: { 0.05: 2.086, 0.01: 2.845, 0.1: 1.725 },
      30: { 0.05: 2.042, 0.01: 2.750, 0.1: 1.697 }
    };
    
    return tValues[df]?.[alpha] || (df >= 30 ? (alpha === 0.05 ? 1.96 : 2.576) : 2.0);
  };

  const generateTDistribution = (df: number) => {
    const points = [];
    for (let t = -4; t <= 4; t += 0.1) {
      const y = Math.exp(-0.5 * Math.log(1 + (t * t) / df) * (df + 1)) / 
               (Math.sqrt(df * Math.PI) * Math.exp(Math.log(Math.abs(gamma((df + 1) / 2))) - Math.log(Math.abs(gamma(df / 2)))));
      points.push({ x: t, y: y || 0 });
    }
    return points;
  };

  const generateChiSquareDistribution = (df: number) => {
    const points = [];
    for (let x = 0; x <= 20; x += 0.2) {
      const y = Math.pow(x, df/2 - 1) * Math.exp(-x/2) / (Math.pow(2, df/2) * gamma(df/2));
      points.push({ x, y: y || 0 });
    }
    return points;
  };

  const generateFDistribution = (df1: number, df2: number) => {
    const points = [];
    for (let f = 0; f <= 5; f += 0.1) {
      const beta = gamma(df1/2) * gamma(df2/2) / gamma((df1 + df2)/2);
      const y = (1/beta) * Math.pow(df1/df2, df1/2) * Math.pow(f, df1/2 - 1) * 
                Math.pow(1 + (df1*f)/df2, -(df1 + df2)/2);
      points.push({ x: f, y: y || 0 });
    }
    return points;
  };

  const handleExport = (format: 'csv' | 'pdf' | 'json') => {
    if (!results) return;

    const timestamp = new Date().toISOString().split('T')[0];
    
    switch (format) {
      case 'csv':
        const csvData = [{
          test_type: results.testType,
          test_statistic: results.testStatistic,
          p_value: results.pValue,
          degrees_of_freedom: results.degreesOfFreedom,
          significance_level: alpha,
          is_significant: results.isSignificant,
          interpretation: results.interpretation
        }];
        exportToCSV(csvData, `hypothesis-test-${timestamp}.csv`);
        break;
        
      case 'pdf':
        const reportContent = `
HYPOTHESIS TESTING REPORT
Generated: ${new Date().toLocaleDateString()}

TEST TYPE: ${results.testType}

HYPOTHESES:
H₀: Null hypothesis (no effect/difference)
H₁: Alternative hypothesis (effect/difference exists)

TEST STATISTICS:
Test Statistic: ${results.testStatistic.toFixed(4)}
P-value: ${results.pValue.toFixed(6)}
Degrees of Freedom: ${results.degreesOfFreedom || 'N/A'}
Significance Level: α = ${alpha}

DECISION:
${results.isSignificant ? 'REJECT' : 'FAIL TO REJECT'} the null hypothesis

CONCLUSION:
${results.interpretation}

STATISTICAL SIGNIFICANCE: ${results.isSignificant ? 'YES' : 'NO'}
        `;
        exportToPDF(reportContent, `hypothesis-test-report-${timestamp}.pdf`);
        break;
    }
  };

  return (
    <div className="container-main section-padding space-section">
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4">Hypothesis Testing Visualizer</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Perform comprehensive hypothesis testing with interactive visualizations and statistical interpretations.
        </p>
      </div>

      <div className="space-section">
        {/* Test Type Selection */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-4">Select Statistical Test</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setTestType('t-test')}
              className={`p-4 rounded-lg border text-left ${
                testType === 't-test' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              <TestTube className="w-6 h-6 text-blue-500 mb-2" />
              <h4 className="font-medium text-primary mb-2">T-Test</h4>
              <p className="text-sm text-secondary">Compare means (one-sample, two-sample, paired)</p>
            </button>
            <button
              onClick={() => setTestType('chi-square')}
              className={`p-4 rounded-lg border text-left ${
                testType === 'chi-square' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              <BarChart3 className="w-6 h-6 text-green-500 mb-2" />
              <h4 className="font-medium text-primary mb-2">Chi-Square Test</h4>
              <p className="text-sm text-secondary">Test goodness of fit or independence</p>
            </button>
            <button
              onClick={() => setTestType('anova')}
              className={`p-4 rounded-lg border text-left ${
                testType === 'anova' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              <Target className="w-6 h-6 text-purple-500 mb-2" />
              <h4 className="font-medium text-primary mb-2">ANOVA</h4>
              <p className="text-sm text-secondary">Compare means across multiple groups</p>
            </button>
          </div>
        </div>

        {/* Test Parameters */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-4">Test Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Significance Level (α)
              </label>
              <select
                value={alpha}
                onChange={(e) => setAlpha(Number(e.target.value))}
                className="input"
              >
                <option value={0.01}>0.01 (99% confidence)</option>
                <option value={0.05}>0.05 (95% confidence)</option>
                <option value={0.1}>0.10 (90% confidence)</option>
              </select>
            </div>

            {testType === 't-test' && (
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  T-Test Type
                </label>
                <select
                  value={tTestType}
                  onChange={(e) => setTTestType(e.target.value as any)}
                  className="input"
                >
                  <option value="one-sample">One-Sample</option>
                  <option value="two-sample">Two-Sample</option>
                  <option value="paired">Paired</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Data Input Section */}
        {testType === 't-test' && (
          <div className="space-y-6">
            {tTestType === 'one-sample' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DataInput
                  onDataSubmit={setGroup1Data}
                  label="Sample Data"
                  placeholder="Enter sample values"
                />
                <div className="card p-6">
                  <h3 className="text-subtitle text-primary mb-4">Population Mean</h3>
                  <input
                    type="number"
                    value={populationMean}
                    onChange={(e) => setPopulationMean(e.target.value)}
                    className="input"
                    placeholder="Enter hypothesized population mean"
                  />
                  <button
                    onClick={performTTest}
                    className="btn-primary w-full mt-4"
                    disabled={group1Data.length === 0 || !populationMean}
                  >
                    Perform One-Sample T-Test
                  </button>
                </div>
              </div>
            )}

            {(tTestType === 'two-sample' || tTestType === 'paired') && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DataInput
                  onDataSubmit={setGroup1Data}
                  label="Group 1 Data"
                  placeholder="Enter values for group 1"
                />
                <DataInput
                  onDataSubmit={setGroup2Data}
                  label="Group 2 Data"
                  placeholder="Enter values for group 2"
                />
              </div>
            )}

            {(tTestType === 'two-sample' || tTestType === 'paired') && (
              <div className="text-center">
                <button
                  onClick={performTTest}
                  className="btn-primary"
                  disabled={group1Data.length === 0 || group2Data.length === 0}
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Perform {tTestType === 'two-sample' ? 'Two-Sample' : 'Paired'} T-Test
                </button>
              </div>
            )}
          </div>
        )}

        {testType === 'chi-square' && (
          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4">Chi-Square Test Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Observed Frequencies
                </label>
                <input
                  type="text"
                  value={observed}
                  onChange={(e) => setObserved(e.target.value)}
                  className="input"
                  placeholder="10, 15, 8, 12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Expected Frequencies
                </label>
                <input
                  type="text"
                  value={expected}
                  onChange={(e) => setExpected(e.target.value)}
                  className="input"
                  placeholder="11.25, 11.25, 11.25, 11.25"
                />
              </div>
            </div>
            <button
              onClick={performChiSquareTest}
              className="btn-primary w-full mt-4"
              disabled={!observed || !expected}
            >
              <Calculator className="w-4 h-4 mr-2" />
              Perform Chi-Square Test
            </button>
          </div>
        )}

        {testType === 'anova' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Group 1', 'Group 2', 'Group 3'].map((groupName, index) => (
                <DataInput
                  key={index}
                  onDataSubmit={(data) => setAnovaGroups(prev => ({ ...prev, [groupName]: data }))}
                  label={`${groupName} Data`}
                  placeholder={`Enter values for ${groupName}`}
                />
              ))}
            </div>
            <div className="text-center">
              <button
                onClick={performANOVA}
                className="btn-primary"
                disabled={Object.keys(anovaGroups).length < 2}
              >
                <Calculator className="w-4 h-4 mr-2" />
                Perform ANOVA
              </button>
            </div>
          </div>
        )}

        {/* Results and Visualizations */}
        {results && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResultDisplay
              title="Test Results"
              results={{
                testType: results.testType,
                testStatistic: results.testStatistic,
                pValue: results.pValue,
                degreesOfFreedom: results.degreesOfFreedom,
                alpha: alpha,
                isSignificant: results.isSignificant,
                decision: results.isSignificant ? 'Reject H₀' : 'Fail to reject H₀'
              }}
              interpretation={results.interpretation}
              onExport={handleExport}
            />

            <div className="card p-6">
              <h3 className="text-subtitle text-primary mb-4">Test Summary</h3>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border-l-4 ${
                  results.isSignificant 
                    ? 'bg-red-50 dark:bg-red-900/30 border-red-500' 
                    : 'bg-green-50 dark:bg-green-900/30 border-green-500'
                }`}>
                  <h4 className={`font-medium ${
                    results.isSignificant ? 'text-red-800 dark:text-red-200' : 'text-green-800 dark:text-green-200'
                  }`}>
                    {results.isSignificant ? 'Statistically Significant' : 'Not Statistically Significant'}
                  </h4>
                  <p className={`text-sm ${
                    results.isSignificant ? 'text-red-600 dark:text-red-300' : 'text-green-600 dark:text-green-300'
                  }`}>
                    p-value = {results.pValue.toFixed(6)} {results.isSignificant ? '<' : '≥'} {alpha}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg">
                    <h4 className="font-medium text-neutral-900 dark:text-white mb-1">Test Statistic</h4>
                    <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                      {results.testStatistic.toFixed(4)}
                    </p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg">
                    <h4 className="font-medium text-neutral-900 dark:text-white mb-1">P-Value</h4>
                    <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                      {results.pValue.toFixed(6)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Distribution Visualization */}
        {results && results.distributionData && (
          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4">
              {testType === 't-test' ? 'T-Distribution' : 
               testType === 'chi-square' ? 'Chi-Square Distribution' : 'F-Distribution'}
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results.distributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis 
                    dataKey="x" 
                    stroke="#737373" 
                    fontSize={12}
                    label={{ value: 'Test Statistic', position: 'insideBottom', offset: -5 }}
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
                  <ReferenceLine 
                    x={results.testStatistic} 
                    stroke="#ef4444" 
                    strokeWidth={3}
                    label={{ value: "Test Statistic", position: "top" }}
                  />
                  {results.criticalValue && (
                    <ReferenceLine 
                      x={results.criticalValue} 
                      stroke="#fbbf24" 
                      strokeDasharray="5 5"
                      label={{ value: "Critical Value", position: "top" }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* File Upload Option */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-4">Import Data from File</h3>
          <FileUpload onFileSelect={handleFileSelect}>
            <p className="text-body text-secondary">
              Upload a CSV file to import data for hypothesis testing
            </p>
          </FileUpload>
          {columns.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Available columns: {columns.join(', ')}
              </p>
            </div>
          )}
        </div>

        {/* Guide */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-4">Hypothesis Testing Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-body text-secondary">
            <div>
              <h4 className="font-medium text-primary mb-2">T-Tests</h4>
              <ul className="space-y-1 text-sm">
                <li>• One-sample: Compare sample mean to known value</li>
                <li>• Two-sample: Compare means of two independent groups</li>
                <li>• Paired: Compare related observations (before/after)</li>
                <li>• Assumes normal distribution</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Chi-Square Tests</h4>
              <ul className="space-y-1 text-sm">
                <li>• Goodness of fit: Test if data follows expected distribution</li>
                <li>• Independence: Test relationship between variables</li>
                <li>• Uses categorical data (frequencies)</li>
                <li>• Assumes large enough expected frequencies</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">ANOVA</h4>
              <ul className="space-y-1 text-sm">
                <li>• Compare means across 3+ groups</li>
                <li>• One-way: One independent variable</li>
                <li>• Assumes normal distribution and equal variances</li>
                <li>• Post-hoc tests needed if significant</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HypothesisTesting;