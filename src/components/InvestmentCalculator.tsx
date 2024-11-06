import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Calculator } from 'lucide-react';

interface YearlyData {
  year: string;
  investmentYear: number;
  invested: number;
  value: number;
  marketReturn: string;
  portfolioGrowth: string;
  spIndex: number;
}

interface Stats {
  totalReturn: number;
  totalGrowthPercent: number;
  avgAnnualGrowth: number;
  totalInvested: number;
  finalValue: number;
}

type ReturnsData = {
  [key: string]: number;
}

const InvestmentCalculator: React.FC = () => {
  // Historical S&P 500 returns from the provided data
  const returns: ReturnsData = {
    2024: 22.62, 2023: 26.29, 2022: -18.11, 2021: 28.71, 2020: 18.4, 2019: 31.49,
    2018: -4.38, 2017: 21.83, 2016: 11.96, 2015: 1.38, 2014: 13.69, 2013: 32.39,
    2012: 16.0, 2011: 2.11, 2010: 15.06, 2009: 26.46, 2008: -37.0, 2007: 5.49,
    2006: 15.79, 2005: 4.91, 2004: 10.88, 2003: 28.68, 2002: -22.1, 2001: -11.89,
    2000: -9.1, 1999: 21.04, 1998: 28.58, 1997: 33.36, 1996: 22.96, 1995: 37.58,
    1994: 1.32, 1993: 10.08, 1992: 7.62, 1991: 30.47, 1990: -3.1, 1989: 31.69,
    1988: 16.61, 1987: 5.25, 1986: 18.67, 1985: 31.73, 1984: 6.27, 1983: 22.56,
    1982: 21.55, 1981: -4.91, 1980: 32.42, 1979: 18.44, 1978: 6.56, 1977: -7.18,
    1976: 23.84, 1975: 37.2, 1974: -26.47, 1973: -14.66, 1972: 18.98, 1971: 14.31,
    1970: 4.01, 1969: -8.5, 1968: 11.06, 1967: 23.98, 1966: -10.06, 1965: 12.45,
    1964: 16.48, 1963: 22.8, 1962: -8.73, 1961: 26.89, 1960: 0.47, 1959: 11.96,
    1958: 43.36, 1957: -10.78, 1956: 6.56, 1955: 31.56, 1954: 52.62, 1953: -0.99,
    1952: 18.37, 1951: 24.02, 1950: 31.71, 1949: 18.79, 1948: 5.5, 1947: 5.71,
    1946: -8.07, 1945: 36.44, 1944: 19.75, 1943: 25.9, 1942: 20.34, 1941: -11.59,
    1940: -9.78, 1939: -0.41, 1938: 31.12, 1937: -35.03, 1936: 33.92, 1935: 47.67,
    1934: -1.44, 1933: 53.99, 1932: -8.19, 1931: -43.34, 1930: -24.9, 1929: -8.42,
    1928: 43.61, 1927: 37.49, 1926: 11.62
  };

  // Get available years from returns data
  const years = Object.keys(returns).sort((a, b) => Number(b) - Number(a)); // Sort descending

  const [startYear, setStartYear] = useState('2000');
  const [initialInvestment, setInitialInvestment] = useState(1000);
  const [monthlyInvestment, setMonthlyInvestment] = useState(100);
  const [currency, setCurrency] = useState('USD');
  const [results, setResults] = useState<YearlyData[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalReturn: 0,
    totalGrowthPercent: 0,
    avgAnnualGrowth: 0,
    totalInvested: 0,
    finalValue: 0
  });

  useEffect(() => {
    calculateInvestment();
  }, [startYear, initialInvestment, monthlyInvestment, currency]);

  const formatCurrency = (value: number) => {
    if (typeof value !== 'number') return currency === 'USD' ? '$0' : '€0';
    const symbol = currency === 'USD' ? '$' : '€';
    return `${symbol}${Math.round(value).toLocaleString()}`;
  };

  const formatPercent = (value: number) => {
    if (typeof value !== 'number') return '0.00%';
    return `${value.toFixed(2)}%`;
  };

  const calculateInvestment = () => {
    try {
      const startYearNum = parseInt(startYear);
      let yearlyData: YearlyData[] = [];
      let spIndex = 100;

      // Initialize for first year
      let currentValue = initialInvestment;
      let yearlyInvestment = initialInvestment;
      yearlyInvestment += monthlyInvestment * 12;

      let yearCount = 0;
      let totalMarketGrowth = 0;

      for (let year = startYearNum; year <= 2024; year++) {
        const returnRate = returns[year.toString()];
        if (!returnRate) continue;
        yearCount++;

        // Add full year of monthly investments for subsequent years
        if (year !== startYearNum) {
          if (year === 2024) {
            // For 2024, only count up to April
            yearlyInvestment += monthlyInvestment * 4;
            currentValue += monthlyInvestment * 4;
          } else {
            yearlyInvestment += monthlyInvestment * 12;
            currentValue += monthlyInvestment * 12;
          }
        }
        
        // Apply market return
        currentValue *= (1 + returnRate / 100);
        spIndex *= (1 + returnRate / 100);

        // Calculate year's market growth (excluding contributions)
        const yearGrowth = returnRate;
        totalMarketGrowth += yearGrowth;

        yearlyData.push({
          year: year.toString(),
          investmentYear: yearCount,
          invested: Math.round(yearlyInvestment),
          value: Math.round(currentValue),
          marketReturn: returnRate.toFixed(2),
          portfolioGrowth: yearGrowth.toFixed(2),
          spIndex: Math.round(spIndex * 100) / 100
        });
      }

      // Calculate final statistics
      const totalReturn = currentValue - yearlyInvestment;
      const totalGrowthPercent = ((currentValue - yearlyInvestment) / yearlyInvestment) * 100;
      const avgAnnualGrowth = totalMarketGrowth / yearCount;

      setStats({
        totalReturn,
        totalGrowthPercent,
        avgAnnualGrowth,
        totalInvested: yearlyInvestment,
        finalValue: currentValue
      });

      setResults(yearlyData);
    } catch (error) {
      console.error('Calculation error:', error);
      setStats({
        totalReturn: 0,
        totalGrowthPercent: 0,
        avgAnnualGrowth: 0,
        totalInvested: 0,
        finalValue: 0
      });
      setResults([]);
    }
  };

  // Rest of the component remains the same...
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="h-6 w-6" />
        <h1 className="text-2xl font-bold">S&P 500 ETF Investment Calculator</h1>
      </div>

      <div className="grid gap-4 mb-6">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Year</label>
            <select
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Initial Investment</label>
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              min="0"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Monthly Investment</label>
            <input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              min="0"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <LineChart width={700} height={300} data={results}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="invested" stroke="#82ca9d" name="Total Invested" />
          <Line yAxisId="left" type="monotone" dataKey="value" stroke="#8884d8" name="Portfolio Value" />
          <Line yAxisId="right" type="monotone" dataKey="spIndex" stroke="#ff7300" name="S&P 500 Index" />
        </LineChart>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-sm font-medium text-gray-500">Total Return</div>
          <div className="text-2xl font-bold">{formatCurrency(stats.totalReturn)}</div>
          <div className="text-sm text-gray-500">({formatPercent(stats.totalGrowthPercent)} growth)</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-gray-500">Total Investment</div>
          <div className="text-2xl font-bold">{formatCurrency(stats.totalInvested)}</div>
          <div className="text-sm text-gray-500">Final Value: {formatCurrency(stats.finalValue)}</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-gray-500">Average Annual Growth</div>
          <div className="text-2xl font-bold">{formatPercent(stats.avgAnnualGrowth)}</div>
          <div className="text-sm text-gray-500">Market Return</div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="p-2 text-left">Year</th>
              <th className="p-2 text-right">Investment Year</th>
              <th className="p-2 text-right">Total Invested</th>
              <th className="p-2 text-right">Portfolio Value</th>
              <th className="p-2 text-right">Market Return (%)</th>
              <th className="p-2 text-right">Portfolio Growth (%)</th>
              <th className="p-2 text-right">S&P 500 Index</th>
            </tr>
          </thead>
          <tbody>
            {results.map((year) => (
              <tr key={year.year} className="border-t">
                <td className="p-2">{year.year}</td>
                <td className="p-2 text-right">{year.investmentYear}</td>
                <td className="p-2 text-right">{formatCurrency(year.invested)}</td>
                <td className="p-2 text-right">{formatCurrency(year.value)}</td>
                <td className="p-2 text-right">{year.marketReturn}%</td>
                <td className="p-2 text-right">{year.portfolioGrowth}%</td>
                <td className="p-2 text-right">{year.spIndex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvestmentCalculator;