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

export default function OverviewChart() {
  const { theme } = useTheme();
  const [analyticsData, setAnalyticsData] = useState<{
    dates: string[];
    activeUsers: number[];
    pageViews: number[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchAnalyticsData() {
      try {
        setLoading(true);
        const response = await fetch('/api/analytics');
        if (!response.ok) {
          throw new Error('Không thể lấy dữ liệu Analytics');
        }
        const data = await response.json();
        setAnalyticsData(data);
        setError(null);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
      } finally {
        setLoading(false);
      }
    }

    fetchAnalyticsData();
  }, []);

  // Hàm chuyển đổi định dạng ngày
  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr.length !== 8) return dateStr;
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${day}/${month}`;
  };

  if (loading) {
    return (
      <div className="p-6 bg-white dark:bg-white/10 backdrop-blur-md rounded-lg border border-gray-200 dark:border-white/20 animate-pulse">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Thống kê truy cập</h3>
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
        <h3 className="text-xl font-semibold mb-4">Thống kê truy cập</h3>
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

  if (!analyticsData || analyticsData.dates.length === 0) {
    return (
      <div className="p-6 bg-white dark:bg-white/10 backdrop-blur-md rounded-lg border border-gray-200 dark:border-white/20">
        <h3 className="text-xl font-semibold mb-4">Thống kê truy cập</h3>
        <div className="h-64 flex items-center justify-center">
          <p className="text-neutral-600 dark:text-neutral-400">Chưa có dữ liệu phân tích</p>
        </div>
      </div>
    );
  }

  const isDark = theme === 'dark';
  
  // Định dạng lại các ngày cho đẹp hơn
  const formattedDates = analyticsData.dates.map(formatDate);

  // Tính tổng người dùng và lượt xem
  const totalUsers = analyticsData.activeUsers.reduce((a, b) => a + b, 0);
  const totalViews = analyticsData.pageViews.reduce((a, b) => a + b, 0);

  // Cấu hình dữ liệu cho biểu đồ
  const chartData = {
    labels: formattedDates,
    datasets: [
      {
        label: 'Người dùng hoạt động',
        data: analyticsData.activeUsers,
        borderColor: 'rgb(82, 39, 183)',
        backgroundColor: 'rgba(82, 39, 183, 0.5)',
        tension: 0.4,
        fill: false,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: 'rgb(82, 39, 183)'
      },
      {
        label: 'Lượt xem trang',
        data: analyticsData.pageViews,
        borderColor: 'rgb(219, 166, 166)',
        backgroundColor: 'rgba(219, 166, 166, 0.5)',
        tension: 0.4,
        fill: false,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: 'rgb(219, 166, 166)'
      },
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
        position: 'top' as const,
        labels: {
          color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
          font: {
            family: 'Inter',
            size: 12
          },
          usePointStyle: true,
          pointStyle: 'circle'
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
        boxPadding: 6
      }
    },
    scales: {
      x: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
          font: {
            family: 'Inter',
            size: 11
          },
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
          font: {
            family: 'Inter',
            size: 11
          }
        },
        beginAtZero: true
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="p-6 bg-white dark:bg-white/10 backdrop-blur-md rounded-lg border border-gray-200 dark:border-white/20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h3 className="text-xl font-semibold mb-2 md:mb-0">Thống kê truy cập</h3>
        <div className="flex gap-2 items-center">
          {/* <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as any)}
            className="bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="7days">7 ngày</option>
            <option value="30days">30 ngày</option>
            <option value="90days">90 ngày</option>
          </select> */}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-md bg-gray-100 dark:bg-white/5 text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Tổng người dùng</p>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>
        <div className="p-4 rounded-md bg-gray-100 dark:bg-white/5 text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Tổng lượt xem</p>
          <p className="text-2xl font-bold">{totalViews}</p>
        </div>
      </div>

      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
} 