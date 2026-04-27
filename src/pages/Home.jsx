import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, ChevronRight, Zap, Crown, ArrowRight } from 'lucide-react';
import { mockUser, deals, categories } from '../data/mockData';
import { useRecommendations } from '../hooks/useRecommendations';
import ItemCard from '../components/ItemCard';

export default function Home() {
  const [filter, setFilter] = useState('all');
  const recommendations = useRecommendations(mockUser.recentOrders);

  const filtered = filter === 'veg'
    ? recommendations.filter(i => i.isVeg)
    : filter === 'non-veg'
    ? recommendations.filter(i => !i.isVeg)
    : recommendations;

  return (
    <div className="pb-24 animate-fade-in">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-bk-red/10 to-transparent pointer-events-none" />
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-bk-sub text-sm font-medium">Good evening 🔥</p>
            <h1 className="text-3xl font-display tracking-wide text-bk-text mt-0.5">
              Hi, {mockUser.name}!
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-xl bg-bk-card border border-bk-border flex items-center justify-center text-bk-sub hover:text-bk-text transition-colors">
              <Bell size={18} />
            </button>
            <Link to="/rewards" className="flex items-center gap-1.5 bg-gradient-to-r from-bk-orange/20 to-bk-yellow/20 border border-bk-orange/30 rounded-xl px-3 py-2">
              <Crown size={14} className="text-bk-orange" />
              <span className="text-xs font-bold text-bk-orange">{mockUser.crownPoints.toLocaleString()}</span>
            </Link>
          </div>
        </div>

        {/* Search bar */}
        <Link to="/menu" className="flex items-center gap-3 bg-bk-card border border-bk-border rounded-2xl px-4 py-3 hover:border-bk-red/40 transition-colors group">
          <Search size={18} className="text-bk-sub group-hover:text-bk-red transition-colors" />
          <span className="text-bk-sub text-sm">Search burgers, fries, drinks...</span>
        </Link>
      </div>

      {/* Deals Carousel */}
      <div className="px-5 mb-6">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {deals.map((deal, i) => (
            <div
              key={deal.id}
              className="flex-shrink-0 w-64 rounded-2xl p-4 relative overflow-hidden cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${deal.color}ee, ${deal.color}88)` }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/5 -translate-y-6 translate-x-6" />
              <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white/5 translate-y-4 -translate-x-4" />
              <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full text-white backdrop-blur-sm">{deal.badge}</span>
              <div className="mt-3">
                <p className="text-2xl mb-0.5">{deal.emoji}</p>
                <h3 className="text-lg font-display tracking-wide text-white leading-tight">{deal.title}</h3>
                <p className="text-white/70 text-xs mt-1">{deal.subtitle}</p>
              </div>
              <div className="flex items-center gap-1 mt-3 text-white/80 text-xs font-medium">
                <span>Grab it</span>
                <ArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Pills */}
      <div className="px-5 mb-5">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <Link to="/menu" className="flex-shrink-0 flex items-center gap-2 bg-bk-card border border-bk-border rounded-xl px-3 py-2 hover:border-bk-red/40 transition-colors">
            <span className="text-xs font-medium text-bk-sub">View All</span>
            <ChevronRight size={12} className="text-bk-sub" />
          </Link>
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/menu?category=${cat.id}`}
              className="flex-shrink-0 flex items-center gap-1.5 bg-bk-card border border-bk-border rounded-xl px-3 py-2 hover:border-bk-red/40 transition-colors"
            >
              <span className="text-base">{cat.emoji}</span>
              <span className="text-xs font-medium text-bk-sub whitespace-nowrap">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-display tracking-wide text-bk-text">For You</h2>
            <p className="text-xs text-bk-sub">Based on your taste</p>
          </div>
          <div className="flex items-center gap-1.5 bg-bk-muted rounded-xl p-1">
            {[['all', 'All'], ['veg', '🌿 Veg'], ['non-veg', '🍗 Non-Veg']].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setFilter(val)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  filter === val ? 'bg-bk-red text-white shadow-sm' : 'text-bk-sub hover:text-bk-text'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filtered.map((item, i) => (
            <div key={item.id} style={{ animationDelay: `${i * 60}ms` }} className="animate-slide-up">
              <ItemCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Crown Rewards Banner */}
      <div className="px-5 mt-6">
        <Link to="/rewards" className="block bg-gradient-to-r from-bk-card to-bk-muted border border-bk-border rounded-2xl p-4 relative overflow-hidden group">
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bk-orange/10 to-transparent" />
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Crown size={16} className="text-bk-orange" />
                <span className="text-xs font-semibold text-bk-orange uppercase tracking-wider">Crown Rewards</span>
              </div>
              <p className="text-bk-text font-semibold text-sm">You have <span className="text-bk-orange">{mockUser.crownPoints} pts</span></p>
              <p className="text-bk-sub text-xs mt-0.5">Only 260 pts to next reward!</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-bk-orange/20 flex items-center justify-center group-hover:bg-bk-orange/30 transition-colors">
              <Zap size={20} className="text-bk-orange" />
            </div>
          </div>
          <div className="mt-3 bg-bk-muted rounded-full h-1.5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-bk-orange to-bk-yellow rounded-full" style={{ width: `${(mockUser.crownPoints % 1500) / 15}%` }} />
          </div>
        </Link>
      </div>
    </div>
  );
}
