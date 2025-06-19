
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PortfolioResults from '@/components/PortfolioResults';
import { Loader2, TrendingUp } from 'lucide-react';

interface OptimizationRequest {
  symbols: string[];
  timeRange: number;
  riskTolerance: number;
}

interface OptimizationResult {
  weights: { [key: string]: number };
  expectedReturn: number;
  volatility: number;
  sharpeRatio: number;
  assets: {
    symbol: string;
    weight: number;
    expectedReturn: number;
    volatility: number;
  }[];
}

const Optimizer = () => {
  const { toast } = useToast();
  const [symbols, setSymbols] = useState('AAPL, GOOGL, MSFT, TSLA, AMZN');
  const [timeRange, setTimeRange] = useState('5');
  const [riskTolerance, setRiskTolerance] = useState([5]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<OptimizationResult | null>(null);

  // Mock data for demonstration - Replace with actual API call
  const mockOptimizationResult: OptimizationResult = {
    weights: {
      'AAPL': 0.25,
      'GOOGL': 0.20,
      'MSFT': 0.22,
      'TSLA': 0.18,
      'AMZN': 0.15
    },
    expectedReturn: 0.12,
    volatility: 0.18,
    sharpeRatio: 0.67,
    assets: [
      { symbol: 'AAPL', weight: 0.25, expectedReturn: 0.15, volatility: 0.20 },
      { symbol: 'GOOGL', weight: 0.20, expectedReturn: 0.12, volatility: 0.18 },
      { symbol: 'MSFT', weight: 0.22, expectedReturn: 0.11, volatility: 0.16 },
      { symbol: 'TSLA', weight: 0.18, expectedReturn: 0.18, volatility: 0.35 },
      { symbol: 'AMZN', weight: 0.15, expectedReturn: 0.13, volatility: 0.22 }
    ]
  };

  const handleOptimize = async () => {
    const symbolArray = symbols.split(',').map(s => s.trim().toUpperCase()).filter(s => s.length > 0);
    
    if (symbolArray.length < 2) {
      toast({
        title: 'Invalid Input',
        description: 'Please enter at least 2 stock symbols.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    const optimizationData: OptimizationRequest = {
      symbols: symbolArray,
      timeRange: parseInt(timeRange),
      riskTolerance: riskTolerance[0]
    };

    console.log('Optimization request:', optimizationData);

    try {
      /* TODO: Replace this mock implementation with actual API call
      
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(optimizationData),
      });

      if (!response.ok) {
        throw new Error('Optimization failed');
      }

      const result = await response.json();
      setResults(result);
      
      */

      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Use mock data for now
      setResults(mockOptimizationResult);
      
      toast({
        title: 'Optimization Complete',
        description: `Portfolio optimized for ${symbolArray.length} assets.`,
      });

    } catch (error) {
      console.error('Optimization error:', error);
      toast({
        title: 'Optimization Failed',
        description: 'Unable to optimize portfolio. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Portfolio Optimizer
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your stock symbols and preferences to get an optimized portfolio allocation 
            based on Modern Portfolio Theory.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Optimization Parameters
              </CardTitle>
              <CardDescription>
                Configure your portfolio optimization settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="symbols">Stock Symbols (comma-separated)</Label>
                <Input
                  id="symbols"
                  placeholder="AAPL, GOOGL, MSFT, TSLA, AMZN"
                  value={symbols}
                  onChange={(e) => setSymbols(e.target.value)}
                  className="font-mono"
                />
                <p className="text-sm text-gray-500">
                  Enter 2 or more stock symbols separated by commas
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeRange">Historical Data Range</Label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Year</SelectItem>
                    <SelectItem value="2">2 Years</SelectItem>
                    <SelectItem value="3">3 Years</SelectItem>
                    <SelectItem value="5">5 Years</SelectItem>
                    <SelectItem value="7">7 Years</SelectItem>
                    <SelectItem value="10">10 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Risk Tolerance: {riskTolerance[0]}/10</Label>
                <Slider
                  value={riskTolerance}
                  onValueChange={setRiskTolerance}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Conservative (1)</span>
                  <span>Moderate (5)</span>
                  <span>Aggressive (10)</span>
                </div>
              </div>

              <Separator />

              <Button 
                onClick={handleOptimize} 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Optimizing Portfolio...
                  </>
                ) : (
                  'Optimize Portfolio'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {results ? (
              <PortfolioResults results={results} />
            ) : (
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle>Optimization Results</CardTitle>
                  <CardDescription>
                    Your optimized portfolio will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-500">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Enter your parameters and click "Optimize Portfolio" to see results</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Optimizer;
