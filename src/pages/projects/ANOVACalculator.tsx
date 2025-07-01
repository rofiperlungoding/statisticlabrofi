import React, { useState } from 'react';
import { BarChart3, Users, Calculator } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BoxPlot } from 'recharts';
import DataInput from '../../components/DataInput';
import ResultDisplay from '../../components/ResultDisplay';
import { oneWayANOVA, calculateMean, calculateStandardDeviation, exportToCSV, exportToPDF } from '../../utils/statistics';

const ANOVACalculator: React.FC = () => {
  const [anovaType, setAnovaType] = useState<'one-way' | 'two-way'>('one-way');
  const [groupData, setGroupData] = useState<{ [key: string]: number[] }>({});
  const [groupNames, setGroupNames] = useState<string>('Group 1, Group 2, Group 3');
  const [results, setResults] = useState<any>(null);

  const handleGroupDataChange = (groupIndex: number, data: number[]) => {
    const names = groupNames.split(',').map(name => name.trim());
    const groupName = names[groupIndex] || `Group ${groupIndex + 1}`;
    
    setGroupData(prev => ({
      ...prev,
      [groupName]: data
    }));
  };

  const performANOVA = () => {
    const groups = Object.values(groupData).filter(group => group.length > 0);
    
    if (groups.length < 2) {
      alert('Please enter data for at least 2 groups');
      return;
    }

    if (groups.some(group => group.length < 2)) {
      alert('Each group must have at least 2 observations');
      return;
    }

    const result = oneWayANOVA(groups);
    
    // Calculate additional statistics
    const allData = groups.flat();
    const groupStats = groups.map((group, i) => {
      const names = groupNames.split(',').map(name => name.trim());
      return {
        name: names[i] || `Group ${i + 1}`,
        n: group.length,
        mean: calculateMean(group),
        std: calculateStandardDeviation(group),
        data: group
      };
    });

    const grandMean = calculateMean(allData);
    const totalN = allData.length;
    const k = groups.length;

    // Calculate sum of squares
    const ssBetween = groupStats.reduce((sum, group) => {
      return sum + group.n * Math.pow(group.mean - grandMean, 2);
    }, 0);

    const ssWithin = groups.reduce((sum, group) => {
      const groupMean = calculateMean(group);
      return sum + group.reduce((groupSum, val) => groupSum + Math.pow(val - groupMean, 2), 0);
    }, 0);

    const ssTotal = ssBetween + ssWithin;
    const dfBetween = k - 1;
    const dfWithin = totalN - k;
    const msBetween = ssBetween / dfBetween;
    const msWithin = ssWithin / dfWithin;

    setResults({
      ...result,
      groupStats,
      ssBetween,
      ssWithin,
      ssTotal,
      dfBetween,
      dfWithin,
      dfTotal: totalN - 1,
      msBetween,
      msWithin,
      grandMean,
      totalN,
      k,
      isSignificant: result.pValue! < 0.05
    });
  };

  const createVisualizationData = () => {
    if (!results) return [];

    return results.groupStats.map((group: any) => ({
      group: group.name,
      mean: group.mean,
      std: group.std,
      n: group.n,
      min: Math.min(...group.data),
      max: Math.max(...group.data),
      q1: group.data.sort((a: number, b: number) => a - b)[Math.floor(group.data.length * 0.25)],
      q3: group.data.sort((a: number, b: number) => a - b)[Math.floor(group.data.length * 0.75)]
    }));
  };

  const chartData = createVisualizationData();

  const handleExport = (format: 'csv' | 'pdf' | 'json') => {
    if (!results) return;

    const timestamp = new Date().toISOString().split('T')[0];
    
    switch (format) {
      case 'csv':
        const csvData = results.groupStats.flatMap((group: any) => 
          group.data.map((value: number) => ({
            group: group.name,
            value: value
          }))
        );
        exportToCSV(csvData, `anova-data-${timestamp}.csv`);
        break;
        
      case 'pdf':
        const reportContent = `
ONE-WAY ANOVA REPORT
Generated: ${new Date().toLocaleDateString()}

HYPOTHESIS:
H₀: All group means are equal (μ₁ = μ₂ = μ₃ = ...)
H₁: At least one group mean is different

TEST STATISTICS:
F-statistic: ${results.testStatistic.toFixed(4)}
Degrees of freedom: ${results.dfBetween}, ${results.dfWithin}
P-value: ${results.pValue.toFixed(6)}

ANOVA TABLE:
Source          SS          df          MS          F
Between     ${results.ssBetween.toFixed(4)}     ${results.dfBetween}      ${results.msBetween.toFixed(4)}     ${results.testStatistic.toFixed(4)}
Within      ${results.ssWithin.toFixed(4)}    ${results.dfWithin}     ${results.msWithin.toFixed(4)}
Total       ${results.ssTotal.toFixed(4)}     ${results.dfTotal}

CONCLUSION:
${results.isSignificant ? 'SIGNIFICANT' : 'NOT SIGNIFICANT'}
${results.interpretation}

GROUP STATISTICS:
${results.groupStats.map((group: any) => 
  `${group.name}: n=${group.n}, Mean=${group.mean.toFixed(4)}, SD=${group.std.toFixed(4)}`
).join('\n')}
        `;
        exportToPDF(reportContent, `anova-report-${timestamp}.pdf`);
        break;
    }
  };

  const groupNamesList = groupNames.split(',').map(name => name.trim());

  return (
    <div className="container-main section-padding space-section">
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4">ANOVA Calculator</h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Perform one-way Analysis of Variance to compare means across multiple groups.
        </p>
      </div>

      <div className="space-section">
        {/* ANOVA Type Selection */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-4">ANOVA Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setAnovaType('one-way')}
              className={`p-4 rounded-lg border text-left ${
                anovaType === 'one-way' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              <BarChart3 className="w-6 h-6 text-blue-500 mb-2" />
              <h4 className="font-medium text-primary mb-2">One-Way ANOVA</h4>
              <p className="text-sm text-secondary">Compare means of 2+ groups with one independent variable</p>
            </button>
            <button
              onClick={() => setAnovaType('two-way')}
              className={`p-4 rounded-lg border text-left opacity-50 cursor-not-allowed ${
                anovaType === 'two-way' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-neutral-200 dark:border-neutral-700'
              }`}
              disabled
            >
              <Users className="w-6 h-6 text-green-500 mb-2" />
              <h4 className="font-medium text-primary mb-2">Two-Way ANOVA</h4>
              <p className="text-sm text-secondary">Coming soon - analyze two independent variables</p>
            </button>
          </div>
        </div>

        {/* Group Names */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-4">Group Names</h3>
          <input
            type="text"
            value={groupNames}
            onChange={(e) => setGroupNames(e.target.value)}
            className="input"
            placeholder="Group 1, Group 2, Group 3, ..."
          />
          <p className="text-xs text-neutral-500 mt-1">Separate group names with commas</p>
        </div>

        {/* Data Input for Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groupNamesList.slice(0, 5).map((groupName, index) => (
            <DataInput
              key={index}
              onDataSubmit={(data) => handleGroupDataChange(index, data)}
              label={`${groupName} Data`}
              placeholder="Enter values for this group"
              validation={(data) => {
                if (data.length < 2) return 'Please enter at least 2 values per group';
                return null;
              }}
            />
          ))}
        </div>

        {/* Perform ANOVA Button */}
        <div className="text-center">
          <button
            onClick={performANOVA}
            className="btn-primary"
            disabled={Object.keys(groupData).length < 2}
          >
            <Calculator className="w-4 h-4 mr-2" />
            Perform ANOVA Analysis
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResultDisplay
              title="ANOVA Results"
              results={{
                fStatistic: results.testStatistic,
                pValue: results.pValue,
                dfBetween: results.dfBetween,
                dfWithin: results.dfWithin,
                ssBetween: results.ssBetween,
                ssWithin: results.ssWithin,
                ssTotal: results.ssTotal,
                msBetween: results.msBetween,
                msWithin: results.msWithin,
                significance: results.isSignificant ? 'Significant' : 'Not Significant'
              }}
              interpretation={results.interpretation}
              onExport={handleExport}
            />

            <div className="card p-6">
              <h3 className="text-subtitle text-primary mb-4">ANOVA Summary</h3>
              <div className="space-y-4">
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
                    {results.isSignificant 
                      ? 'At least one group mean is significantly different' 
                      : 'No significant differences between group means'
                    }
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg">
                    <h4 className="font-medium text-neutral-900 dark:text-white mb-1">F-Statistic</h4>
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

        {/* Group Statistics */}
        {results && (
          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4">Group Statistics</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-700">
                    <th className="text-left py-2 px-3 font-medium text-neutral-900 dark:text-white">Group</th>
                    <th className="text-left py-2 px-3 font-medium text-neutral-900 dark:text-white">N</th>
                    <th className="text-left py-2 px-3 font-medium text-neutral-900 dark:text-white">Mean</th>
                    <th className="text-left py-2 px-3 font-medium text-neutral-900 dark:text-white">Std Dev</th>
                    <th className="text-left py-2 px-3 font-medium text-neutral-900 dark:text-white">Min</th>
                    <th className="text-left py-2 px-3 font-medium text-neutral-900 dark:text-white">Max</th>
                  </tr>
                </thead>
                <tbody>
                  {results.groupStats.map((group: any, index: number) => (
                    <tr key={index} className="border-b border-neutral-100 dark:border-neutral-800">
                      <td className="py-2 px-3 font-medium text-neutral-900 dark:text-white">{group.name}</td>
                      <td className="py-2 px-3 text-neutral-700 dark:text-neutral-300">{group.n}</td>
                      <td className="py-2 px-3 text-neutral-700 dark:text-neutral-300">{group.mean.toFixed(3)}</td>
                      <td className="py-2 px-3 text-neutral-700 dark:text-neutral-300">{group.std.toFixed(3)}</td>
                      <td className="py-2 px-3 text-neutral-700 dark:text-neutral-300">{Math.min(...group.data).toFixed(3)}</td>
                      <td className="py-2 px-3 text-neutral-700 dark:text-neutral-300">{Math.max(...group.data).toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Visualization */}
        {results && (
          <div className="card p-6">
            <h3 className="text-subtitle text-primary mb-4">Group Means Comparison</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis 
                    dataKey="group" 
                    stroke="#737373" 
                    fontSize={12}
                  />
                  <YAxis stroke="#737373" fontSize={12} />
                  <Tooltip 
                    formatter={(value, name) => [
                      typeof value === 'number' ? value.toFixed(3) : value, 
                      name === 'mean' ? 'Mean' : name
                    ]}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                    }}
                  />
                  <Bar dataKey="mean" fill="#3b82f6" name="Group Mean" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Guide */}
        <div className="card p-6">
          <h3 className="text-subtitle text-primary mb-4">ANOVA Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-body text-secondary">
            <div>
              <h4 className="font-medium text-primary mb-2">When to Use ANOVA</h4>
              <ul className="space-y-1 text-sm">
                <li>• Compare means of 3 or more groups</li>
                <li>• One continuous dependent variable</li>
                <li>• One or more categorical independent variables</li>
                <li>• Alternative to multiple t-tests</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Assumptions</h4>
              <ul className="space-y-1 text-sm">
                <li>• Independence of observations</li>
                <li>• Normal distribution within groups</li>
                <li>• Homogeneity of variances (equal variances)</li>
                <li>• Random sampling</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ANOVACalculator;