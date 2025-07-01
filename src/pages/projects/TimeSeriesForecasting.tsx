import React, { useState, useMemo } from 'react';
import { Clock, TrendingUp, Upload, Play, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, AreaChart, Area } from 'recharts';
import FileUpload from '../../components/FileUpload';
import ResultDisplay from '../../components/ResultDisplay';
import Papa from 'papaparse';
import { calculateMean, exportToCSV, exportToPDF } from '../../utils/statistics';

interface TimeSeriesPoint {
  date: string;
  value: number;
  timestamp: number;
}

const TimeSeriesForecasting: React.FC = () => {
  const [data, setData] = useState<TimeSeriesPoint[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [dateColumn, setDateColumn] = useState('');
  const [valueColumn, setValueColumn] = useState('');
  const [forecastMethod, setForecastMethod] = useState<'moving-average' | 'exponential-smoothing' | 'linear-trend'>('moving-average');
  const [forecastPeriods, setForecastPeriods] = useState(12);
  const [windowSize, setWindowSize] = useState(3);
  const [alpha, setAlpha] = useState(0.3);
  const [results, setResults] = useState<any>(null);

  const handleFileSelect = (file: File) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        const cols = Object.keys(results.data[0] || {});
        setColumns(cols);
        
        // Auto-detect date and value columns
        const dateCol = cols.find(col => 
          col.toLowerCase().includes('date') || 
          col.toLowerCase().includes('time') ||
          col.toLowerCase().includes('month') ||
          col.toLowerCase().includes('year')
        );
        const valueCol = cols.find(col => {
          const values = (results.data as any[]).slice(0, 10).map(row => row[col]);
          return values.every(v => !isNaN(Number(v))) && col !== dateCol;
        });
        
        if (dateCol) setDateColumn(dateCol);
        if (valueCol) setValueColumn(valueCol);
        
        processTimeSeriesData(results.data as any[], dateCol || '', valueCol || '');
      }
    });
  };

  const processTimeSeriesData = (rawData: any[], datCol: string, valCol: string) => {
    if (!datCol || !valCol) return;
    
    const processedData = rawData
      .filter(row => row[datCol] && !isNaN(Number(row[valCol])))
      .map(row => {
        const dateValue = row[datCol];
        let timestamp: number;
        
        // Try to parse different date formats
        if (typeof dateValue === 'string') {
          timestamp = new Date(dateValue).getTime();
        } else if (typeof dateValue === 'number') {
          // Assume it's already a timestamp or year
          timestamp = dateValue > 10000 ? dateValue : new Date(dateValue, 0, 1).getTime();
        } else {
          timestamp = Date.now();
        }
        
        return {
          date: new Date(timestamp).toISOString().split('T')[0],
          value: Number(row[valCol]),
          timestamp
        };
      })
      .sort((a, b) => a.timestamp - b.timestamp);
    
    setData(processedData);
  };

  const performDecomposition = () => {
    if (data.length < 4) return null;
    
    const values = data.map(d => d.value);
    const n = values.length;
    
    // Simple trend calculation (linear regression)
    const x = Array.from({ length: n }, (_, i) => i);
    const sumX = x.reduce((sum, val) => sum + val, 0);
    const sumY = values.reduce((sum, val) => sum + val, 0);
    const sumXY = x.reduce((sum, val, i) => sum + val * values[i], 0);
    const sumX2 = x.reduce((sum, val) => sum + val * val, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    const trend = x.map(val => slope * val + intercept);
    
    // Calculate detrended values
    const detrended = values.map((val, i) => val - trend[i]);
    
    // Simple seasonal pattern detection (assuming yearly seasonality for demonstration)
    const seasonalPeriod = Math.min(12, Math.floor(n / 2));
    const seasonal = Array(n).fill(0);
    
    if (n >= seasonalPeriod * 2) {
      for (let i = 0; i < seasonalPeriod; i++) {
        const seasonalValues = [];
        for (let j = i; j < n; j += seasonalPeriod) {
          seasonalValues.push(detrended[j]);
        }
        const avgSeasonal = calculateMean(seasonalValues);
        for (let j = i; j < n; j += seasonalPeriod) {
          seasonal[j] = avgSeasonal;
        }
      }
    }
    
    // Calculate residuals
    const residuals = values.map((val, i) => val - trend[i] - seasonal[i]);
    
    return {
      original: values,
      trend,
      seasonal,
      residuals,
      decompositionData: data.map((d, i) => ({
        date: d.date,
        original: values[i],
        trend: trend[i],
        seasonal: seasonal[i],
        residual: residuals[i]
      }))
    };
  };

  const performForecasting = () => {
    if (data.length < 3) {
      alert('Need at least 3 data points for forecasting');
      return;
    }

    const values = data.map(d => d.value);
    let forecast: number[] = [];
    let forecastData: any[] = [];
    
    switch (forecastMethod) {
      case 'moving-average':
        forecast = movingAverageForcast(values, windowSize, forecastPeriods);
        break;
      case 'exponential-smoothing':
        forecast = exponentialSmoothingForecast(values, alpha, forecastPeriods);
        break;
      case 'linear-trend':
        forecast = linearTrendForecast(values, forecastPeriods);
        break;
    }
    
    // Generate forecast dates
    const lastDate = new Date(data[data.length - 1].timestamp);
    const interval = data.length > 1 ? 
      (data[data.length - 1].timestamp - data[data.length - 2].timestamp) : 
      24 * 60 * 60 * 1000; // Default to daily
    
    forecastData = forecast.map((value, i) => {
      const forecastDate = new Date(lastDate.getTime() + (i + 1) * interval);
      return {
        date: forecastDate.toISOString().split('T')[0],
        value,
        isForecast: true
      };
    });

    // Calculate accuracy metrics for in-sample predictions
    const predictions = [];
    switch (forecastMethod) {
      case 'moving-average':
        for (let i = windowSize; i < values.length; i++) {
          const window = values.slice(i - windowSize, i);
          predictions.push(calculateMean(window));
        }
        break;
      case 'exponential-smoothing':
        let smoothed = values[0];
        for (let i = 1; i < values.length; i++) {
          smoothed = alpha * values[i - 1] + (1 - alpha) * smoothed;
          predictions.push(smoothed);
        }
        break;
      case 'linear-trend':
        const x = Array.from({ length: values.length }, (_, i) => i);
        const sumX = x.reduce((sum, val) => sum + val, 0);
        const sumY = values.reduce((sum, val) => sum + val, 0);
        const sumXY = x.reduce((sum, val, i) => sum + val * values[i], 0);
        const sumX2 = x.reduce((sum, val) => sum + val * val, 0);
        
        const slope = (values.length * sumXY - sumX * sumY) / (values.length * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / values.length;
        
        for (let i = 1; i < values.length; i++) {
          predictions.push(slope * i + intercept);
        }
        break;
    }

    const actualValues = values.slice(predictions.length > 0 ? values.length - predictions.length : 1);
    const mae = predictions.length > 0 ? 
      predictions.reduce((sum, pred, i) => sum + Math.abs(pred - actualValues[i]), 0) / predictions.length : 0;
    const mse = predictions.length > 0 ?
      predictions.reduce((sum, pred, i) => sum + Math.pow(pred - actualValues[i], 2), 0) / predictions.length : 0;
    const rmse = Math.sqrt(mse);
    
    const decomposition = performDecomposition();
    
    setResults({
      method: forecastMethod,
      forecast: forecastData,
      metrics: { mae, mse, rmse },
      decomposition,
      combinedData: [
        ...data.map(d => ({ ...d, isForecast: false })),
        ...forecastData
      ]
    });
  };

  const movingAverageForcast = (values: number[], window: number, periods: number): number[] => {
    const forecast = [];
    const lastWindow = values.slice(-window);
    let currentAvg = calculateMean(lastWindow);
    
    for (let i = 0; i < periods; i++) {
      forecast.push(currentAvg);
      // For simplicity, keep the same average (could be improved by updating the window)
    }
    
    return forecast;
  };

  const exponentialSmoothingForecast = (values: number[], alpha: number, periods: number): number[] => {
    let smoothed = values[0];
    
    // Calculate smoothed values for historical data
    for (let i = 1; i < values.length; i++) {
      smoothed = alpha * values[i] + (1 - alpha) * smoothed;
    }
    
    // Generate forecast
    const forecast = [];
    for (let i = 0; i < periods; i++) {
      forecast.push(smoothed);
      // For simple exponential smoothing, forecast remains constant
    }
    
    return forecast;
  };

  const linearTrendForecast = (values: number[], periods: number): number[] => {
    const n = values.length;
    const x = Array.from({ length: n }, (_, i) => i);
    const sumX = x.reduce((sum, val) => sum + val, 0);
    const sumY = values.reduce((sum, val) => sum + val, 0);
    const sumXY = x.reduce((sum, val, i) => sum + val * values[i], 0);
    const sumX2 = x.reduce((sum, val) => sum + val * val, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    const forecast = [];
    for (let i = 0; i < periods; i++) {
      forecast.push(slope * (n + i) + intercept);
    }
    
    return forecast;
  };

  const handleExport = (format: 'csv' | 'pdf' | 'json') => {
    if (!results) return;

    const timestamp = new Date().toISOString().split('T')[0];
    
    switch (format) {
      case 'csv':
        exportToCSV(results.combinedData, `time-series-forecast-${timestamp}.csv`);
        break;
        
      case 'pdf':
        const reportContent = `
TIME SERIES FORECASTING REPORT
Generated: ${new Date().toLocaleDateString()}

DATASET SUMMARY:
Total Data Points: ${data.length}
Date Range: ${data[0]?.date} to ${data[data.length - 1]?.date}
Value Column: ${valueColumn}

FORECASTING METHOD: ${results.method.toUpperCase()}
Forecast Periods: ${forecastPeriods}

ACCURACY METRICS:
Mean Absolute Error (MAE): ${results.metrics.mae.toFixed(4)}
Root Mean Square Error (RMSE): ${results.metrics.rmse.toFixed(4)}
Mean Square Error (MSE): ${results.metrics.mse.toFixed(4)}

FORECAST VALUES:
${results.forecast.map((f: any, i: number) => `Period ${i + 1}: ${f.value.toFixed(2)}`).join('\n')}

MODEL PARAMETERS:
${forecastMethod === 'moving-average' ? `Window Size: ${windowSize}` :
  forecastMethod === 'exponential-smoothing' ? `Alpha: ${alpha}` :
  'Linear trend extrapolation'}
        `;
        exportToPDF(reportContent, `time-series-report-${timestamp}.pdf`);
        break;
    }
  };

  return (
    <div className="container-main section-padding space-section">
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4">Time Series Analysis Tool</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Analyze time series data with decomposition, trend analysis, and forecasting capabilities.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="max-w-2xl mx-auto">
          <FileUpload onFileSelect={handleFileSelect}>
            <h3 className="text-subtitle text-primary mb-2">Upload Time Series Data</h3>
            <p className="text-body text-secondary mb-6">
              Upload a CSV file with date/time and numeric value columns
            </p>
          </FileUpload>
        </div>
      ) : (
        <div className="space-section">
          {/* Data Configuration */}
          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4">Data Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Date Column
                </label>
                <select 
                  value={dateColumn} 
                  onChange={(e) => {
                    setDateColumn(e.target.value);
                    processTimeSeriesData(data, e.target.value, valueColumn);
                  }} 
                  className="input"
                >
                  <option value="">Select date column</option>
                  {columns.map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Value Column
                </label>
                <select 
                  value={valueColumn} 
                  onChange={(e) => {
                    setValueColumn(e.target.value);
                    processTimeSeriesData(data, dateColumn, e.target.value);
                  }} 
                  className="input"
                >
                  <option value="">Select value column</option>
                  {columns.map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Forecast Method
                </label>
                <select 
                  value={forecastMethod} 
                  onChange={(e) => setForecastMethod(e.target.value as any)} 
                  className="input"
                >
                  <option value="moving-average">Moving Average</option>
                  <option value="exponential-smoothing">Exponential Smoothing</option>
                  <option value="linear-trend">Linear Trend</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Forecast Periods
                </label>
                <input
                  type="number"
                  value={forecastPeriods}
                  onChange={(e) => setForecastPeriods(Number(e.target.value))}
                  className="input"
                  min="1"
                  max="50"
                />
              </div>
            </div>

            {/* Method-specific parameters */}
            {forecastMethod === 'moving-average' && (
              <div className="mt-4 max-w-md">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Window Size: {windowSize}
                </label>
                <input
                  type="range"
                  min="2"
                  max="20"
                  value={windowSize}
                  onChange={(e) => setWindowSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            )}

            {forecastMethod === 'exponential-smoothing' && (
              <div className="mt-4 max-w-md">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Alpha (Smoothing Parameter): {alpha}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.1"
                  value={alpha}
                  onChange={(e) => setAlpha(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={performForecasting}
                className="btn-primary"
                disabled={!dateColumn || !valueColumn || data.length < 3}
              >
                <Play className="w-4 h-4 mr-2" />
                Generate Forecast & Analysis
              </button>
            </div>
          </div>

          {/* Data Overview */}
          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4">Data Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg">
                <h4 className="font-medium text-neutral-900 dark:text-white mb-1">Data Points</h4>
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{data.length}</p>
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg">
                <h4 className="font-medium text-neutral-900 dark:text-white mb-1">Date Range</h4>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  {data.length > 0 ? `${data[0].date} to ${data[data.length - 1].date}` : 'N/A'}
                </p>
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg">
                <h4 className="font-medium text-neutral-900 dark:text-white mb-1">Average Value</h4>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                  {data.length > 0 ? calculateMean(data.map(d => d.value)).toFixed(2) : 'N/A'}
                </p>
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg">
                <h4 className="font-medium text-neutral-900 dark:text-white mb-1">Trend</h4>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  {data.length > 1 ? 
                    (data[data.length - 1].value > data[0].value ? 'Increasing' : 'Decreasing') : 
                    'N/A'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          {results && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResultDisplay
                title="Forecast Results"
                results={{
                  method: results.method.replace('-', ' ').toUpperCase(),
                  forecastPeriods: forecastPeriods,
                  meanAbsoluteError: results.metrics.mae,
                  rootMeanSquareError: results.metrics.rmse,
                  meanSquareError: results.metrics.mse,
                  dataPoints: data.length
                }}
                onExport={handleExport}
                interpretation={`
                  Used ${results.method.replace('-', ' ')} method to forecast ${forecastPeriods} periods.
                  Model accuracy: MAE = ${results.metrics.mae.toFixed(4)}, RMSE = ${results.metrics.rmse.toFixed(4)}.
                  ${results.metrics.rmse < calculateMean(data.map(d => d.value)) * 0.1 ? 'Good forecast accuracy.' : 'Consider adjusting parameters for better accuracy.'}
                `}
              />

              <div className="card p-6">
                <h3 className="text-subtitle text-primary mb-4">Forecast Summary</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg">
                      <h4 className="font-medium text-neutral-900 dark:text-white mb-1">Next Value</h4>
                      <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                        {results.forecast[0]?.value.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg">
                      <h4 className="font-medium text-neutral-900 dark:text-white mb-1">Avg Forecast</h4>
                      <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                        {calculateMean(results.forecast.map((f: any) => f.value)).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">Method Used</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      {results.method.replace('-', ' ').toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Time Series Plot */}
          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4">Time Series with Forecast</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results ? results.combinedData : data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#737373" 
                    fontSize={12}
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis stroke="#737373" fontSize={12} />
                  <Tooltip 
                    formatter={(value, name) => [
                      typeof value === 'number' ? value.toFixed(2) : value, 
                      name
                    ]}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                    }}
                  />
                  <Line 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    dot={false}
                    connectNulls={false}
                  />
                  {results && (
                    <Line 
                      dataKey={(entry: any) => entry.isForecast ? entry.value : null}
                      stroke="#ef4444" 
                      strokeWidth={2} 
                      strokeDasharray="5 5"
                      dot={false}
                      connectNulls={false}
                    />
                  )}
                  {results && data.length > 0 && (
                    <ReferenceLine 
                      x={data[data.length - 1].date} 
                      stroke="#fbbf24" 
                      strokeDasharray="3 3"
                      label={{ value: "Forecast Start", position: "top" }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-0.5 bg-blue-500"></div>
                <span>Historical Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-0.5 bg-red-500 border-dashed border-t-2"></div>
                <span>Forecast</span>
              </div>
            </div>
          </div>

          {/* Decomposition Analysis */}
          {results?.decomposition && (
            <div className="card p-6">
              <h3 className="text-subtitle text-primary mb-4">Time Series Decomposition</h3>
              <div className="space-y-6">
                {['original', 'trend', 'seasonal', 'residual'].map((component) => (
                  <div key={component}>
                    <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 capitalize">
                      {component} Component
                    </h4>
                    <div className="h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={results.decomposition.decompositionData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                          <XAxis 
                            dataKey="date" 
                            stroke="#737373" 
                            fontSize={10}
                            tickFormatter={(value) => new Date(value).getMonth() + 1}
                          />
                          <YAxis stroke="#737373" fontSize={10} />
                          <Tooltip 
                            formatter={(value) => [value.toFixed(3), component.charAt(0).toUpperCase() + component.slice(1)]}
                            labelFormatter={(value) => new Date(value).toLocaleDateString()}
                            contentStyle={{
                              backgroundColor: '#ffffff',
                              border: '1px solid #e5e5e5',
                              borderRadius: '8px',
                              fontSize: '12px'
                            }}
                          />
                          <Line 
                            dataKey={component}
                            stroke={component === 'original' ? '#3b82f6' : 
                                   component === 'trend' ? '#10b981' :
                                   component === 'seasonal' ? '#f59e0b' : '#ef4444'}
                            strokeWidth={1}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Guide */}
          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4">Time Series Analysis Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-body text-secondary">
              <div>
                <h4 className="font-medium text-primary mb-2">Moving Average</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Simple and interpretable</li>
                  <li>• Good for stable data with minimal trend</li>
                  <li>• Window size affects smoothness</li>
                  <li>• Larger windows = smoother forecasts</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-primary mb-2">Exponential Smoothing</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Weights recent observations more heavily</li>
                  <li>• Alpha controls smoothing level</li>
                  <li>• Higher alpha = more responsive to changes</li>
                  <li>• Good for data with no strong seasonality</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-primary mb-2">Linear Trend</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Extrapolates linear trend into future</li>
                  <li>• Good for data with consistent trend</li>
                  <li>• Simple but can be unrealistic for long forecasts</li>
                  <li>• Best for short-term predictions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSeriesForecasting;