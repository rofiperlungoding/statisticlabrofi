import React, { useState } from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import DataInput from '../../components/DataInput';
import ResultDisplay from '../../components/ResultDisplay';
import { calculateDescriptiveStats, exportToCSV, exportToPDF } from '../../utils/statistics';

const DescriptiveStats: React.FC = () => {
  const [data, setData] = useState<number[]>([]);
  const [results, setResults] = useState<any>(null);

  const handleDataSubmit = (newData: number[]) => {
    setData(newData);
    const stats = calculateDescriptiveStats(newData);
    setResults(stats);
  };

  const handleExport = (format: 'csv' | 'pdf' | 'json') => {
    if (!results) return;

    const timestamp = new Date().toISOString().split('T')[0];
    
    switch (format) {
      case 'csv':
        const csvData = [
          { statistic: 'Count', value: results.count },
          { statistic: 'Mean', value: results.mean },
          { statistic: 'Median', value: results.median },
          { statistic: 'Standard Deviation', value: results.standardDeviation },
          { statistic: 'Variance', value: results.variance },
          { statistic: 'Minimum', value: results.min },
          { statistic: 'Maximum', value: results.max },
          { statistic: 'Range', value: results.range },
          { statistic: 'Q1', value: results.q1 },
          { statistic: 'Q3', value: results.q3 },
          { statistic: 'IQR', value: results.iqr },
          { statistic: 'Skewness', value: results.skewness },
          { statistic: 'Kurtosis', value: results.kurtosis }
        ];
        exportToCSV(csvData, `descriptive-stats-${timestamp}.csv`);
        break;
      
      case 'json':
        const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `descriptive-stats-${timestamp}.json`;
        link.click();
        URL.revokeObjectURL(url);
        break;
      
      case 'pdf':
        const reportContent = `
DESCRIPTIVE STATISTICS REPORT
Generated: ${new Date().toLocaleDateString()}

SUMMARY STATISTICS:
Count: ${results.count}
Mean: ${results.mean.toFixed(4)}
Median: ${results.median.toFixed(4)}
Mode: ${results.mode.join(', ')}
Standard Deviation: ${results.standardDeviation.toFixed(4)}
Variance: ${results.variance.toFixed(4)}

RANGE STATISTICS:
Minimum: ${results.min}
Maximum: ${results.max}
Range: ${results.range}
Q1 (25th percentile): ${results.q1.toFixed(4)}
Q3 (75th percentile): ${results.q3.toFixed(4)}
IQR: ${results.iqr.toFixed(4)}

SHAPE STATISTICS:
Skewness: ${results.skewness.toFixed(4)}
Kurtosis: ${results.kurtosis.toFixed(4)}

DATA:
${data.join(', ')}
        `;
        exportToPDF(reportContent, `descriptive-stats-${timestamp}.pdf`);
        break;
    }
  };

  const createHistogram = () => {
    if (data.length === 0) return [];
    
    const bins = Math.min(20, Math.ceil(Math.sqrt(data.length)));
    const min = Math.min(...data);
    const max = Math.max(...data);
    const binWidth = (max - min) / bins;
    
    const histogram = Array(bins).fill(0).map((_, i) => ({
      range: `${(min + i * binWidth).toFixed(1)}-${(min + (i + 1) * binWidth).toFixed(1)}`,
      count: 0,
      midpoint: min + i * binWidth + binWidth / 2
    }));
    
    data.forEach(value => {
      const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1);
      histogram[binIndex].count++;
    });
    
    return histogram;
  };

  const histogramData = createHistogram();

  return (
    <div className="container-main section-padding space-section">
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4">Descriptive Statistics Calculator</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Calculate comprehensive descriptive statistics including measures of central tendency, dispersion, and shape.
        </p>
      </div>

      <div className="space-section">
        <DataInput
          onDataSubmit={handleDataSubmit}
          label="Enter Your Dataset"
          placeholder="Enter numbers separated by commas (e.g., 12, 15, 18, 20, 22, 25, 28, 30)"
          validation={(data) => {
            if (data.length < 2) return 'Please enter at least 2 numbers';
            return null;
          }}
        />

        {results && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResultDisplay
                title="Descriptive Statistics"
                results={{
                  count: results.count,
                  mean: results.mean,
                  median: results.median,
                  mode: results.mode.length <= 3 ? results.mode : `${results.mode.length} modes`,
                  standardDeviation: results.standardDeviation,
                  variance: results.variance,
                  minimum: results.min,
                  maximum: results.max,
                  range: results.range,
                  q1: results.q1,
                  q3: results.q3,
                  iqr: results.iqr,
                  skewness: results.skewness,
                  kurtosis: results.kurtosis
                }}
                onExport={handleExport}
                interpretation={`
                  The data has a mean of ${results.mean.toFixed(2)} with a standard deviation of ${results.standardDeviation.toFixed(2)}. 
                  ${results.skewness > 0.5 ? 'The distribution is positively skewed (right tail).' : 
                    results.skewness < -0.5 ? 'The distribution is negatively skewed (left tail).' : 
                    'The distribution is approximately symmetric.'} 
                  ${results.kurtosis > 0 ? 'The distribution has heavier tails than normal (leptokurtic).' : 
                    'The distribution has lighter tails than normal (platykurtic).'}
                `}
              />

              <div className="card p-6">
                <h3 className="text-subtitle text-primary mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Data Distribution
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={histogramData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                      <XAxis 
                        dataKey="range" 
                        stroke="#737373" 
                        fontSize={12}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis stroke="#737373" fontSize={12} />
                      <Tooltip 
                        formatter={(value) => [value, 'Frequency']}
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e5e5e5',
                          borderRadius: '8px',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                        }}
                      />
                      <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-subtitle text-primary mb-4">Statistical Interpretation Guide</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-body text-secondary">
                <div>
                  <h4 className="font-medium text-primary mb-2">Measures of Central Tendency</h4>
                  <ul className="space-y-1 text-sm">
                    <li><strong>Mean:</strong> Average value of all data points</li>
                    <li><strong>Median:</strong> Middle value when data is sorted</li>
                    <li><strong>Mode:</strong> Most frequently occurring value(s)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-primary mb-2">Measures of Dispersion</h4>
                  <ul className="space-y-1 text-sm">
                    <li><strong>Range:</strong> Difference between max and min</li>
                    <li><strong>Std Dev:</strong> Average distance from the mean</li>
                    <li><strong>IQR:</strong> Range of the middle 50% of data</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-primary mb-2">Shape Measures</h4>
                  <ul className="space-y-1 text-sm">
                    <li><strong>Skewness:</strong> Asymmetry of distribution</li>
                    <li><strong>Kurtosis:</strong> Tail heaviness compared to normal</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-primary mb-2">Quartiles</h4>
                  <ul className="space-y-1 text-sm">
                    <li><strong>Q1:</strong> 25th percentile</li>
                    <li><strong>Q3:</strong> 75th percentile</li>
                    <li><strong>IQR:</strong> Q3 - Q1 (middle 50%)</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DescriptiveStats;