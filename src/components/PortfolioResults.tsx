
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Download, TrendingUp, Shield, Target, PieChart as PieChartIcon } from 'lucide-react';

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

interface Props {
  results: OptimizationResult;
}

// Professional color palette for charts
const CHART_COLORS = [
  '#0f172a', // slate-900
  '#1e293b', // slate-800  
  '#334155', // slate-700
  '#475569', // slate-600
  '#64748b', // slate-500
  '#0d9488', // teal-600
  '#14b8a6', // teal-500
  '#2dd4bf', // teal-400
  '#5eead4', // teal-300
  '#99f6e4', // teal-200
  '#1e40af', // blue-700
  '#2563eb', // blue-600
  '#3b82f6', // blue-500
  '#60a5fa', // blue-400
  '#93c5fd', // blue-300
];

const PortfolioResults = ({ results }: Props) => {
  const pieData = results.assets.map((asset, index) => ({
    name: asset.symbol,
    value: asset.weight * 100,
    color: CHART_COLORS[index % CHART_COLORS.length]
  }));

  const barData = results.assets.map((asset, index) => ({
    symbol: asset.symbol,
    weight: asset.weight * 100,
    expectedReturn: asset.expectedReturn * 100,
    volatility: asset.volatility * 100,
    color: CHART_COLORS[index % CHART_COLORS.length]
  }));

  const downloadCSV = () => {
    const csvContent = [
      ['Symbol', 'Weight (%)', 'Expected Return (%)', 'Volatility (%)'],
      ...results.assets.map(asset => [
        asset.symbol,
        (asset.weight * 100).toFixed(2),
        (asset.expectedReturn * 100).toFixed(2),
        (asset.volatility * 100).toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized_portfolio.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="finance-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Expected Return</p>
                <p className="text-3xl font-bold text-emerald-600">
                  {(results.expectedReturn * 100).toFixed(2)}%
                </p>
                <p className="text-xs text-slate-500 mt-1">Annualized</p>
              </div>
              <div className="bg-emerald-50 rounded-full p-3">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="finance-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Risk (Volatility)</p>
                <p className="text-3xl font-bold text-amber-600">
                  {(results.volatility * 100).toFixed(2)}%
                </p>
                <p className="text-xs text-slate-500 mt-1">Standard Deviation</p>
              </div>
              <div className="bg-amber-50 rounded-full p-3">
                <Shield className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="finance-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Sharpe Ratio</p>
                <p className="text-3xl font-bold text-blue-600">
                  {results.sharpeRatio.toFixed(2)}
                </p>
                <p className="text-xs text-slate-500 mt-1">Risk-Adjusted Return</p>
              </div>
              <div className="bg-blue-50 rounded-full p-3">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Allocation Charts */}
      <Card className="finance-card">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-slate-800 text-xl">
            <PieChartIcon className="h-6 w-6 text-teal-600" />
            Portfolio Allocation
          </CardTitle>
          <CardDescription className="text-slate-600 text-base">
            Optimal weight distribution across your {results.assets.length} selected assets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pie Chart */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value.toFixed(2)}%`, 'Weight']}
                    labelStyle={{ color: '#1e293b', fontWeight: 'semibold' }}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="symbol" 
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 'medium' }}
                  />
                  <YAxis 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    label={{ value: 'Weight (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#64748b' } }}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toFixed(2)}%`, 'Weight']}
                    labelStyle={{ color: '#1e293b', fontWeight: 'semibold' }}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Bar dataKey="weight" fill="#0d9488" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Asset Details Table */}
      <Card className="finance-card">
        <CardHeader className="flex flex-row items-center justify-between pb-6">
          <div>
            <CardTitle className="text-slate-800 text-xl">Asset Details</CardTitle>
            <CardDescription className="text-slate-600 text-base">
              Detailed breakdown of each asset in your optimized portfolio
            </CardDescription>
          </div>
          <Button 
            onClick={downloadCSV} 
            variant="outline" 
            size="sm"
            className="border-slate-300 text-slate-700 hover:bg-slate-50 font-medium"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="text-slate-700 font-semibold">Symbol</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Weight</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Expected Return</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Volatility</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.assets.map((asset, index) => (
                  <TableRow key={asset.symbol} className="border-slate-100 hover:bg-slate-50">
                    <TableCell className="font-mono font-semibold text-slate-800">
                      {asset.symbol}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                        />
                        <span className="font-semibold text-slate-800">
                          {(asset.weight * 100).toFixed(2)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-emerald-600 font-semibold">
                      {(asset.expectedReturn * 100).toFixed(2)}%
                    </TableCell>
                    <TableCell className="text-amber-600 font-semibold">
                      {(asset.volatility * 100).toFixed(2)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioResults;
