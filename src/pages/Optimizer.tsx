
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
import { Loader2, TrendingUp, AlertCircle, BarChart3 } from 'lucide-react';

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
  const [symbols, setSymbols] = useState('AAPL, GOOGL, MSFT');
  const [timeRange, setTimeRange] = useState('5');
  const [riskTolerance, setRiskTolerance] = useState([5]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<OptimizationResult | null>(null);

  // Dynamic mock data generator based on user input
  const generateMockResults = (symbolList: string[]): OptimizationResult => {
    // Generate random but realistic weights that sum to 1
    const weights: { [key: string]: number } = {};
    const rawWeights = symbolList.map(() => Math.random());
    const sum = rawWeights.reduce((a, b) => a + b, 0);
    
    symbolList.forEach((symbol, index) => {
      weights[symbol] = rawWeights[index] / sum;
    });

    // Generate realistic financial metrics
    const baseReturn = 0.08 + (riskTolerance[0] / 100);
    const baseVolatility = 0.12 + (riskTolerance[0] / 50);
    
    const assets = symbolList.map(symbol => ({
      symbol,
      weight: weights[symbol],
      expectedReturn: baseReturn + (Math.random() - 0.5) * 0.08,
      volatility: baseVolatility + (Math.random() - 0.5) * 0.1
    }));

    const expectedReturn = assets.reduce((sum, asset) => 
      sum + (asset.expectedReturn * asset.weight), 0
    );
    
    const volatility = Math.sqrt(
      assets.reduce((sum, asset) => 
        sum + Math.pow(asset.volatility * asset.weight, 2), 0
      )
    );

    return {
      weights,
      expectedReturn,
      volatility,
      sharpeRatio: expectedReturn / volatility,
      assets
    };
  };

  const handleOptimize = async () => {
    // Parse and validate input symbols
    const symbolArray = symbols
      .split(',')
      .map(s => s.trim().toUpperCase())
      .filter(s => s.length > 0 && /^[A-Z]{1,5}$/.test(s)); // Basic ticker validation
    
    if (symbolArray.length < 2) {
      toast({
        title: 'Invalid Input',
        description: 'Please enter at least 2 valid stock symbols (e.g., AAPL, GOOGL).',
        variant: 'destructive',
      });
      return;
    }

    if (symbolArray.length > 20) {
      toast({
        title: 'Too Many Assets',
        description: 'Please limit your selection to 20 assets or fewer.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setResults(null);
    
    const optimizationData: OptimizationRequest = {
      symbols: symbolArray,
      timeRange: parseInt(timeRange),
      riskTolerance: riskTolerance[0]
    };

    console.log('Optimization request with dynamic asset count:', optimizationData);

    try {
      /* TODO: Replace this mock implementation with actual API call to /api/optimize
         The backend should handle any number of assets dynamically.
         
         Expected API structure:
         POST /api/optimize
         Body: {
           symbols: string[], // Variable length array
           timeRange: number,
           riskTolerance: number
         }
         
         Response: {
           weights: { [symbol: string]: number },
           expectedReturn: number,
           volatility: number, 
           sharpeRatio: number,
           assets: Array<{
             symbol: string,
             weight: number,
             expectedReturn: number,
             volatility: number
           }>
         }

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
      
      // Generate dynamic mock data based on user input
      const mockResult = generateMockResults(symbolArray);
      setResults(mockResult);
      
      toast({
        title: 'Portfolio Optimized',
        description: `Successfully optimized portfolio with ${symbolArray.length} assets.`,
      });

    } catch (error) {
      console.error('Optimization error:', error);
      toast({
        title: 'Optimization Failed',
        description: 'Unable to optimize portfolio. Please check your symbols and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 text-slate-800">
            Portfolio Optimizer
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Enter your stock symbols and preferences to get an optimized portfolio allocation 
            based on Modern Portfolio Theory. Our system supports any number of assets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="finance-card h-fit">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-slate-800 text-xl">
                <BarChart3 className="h-6 w-6 text-teal-600" />
                Optimization Parameters
              </CardTitle>
              <CardDescription className="text-slate-600 text-base">
                Configure your portfolio optimization settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="symbols" className="text-slate-700 font-semibold">
                  Stock Symbols (comma-separated)
                </Label>
                <Input
                  id="symbols"
                  placeholder="AAPL, GOOGL, MSFT, TSLA, AMZN"
                  value={symbols}
                  onChange={(e) => setSymbols(e.target.value)}
                  className="font-mono text-base py-3 border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                />
                <p className="text-sm text-slate-500 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 text-slate-400" />
                  Enter 2 or more valid stock symbols. Our system handles any number of assets dynamically.
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="timeRange" className="text-slate-700 font-semibold">
                  Historical Data Range
                </Label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="py-3 border-slate-300 focus:border-teal-500">
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
                <Label className="text-slate-700 font-semibold">
                  Risk Tolerance: {riskTolerance[0]}/10
                </Label>
                <Slider
                  value={riskTolerance}
                  onValueChange={setRiskTolerance}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-slate-500 font-medium">
                  <span>Conservative (1)</span>
                  <span>Moderate (5)</span>
                  <span>Aggressive (10)</span>
                </div>
              </div>

              <Separator className="bg-slate-200" />

              <Button 
                onClick={handleOptimize} 
                disabled={isLoading}
                className="w-full finance-accent-button text-base py-3 h-auto"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    Optimizing Portfolio...
                  </>
                ) : (
                  <>
                    <TrendingUp className="mr-3 h-5 w-5" />
                    Optimize Portfolio
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {results ? (
              <PortfolioResults results={results} />
            ) : (
              <Card className="finance-card h-fit">
                <CardHeader className="pb-6">
                  <CardTitle className="text-slate-800 text-xl">Optimization Results</CardTitle>
                  <CardDescription className="text-slate-600 text-base">
                    Your optimized portfolio will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-16 text-slate-500">
                    <div className="bg-slate-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <TrendingUp className="h-10 w-10 text-slate-400" />
                    </div>
                    <p className="text-lg font-medium mb-2">Ready to Optimize</p>
                    <p className="text-slate-400">
                      Enter your parameters and click "Optimize Portfolio" to see results
                    </p>
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
