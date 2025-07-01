import React, { useState, useMemo } from 'react';
import { TrendingUp, Upload, Play, RotateCcw } from 'lucide-react';
import FileUpload from '../../components/FileUpload';
import Papa from 'papaparse';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart } from 'recharts';
import ResultDisplay from '../../components/ResultDisplay';
import { linearRegression, exportToCSV, exportToPDF } from '../../utils/statistics';

const LinearRegression: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [xColumn, setXColumn] = useState('');
  const [yColumn, setYColumn] = useState('');
  const [regressionType, setRegressionType] = useState<'linear' | 'polynomial'>('linear');
  const [polynomialDegree, setPolynomialDegree] = useState(2);
  const [regressionResults, setRegressionResults] = useState<any>(null);

  const handleFileSelect = (file: File) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        setData(results.data as any[]);
        const cols = Object.keys(results.data[0] || {});
        setColumns(cols);
        
        const numericCols = cols.filter(col => {
          const values = (results.data as any[]).slice(0, 10).map(row => row[col]);
          return values.every(v => !isNaN(Number(v)));
        });
        
        if (numericCols.length >= 2) {
          setXColumn(numericCols[0]);
          setYColumn(numericCols[1]);
        }
      }
    });
  };

  const plotData = useMemo(() => {
    if (!data.length || !xColumn || !yColumn) return [];
    
    return data
      .filter(row => 
        row[xColumn] !== null && 
        row[yColumn] !== null && 
        !isNaN(Number(row[xColumn])) && 
        !isNaN(Number(row[yColumn]))
      )
      .map(row => ({
        x: Number(row[xColumn]),
        y: Number(row[yColumn]),
      }));
  }, [data, xColumn, yColumn]);

  const performRegression = () => {
    if (plotData.length < 2) return;

    const x = plotData.map(p => p.x);
    const y = plotData.map(p => p.y);

    if (regressionType === 'linear') {
      const result = linearRegression(x, y);
      
      setRegressionResults({
        type: 'Linear Regression',
        slope: result.slope,
        intercept: result.intercept,
        rSquared: result.rSquared,
        correlation: result.correlation,
        equation: `y = ${result.slope.toFixed(4)}x + ${result.intercept.toFixed(4)}`,
        predict: (x: number) => result.slope * x + result.intercept,
        residuals: y.map((val, i) => val - (result.slope * x[i] + result.intercept))
      });
    } else if (regressionType === 'polynomial') {
      // Polynomial regression implementation
      const degree = polynomialDegree;
      const n = x.length;
      
      // Create design matrix
      const X = x.map(val => {
        const row = [];
        for (let i = 0; i <= degree; i++) {
          row.push(Math.pow(val, i));
        }
        return row;
      });
      
      // Solve normal equations (simplified for degree 2)
      if (degree === 2) {
        const sumX = x.reduce((sum, val) => sum + val, 0);
        const sumX2 = x.reduce((sum, val) => sum + val * val, 0);
        const sumX3 = x.reduce((sum, val) => sum + Math.pow(val, 3), 0);
        const sumX4 = x.reduce((sum, val) => sum + Math.pow(val, 4), 0);
        const sumY = y.reduce((sum, val) => sum + val, 0);
        const sumXY = x.reduce((sum, val, i) => sum + val * y[i], 0);
        const sumX2Y = x.reduce((sum, val, i) => sum + val * val * y[i], 0);

        // Simple polynomial fit (degree 2)
        const a0 = sumY / n;
        const a1 = (sumXY - a0 * sumX) / sumX2;
        const a2 = (sumX2Y - a0 * sumX2 - a1 * sumX3) / sumX4;

        const meanY = sumY / n;
        const totalSumSquares = y.reduce((sum, val) => sum + Math.pow(val - meanY, 2), 0);
        const residualSumSquares = y.reduce((sum, val, i) => {
          const predicted = a0 + a1 * x[i] + a2 * x[i] * x[i];
          return sum + Math.pow(val - predicted, 2);
        }, 0);
        const rSquared = 1 - (residualSumSquares / totalSumSquares);

        setRegressionResults({
          type: 'Polynomial Regression',
          coefficients: [a0, a1, a2],
          rSquared,
          equation: `y = ${a2.toFixed(4)}x² + ${a1.toFixed(4)}x + ${a0.toFixed(4)}`,
          predict: (x: number) => a0 + a1 * x + a2 * x * x,
          residuals: y.map((val, i) => val - (a0 + a1 * x[i] + a2 * x[i] * x[i]))
        });
      }
    }
  };

  const regressionLine = useMemo(() => {
    if (!regressionResults || plotData.length === 0) return [];

    const minX = Math.min(...plotData.map(p => p.x));
    const maxX = Math.max(...plotData.map(p => p.x));
    const step = (maxX - minX) / 100;

    return Array.from({ length: 101 }, (_, i) => {
      const x = minX + i * step;
      return {
        x,
        y: regressionResults.predict(x)
      };
    });
  }, [regressionResults, plotData]);

  const handleExport = (format: 'csv' | 'pdf' | 'json') => {
    if (!regressionResults) return;

    const timestamp = new Date().toISOString().split('T')[0];
    
    switch (format) {
      case 'csv':
        const csvData = plotData.map((point, i) => ({
          x: point.x,
          y: point.y,
          predicted: regressionResults.predict(point.x),
          residual: regressionResults.residuals[i]
        }));
        exportToCSV(csvData, `regression-analysis-${timestamp}.csv`);
        break;
        
      case 'pdf':
        const reportContent = `
LINEAR REGRESSION ANALYSIS REPORT
Generated: ${new Date().toLocaleDateString()}

REGRESSION EQUATION:
${regressionResults.equation}

MODEL STATISTICS:
R-squared: ${regressionResults.rSquared.toFixed(4)}
${regressionResults.correlation ? `Correlation: ${regressionResults.correlation.toFixed(4)}` : ''}

DATA POINTS: ${plotData.length}
VARIABLES: ${xColumn} (X), ${yColumn} (Y)

INTERPRETATION:
${regressionResults.rSquared > 0.8 ? 'Strong' : 
  regressionResults.rSquared > 0.6 ? 'Moderate' : 'Weak'} relationship between variables.
        `;
        exportToPDF(reportContent, `regression-report-${timestamp}.pdf`);
        break;
    }
  };

  return (
    <div className="container-main section-padding space-section">
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4">Linear Regression Analysis Tool</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Perform linear and polynomial regression analysis with comprehensive statistics and visualizations.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="max-w-2xl mx-auto">
          <FileUpload onFileSelect={handleFileSelect}>
            <h3 className="text-subtitle text-primary mb-2">Upload Dataset for Regression</h3>
            <p className="text-body text-secondary mb-6">
              Upload a CSV file with numeric columns for X and Y variables
            </p>
          </FileUpload>
        </div>
      ) : (
        <div className="space-section">
          <div className="card p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  X Variable
                </label>
                <select value={xColumn} onChange={(e) => setXColumn(e.target.value)} className="input">
                  <option value="">Select X column</option>
                  {columns.map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Y Variable
                </label>
                <select value={yColumn} onChange={(e) => setYColumn(e.target.value)} className="input">
                  <option value="">Select Y column</option>
                  {columns.map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Regression Type
                </label>
                <select 
                  value={regressionType} 
                  onChange={(e) => setRegressionType(e.target.value as any)} 
                  className="input"
                >
                  <option value="linear">Linear</option>
                  <option value="polynomial">Polynomial</option>
                </select>
              </div>

              {regressionType === 'polynomial' && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Degree
                  </label>
                  <select 
                    value={polynomialDegree} 
                    onChange={(e) => setPolynomialDegree(Number(e.target.value))} 
                    className="input"
                  >
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                  </select>
                </div>
              )}

              <div className="flex items-end space-x-2">
                <button
                  onClick={performRegression}
                  disabled={!xColumn || !yColumn || plotData.length < 2}
                  className="btn-primary flex items-center space-x-2 disabled:opacity-50"
                >
                  <Play className="w-4 h-4" />
                  <span>Fit Model</span>
                </button>
                <button
                  onClick={() => setRegressionResults(null)}
                  className="btn-secondary"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {regressionResults && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResultDisplay
                title="Regression Results"
                results={{
                  equation: regressionResults.equation,
                  rSquared: regressionResults.rSquared,
                  ...(regressionResults.correlation && { correlation: regressionResults.correlation }),
                  ...(regressionResults.slope && { slope: regressionResults.slope }),
                  ...(regressionResults.intercept && { intercept: regressionResults.intercept }),
                  dataPoints: plotData.length
                }}
                onExport={handleExport}
                interpretation={`
                  ${regressionResults.rSquared > 0.8 ? 'Strong' : 
                    regressionResults.rSquared > 0.6 ? 'Moderate' : 'Weak'} relationship between ${xColumn} and ${yColumn}.
                  The model explains ${(regressionResults.rSquared * 100).toFixed(1)}% of the variance in ${yColumn}.
                `}
              />

              <div className="card p-6">
                <h3 className="text-subtitle text-primary mb-4">Model Quality</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
                    <h4 className="font-medium text-neutral-900 dark:text-white mb-2">R² Score</h4>
                    <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                      {regressionResults.rSquared.toFixed(4)}
                    </p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
                    <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Model Fit</h4>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                      {regressionResults.rSquared > 0.8 ? 'Excellent' :
                       regressionResults.rSquared > 0.6 ? 'Good' :
                       regressionResults.rSquared > 0.4 ? 'Moderate' : 'Poor'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4">
              Scatter Plot {xColumn && yColumn && `(${xColumn} vs ${yColumn})`}
            </h3>
            {plotData.length > 0 ? (
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={plotData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis 
                      type="number" 
                      dataKey="x" 
                      name={xColumn}
                      stroke="#737373"
                      fontSize={12}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="y" 
                      name={yColumn}
                      stroke="#737373"
                      fontSize={12}
                    />
                    <Tooltip 
                      formatter={(value, name) => [value.toFixed(3), name]}
                      labelFormatter={(value) => `${xColumn}: ${value.toFixed(3)}`}
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e5e5',
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                      }}
                    />
                    <Scatter dataKey="y" fill="#3b82f6" />
                    {regressionResults && (
                      <Line 
                        data={regressionLine}
                        type="monotone"
                        dataKey="y"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={false}
                      />
                    )}
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-96 flex items-center justify-center text-neutral-500">
                Select X and Y variables to see the plot
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LinearRegression;