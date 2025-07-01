# Rofi's StatisticLab 📊

A comprehensive, production-ready statistical analysis suite featuring 16 professional-grade applications for data science, research, and education. Built with modern web technologies and designed for researchers, students, data scientists, and analysts.

![Statistical Analysis Suite](https://img.shields.io/badge/Statistical%20Tools-16-blue)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Features

### Statistical Applications
- **📈 Descriptive Statistics Calculator** - Comprehensive statistical summaries with distribution analysis
- **📊 Linear Regression Analysis Tool** - Linear and polynomial regression with R² calculations and residual analysis
- **🧮 Chi-Square Test Calculator** - Goodness-of-fit testing with visual comparisons
- **🎯 ANOVA Calculator** - One-way Analysis of Variance for comparing multiple groups
- **🔗 Correlation Analysis Tool** - Pearson correlation matrices with interactive heatmaps
- **📏 Z-Score Calculator** - Outlier detection and data standardization
- **🔬 T-Test Calculator** - One-sample, two-sample, and paired t-tests
- **📐 Confidence Interval Calculator** - Population means and proportions with visual distributions
- **👥 Sample Size Calculator** - Power analysis for various study types
- **🗃️ CSV Data Explorer** - Interactive data upload, filtering, and visualization
- **⚗️ A/B Test Simulator** - Statistical significance testing for experiments
- **📚 Central Limit Theorem Demo** - Interactive visualization of sampling distributions
- **🔍 Hypothesis Testing Visualizer** - Comprehensive hypothesis testing with distribution plots
- **⏰ Time Series Analysis Tool** - Forecasting with moving averages and trend analysis
- **🎯 Cluster Analysis Application** - K-means clustering with animated visualizations
- **🎓 Statistical Learning Path** - Interactive practice exercises from beginner to advanced

### Key Capabilities
- **Interactive Visualizations** - Dynamic charts and plots using Recharts
- **Real-time Data Processing** - Immediate calculations and visual feedback
- **Export Functionality** - Download results in CSV, PDF, and JSON formats
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Dark Mode Support** - Complete light/dark theme system
- **Educational Content** - Step-by-step explanations and learning materials
- **Production-Ready** - Industry-standard algorithms with comprehensive validation

## 🚀 Quick Start

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/statisticlab-rofi.git
   cd statisticlab-rofi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to access the application.

### Build for Production
```bash
npm run build
npm run preview
```

## 🛠️ Technologies Used

### Frontend Framework
- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript 5.5.3** - Type-safe development with full IntelliSense
- **Vite 5.4.2** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS 3.4.1** - Utility-first CSS framework with custom design system
- **Lucide React** - Beautiful, customizable SVG icons
- **Custom CSS Variables** - Consistent spacing, typography, and color systems

### Data Visualization
- **Recharts 2.8.0** - Composable charting library built on React components
- **D3 Scale & Interpolate** - Advanced data transformation and color interpolation

### Data Processing
- **Papa Parse 5.4.1** - Fast, in-browser CSV parsing
- **Lodash 4.17.21** - Utility functions for data manipulation
- **Custom Statistics Library** - Comprehensive statistical functions and algorithms

### Routing & Navigation
- **React Router DOM 6.26.0** - Declarative routing for React applications

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DataInput.tsx    # Data input with file upload
│   ├── DataTable.tsx    # Paginated data tables
│   ├── FileUpload.tsx   # Drag-and-drop file upload
│   ├── Header.tsx       # Navigation header
│   ├── ResultDisplay.tsx # Statistical results display
│   └── StatsSummary.tsx # Data overview statistics
├── pages/
│   ├── Home.tsx         # Landing page
│   └── projects/        # Statistical applications
│       ├── DescriptiveStats.tsx
│       ├── LinearRegression.tsx
│       ├── ChiSquareTest.tsx
│       ├── ANOVACalculator.tsx
│       └── ... (12 more applications)
├── utils/
│   └── statistics.ts    # Core statistical functions
├── index.css           # Global styles and design system
└── App.tsx             # Main application component
```

## 🧮 Statistical Functions Library

The application includes a comprehensive statistics library with implementations for:

- **Descriptive Statistics**: Mean, median, mode, variance, standard deviation, quartiles, skewness, kurtosis
- **Probability Distributions**: Normal, t-distribution, chi-square, F-distribution
- **Hypothesis Testing**: t-tests, ANOVA, chi-square tests with p-value calculations
- **Regression Analysis**: Linear regression, correlation coefficients, R² calculations
- **Advanced Methods**: Clustering algorithms, time series analysis, confidence intervals
- **Data Export**: CSV, PDF, and JSON export functionality

## 🎯 Usage Examples

### Descriptive Statistics
```typescript
import { calculateDescriptiveStats } from './utils/statistics';

const data = [12, 15, 18, 20, 22, 25, 28, 30];
const stats = calculateDescriptiveStats(data);
// Returns: mean, median, mode, std deviation, quartiles, etc.
```

### Linear Regression
```typescript
import { linearRegression } from './utils/statistics';

const x = [1, 2, 3, 4, 5];
const y = [2, 4, 5, 4, 5];
const result = linearRegression(x, y);
// Returns: slope, intercept, r-squared, correlation
```

### Hypothesis Testing
```typescript
import { oneSampleTTest } from './utils/statistics';

const sampleData = [23, 25, 22, 24, 26, 23, 25];
const populationMean = 20;
const result = oneSampleTTest(sampleData, populationMean);
// Returns: t-statistic, p-value, degrees of freedom
```

## 🎨 Design System

The application features a comprehensive design system with:

- **Typography Scale**: Display, title, subtitle, body, and caption sizes
- **Color Palette**: Neutral grays with semantic colors for success, warning, and error states
- **Spacing System**: Consistent 8px-based spacing throughout the interface
- **Component Library**: Reusable buttons, cards, inputs, and navigation elements
- **Responsive Breakpoints**: Mobile-first design with tablet, desktop, and ultrawide support

## 🔧 Development

### Code Style
- **ESLint Configuration**: Strict TypeScript and React rules
- **Prettier Integration**: Consistent code formatting
- **Component Architecture**: Modular, reusable components with clear separation of concerns
- **Type Safety**: Full TypeScript coverage with proper interfaces and type definitions

### Testing
The statistical functions include comprehensive validation and error handling:
- Input validation for all statistical methods
- Boundary condition testing
- Mathematical accuracy verification
- Cross-browser compatibility testing

## 🤝 Contributing

We welcome contributions to improve the Statistical Analysis Suite! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Contribution Guidelines
- Follow the existing code style and conventions
- Add appropriate TypeScript types for new functions
- Include comprehensive error handling
- Update documentation for new features
- Test statistical accuracy for mathematical functions

## 📊 Statistical Accuracy

All statistical calculations are implemented using industry-standard algorithms:
- **Numerical Stability**: Careful handling of floating-point arithmetic
- **Algorithm Selection**: Appropriate methods for different data types and sample sizes
- **Validation**: Cross-checked against established statistical software
- **Error Handling**: Graceful handling of edge cases and invalid inputs

## 🌟 Roadmap

### Upcoming Features
- **Machine Learning Tools**: Implement classification and prediction algorithms
- **Advanced Visualizations**: 3D plots and interactive data exploration
- **Collaborative Features**: Share analyses and results with team members
- **API Integration**: Connect with external data sources and databases
- **Mobile App**: Native mobile application for iOS and Android

### Enhancements
- **More Statistical Tests**: Implement additional hypothesis tests and non-parametric methods
- **Advanced Time Series**: ARIMA modeling and seasonal decomposition
- **Bayesian Analysis**: Bayesian inference and credible intervals
- **Survival Analysis**: Kaplan-Meier curves and Cox regression

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Statistical Algorithms**: Based on established statistical literature and peer-reviewed methods
- **Design Inspiration**: Modern data science tools and educational platforms
- **Open Source Libraries**: React ecosystem and the amazing open-source community
- **Educational Resources**: Statistical textbooks and online learning materials

---

## 📧 Contact

For questions, suggestions, or collaboration opportunities:

- **Project Maintainer**: Rofi Darmawan
- **Email**: opikopi32@gmail.com
- **LinkedIn**: rofiperlungoding
- **Twitter**: x.com/opikopi6

---

**Built with ❤️ for the data science and statistics community**

*Empowering researchers, students, and analysts with professional-grade statistical tools in an accessible, modern interface.*