"use client"

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Skeleton } from '../components/ui/Skeleton';

const CoinChart = ({
  chartData,
  loading = false,
}) => {
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-2 sm:p-3 shadow-lg max-w-xs">
          <p className="text-gray-300 text-xs sm:text-sm">{label}</p>
          <p className="text-green-400 font-semibold text-sm sm:text-lg">
            ${Number(payload[0].value).toFixed(6)}
          </p>
        </div>
      );
    }
    return null;
  };

  // Format date for x-axis - responsive formatting
  const formatDate = (timeStr) => {
    if (!timeStr) return '';
    const date = new Date(timeStr);
    // Show only day number on mobile, day + month on larger screens
    return window?.innerWidth < 640 
      ? date.toLocaleDateString('en-US', { day: 'numeric' })
      : date.toLocaleDateString('en-US', { 
          day: 'numeric',
          month: 'short'
        });
  };

  // Format Y-axis values based on screen size
  const formatYAxis = (value) => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      // Mobile: shorter format
      return Number(value) > 1 
        ? `$${Number(value).toFixed(2)}`
        : `$${Number(value).toFixed(4)}`;
    }
    // Desktop: full format
    return `$${Number(value).toFixed(4)}`;
  };

  return (
    <div className="w-full h-[250px] sm:h-[300px] lg:h-[350px] bg-gray-900 rounded-lg p-2 sm:p-4 relative">
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <Skeleton className="w-full h-full bg-gray-800" />
        </div>
      ) : (
        <>
          {/* Price display - responsive positioning and sizing */}
          {chartData.length > 0 && (
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-green-500 text-black px-2 py-1 rounded text-xs sm:text-sm font-semibold z-10">
              <span className="hidden sm:inline">$</span>
              <span className="sm:hidden">$</span>
              {Number(chartData[chartData.length - 1]?.price || 0).toFixed(
                window?.innerWidth < 640 ? 4 : 6
              )}
            </div>
          )}
          
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={chartData} 
              margin={{ 
                top: window?.innerWidth < 640 ? 15 : 20, 
                right: window?.innerWidth < 640 ? 15 : 30, 
                left: 0, 
                bottom: window?.innerWidth < 640 ? 25 : 30 
              }}
            >
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              
              <CartesianGrid 
                strokeDasharray="1 1" 
                stroke="#374151" 
                strokeOpacity={0.5}
                horizontal={true}
                vertical={false}
              />
              
              <XAxis 
                dataKey="time"
                stroke="#6B7280"
                fontSize={window?.innerWidth < 640 ? 8 : 10}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatDate}
                interval="preserveStartEnd"
                minTickGap={window?.innerWidth < 640 ? 20 : 30}
              />
              
              <YAxis 
                stroke="#6B7280"
                fontSize={window?.innerWidth < 640 ? 8 : 10}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatYAxis}
                width={window?.innerWidth < 640 ? 45 : 60}
                domain={['dataMin - 0.0001', 'dataMax + 0.0001']}
                orientation="right"
              />
              
              <Tooltip content={<CustomTooltip />} />
              
              <Area
                type="monotone"
                dataKey="price"
                stroke="#10B981"
                strokeWidth={window?.innerWidth < 640 ? 1.5 : 2}
                fill="url(#priceGradient)"
                dot={false}
                activeDot={{
                  r: window?.innerWidth < 640 ? 3 : 4,
                  stroke: '#10B981',
                  strokeWidth: 2,
                  fill: '#1F2937'
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
          
          {/* Generate 7-day labels with responsive formatting */}
          <div className="absolute bottom-1 left-2 right-2 sm:left-4 sm:right-4 flex justify-between text-xs text-gray-500">
            {Array.from({ length: window?.innerWidth < 640 ? 5 : 7 }, (_, i) => {
              const totalDays = window?.innerWidth < 640 ? 5 : 7;
              const date = new Date();
              date.setDate(date.getDate() - (totalDays - 1 - i));
              return (
                <span key={i} className="text-center">
                  <span className="block sm:hidden">
                    {date.toLocaleDateString('en-US', { weekday: 'narrow' })}
                  </span>
                  <span className="hidden sm:block">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                </span>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default CoinChart;