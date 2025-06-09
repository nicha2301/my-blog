'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { useTheme } from 'next-themes';

// Đăng ký các thành phần Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ActivityData {
  dates: string[];
  userActivity: number[];
}

export default function UserActivityChart() {
  const { theme } = useTheme();
  const [activityData, setActivityData] = useState<ActivityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<'7days' | '30days' | '90days'>('30days');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchActivityData() {
      try {
        setLoading(true);
        // 使用当前窗口URL的主机名和端口
        const days = timeframe === '7days' ? 7 : timeframe === '30days' ? 30 : 90;
        const host = window.location.origin;
        const response = await fetch(`${host}/api/analytics/user-activity?days=${days}`);
        if (!response.ok) {
          throw new Error('Không thể lấy dữ liệu hoạt động người dùng');
        }
        const data = await response.json();
        console.log('活动数据:', data); // 调试用
        
        // 处理返回的API数据
        interface ActivityItem {
          hour: string;
          users: number;
        }
        
        const hours = data.activityData.map((item: ActivityItem) => item.hour);
        const userActivity = data.activityData.map((item: ActivityItem) => item.users);
        
        // 转换成我们需要的格式
        const formattedData = {
          dates: hours.map((hour: string) => `${hour}:00`),
          userActivity: userActivity
        };
        
        setActivityData(formattedData);
        setError(null);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
        console.error('Lỗi khi tải dữ liệu hoạt động:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchActivityData();
  }, [timeframe]);

  if (loading) {
    return (
      <div className="p-6 bg-white dark:bg-white/10 backdrop-blur-md rounded-lg border border-gray-200 dark:border-white/20 animate-pulse">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Hoạt động người dùng theo thời gian</h3>
          <div className="bg-gray-200 dark:bg-white/20 h-8 w-32 rounded"></div>
        </div>
        <div className="h-64 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white dark:bg-white/10 backdrop-blur-md rounded-lg border border-gray-200 dark:border-white/20">
        <h3 className="text-xl font-semibold mb-4">Hoạt động người dùng theo thời gian</h3>
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

  if (!activityData || activityData.dates.length === 0) {
    return (
      <div className="p-6 bg-white dark:bg-white/10 backdrop-blur-md rounded-lg border border-gray-200 dark:border-white/20">
        <h3 className="text-xl font-semibold mb-4">Hoạt động người dùng theo thời gian</h3>
        <div className="h-64 flex items-center justify-center">
          <p className="text-neutral-600 dark:text-neutral-400">Chưa có dữ liệu hoạt động người dùng</p>
        </div>
      </div>
    );
  }

  const isDark = theme === 'dark';
  
  // Tính số liệu tóm tắt
  const currentActivity = activityData.userActivity[activityData.userActivity.length - 1];
  const prevActivity = activityData.userActivity[0];
  const changePercentage = (((currentActivity - prevActivity) / prevActivity) * 100).toFixed(1);
  const isIncrease = currentActivity >= prevActivity;

  // Cấu hình dữ liệu cho biểu đồ
  const chartData = {
    labels: activityData.dates,
    datasets: [
      {
        label: 'Hoạt động người dùng',
        data: activityData.userActivity,
        borderColor: 'rgb(75, 85, 225)',
        backgroundColor: 'rgba(75, 85, 225, 0.2)',
        tension: 0.3,
        fill: true,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: 'rgb(75, 85, 225)'
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
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
        displayColors: false,
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: function(context: any) {
            // 使用安全的类型转换
            if (typeof context.raw === 'number') {
              return `${context.raw} hoạt động`;
            }
            return 'hoạt động';
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
          font: {
            family: 'Inter',
            size: 11
          },
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 7
        }
      },
      y: {
        beginAtZero: false,
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
          font: {
            family: 'Inter',
            size: 11
          }
        }
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="p-6 bg-white dark:bg-white/10 backdrop-blur-md rounded-lg border border-gray-200 dark:border-white/20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">Hoạt động người dùng</h3>
          <div className="flex items-center">
            <span className="text-2xl font-bold mr-2">{currentActivity}</span>
            <div className={`flex items-center ${isIncrease ? 'text-green-500' : 'text-red-500'}`}>
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {isIncrease ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                )}
              </svg>
              <span className="text-sm ml-1">{Math.abs(parseFloat(changePercentage))}%</span>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as '7days' | '30days' | '90days')}
            className="bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="7days">7 ngày</option>
            <option value="30days">30 ngày</option>
            <option value="90days">90 ngày</option>
          </select>
        </div>
      </div>

      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
        <div className="flex justify-between items-center">
          <span className="text-xs text-neutral-600 dark:text-neutral-400">
            {timeframe === '7days' ? '7 ngày qua' : timeframe === '30days' ? '30 ngày qua' : '90 ngày qua'}
          </span>
          <button className="text-xs text-primary hover:text-primary/80 transition">
            Phân tích chi tiết
          </button>
        </div>
      </div>
    </div>
  )
} 