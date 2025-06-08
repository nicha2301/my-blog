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
  const [analyticsData, setAnalyticsData] = useState<{
    dates: string[];
    activeUsers: number[];
    pageViews: number[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalyticsData() {
      try {
        const response = await fetch('/api/analytics');
        if (!response.ok) {
          throw new Error('Không thể lấy dữ liệu Analytics');
        }
        const data = await response.json();
        setAnalyticsData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalyticsData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
        <h3 className="text-xl font-semibold mb-4">Thống kê truy cập</h3>
        <div className="h-64 flex items-center justify-center">
          <p>Đang tải dữ liệu phân tích...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
        <h3 className="text-xl font-semibold mb-4">Thống kê truy cập</h3>
        <div className="h-64 flex items-center justify-center">
          <p>Lỗi: {error}</p>
        </div>
      </div>
    );
  }

  if (!analyticsData || analyticsData.dates.length === 0) {
    return (
      <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
        <h3 className="text-xl font-semibold mb-4">Thống kê truy cập</h3>
        <div className="h-64 flex items-center justify-center">
          <p>Không có dữ liệu phân tích</p>
        </div>
      </div>
    );
  }

  // Định dạng lại các ngày cho đẹp hơn
  const formattedDates = analyticsData.dates.map(date => {
    // Chuyển đổi YYYYMMDD thành DD/MM
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    return `${day}/${month}`;
  });

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
        fill: false
      },
      {
        label: 'Lượt xem trang',
        data: analyticsData.pageViews,
        borderColor: 'rgb(219, 166, 166)',
        backgroundColor: 'rgba(219, 166, 166, 0.5)',
        tension: 0.4,
        fill: false
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            family: 'Inter',
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: {
          family: 'Inter'
        },
        bodyFont: {
          family: 'Inter'
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            family: 'Inter',
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            family: 'Inter',
          }
        }
      }
    }
  };

  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
      <h3 className="text-xl font-semibold mb-4">Thống kê truy cập</h3>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
} 