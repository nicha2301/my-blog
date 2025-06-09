'use client';

import OverviewChart from '@/app/components/analytics/OverviewChart';
import PopularPosts from '@/app/components/analytics/PopularPosts';
import TrafficSources from '@/app/components/analytics/TrafficSources';
import UsersByCountry from '@/app/components/analytics/UsersByCountry';
import UserActivityChart from '@/app/components/analytics/UserActivityChart';
import EventCountChart from '@/app/components/analytics/EventCountChart';

export default function AnalyticsDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold">
          Thống kê <span className="text-primary">Website</span>
        </h1>
        <div className="mt-4 md:mt-0 bg-white/5 dark:bg-white/5 border border-gray-200 dark:border-white/20 rounded-lg px-4 py-2 text-sm">
          Dữ liệu được cập nhật từ Google Analytics 4
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <OverviewChart />
        </div>
        <div className="lg:col-span-1">
          <TrafficSources />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <UsersByCountry />
        </div>
        <div className="lg:col-span-2">
          <PopularPosts />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="lg:col-span-1">
          <UserActivityChart />
        </div>
        <div className="lg:col-span-1">
          <EventCountChart />
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
        <p>Google Analytics Data API - Thời gian thực</p>
      </div>
    </div>
  );
} 