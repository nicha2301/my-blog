import { Metadata } from "next";
import OverviewChart from "@/app/components/analytics/OverviewChart";
import PopularPosts from "@/app/components/analytics/PopularPosts";
import TrafficSources from "@/app/components/analytics/TrafficSources";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Phân tích dữ liệu | Minimal Journal",
  description: "Bảng điều khiển phân tích dữ liệu của Minimal Journal Blog",
};

function AnalyticsLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-64 bg-white/5 backdrop-blur-sm rounded-lg mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-80 bg-white/5 backdrop-blur-sm rounded-lg"></div>
        <div className="h-80 bg-white/5 backdrop-blur-sm rounded-lg"></div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Phân tích dữ liệu</h1>
        <p className="text-white/60">
          Bảng điều khiển hiển thị thống kê truy cập và dữ liệu phân tích của blog
        </p>
      </div>

      <Suspense fallback={<AnalyticsLoading />}>
        <div className="mb-6">
          <OverviewChart />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PopularPosts />
          <TrafficSources />
        </div>

        <div className="mt-6 text-center text-sm text-white/40">
          <p>Dữ liệu được cập nhật từ Google Analytics 4 và có thể có độ trễ tối đa 24 giờ</p>
        </div>
      </Suspense>
    </main>
  );
} 