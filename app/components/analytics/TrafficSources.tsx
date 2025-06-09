'use client';

import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  TooltipItem,
  ChartOptions
} from 'chart.js';
import { useTheme } from 'next-themes';

// 注册所需组件
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface SourceData {
  name: string;
  sessions: number;
}

interface SourcesResponse {
  sources: SourceData[];
}

export default function TrafficSources() {
  const { theme } = useTheme();
  const [sourcesData, setSourcesData] = useState<SourcesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchSourcesData() {
      try {
        setLoading(true);
        const response = await fetch('/api/analytics/sources');
        if (!response.ok) {
          throw new Error('Không thể lấy dữ liệu nguồn truy cập');
        }
        const data = await response.json();
        setSourcesData(data);
        setError(null);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
      } finally {
        setLoading(false);
      }
    }

    fetchSourcesData();
  }, []);

  // 颜色生成函数
  const generateColors = (count: number) => {
    const baseColors = [
      { bg: 'rgba(82, 39, 183, 0.7)', border: 'rgb(82, 39, 183)' },
      { bg: 'rgba(219, 166, 166, 0.7)', border: 'rgb(219, 166, 166)' },
      { bg: 'rgba(66, 133, 244, 0.7)', border: 'rgb(66, 133, 244)' },
      { bg: 'rgba(219, 68, 55, 0.7)', border: 'rgb(219, 68, 55)' },
      { bg: 'rgba(15, 157, 88, 0.7)', border: 'rgb(15, 157, 88)' },
      { bg: 'rgba(244, 180, 0, 0.7)', border: 'rgb(244, 180, 0)' },
    ];

    const backgroundColors = [];
    const borderColors = [];

    for (let i = 0; i < count; i++) {
      const colorIndex = i % baseColors.length;
      backgroundColors.push(baseColors[colorIndex].bg);
      borderColors.push(baseColors[colorIndex].border);
    }

    return { backgroundColors, borderColors };
  };

  if (loading) {
    return (
      <div className="p-6 bg-white dark:bg-white/10 backdrop-blur-md rounded-lg border border-gray-200 dark:border-white/20 animate-pulse">
        <h3 className="text-xl font-semibold mb-4">Nguồn truy cập</h3>
        <div className="h-64 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white dark:bg-white/10 backdrop-blur-md rounded-lg border border-gray-200 dark:border-white/20">
        <h3 className="text-xl font-semibold mb-4">Nguồn truy cập</h3>
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 mb-2">Lỗi: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary/80 hover:bg-primary transition rounded-md text-sm font-medium"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!sourcesData || !sourcesData.sources || sourcesData.sources.length === 0) {
    return (
      <div className="p-6 bg-white dark:bg-white/10 backdrop-blur-md rounded-lg border border-gray-200 dark:border-white/20">
        <h3 className="text-xl font-semibold mb-4">Nguồn truy cập</h3>
        <div className="h-64 flex items-center justify-center">
          <p className="text-neutral-600 dark:text-neutral-400">Chưa có dữ liệu về nguồn truy cập</p>
        </div>
      </div>
    );
  }

  const isDark = theme === 'dark';

  if (!mounted) return null;

  // 处理数据
  const sourceNames = sourcesData.sources.map((source) => source.name);
  const sessionCounts = sourcesData.sources.map((source) => source.sessions);
  
  // 获取颜色
  const { backgroundColors, borderColors } = generateColors(sourceNames.length);

  // 图表数据
  const data: ChartData<'pie'> = {
    labels: sourceNames,
    datasets: [
      {
        data: sessionCounts,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
        hoverOffset: 10
      }
    ]
  };

  // 图表选项
  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
          font: {
            family: 'Inter',
            size: 12
          },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 15,
          boxWidth: 8,
        }
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: isDark ? '#fff' : '#000',
        bodyColor: isDark ? '#fff' : '#000',
        titleFont: {
          family: 'Inter',
          size: 14
        },
        bodyFont: {
          family: 'Inter',
          size: 13
        },
        padding: 12,
        cornerRadius: 6,
        displayColors: true,
        boxPadding: 6,
        callbacks: {
          label: function(tooltipItem: TooltipItem<'pie'>) {
            const totalSessions = sessionCounts.reduce((a, b) => a + b, 0);
            const value = tooltipItem.raw as number;
            const percentage = Math.round((value / totalSessions) * 100);
            return `${tooltipItem.label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-white/10 backdrop-blur-md rounded-lg border border-gray-200 dark:border-white/20">
      <h3 className="text-xl font-semibold mb-6">Nguồn truy cập</h3>
      <div className="h-64">
        <Pie data={data} options={options} />
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-white/10">
        <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">Top 3 nguồn truy cập</h4>
        <div className="space-y-2">
          {sourcesData.sources.slice(0, 3).map((source, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{backgroundColor: backgroundColors[index]}}
                ></div>
                <span className="text-sm">{source.name}</span>
              </div>
              <span className="text-sm font-medium">{source.sessions} phiên</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 