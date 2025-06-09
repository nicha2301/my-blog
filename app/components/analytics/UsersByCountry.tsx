'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

interface CountryData {
  country: string;
  users: number;
  countryCode?: string;
}

interface CountriesResponse {
  countries: CountryData[];
}

export default function UsersByCountry() {
  const { } = useTheme();
  const [countriesData, setCountriesData] = useState<CountriesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchCountriesData() {
      try {
        setLoading(true);
        // 使用当前窗口URL的主机名和端口
        const host = window.location.origin;
        const response = await fetch(`${host}/api/analytics/countries`);
        if (!response.ok) {
          throw new Error('Không thể lấy dữ liệu người dùng theo quốc gia');
        }
        const data = await response.json();
        console.log('国家数据:', data); // 调试用
        
        setCountriesData(data);
        setError(null);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
        console.error('Lỗi khi tải dữ liệu quốc gia:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCountriesData();
  }, []);

  const getCountryFlag = (countryCode?: string) => {
    if (!countryCode) return null;
    if (countryCode === 'globe') {
      return (
        <div className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
      );
    }
    
    return (
      <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <img 
          src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
          alt={`Flag of ${countryCode}`}
          className="w-full h-full object-cover"
        />
      </div>
    );
  };

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="p-6 bg-white dark:bg-white/10 backdrop-blur-md rounded-lg border border-gray-200 dark:border-white/20 animate-pulse">
        <h3 className="text-xl font-semibold mb-4">Người dùng theo quốc gia</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-200 dark:bg-white/20 rounded-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-white/20 rounded w-24"></div>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-white/20 rounded w-12"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white dark:bg-white/10 backdrop-blur-md rounded-lg border border-gray-200 dark:border-white/20">
        <h3 className="text-xl font-semibold mb-4">Người dùng theo quốc gia</h3>
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

  if (!countriesData || !countriesData.countries || countriesData.countries.length === 0) {
    return (
      <div className="p-6 bg-white dark:bg-white/10 backdrop-blur-md rounded-lg border border-gray-200 dark:border-white/20">
        <h3 className="text-xl font-semibold mb-4">Người dùng theo quốc gia</h3>
        <div className="h-64 flex items-center justify-center">
          <p className="text-neutral-600 dark:text-neutral-400">Chưa có dữ liệu về người dùng theo quốc gia</p>
        </div>
      </div>
    );
  }

  // Tính tổng người dùng
  const totalUsers = countriesData.countries.reduce((sum, country) => sum + country.users, 0);

  return (
    <div className="p-6 bg-white dark:bg-white/10 backdrop-blur-md rounded-lg border border-gray-200 dark:border-white/20">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Người dùng theo quốc gia</h3>
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          Tổng: <span className="font-medium">{totalUsers}</span> người dùng
        </div>
      </div>

      <div className="space-y-4">
        {countriesData.countries.map((country, index) => {
          const percentage = (country.users / totalUsers * 100).toFixed(1);
          
          return (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-shrink-0">
                {getCountryFlag(country.countryCode)}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{country.country}</span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    {country.users} ({percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-white/10">
        <div className="flex justify-between items-center">
          <span className="text-xs text-neutral-600 dark:text-neutral-400">
            Dữ liệu 30 ngày qua
          </span>
          <button className="text-xs text-primary hover:text-primary/80 transition">
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
} 