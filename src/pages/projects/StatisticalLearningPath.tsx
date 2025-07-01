import React, { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, ChevronRight, CheckCircle, Lock, Play, Target, Lightbulb, Trophy, Star, BarChart3, Calculator, Brain, Zap } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  description: string;
  topics: string[];
  practices: string[];
  level: 1 | 2 | 3 | 4 | 5;
  levelName: string;
  color: string;
  icon: React.ComponentType<any>;
  completed: boolean;
  locked: boolean;
  progress: number;
}

interface UserProgress {
  currentLevel: number;
  completedModules: string[];
  totalPoints: number;
  streak: number;
}

const StatisticalLearningPath: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    currentLevel: 1,
    completedModules: [],
    totalPoints: 0,
    streak: 0
  });

  const modules: Module[] = [
    {
      id: 'foundations',
      title: 'Foundations of Statistics',
      description: 'Understand what statistics is and how to describe data.',
      level: 1,
      levelName: 'Beginner',
      color: 'bg-green-500',
      icon: BookOpen,
      topics: [
        'What is Statistics? (Descriptive vs Inferential)',
        'Types of Data (Qualitative vs Quantitative)',
        'Scales: Nominal, Ordinal, Interval, Ratio',
        'Descriptive Statistics (Mean, Median, Mode)',
        'Measures of Spread (Range, Variance, Standard Deviation)',
        'Basic Data Visualization (Bar charts, Histograms)',
        'Introduction to Probability'
      ],
      practices: [
        'Drag-and-drop data type classification',
        'Calculate mean, median, mode by hand',
        'Interpret basic charts and graphs',
        'Simple probability scenarios'
      ],
      completed: false,
      locked: false,
      progress: 0
    },
    {
      id: 'data-analysis',
      title: 'Data Analysis & Testing',
      description: 'Begin statistical reasoning and explore distributions.',
      level: 2,
      levelName: 'Intermediate',
      color: 'bg-blue-500',
      icon: BarChart3,
      topics: [
        'Sampling & Populations',
        'Central Limit Theorem (basic understanding)',
        'Normal Distribution and Properties',
        'Z-scores and Percentiles',
        'Confidence Intervals and Margin of Error',
        'Introduction to Hypothesis Testing',
        'P-values and Statistical Significance',
        'One-sample and Two-sample T-tests',
        'Chi-square Test (Goodness of Fit)'
      ],
      practices: [
        'Interactive normal distribution explorer',
        'Z-score calculator practice',
        'Hypothesis testing scenarios',
        'Confidence interval interpretation'
      ],
      completed: false,
      locked: true,
      progress: 0
    },
    {
      id: 'modeling-regression',
      title: 'Modeling & Regression',
      description: 'Understand how to model relationships between variables.',
      level: 3,
      levelName: 'Advanced',
      color: 'bg-purple-500',
      icon: Target,
      topics: [
        'Correlation vs Causation',
        'Pearson and Spearman Correlation',
        'Scatterplots and Trendlines',
        'Simple Linear Regression',
        'Interpreting Coefficients and R²',
        'Residual Analysis',
        'Multiple Regression Basics',
        'One-way ANOVA',
        'Introduction to Time Series'
      ],
      practices: [
        'Regression analysis on real datasets',
        'Predict outcomes using linear models',
        'ANOVA with multiple groups',
        'Residual pattern recognition'
      ],
      completed: false,
      locked: true,
      progress: 0
    },
    {
      id: 'applied-ml',
      title: 'Applied Statistics & ML',
      description: 'Use stats for real-world prediction and classification.',
      level: 4,
      levelName: 'Proficient',
      color: 'bg-orange-500',
      icon: Brain,
      topics: [
        'Data Cleaning and Preprocessing',
        'Handling Missing Data and Outliers',
        'Feature Engineering Techniques',
        'Logistic Regression for Classification',
        'Model Evaluation Metrics',
        'Confusion Matrix Analysis',
        'K-means Clustering',
        'Overfitting and Cross-validation',
        'Train-Test Split Strategies'
      ],
      practices: [
        'Build a classification model',
        'Evaluate model performance',
        'Apply clustering to segment data',
        'Cross-validation implementation'
      ],
      completed: false,
      locked: true,
      progress: 0
    },
    {
      id: 'experimental-design',
      title: 'Experimental Design & Advanced Inference',
      description: 'Perform professional-level analysis with real-world impact.',
      level: 5,
      levelName: 'Senior',
      color: 'bg-red-500',
      icon: Zap,
      topics: [
        'Randomized Controlled Trials',
        'Experimental Design Principles',
        'Power Analysis and Sample Size',
        'Causal Inference Methods',
        'Introduction to Bayesian Statistics',
        'Multivariate Analysis (PCA, MANOVA)',
        'Ethics in Data Science',
        'Bias and Fairness in Models',
        'Reproducible Research Practices'
      ],
      practices: [
        'Design an A/B test experiment',
        'Causal analysis with DAGs',
        'Bayesian probability calculator',
        'Ethics case study analysis'
      ],
      completed: false,
      locked: true,
      progress: 0
    }
  ];

  const [moduleStates, setModuleStates] = useState<Module[]>(modules);

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('statisticalLearningProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setUserProgress(progress);
      
      // Update module states based on progress
      setModuleStates(prev => prev.map(module => ({
        ...module,
        completed: progress.completedModules.includes(module.id),
        locked: module.level > progress.currentLevel && module.level !== 1,
        progress: progress.completedModules.includes(module.id) ? 100 : 0
      })));
    }
  }, []);

  const completeModule = (moduleId: string) => {
    const module = moduleStates.find(m => m.id === moduleId);
    if (!module) return;

    const newProgress = {
      ...userProgress,
      completedModules: [...userProgress.completedModules, moduleId],
      currentLevel: Math.max(userProgress.currentLevel, module.level + 1),
      totalPoints: userProgress.totalPoints + (module.level * 100),
      streak: userProgress.streak + 1
    };

    setUserProgress(newProgress);
    localStorage.setItem('statisticalLearningProgress', JSON.stringify(newProgress));

    // Update module states
    setModuleStates(prev => prev.map(m => ({
      ...m,
      completed: newProgress.completedModules.includes(m.id),
      locked: m.level > newProgress.currentLevel && m.level !== 1,
      progress: newProgress.completedModules.includes(m.id) ? 100 : 0
    })));
  };

  const resetProgress = () => {
    const resetProgress = {
      currentLevel: 1,
      completedModules: [],
      totalPoints: 0,
      streak: 0
    };
    setUserProgress(resetProgress);
    localStorage.setItem('statisticalLearningProgress', JSON.stringify(resetProgress));
    
    setModuleStates(modules.map(module => ({
      ...module,
      completed: false,
      locked: module.level !== 1,
      progress: 0
    })));
  };

  const getLevelIcon = (level: number) => {
    const icons = [BookOpen, BarChart3, Target, Brain, Zap];
    return icons[level - 1] || BookOpen;
  };

  const getLevelColor = (level: number) => {
    const colors = ['green', 'blue', 'purple', 'orange', 'red'];
    return colors[level - 1] || 'green';
  };

  return (
    <div className="container-main section-padding space-section">
      <div className="text-center mb-12">
        <h1 className="text-title text-primary mb-4 flex items-center justify-center">
          <GraduationCap className="w-8 h-8 mr-3 text-blue-600" />
          Statistical Learning Path
        </h1>
        <p className="text-body text-secondary max-w-2xl mx-auto">
          Master statistics from foundations to advanced concepts through interactive modules, hands-on practice, and real-world applications.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <div className="card p-6 text-center">
          <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <h3 className="text-subtitle text-primary mb-1">Current Level</h3>
          <p className="text-2xl font-bold text-yellow-600">{userProgress.currentLevel}</p>
        </div>
        <div className="card p-6 text-center">
          <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <h3 className="text-subtitle text-primary mb-1">Completed</h3>
          <p className="text-2xl font-bold text-green-600">{userProgress.completedModules.length}/5</p>
        </div>
        <div className="card p-6 text-center">
          <Star className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <h3 className="text-subtitle text-primary mb-1">Points</h3>
          <p className="text-2xl font-bold text-blue-600">{userProgress.totalPoints}</p>
        </div>
        <div className="card p-6 text-center">
          <Lightbulb className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <h3 className="text-subtitle text-primary mb-1">Streak</h3>
          <p className="text-2xl font-bold text-purple-600">{userProgress.streak}</p>
        </div>
      </div>

      {/* Learning Path */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-title text-primary">Learning Modules</h2>
          <button
            onClick={resetProgress}
            className="btn-secondary text-sm"
          >
            Reset Progress
          </button>
        </div>

        <div className="space-y-6">
          {moduleStates.map((module, index) => {
            const IconComponent = module.icon;
            const isSelected = selectedModule === module.id;
            
            return (
              <div key={module.id} className="relative">
                {/* Connection Line */}
                {index < moduleStates.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-12 bg-neutral-200 dark:bg-neutral-700 z-0"></div>
                )}
                
                <div
                  className={`card card-hover relative z-10 transition-all duration-300 ${
                    isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
                  } ${module.locked ? 'opacity-60' : ''}`}
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Level Indicator */}
                      <div className={`w-16 h-16 ${module.color} rounded-full flex items-center justify-center text-white font-bold text-lg relative`}>
                        {module.locked ? (
                          <Lock className="w-6 h-6" />
                        ) : module.completed ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <IconComponent className="w-6 h-6" />
                        )}
                        <div className={`absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center text-xs font-bold ${module.color.replace('bg-', 'text-')}`}>
                          {module.level}
                        </div>
                      </div>

                      {/* Module Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${module.color} text-white`}>
                                Level {module.level}: {module.levelName}
                              </span>
                              {module.completed && (
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                  Completed
                                </span>
                              )}
                            </div>
                            <h3 className="text-subtitle text-primary mb-2">{module.title}</h3>
                            <p className="text-body text-secondary">{module.description}</p>
                          </div>
                          
                          <button
                            onClick={() => setSelectedModule(isSelected ? null : module.id)}
                            disabled={module.locked}
                            className={`p-2 rounded-lg transition-colors ${
                              module.locked 
                                ? 'text-neutral-400 cursor-not-allowed'
                                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                            }`}
                          >
                            <ChevronRight className={`w-5 h-5 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                          </button>
                        </div>

                        {/* Progress Bar */}
                        {!module.locked && (
                          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 mb-3">
                            <div
                              className={`h-2 rounded-full transition-all duration-500 ${module.color}`}
                              style={{ width: `${module.progress}%` }}
                            ></div>
                          </div>
                        )}

                        {/* Action Button */}
                        {!module.locked && (
                          <div className="flex items-center space-x-3">
                            {module.completed ? (
                              <button className="btn-secondary text-sm">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Review Module
                              </button>
                            ) : (
                              <button
                                onClick={() => completeModule(module.id)}
                                className="btn-primary text-sm"
                              >
                                <Play className="w-4 h-4 mr-2" />
                                Start Learning
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isSelected && !module.locked && (
                      <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Topics */}
                          <div>
                            <h4 className="font-medium text-primary mb-3 flex items-center">
                              <BookOpen className="w-4 h-4 mr-2" />
                              Learning Topics
                            </h4>
                            <ul className="space-y-2">
                              {module.topics.map((topic, i) => (
                                <li key={i} className="flex items-start space-x-2 text-sm text-secondary">
                                  <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Practice Exercises */}
                          <div>
                            <h4 className="font-medium text-primary mb-3 flex items-center">
                              <Calculator className="w-4 h-4 mr-2" />
                              Practice Exercises
                            </h4>
                            <ul className="space-y-2">
                              {module.practices.map((practice, i) => (
                                <li key={i} className="flex items-start space-x-2 text-sm text-secondary">
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{practice}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-6 flex flex-wrap gap-3">
                          <button className="btn-secondary text-sm">
                            <Target className="w-4 h-4 mr-2" />
                            Practice Quiz
                          </button>
                          <button className="btn-secondary text-sm">
                            <Lightbulb className="w-4 h-4 mr-2" />
                            Interactive Demo
                          </button>
                          <button className="btn-secondary text-sm">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Study Guide
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Learning Tips */}
      <div className="card p-6 mt-12">
        <h3 className="text-subtitle text-primary mb-4 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
          Learning Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-body text-secondary">
          <div>
            <h4 className="font-medium text-primary mb-2">📚 Study Consistently</h4>
            <p className="text-sm">Dedicate 30-60 minutes daily to maintain momentum and build understanding progressively.</p>
          </div>
          <div>
            <h4 className="font-medium text-primary mb-2">🧠 Practice Actively</h4>
            <p className="text-sm">Don't just read - work through examples, solve problems, and apply concepts to real data.</p>
          </div>
          <div>
            <h4 className="font-medium text-primary mb-2">🔗 Connect Concepts</h4>
            <p className="text-sm">Link new topics to previous knowledge and think about real-world applications.</p>
          </div>
          <div>
            <h4 className="font-medium text-primary mb-2">👥 Join Community</h4>
            <p className="text-sm">Discuss concepts with peers, ask questions, and teach others to reinforce learning.</p>
          </div>
          <div>
            <h4 className="font-medium text-primary mb-2">🔄 Review Regularly</h4>
            <p className="text-sm">Revisit completed modules periodically to strengthen memory and understanding.</p>
          </div>
          <div>
            <h4 className="font-medium text-primary mb-2">🎯 Set Goals</h4>
            <p className="text-sm">Define specific learning objectives and track your progress to stay motivated.</p>
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="card p-6">
        <h3 className="text-subtitle text-primary mb-4">Additional Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-primary mb-3">📖 Recommended Reading</h4>
            <ul className="space-y-2 text-sm text-secondary">
              <li>• "The Art of Statistics" by David Spiegelhalter</li>
              <li>• "Naked Statistics" by Charles Wheelan</li>
              <li>• "Statistics Done Wrong" by Alex Reinhart</li>
              <li>• "The Signal and the Noise" by Nate Silver</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-primary mb-3">🛠️ Practice Tools</h4>
            <ul className="space-y-2 text-sm text-secondary">
              <li>• Interactive calculators for all statistical tests</li>
              <li>• Real datasets for hands-on practice</li>
              <li>• Step-by-step solution walkthroughs</li>
              <li>• Progress tracking and achievement badges</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticalLearningPath;