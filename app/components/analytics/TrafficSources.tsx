'use client';

import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Đăng ký các component cần thiết
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface TrafficSource {
  source: string;
  sessions: number;
  users: number;
}

export default function TrafficSources() {
  const [trafficData, setTrafficData] = useState<TrafficSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrafficData() {
      try {
        const response = await fetch('/api/analytics/sources');
        if (!response.ok) {
          throw new Error('Không thể lấy dữ liệu nguồn truy cập');
        }
        const data = await response.json();
        setTrafficData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTrafficData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
        <h3 className="text-xl font-semibold mb-4">Nguồn truy cập</h3>
        <div className="h-64 flex items-center justify-center">
          <p>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
        <h3 className="text-xl font-semibold mb-4">Nguồn truy cập</h3>
        <div className="h-64 flex items-center justify-center">
          <p>Lỗi: {error}</p>
        </div>
      </div>
    );
  }

  if (!trafficData || trafficData.length === 0) {
    return (
      <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
        <h3 className="text-xl font-semibold mb-4">Nguồn truy cập</h3>
        <div className="h-64 flex items-center justify-center">
          <p>Không có dữ liệu nguồn truy cập</p>
        </div>
      </div>
    );
  }

  // Màu sắc cho biểu đồ
  const backgroundColors = [
    'rgba(82, 39, 183, 0.8)',
    'rgba(219, 166, 166, 0.8)',
    'rgba(63, 100, 126, 0.8)',
    'rgba(91, 143, 249, 0.8)',
    'rgba(146, 126, 243, 0.8)',
    'rgba(200, 153, 201, 0.8)',
    'rgba(129, 180, 179, 0.8)',
    'rgba(165, 120, 196, 0.8)',
  ];

  // Đổi tên nguồn truy cập cho dễ đọc
  const getReadableName = (source: string) => {
    if (source === '(direct)') return 'Trực tiếp';
    if (source === 'google') return 'Google';
    if (source === 'facebook') return 'Facebook';
    if (source === 'instagram') return 'Instagram';
    if (source === 't.co' || source === 'twitter.com' || source === 'twitter') return 'Twitter';
    if (source === 'youtube' || source === 'youtube.com') return 'YouTube';
    return source;
  };

  // Dữ liệu cho biểu đồ tròn
  const chartData = {
    labels: trafficData.map(item => getReadableName(item.source)),
    datasets: [
      {
        data: trafficData.map(item => item.sessions),
        backgroundColor: backgroundColors,
        borderWidth: 0,
      },
    ],
  };

  // Tùy chọn biểu đồ
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            family: 'Inter',
            size: 11
          },
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: {
          family: 'Inter'
        },
        bodyFont: {
          family: 'Inter'
        },
        callbacks: {
          label: function(context: any) {
            const value = context.raw;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${value} phiên (${percentage}%)`;
          }
        }
      }
    },
    cutout: '60%'
  };

  // Tính tổng số phiên
  const totalSessions = trafficData.reduce((sum, source) => sum + source.sessions, 0);

  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
      <h3 className="text-xl font-semibold mb-4">Nguồn truy cập</h3>
      <div className="h-64 relative">
        <Doughnut data={chartData} options={chartOptions} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-xl font-semibold">{totalSessions}</div>
          <div className="text-xs opacity-70">Tổng phiên</div>
        </div>
      </div>
    </div>
  );
} 