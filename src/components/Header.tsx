import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BarChart3, Menu, X, Sun, Moon, ArrowLeft } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleNavClick = (href: string, sectionId?: string) => {
    if (sectionId) {
      if (location.pathname === '/') {
        // Already on home page, just scroll
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to home first, then scroll
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      navigate(href);
    }
    setIsMenuOpen(false);
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Applications', href: '/#applications', sectionId: 'applications' },
    { name: 'About', href: '/#about', sectionId: 'about' },
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Statistical Analysis Suite';
    
    const titles: { [key: string]: string } = {
      '/csv-explorer': 'CSV Data Explorer',
      '/descriptive-stats': 'Descriptive Statistics Calculator',
      '/linear-regression': 'Linear Regression Analysis Tool',
      '/chi-square-test': 'Chi-Square Test Calculator',
      '/anova-calculator': 'ANOVA Calculator',
      '/correlation-analysis': 'Correlation Analysis Tool',
      '/z-score-calculator': 'Z-Score Calculator',
      '/t-test-calculator': 'T-Test Calculator',
      '/confidence-interval': 'Confidence Interval Calculator',
      '/sample-size-calculator': 'Sample Size Calculator',
      '/ab-test-simulator': 'A/B Test Simulator',
      '/clt-demo': 'Central Limit Theorem Demo',
      '/hypothesis-testing': 'Hypothesis Testing Visualizer',
      '/time-series-forecasting': 'Time Series Analysis Tool',
      '/outlier-detector': 'Outlier Detector',
      '/survey-analyzer': 'Survey Analyzer',
      '/clustering-visualizer': 'Cluster Analysis Application',
      '/pca-reducer': 'PCA Dimensionality Reducer',
      '/confusion-matrix': 'Confusion Matrix Builder',
      '/sampling-bias': 'Sampling Bias Simulator',
      '/real-time-dashboard': 'Real-Time Dashboard',
    };
    
    return titles[path] || 'Statistical Analysis Suite';
  };

  const isHomePage = location.pathname === '/';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-700">
      <div className="container-main">
        <div className="grid grid-cols-3 items-center h-16">
          {/* Back Button and Logo - Left */}
          <div className="flex items-center space-x-3">
            {!isHomePage && (
              <button
                onClick={() => navigate('/')}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                title="Back to home"
              >
                <ArrowLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              </button>
            )}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-title text-primary">{getPageTitle()}</h1>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center justify-center">
            <div className="flex items-center space-x-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href, item.sectionId)}
                  className={`nav-item ${
                    (location.pathname === '/' && item.sectionId) || location.pathname === item.href
                      ? 'nav-item-active'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </nav>

          {/* Actions - Right */}
          <div className="flex items-center justify-end space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              ) : (
                <Moon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              ) : (
                <Menu className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200 dark:border-neutral-700">
            <nav className="space-y-2">
              {!isHomePage && (
                <button
                  onClick={() => {
                    navigate('/');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 nav-item w-full text-left text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>
              )}
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href, item.sectionId)}
                  className={`block nav-item w-full text-left ${
                    (location.pathname === '/' && item.sectionId) || location.pathname === item.href
                      ? 'nav-item-active'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;