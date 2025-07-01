import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CSVExplorer from './pages/projects/CSVExplorer';
import DescriptiveStats from './pages/projects/DescriptiveStats';
import LinearRegression from './pages/projects/LinearRegression';
import ChiSquareTest from './pages/projects/ChiSquareTest';
import ANOVACalculator from './pages/projects/ANOVACalculator';
import CorrelationAnalysis from './pages/projects/CorrelationAnalysis';
import ZScoreCalculator from './pages/projects/ZScoreCalculator';
import TTestCalculator from './pages/projects/TTestCalculator';
import ConfidenceIntervalCalculator from './pages/projects/ConfidenceIntervalCalculator';
import SampleSizeCalculator from './pages/projects/SampleSizeCalculator';
import ABTestSimulator from './pages/projects/ABTestSimulator';
import CLTDemo from './pages/projects/CLTDemo';
import HypothesisTesting from './pages/projects/HypothesisTesting';
import TimeSeriesForecasting from './pages/projects/TimeSeriesForecasting';
import OutlierDetector from './pages/projects/OutlierDetector';
import SurveyAnalyzer from './pages/projects/SurveyAnalyzer';
import ClusteringVisualizer from './pages/projects/ClusteringVisualizer';
import PCAReducer from './pages/projects/PCAReducer';
import ConfusionMatrix from './pages/projects/ConfusionMatrix';
import SamplingBias from './pages/projects/SamplingBias';
import RealTimeDashboard from './pages/projects/RealTimeDashboard';
import StatisticalLearningPath from './pages/projects/StatisticalLearningPath';
import StatisticalCourseModule from './pages/projects/StatisticalCourseModule';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
        <Header />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/csv-explorer" element={<CSVExplorer />} />
            <Route path="/descriptive-stats" element={<DescriptiveStats />} />
            <Route path="/linear-regression" element={<LinearRegression />} />
            <Route path="/chi-square-test" element={<ChiSquareTest />} />
            <Route path="/anova-calculator" element={<ANOVACalculator />} />
            <Route path="/correlation-analysis" element={<CorrelationAnalysis />} />
            <Route path="/z-score-calculator" element={<ZScoreCalculator />} />
            <Route path="/t-test-calculator" element={<TTestCalculator />} />
            <Route path="/confidence-interval" element={<ConfidenceIntervalCalculator />} />
            <Route path="/sample-size-calculator" element={<SampleSizeCalculator />} />
            <Route path="/ab-test-simulator" element={<ABTestSimulator />} />
            <Route path="/clt-demo" element={<CLTDemo />} />
            <Route path="/hypothesis-testing" element={<HypothesisTesting />} />
            <Route path="/time-series-forecasting" element={<TimeSeriesForecasting />} />
            <Route path="/outlier-detector" element={<OutlierDetector />} />
            <Route path="/survey-analyzer" element={<SurveyAnalyzer />} />
            <Route path="/clustering-visualizer" element={<ClusteringVisualizer />} />
            <Route path="/pca-reducer" element={<PCAReducer />} />
            <Route path="/confusion-matrix" element={<ConfusionMatrix />} />
            <Route path="/sampling-bias" element={<SamplingBias />} />
            <Route path="/real-time-dashboard" element={<RealTimeDashboard />} />
            <Route path="/statistical-learning-path" element={<StatisticalLearningPath />} />
            <Route path="/statistical-course-module" element={<StatisticalCourseModule />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;