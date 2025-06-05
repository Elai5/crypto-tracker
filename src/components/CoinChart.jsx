"use client"

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import { TrendingUp, TrendingDown } from 'lucide-react';

const CoinChart = ({ 
  chartData, 
  darkMode = false, 
  loading = false,
  coinName = '',
  priceChange = 0
}) => {
  return (
    <Card className="w-full font-primary">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {coinName ? `${coinName} Price Chart` : 'Price Chart'}
          {priceChange !== 0 && (
            <div className={`flex items-center text-sm font-medium ${
              priceChange >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {priceChange >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(priceChange).toFixed(2)}%
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[300px] flex items-center justify-center">
            <Skeleton className="w-full h-full" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={darkMode ? 'hsl(240, 3.7%, 15.9%)' : 'hsl(220, 13%, 91%)'} 
              />
              <XAxis 
                dataKey="time" 
                stroke={darkMode ? 'hsl(240, 5%, 64.9%)' : 'hsl(220, 8.9%, 46.1%)'}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke={darkMode ? 'hsl(240, 5%, 64.9%)' : 'hsl(220, 8.9%, 46.1%)'}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
                width={80}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? 'hsl(240, 10%, 3.9%)' : 'hsl(0, 0%, 100%)',
                  borderColor: darkMode ? 'hsl(240, 3.7%, 15.9%)' : 'hsl(220, 13%, 91%)',
                  borderRadius: '8px',
                  color: darkMode ? 'hsl(0, 0%, 98%)' : 'hsl(240, 10%, 3.9%)'
                }}
                formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Price']}
                labelStyle={{
                  color: darkMode ? 'hsl(240, 5%, 64.9%)' : 'hsl(220, 8.9%, 46.1%)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="hsl(221.2, 83.2%, 53.3%)" 
                strokeWidth={2}
                dot={false}
                activeDot={{ 
                  r: 6, 
                  stroke: 'hsl(221.2, 83.2%, 53.3%)',
                  strokeWidth: 2,
                  fill: darkMode ? 'hsl(240, 10%, 3.9%)' : 'hsl(0, 0%, 100%)'
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default CoinChart;