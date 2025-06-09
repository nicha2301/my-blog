'use client';

import UsersByCountry from '@/app/components/analytics/UsersByCountry';
import UserActivityChart from '@/app/components/analytics/UserActivityChart';
import EventCountChart from '@/app/components/analytics/EventCountChart';

export default function AnalyticsTestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Kiểm tra <span className="text-primary">Thành phần Analytics</span>
      </h1>
      
      <div className="mb-6">
        <h2 className="text-xl mb-4">UsersByCountry</h2>
        <UsersByCountry />
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl mb-4">UserActivityChart</h2>
        <UserActivityChart />
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl mb-4">EventCountChart</h2>
        <EventCountChart />
      </div>
    </div>
  );
} 