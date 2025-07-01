import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, ArrowLeft } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleNavClick = (href: string, sectionId?: string) => {
    if (sectionId) {
      if (location.pathname === '/') {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
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
    { name: 'Practice', href: '/statistical-learning-path' },
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
      '/statistical-learning-path': 'Statistical Learning Path',
    };
    
    return titles[path] || 'Statistical Analysis Suite';
  };

  const getActiveIndex = () => {
    const path = location.pathname;
    const hash = location.hash;
    
    // Check for specific hash sections on home page
    if (path === '/' && hash === '#applications') return 2;
    if (path === '/' && hash === '#about') return 3;
    
    // Check for direct paths
    if (path === '/') return 0;
    if (path === '/statistical-learning-path') return 1;
    
    // Default to home for other pages
    return 0;
  };

  // Update slider position when location or hash changes
  useEffect(() => {
    if (navRef.current) {
      const activeIndex = getActiveIndex();
      const buttons = navRef.current.querySelectorAll('button');
      const activeButton = buttons[activeIndex];
      
      if (activeButton) {
        const navRect = navRef.current.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        
        setSliderStyle({
          left: buttonRect.left - navRect.left,
          width: buttonRect.width
        });
      }
    }
  }, [location.pathname, location.hash]); // Added location.hash to dependencies

  // Listen for hash changes to update slider position
  useEffect(() => {
    const handleHashChange = () => {
      // Force a re-render to update the slider position
      if (navRef.current) {
        const activeIndex = getActiveIndex();
        const buttons = navRef.current.querySelectorAll('button');
        const activeButton = buttons[activeIndex];
        
        if (activeButton) {
          const navRect = navRef.current.getBoundingClientRect();
          const buttonRect = activeButton.getBoundingClientRect();
          
          setSliderStyle({
            left: buttonRect.left - navRect.left,
            width: buttonRect.width
          });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
              <div className="w-8 h-8 flex items-center justify-center">
                <img 
                  src="/R.png" 
                  alt="Rofi's StatisticLab Logo" 
                  className="w-8 h-8 object-contain filter dark:brightness-0 dark:invert transition-all duration-200"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg lg:text-xl font-medium text-primary">{getPageTitle()}</h1>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Slider - Center */}
          <nav className="hidden md:flex items-center justify-center">
            <div 
              ref={navRef}
              className="relative flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-full p-1 shadow-inner"
            >
              {/* Sliding background */}
              <div
                className="absolute top-1 bottom-1 bg-white dark:bg-neutral-700 rounded-full shadow-sm transition-all duration-300 ease-out"
                style={{
                  left: `${sliderStyle.left}px`,
                  width: `${sliderStyle.width}px`,
                }}
              />
              
              {/* Navigation buttons */}
              {navigation.map((item, index) => {
                const isActive = getActiveIndex() === index;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href, item.sectionId)}
                    className={`relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                      isActive
                        ? 'text-neutral-900 dark:text-white'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
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
              {navigation.map((item, index) => {
                const isActive = getActiveIndex() === index;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href, item.sectionId)}
                    className={`block nav-item w-full text-left ${
                      isActive
                        ? 'nav-item-active'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;