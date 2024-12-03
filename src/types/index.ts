export interface MenuItem {
  title: string;
  icon: string;
  path: string;
}

export interface Stats {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

export interface Member {
  id: string;
  name: string;
  status: 'active' | 'vip' | 'blocked';
  joinDate: string;
  lastVisit: string;
}

export interface OfficeMoney {
  id: string;
  amount: number;
  type: 'deposit' | 'withdraw';
  notes?: string;
  created_at: string;
}