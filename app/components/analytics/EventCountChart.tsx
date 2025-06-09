'use client';

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useTheme } from 'next-themes';

// 注册需要的ChartJS组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface EventData {
  eventName: string;
  count: number;
}

interface EventCountResponse {
  events: EventData[];
}

export default function EventCountChart() {
  const { theme } = useTheme();
  const [eventData, setEventData] = useState<EventCountResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchEventData() {
      try {
        setLoading(true);
        // 使用当前窗口URL的主机名和端口，确保请求发送到正确端口
        const host = window.location.origin;
        const response = await fetch(`${host}/api/analytics/events`);
        if (!response.ok) {
          throw new Error('Không thể lấy dữ liệu sự kiện');
        }
        const data = await response.json();
        console.log('事件数据:', data); // 调试用
        
        setEventData(data);
        setError(null);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
        console.error('Lỗi khi tải dữ liệu sự kiện:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchEventData();
  }, []);

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="p-6 bg-white dark:bg-white/10 backdrop-blur-md rounded-lg border border-gray-200 dark:border-white/20 animate-pulse">
        <h3 className="text-xl font-semibold mb-4">Số lượng sự kiện</h3>
        <div className="h-64 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white dark:bg-white/10 backdrop-blur-md rounded-lg border border-gray-200 dark:border-white/20">
        <h3 className="text-xl font-semibold mb-4">Số lượng sự kiện</h3>
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

  if (!eventData || !eventData.events || eventData.events.length === 0) {
    return (
      <div className="p-6 bg-white dark:bg-white/10 backdrop-blur-md rounded-lg border border-gray-200 dark:border-white/20">
        <h3 className="text-xl font-semibold mb-4">Số lượng sự kiện</h3>
        <div className="h-64 flex items-center justify-center">
          <p className="text-neutral-600 dark:text-neutral-400">Chưa có dữ liệu sự kiện</p>
        </div>
      </div>
    );
  }

  const isDark = theme === 'dark';

  // 排序事件数据
  const sortedEvents = [...eventData.events].sort((a, b) => b.count - a.count);
  
  // 准备图表数据
  const chartData = {
    labels: sortedEvents.map(event => event.eventName),
    datasets: [
      {
        label: 'Số lượng sự kiện',
        data: sortedEvents.map(event => event.count),
        backgroundColor: 'rgba(82, 39, 183, 0.7)',
        borderColor: 'rgb(82, 39, 183)',
        borderWidth: 1,
        borderRadius: 4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const, // 水平条形图
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
          }
        }
      },
      y: {
        grid: {
          display: false,
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

  return (
    <div className="p-6 bg-white dark:bg-white/10 backdrop-blur-md rounded-lg border border-gray-200 dark:border-white/20">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Số lượng sự kiện</h3>
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          <span className="font-medium">30 ngày qua</span>
        </div>
      </div>

      <div className="h-80">
        <Bar data={chartData} options={options} />
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-white/10">
        <div className="flex justify-between items-center">
          <span className="text-xs text-neutral-600 dark:text-neutral-400">
            Tổng số sự kiện: {sortedEvents.reduce((sum, event) => sum + event.count, 0)}
          </span>
          <button className="text-xs text-primary hover:text-primary/80 transition">
            Xem tất cả sự kiện
          </button>
        </div>
      </div>
    </div>
  );
} 