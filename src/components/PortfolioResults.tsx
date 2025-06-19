
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Download, TrendingUp, Shield, Target } from 'lucide-react';

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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

const PortfolioResults = ({ results }: Props) => {
  const pieData = results.assets.map((asset, index) => ({
    name: asset.symbol,
    value: asset.weight * 100,
    color: COLORS[index % COLORS.length]
  }));

  const barData = results.assets.map((asset, index) => ({
    symbol: asset.symbol,
    weight: asset.weight * 100,
    expectedReturn: asset.expectedReturn * 100,
    volatility: asset.volatility * 100,
    color: COLORS[index % COLORS.length]
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
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expected Return</p>
                <p className="text-2xl font-bold text-green-600">
                  {(results.expectedReturn * 100).toFixed(2)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Volatility</p>
                <p className="text-2xl font-bold text-orange-600">
                  {(results.volatility * 100).toFixed(2)}%
                </p>
              </div>
              <Shield className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sharpe Ratio</p>
                <p className="text-2xl font-bold text-blue-600">
                  {results.sharpeRatio.toFixed(2)}
                </p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Allocation Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Allocation</CardTitle>
          <CardDescription>
            Optimal weight distribution across your selected assets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="symbol" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      `${value.toFixed(2)}%`, 
                      name === 'weight' ? 'Weight' : name === 'expectedReturn' ? 'Expected Return' : 'Volatility'
                    ]}
                  />
                  <Bar dataKey="weight" fill="#0088FE" name="weight" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Asset Details Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Asset Details</CardTitle>
            <CardDescription>
              Detailed breakdown of each asset in your optimized portfolio
            </CardDescription>
          </div>
          <Button onClick={downloadCSV} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download CSV
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Expected Return</TableHead>
                <TableHead>Volatility</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.assets.map((asset, index) => (
                <TableRow key={asset.symbol}>
                  <TableCell className="font-mono font-medium">{asset.symbol}</TableCell>
                  <TableCell>
                    <span className="font-semibold" style={{ color: COLORS[index % COLORS.length] }}>
                      {(asset.weight * 100).toFixed(2)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-green-600">
                    {(asset.expectedReturn * 100).toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-orange-600">
                    {(asset.volatility * 100).toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioResults;
