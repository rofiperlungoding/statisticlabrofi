import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, Calculator, Target, Activity, TestTube, Users, FileText, ScatterChart as Scatter, Layers, Grid, Shield, Clock, Timer, Database, GraduationCap } from 'lucide-react';

const Home: React.FC = () => {
  const projects = [
    {
      id: 'statistical-learning-path',
      title: 'Statistical Learning Path',
      description: 'Interactive practice problems and exercises from beginner to advanced level with step-by-step solutions and progress tracking.',
      icon: GraduationCap,
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
      features: ['Practice exercises', 'Progressive difficulty', 'Interactive solutions']
    },
    {
      id: 'descriptive-stats',
      title: 'Descriptive Statistics Calculator',
      description: 'Calculate comprehensive descriptive statistics including mean, median, mode, standard deviation, and distribution shape measures.',
      icon: BarChart3,
      color: 'bg-blue-500',
      features: ['Central tendency measures', 'Dispersion statistics', 'Distribution analysis']
    },
    {
      id: 'linear-regression',
      title: 'Linear Regression Analysis Tool',
      description: 'Perform linear and polynomial regression analysis with R² calculations, residual analysis, and prediction capabilities.',
      icon: TrendingUp,
      color: 'bg-green-500',
      features: ['Linear & polynomial regression', 'R² scoring', 'Residual analysis']
    },
    {
      id: 'chi-square-test',
      title: 'Chi-Square Test Calculator',
      description: 'Perform chi-square goodness-of-fit tests with observed vs expected frequency comparisons and significance testing.',
      icon: Calculator,
      color: 'bg-purple-500',
      features: ['Goodness-of-fit testing', 'Significance analysis', 'Visual comparisons']
    },
    {
      id: 'anova-calculator',
      title: 'ANOVA Calculator',
      description: 'Conduct one-way Analysis of Variance to compare means across multiple groups with comprehensive F-test statistics.',
      icon: Target,
      color: 'bg-red-500',
      features: ['One-way ANOVA', 'F-statistics', 'Group comparisons']
    },
    {
      id: 'correlation-analysis',
      title: 'Correlation Analysis Tool',
      description: 'Analyze relationships between variables with Pearson correlation matrices, interactive heatmaps, and scatter plots.',
      icon: Activity,
      color: 'bg-orange-500',
      features: ['Correlation matrices', 'Interactive heatmaps', 'Scatter plot analysis']
    },
    {
      id: 'z-score-calculator',
      title: 'Z-Score Calculator',
      description: 'Calculate z-scores for individual values or datasets to identify outliers and standardize data distributions.',
      icon: Target,
      color: 'bg-yellow-500',
      features: ['Individual z-scores', 'Outlier detection', 'Distribution standardization']
    },
    {
      id: 't-test-calculator',
      title: 'T-Test Calculator',
      description: 'Perform one-sample, two-sample, and paired t-tests with comprehensive statistical analysis and visualization.',
      icon: TestTube,
      color: 'bg-teal-500',
      features: ['Multiple t-test types', 'P-value calculations', 'Distribution visualization']
    },
    {
      id: 'confidence-interval',
      title: 'Confidence Interval Calculator',
      description: 'Calculate confidence intervals for population means and proportions with visual distribution displays.',
      icon: Target,
      color: 'bg-indigo-500',
      features: ['Mean & proportion intervals', 'Visual distributions', 'Multiple confidence levels']
    },
    {
      id: 'sample-size-calculator',
      title: 'Sample Size Calculator',
      description: 'Determine required sample sizes for various study types including means, proportions, and group comparisons.',
      icon: Users,
      color: 'bg-emerald-500',
      features: ['Multiple study types', 'Power analysis', 'Sensitivity analysis']
    },
    {
      id: 'csv-explorer',
      title: 'CSV Data Explorer',
      description: 'Upload and explore CSV files with automatic statistics, column detection, data filtering, and visualizations.',
      icon: Database,
      color: 'bg-cyan-500',
      features: ['File upload & parsing', 'Automatic statistics', 'Interactive filtering']
    },
    {
      id: 'ab-test-simulator',
      title: 'A/B Test Simulator',
      description: 'Calculate statistical significance, p-values, confidence intervals, and effect sizes for A/B testing scenarios.',
      icon: TestTube,
      color: 'bg-amber-500',
      features: ['Statistical significance', 'Confidence intervals', 'Effect size calculation']
    },
    {
      id: 'clt-demo',
      title: 'Central Limit Theorem Demo',
      description: 'Visualize how sampling distributions approach normality with animated demonstrations and interactive parameters.',
      icon: BarChart3,
      color: 'bg-violet-500',
      features: ['Interactive animations', 'Multiple distributions', 'Real-time visualization']
    },
    {
      id: 'hypothesis-testing',
      title: 'Hypothesis Testing Visualizer',
      description: 'Interactive tool for visualizing hypothesis tests with critical values, p-values, and distribution comparisons.',
      icon: Target,
      color: 'bg-fuchsia-500',
      features: ['Visual hypothesis tests', 'Critical regions', 'P-value visualization']
    },
    {
      id: 'time-series-forecasting',
      title: 'Time Series Analysis Tool',
      description: 'Analyze and forecast time series data using moving averages, trend analysis, and seasonal decomposition.',
      icon: Clock,
      color: 'bg-slate-500',
      features: ['Trend analysis', 'Forecasting methods', 'Seasonal patterns']
    },
    {
      id: 'clustering-visualizer',
      title: 'Cluster Analysis Application',
      description: 'Visualize K-means clustering with animated cluster formation, optimal cluster selection, and performance metrics.',
      icon: Scatter,
      color: 'bg-rose-500',
      features: ['K-means clustering', 'Animated visualization', 'Cluster validation']
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
        <div className="container-main text-center space-component">
          <div className="animate-fade-in">
            <h1 className="text-display text-primary mb-6">
              Statistical Analysis Suite
            </h1>
            <p className="text-subtitle text-secondary max-w-3xl mx-auto mb-8">
              16 Professional Statistical Applications
            </p>
            <p className="text-body text-muted max-w-2xl mx-auto mb-12">
              Comprehensive collection of statistical tools for data analysis, hypothesis testing, regression analysis, 
              and machine learning. Each application features production-ready functionality with export capabilities, 
              interactive visualizations, and comprehensive statistical accuracy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="#applications" className="btn-primary">
                Explore Applications
              </Link>
              <Link to="/statistical-learning-path" className="btn-secondary">
                Start Learning Path
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Grid */}
      <section id="applications" className="section-padding">
        <div className="container-main space-section">
          <div className="text-center mb-16">
            <h2 className="text-title text-primary mb-4">Statistical Applications</h2>
            <p className="text-body text-secondary max-w-2xl mx-auto">
              Professional-grade statistical tools with comprehensive functionality, data visualization, 
              and export capabilities for research, education, and industry applications.
            </p>
          </div>

          <div className="grid-main">
            {projects.map((project, index) => {
              const IconComponent = project.icon;
              return (
                <Link
                  key={project.id}
                  to={`/${project.id}`}
                  className="card card-hover group animate-slide-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="p-6 space-element">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 ${project.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-subtitle text-primary mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-body text-secondary mb-4">
                      {project.description}
                    </p>
                    
                    <div className="space-y-2">
                      {project.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-caption text-muted">
                          <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-neutral-50 dark:bg-neutral-850">
        <div className="container-narrow text-center space-component">
          <h2 className="text-title text-primary mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-subtitle text-primary mb-2">Interactive Visualizations</h3>
              <p className="text-body text-secondary">
                Dynamic charts, plots, and graphs that respond to your data with real-time updates and interactive controls.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-subtitle text-primary mb-2">Export Capabilities</h3>
              <p className="text-body text-secondary">
                Download results in CSV, PDF, or JSON formats with comprehensive reports and statistical summaries.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-subtitle text-primary mb-2">Statistical Accuracy</h3>
              <p className="text-body text-secondary">
                Industry-standard algorithms and statistical methods with comprehensive validation and error handling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="container-narrow text-center space-component">
          <h2 className="text-title text-primary mb-6">About This Suite</h2>
          <div className="space-element text-body text-secondary">
            <p className="mb-4">
              This comprehensive statistical analysis suite provides 16 professional-grade applications designed for 
              researchers, students, data scientists, and analysts. Each tool implements industry-standard statistical 
              methods with rigorous mathematical accuracy and comprehensive validation.
            </p>
            <p className="mb-4">
              Features include responsive design for all devices, comprehensive data import/export functionality, 
              interactive visualizations, and detailed statistical interpretations. All applications support 
              real-time data processing with immediate visual feedback and results.
            </p>
            <p>
              Built with modern web technologies for optimal performance, cross-browser compatibility, and 
              accessibility standards. Perfect for educational institutions, research organizations, 
              and professional data analysis workflows.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;