import React, { useState } from 'react';
import { Calculator, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ResultDisplay from '../../components/ResultDisplay';
import { chiSquareTest, exportToCSV, exportToPDF } from '../../utils/statistics';

const ChiSquareTest: React.FC = () => {
  const [testType, setTestType] = useState<'goodness-of-fit' | 'independence'>('goodness-of-fit');
  const [observed, setObserved] = useState<string>('');
  const [expected, setExpected] = useState<string>('');
  const [categories, setCategories] = useState<string>('Category 1, Category 2, Category 3');
  const [results, setResults] = useState<any>(null);

  const parseData = (dataString: string): number[] => {
    return dataString.split(',').map(item => parseFloat(item.trim())).filter(num => !isNaN(num));
  };

  const performChiSquareTest = () => {
    const observedData = parseData(observed);
    const expectedData = parseData(expected);
    
    if (observedData.length === 0 || expectedData.length === 0) {
      alert('Please enter valid data for both observed and expected values');
      return;
    }
    
    if (observedData.length !== expectedData.length) {
      alert('Observed and expected data must have the same number of categories');
      return;
    }
    
    if (expectedData.some(val => val <= 0)) {
      alert('All expected values must be greater than 0');
      return;
    }

    const result = chiSquareTest(observedData, expectedData);
    const categoryList = categories.split(',').map(cat => cat.trim());
    
    setResults({
      ...result,
      observed: observedData,
      expected: expectedData,
      categories: categoryList.slice(0, observedData.length),
      residuals: observedData.map((obs, i) => obs - expectedData[i]),
      standardizedResiduals: observedData.map((obs, i) => 
        (obs - expectedData[i]) / Math.sqrt(expectedData[i])
      ),
      isSignificant: result.pValue! < 0.05
    });
  };

  const generateEqualExpected = () => {
    const observedData = parseData(observed);
    if (observedData.length > 0) {
      const total = observedData.reduce((sum, val) => sum + val, 0);
      const equalExpected = Array(observedData.length).fill(total / observedData.length);
      setExpected(equalExpected.join(', '));
    }
  };

  const chartData = results ? results.observed.map((obs: number, i: number) => ({
    category: results.categories[i] || `Category ${i + 1}`,
    observed: obs,
    expected: results.expected[i],
    residual: results.residuals[i]
  })) : [];

  const handleExport = (format: 'csv' | 'pdf' | 'json') => {
    if (!results) return;

    const timestamp = new Date().toISOString().split('T')[0];
    
    switch (format) {
      case 'csv':
        const csvData = chartData.map((item: any) => ({
          category: item.category,
          observed: item.observed,
          expected: item.expected,
          residual: item.residual,
          standardizedResidual: results.standardizedResiduals[chartData.indexOf(item)]
        }));
        exportToCSV(csvData, `chi-square-test-${timestamp}.csv`);
        break;
        
      case 'pdf':
        const reportContent = `
CHI-SQUARE TEST REPORT
Generated: ${new Date().toLocaleDateString()}

TEST STATISTICS:
Chi-square statistic: ${results.testStatistic.toFixed(4)}
Degrees of freedom: ${results.degreesOfFreedom}
P-value: ${results.pValue.toFixed(6)}
Significance level: α = 0.05

CONCLUSION:
${results.isSignificant ? 'SIGNIFICANT' : 'NOT SIGNIFICANT'}
${results.interpretation}

DATA SUMMARY:
${chartData.map((item: any, i: number) => 
  `${item.category}: Observed=${item.observed}, Expected=${item.expected.toFixed(2)}, Residual=${item.residual.toFixed(2)}`
).join('\n')}
        `;
        exportToPDF(reportContent, `chi-square-report-${timestamp}.pdf`);
        break;
    }
  };

  return (
    <div className="container-main section-padding space-section">
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4">Chi-Square Test Calculator</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Perform chi-square goodness-of-fit tests to compare observed vs expected frequencies.
        </p>
      </div>

      <div className="space-section">
        {/* Test Type Selection */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-4">Test Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setTestType('goodness-of-fit')}
              className={`p-4 rounded-lg border text-left ${
                testType === 'goodness-of-fit' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              <Calculator className="w-6 h-6 text-blue-500 mb-2" />
              <h4 className="font-medium text-primary mb-2">Goodness of Fit</h4>
              <p className="text-sm text-secondary">Test if observed frequencies match expected distribution</p>
            </button>
            <button
              onClick={() => setTestType('independence')}
              className={`p-4 rounded-lg border text-left opacity-50 cursor-not-allowed ${
                testType === 'independence' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-neutral-200 dark:border-neutral-700'
              }`}
              disabled
            >
              <BarChart3 className="w-6 h-6 text-green-500 mb-2" />
              <h4 className="font-medium text-primary mb-2">Test of Independence</h4>
              <p className="text-sm text-secondary">Coming soon - test independence between variables</p>
            </button>
          </div>
        </div>

        {/* Data Input */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-4">Data Input</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Category Names
              </label>
              <input
                type="text"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                className="input"
                placeholder="Category 1, Category 2, Category 3, ..."
              />
              <p className="text-xs text-neutral-500 mt-1">Separate category names with commas</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Observed Frequencies
              </label>
              <input
                type="text"
                value={observed}
                onChange={(e) => setObserved(e.target.value)}
                className="input"
                placeholder="10, 15, 8, 12, ..."
              />
              <p className="text-xs text-neutral-500 mt-1">Enter observed counts separated by commas</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Expected Frequencies
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={expected}
                  onChange={(e) => setExpected(e.target.value)}
                  className="input flex-1"
                  placeholder="11.25, 11.25, 11.25, 11.25, ..."
                />
                <button
                  onClick={generateEqualExpected}
                  className="btn-secondary whitespace-nowrap"
                  disabled={!observed}
                >
                  Equal Expected
                </button>
              </div>
              <p className="text-xs text-neutral-500 mt-1">Enter expected counts or generate equal distribution</p>
            </div>
            
            <button
              onClick={performChiSquareTest}
              className="btn-primary w-full"
              disabled={!observed || !expected}
            >
              <Calculator className="w-4 h-4 mr-2" />
              Perform Chi-Square Test
            </button>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResultDisplay
              title="Chi-Square Test Results"
              results={{
                chiSquareStatistic: results.testStatistic,
                degreesOfFreedom: results.degreesOfFreedom,
                pValue: results.pValue,
                criticalValue: 'See interpretation',
                significance: results.isSignificant ? 'Significant' : 'Not Significant',
                totalObserved: results.observed.reduce((sum: number, val: number) => sum + val, 0),
                totalExpected: results.expected.reduce((sum: number, val: number) => sum + val, 0)
              }}
              interpretation={results.interpretation}
              onExport={handleExport}
            />

            <div className="card p-6">
              <h3 className="text-subtitle text-primary mb-4">Test Summary</h3>
              <div className="space-y-3">
                <div className={`p-3 rounded-lg border-l-4 ${
                  results.isSignificant 
                    ? 'bg-red-50 dark:bg-red-900/30 border-red-500' 
                    : 'bg-green-50 dark:bg-green-900/30 border-green-500'
                }`}>
                  <p className={`font-medium ${
                    results.isSignificant ? 'text-red-800 dark:text-red-200' : 'text-green-800 dark:text-green-200'
                  }`}>
                    {results.isSignificant ? 'Reject Null Hypothesis' : 'Fail to Reject Null Hypothesis'}
                  </p>
                  <p className={`text-sm ${
                    results.isSignificant ? 'text-red-600 dark:text-red-300' : 'text-green-600 dark:text-green-300'
                  }`}>
                    p-value = {results.pValue.toFixed(6)} {results.isSignificant ? '< 0.05' : '≥ 0.05'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg">
                    <h4 className="font-medium text-neutral-900 dark:text-white mb-1">Chi-Square</h4>
                    <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                      {results.testStatistic.toFixed(4)}
                    </p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg">
                    <h4 className="font-medium text-neutral-900 dark:text-white mb-1">Degrees of Freedom</h4>
                    <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                      {results.degreesOfFreedom}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Visualization */}
        {results && (
          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4">Observed vs Expected Frequencies</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis 
                    dataKey="category" 
                    stroke="#737373" 
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#737373" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                    }}
                  />
                  <Bar dataKey="observed" fill="#3b82f6" name="Observed" />
                  <Bar dataKey="expected" fill="#ef4444" name="Expected" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Guide */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-4">Chi-Square Test Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-body text-secondary">
            <div>
              <h4 className="font-medium text-primary mb-2">When to Use</h4>
              <ul className="space-y-1 text-sm">
                <li>• Compare observed frequencies to expected frequencies</li>
                <li>• Test if data follows a specific distribution</li>
                <li>• Evaluate goodness of fit for theoretical models</li>
                <li>• Test independence between categorical variables</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Assumptions</h4>
              <ul className="space-y-1 text-sm">
                <li>• Data consists of counts or frequencies</li>
                <li>• Expected frequency ≥ 5 for each category</li>
                <li>• Observations are independent</li>
                <li>• Random sampling from population</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChiSquareTest;