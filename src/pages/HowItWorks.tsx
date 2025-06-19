
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, BarChart3, Calculator, Target, Lightbulb } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: 'Enter Stock Symbols',
      description: 'Input the stock symbols you want to include in your portfolio (e.g., AAPL, GOOGL, MSFT)',
      icon: TrendingUp
    },
    {
      number: 2,
      title: 'Set Time Range',
      description: 'Choose the historical data period (1-10 years) for analysis',
      icon: BarChart3
    },
    {
      number: 3,
      title: 'Adjust Risk Tolerance',
      description: 'Set your risk preference on a scale of 1-10 (conservative to aggressive)',
      icon: Shield
    },
    {
      number: 4,
      title: 'Portfolio Optimization',
      description: 'Our algorithm applies Modern Portfolio Theory to find the optimal allocation',
      icon: Calculator
    },
    {
      number: 5,
      title: 'Get Results',
      description: 'Receive your optimized portfolio with detailed metrics and visualizations',
      icon: Target
    }
  ];

  const concepts = [
    {
      title: 'Modern Portfolio Theory',
      description: 'A mathematical framework for building a portfolio of assets that maximizes expected return for a given level of risk.',
      icon: Lightbulb
    },
    {
      title: 'Risk',
      description: 'The uncertainty of returns, measured by volatility. Higher risk typically means higher potential returns but also higher potential losses.',
      icon: Shield
    },
    {
      title: 'Return',
      description: 'The gain or loss on an investment over a specified period, usually expressed as a percentage of the investment\'s initial cost.',
      icon: TrendingUp
    },
    {
      title: 'Diversification',
      description: 'Spreading investments across different assets to reduce risk. The key principle that you shouldn\'t put all your eggs in one basket.',
      icon: BarChart3
    },
    {
      title: 'Sharpe Ratio',
      description: 'A measure of risk-adjusted return. Higher Sharpe ratios indicate better risk-adjusted performance.',
      icon: Calculator
    },
    {
      title: 'Efficient Frontier',
      description: 'The set of optimal portfolios that offer the highest expected return for each level of risk.',
      icon: Target
    }
  ];

  const benefits = [
    'Maximize returns for your risk tolerance',
    'Reduce portfolio volatility through proper diversification',
    'Make data-driven investment decisions',
    'Save time on complex calculations',
    'Access professional-grade optimization tools',
    'Get clear visualizations of your portfolio allocation'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              How Portfolio Optimization Works
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn how our platform uses Modern Portfolio Theory to help you build better investment portfolios.
          </p>
        </div>

        {/* Steps Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">5 Simple Steps to Optimization</h2>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <Card key={step.number} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 md:w-1/4 w-full text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold">{step.number}</span>
                      </div>
                      <step.icon className="h-8 w-8 mx-auto" />
                    </div>
                    <div className="p-8 md:w-3/4 w-full">
                      <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                      <p className="text-gray-600 text-lg">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Key Concepts */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Key Financial Concepts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {concepts.map((concept, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <concept.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{concept.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {concept.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-20">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-8">Benefits of Using Our Tool</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Portfolio?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Put theory into practice and start building better investment portfolios today.
            </p>
            <Link to="/optimizer">
              <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
                Start Optimizing Now
              </Button>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default HowItWorks;
