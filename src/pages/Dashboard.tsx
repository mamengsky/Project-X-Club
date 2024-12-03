import React from 'react';
import { Users, TrendingUp, Package, Crown } from 'lucide-react';
import { useDashboardStats } from '../hooks/useDashboardStats';
import StatsCard from '../components/dashboard/StatsCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import FeaturedEvent from '../components/dashboard/FeaturedEvent';
import AdminButton from '../components/dashboard/AdminButton';
import LogoutButton from '../components/dashboard/LogoutButton';

export default function Dashboard() {
  const { stats, loading, error } = useDashboardStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-pulse text-purple-400">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 text-red-400 p-4 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col gap-4 sm:gap-6 lg:gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-sm text-gray-400">Your exclusive gateway to luxury awaits</p>
        </div>
        <div className="flex items-center gap-3">
          <LogoutButton />
          <AdminButton />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Total Members"
          value={stats.totalMembers.toString()}
          change={`${stats.totalMembers} active members`}
          trend="up"
          icon={<Users className="w-4 h-4" />}
        />
        <StatsCard
          label="Top Sales"
          value={stats.topSeller?.name || 'N/A'}
          change={`${stats.topSeller?.total || 0} sales`}
          trend="up"
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <StatsCard
          label="Top Purchases"
          value={stats.topBuyer?.name || 'N/A'}
          change={`${stats.topBuyer?.total || 0} purchases`}
          trend="up"
          icon={<Package className="w-4 h-4" />}
        />
        <StatsCard
          label="Top Items"
          value={stats.topItems[0]?.item_type || 'N/A'}
          change={`${stats.topItems[0]?.total || 0} transactions`}
          trend="up"
          icon={<Crown className="w-4 h-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
        <FeaturedEvent />
        <RecentActivity transactions={stats.recentActivity} />
      </div>
    </div>
  );
}