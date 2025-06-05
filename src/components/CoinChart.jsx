"use client"

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Skeleton } from '../components/ui/Skeleton';

const CoinChart = ({
  chartData,
  loading = false,
  coinName = '',
  priceChange = 0
}) => {
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-gray-300 text-sm">{label}</p>
          <p className="text-green-400 font-semibold text-lg">
            ${Number(payload[0].value).toFixed(6)}
          </p>
        </div>
      );
    }
    return null;
  };

  // Format date for x-axis
  const formatDate = (timeStr) => {
    if (!timeStr) return '';
    const date = new Date(timeStr);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric'
    });
  };

  return (
    <div className="w-full h-[300px] bg-gray-900 rounded-lg p-4 relative">
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <Skeleton className="w-full h-full bg-gray-800" />
        </div>
      ) : (
        <>
          {/* Price display in top right */}
          {chartData.length > 0 && (
            <div className="absolute top-4 right-4 bg-green-500 text-black px-2 py-1 rounded text-sm font-semibold z-10">
              ${Number(chartData[chartData.length - 1]?.price || 0).toFixed(6)}
            </div>
          )}
          
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
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
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatDate}
                interval="preserveStartEnd"
              />
              
              <YAxis 
                stroke="#6B7280"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${Number(value).toFixed(4)}`}
                width={60}
                domain={['dataMin - 0.0001', 'dataMax + 0.0001']}
                orientation="right"
              />
              
              <Tooltip content={<CustomTooltip />} />
              
              <Area
                type="monotone"
                dataKey="price"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#priceGradient)"
                dot={false}
                activeDot={{
                  r: 4,
                  stroke: '#10B981',
                  strokeWidth: 2,
                  fill: '#1F2937'
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
          
          {/* Generate 7-day labels with day names only */}
          <div className="absolute bottom-1 left-4 right-4 flex justify-between text-xs text-gray-500">
            {Array.from({ length: 7 }, (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - (6 - i));
              return (
                <span key={i}>
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
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