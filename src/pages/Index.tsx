
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { TrendingUp, Shield, BarChart3, Zap, Target, Users } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Advanced Optimization',
      description: 'Uses Modern Portfolio Theory to find the optimal asset allocation for your risk tolerance.'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Customize your risk tolerance and get portfolios that match your investment goals.'
    },
    {
      icon: BarChart3,
      title: 'Data-Driven Insights',
      description: 'Real-time data from Yahoo Finance ensures your optimization is based on current market conditions.'
    },
    {
      icon: Zap,
      title: 'Fast Processing',
      description: 'Get optimized portfolio recommendations in seconds with our efficient algorithms.'
    },
    {
      icon: Target,
      title: 'Precise Allocation',
      description: 'Receive exact percentage allocations for each asset in your optimized portfolio.'
    },
    {
      icon: Users,
      title: 'Professional Grade',
      description: 'Built using the same principles and tools used by professional portfolio managers.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Enhance Your Investment Strategy
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Optimize your investment portfolio with Modern Portfolio Theory. 
              Maximize returns while minimizing risk through data-driven allocation strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/optimizer">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg">
                  Start Optimizing
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-300 rounded-full opacity-10 animate-pulse delay-2000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Portfolio Optimizer?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge financial theory with modern technology 
              to help you make better investment decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Three Simple Steps to Optimization
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Enter Your Stocks</h3>
              <p className="text-blue-100">Input the stock symbols you want to optimize</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Set Parameters</h3>
              <p className="text-blue-100">Choose your time range and risk tolerance</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Results</h3>
              <p className="text-blue-100">Receive your optimized portfolio allocation</p>
            </div>
          </div>
          <Link to="/optimizer">
            <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
              Try It Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
