import React, { useState } from 'react';
import { BookOpen, ChevronRight, ChevronDown, Play, CheckCircle, Clock, Users, Target, Lightbulb, Brain, TrendingUp, BarChart3, Calculator, TestTube, Activity, Database, Award, Star, Zap } from 'lucide-react';

const StatisticalCourseModule: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [activeChapter, setActiveChapter] = useState<string>('chapter1');
  const [completedSections, setCompletedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const markAsCompleted = (sectionId: string) => {
    setCompletedSections(prev => ({
      ...prev,
      [sectionId]: true
    }));
  };

  const levels = [
    {
      id: 'level1',
      title: 'LEVEL 1: BEGINNER',
      subtitle: 'Foundations',
      duration: '4-6 weeks',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-600',
      description: 'Build your statistical foundation with essential concepts'
    },
    {
      id: 'level2',
      title: 'LEVEL 2: INTERMEDIATE', 
      subtitle: 'Applied Statistics',
      duration: '6-8 weeks',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-600',
      description: 'Apply statistical methods to real-world problems'
    },
    {
      id: 'level3',
      title: 'LEVEL 3: PROFESSIONAL',
      subtitle: 'Advanced Methods',
      duration: '8-10 weeks',
      icon: Calculator,
      color: 'from-purple-500 to-violet-600',
      description: 'Master advanced statistical techniques and analysis'
    },
    {
      id: 'level4',
      title: 'LEVEL 4: EXPERT',
      subtitle: 'Specialized Applications',
      duration: '10-12 weeks',
      icon: Brain,
      color: 'from-red-500 to-pink-600',
      description: 'Explore cutting-edge statistical applications'
    },
    {
      id: 'level5',
      title: 'LEVEL 5: SENIOR',
      subtitle: 'Research and Innovation',
      duration: '12-16 weeks',
      icon: Award,
      color: 'from-yellow-500 to-orange-600',
      description: 'Lead statistical research and innovation'
    }
  ];

  return (
    <div className="container-main section-padding space-section">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-display text-primary mb-6">Complete Statistics Course</h1>
        <p className="text-subtitle text-secondary max-w-3xl mx-auto mb-8">
          Journey from Statistical Novice to Data Science Master
        </p>
        <p className="text-body text-muted max-w-2xl mx-auto">
          A comprehensive, progressive curriculum that transforms beginners into statistical experts through 
          hands-on learning, real-world applications, and cutting-edge methodologies.
        </p>
      </div>

      {/* Course Overview */}
      <div className="card p-8 mb-12">
        <h2 className="text-title text-primary mb-6 flex items-center">
          <Star className="w-6 h-6 mr-3 text-yellow-500" />
          Course Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-subtitle text-primary mb-2">24 Chapters</h3>
            <p className="text-body text-secondary">Comprehensive curriculum covering all aspects of statistics</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-subtitle text-primary mb-2">40-52 Weeks</h3>
            <p className="text-body text-secondary">Self-paced learning with structured progression</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-subtitle text-primary mb-2">5 Levels</h3>
            <p className="text-body text-secondary">Progressive difficulty from beginner to expert</p>
          </div>
        </div>
        <p className="text-body text-secondary leading-relaxed">
          This transformative journey takes learners from basic statistical concepts to advanced research methodology. 
          Each level builds upon previous knowledge while introducing increasingly sophisticated techniques and applications, 
          ensuring mastery at every stage.
        </p>
      </div>

      {/* Level Overview */}
      <div className="mb-12">
        <h2 className="text-title text-primary mb-8">Learning Path</h2>
        <div className="space-y-6">
          {levels.map((level, index) => {
            const IconComponent = level.icon;
            return (
              <div key={level.id} className="card hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${level.color} rounded-xl flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-subtitle text-primary">{level.title}</h3>
                        <p className="text-body text-secondary">{level.subtitle} • {level.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-neutral-400">
                      <span className="text-sm">{index + 1}/5</span>
                    </div>
                  </div>
                  <p className="text-body text-muted mt-4">{level.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chapter 1: Introduction to Statistics */}
      <div className="card mb-8">
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-title text-primary">Chapter 1: Introduction to Statistics</h2>
                <p className="text-body text-secondary">Discover the hidden language of data</p>
              </div>
            </div>
            <button
              onClick={() => toggleSection('chapter1')}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {expandedSections['chapter1'] ? 
                <ChevronDown className="w-5 h-5" /> : 
                <ChevronRight className="w-5 h-5" />
              }
            </button>
          </div>
        </div>

        {expandedSections['chapter1'] && (
          <div className="p-6 space-y-8">
            {/* What is Statistics? */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-6 h-6 text-yellow-500" />
                <h3 className="text-subtitle text-primary">What is Statistics?</h3>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="space-y-4">
                  <p className="text-body text-primary leading-relaxed">
                    🌟 <strong>Statistics is the art and science of transforming chaos into clarity.</strong> Imagine you're a detective in a world drowning in data—every click, every purchase, every heartbeat generates numbers that tell stories. Statistics is your magnifying glass, your decoder ring, your secret weapon for uncovering the hidden truths that numbers whisper.
                  </p>
                  
                  <p className="text-body text-secondary leading-relaxed">
                    At its core, statistics is the <em>magical bridge</em> between raw, messy data and actionable insights that change the world. It's the difference between seeing a pile of leaves and recognizing the entire forest. When Netflix recommends your next binge-watch, when doctors predict treatment outcomes, when meteorologists forecast tomorrow's weather—that's the invisible hand of statistics weaving patterns from seemingly random threads.
                  </p>

                  <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border-l-4 border-emerald-500">
                    <p className="text-body text-primary font-medium">
                      💡 <strong>Definition:</strong> Statistics is the discipline that transforms data into wisdom, uncertainty into confidence, and questions into answers through the systematic collection, analysis, interpretation, and presentation of numerical information.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl">
                  <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    The Science of Discovery
                  </h4>
                  <p className="text-body text-green-700 dark:text-green-300">
                    Statistics reveals the <strong>invisible architecture</strong> of our world. Like an archaeologist uncovering ancient civilizations, statisticians excavate meaningful patterns from the sediment of data, revealing stories that numbers are desperate to tell.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-6 rounded-xl">
                  <h4 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3 flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    The Art of Understanding
                  </h4>
                  <p className="text-body text-purple-700 dark:text-purple-300">
                    Beyond mere calculation lies the <strong>artistry of interpretation</strong>. Statistics teaches us to listen to data's symphony, to hear the harmonies of correlation and the dissonance of outliers, painting pictures with numbers that speak to the soul.
                  </p>
                </div>
              </div>
            </div>

            {/* Why Statistics Matters */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-6 h-6 text-blue-500" />
                <h3 className="text-subtitle text-primary">Why Statistics Matters in Our Daily Lives</h3>
              </div>

              <div className="space-y-4">
                <p className="text-body text-secondary leading-relaxed">
                  Statistics isn't trapped in ivory towers or buried in academic journals—it's the <strong>heartbeat of modern life</strong>, pulsing through every decision, every breakthrough, every moment of understanding. From the coffee shop that perfectly predicts morning rush orders to the medical researcher discovering life-saving treatments, statistics is the invisible force shaping our reality.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center mb-2">
                      <Activity className="w-4 h-4 text-red-600 mr-2" />
                      <h5 className="font-semibold text-red-800 dark:text-red-200">Healthcare Revolution</h5>
                    </div>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      Clinical trials that save millions of lives, personalized medicine that treats YOU specifically, epidemic tracking that prevents pandemics—statistics literally keeps humanity healthy.
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center mb-2">
                      <Database className="w-4 h-4 text-blue-600 mr-2" />
                      <h5 className="font-semibold text-blue-800 dark:text-blue-200">Business Intelligence</h5>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Every successful company is a statistics powerhouse—predicting customer behavior, optimizing supply chains, maximizing profits through data-driven decisions.
                    </p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center mb-2">
                      <Target className="w-4 h-4 text-green-600 mr-2" />
                      <h5 className="font-semibold text-green-800 dark:text-green-200">Personal Empowerment</h5>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Understanding statistics makes you immune to misleading headlines, empowers better financial decisions, and helps you navigate an increasingly data-driven world.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-World Example */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
              <h4 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                🌟 Statistics in Action: The Netflix Phenomenon
              </h4>
              <p className="text-body text-orange-700 dark:text-orange-300 mb-4">
                Ever wonder how Netflix seems to read your mind? Behind every "You might also like..." recommendation lies a statistical symphony orchestrating your viewing experience.
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    <strong>Data Collection:</strong> Every pause, rewind, and skip creates data points—millions of digital breadcrumbs revealing your preferences.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    <strong>Pattern Recognition:</strong> Algorithms discover that people who love sci-fi thrillers also enjoy time-travel documentaries—connections invisible to the human eye.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    <strong>Predictive Magic:</strong> Statistical models predict with 80% accuracy what you'll want to watch next, turning data into entertainment gold.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Elements */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
              <h4 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-4 flex items-center">
                <TestTube className="w-5 h-5 mr-2" />
                🧪 Try This: Statistical Thinking Challenge
              </h4>
              <p className="text-body text-purple-700 dark:text-purple-300 mb-4">
                Your local coffee shop serves 200 customers daily. On Monday, they sold 180 cups of coffee. Is this good or bad?
              </p>
              <div className="space-y-2">
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  <strong>🤔 Think like a statistician:</strong> What additional information would you need? Historical data? Weather conditions? Seasonal trends? Special events?
                </p>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  <strong>📊 The statistical insight:</strong> A single number tells us nothing—it's the context, comparisons, and patterns that reveal the story hidden in the data.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-neutral-200 dark:border-neutral-700">
              <button
                onClick={() => markAsCompleted('what-is-statistics')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  completedSections['what-is-statistics']
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700'
                }`}
              >
                <CheckCircle className={`w-4 h-4 ${completedSections['what-is-statistics'] ? 'text-green-600' : 'text-neutral-400'}`} />
                <span>{completedSections['what-is-statistics'] ? 'Completed' : 'Mark as Complete'}</span>
              </button>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-neutral-500">5-10 min read</span>
                <button className="btn-primary flex items-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>Continue Learning</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Progress Tracking */}
      <div className="card p-6">
        <h3 className="text-subtitle text-primary mb-4">Your Progress</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-body text-secondary">Overall Course Progress</span>
            <span className="text-body text-primary font-semibold">1%</span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300" style={{ width: '1%' }}></div>
          </div>
          <div className="flex items-center justify-between text-sm text-neutral-500">
            <span>1 of 24 chapters started</span>
            <span>Estimated time remaining: 40-52 weeks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticalCourseModule;