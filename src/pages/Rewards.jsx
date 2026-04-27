import { Crown, Zap, Gift, Star, ChevronRight, Lock } from 'lucide-react';
import { mockUser } from '../data/mockData';

const tiers = [
  { name: 'Bronze', min: 0, max: 500, color: '#CD7F32', emoji: '🥉' },
  { name: 'Silver', min: 500, max: 1000, color: '#C0C0C0', emoji: '🥈' },
  { name: 'Gold', min: 1000, max: 2000, color: '#FFD700', emoji: '🥇' },
  { name: 'Crown', min: 2000, max: 5000, color: '#F5A623', emoji: '👑' },
];

const rewards = [
  { id: 1, name: 'Free Fries (M)', points: 200, available: true, emoji: '🍟' },
  { id: 2, name: 'Free Soft Drink', points: 150, available: true, emoji: '🥤' },
  { id: 3, name: 'Whopper Burger', points: 500, available: false, emoji: '🍔' },
  { id: 4, name: '20% Off Next Order', points: 300, available: true, emoji: '🎟️' },
  { id: 5, name: 'Free Dessert', points: 180, available: true, emoji: '🍦' },
  { id: 6, name: 'Family Meal Deal', points: 1000, available: false, emoji: '👨‍👩‍👧' },
];

const transactions = [
  { id: 1, label: 'Order #BK9823', points: +120, date: 'Today', positive: true },
  { id: 2, label: 'Redeemed Free Fries', points: -200, date: 'Yesterday', positive: false },
  { id: 3, label: 'Order #BK9741', points: +85, date: '2 days ago', positive: true },
  { id: 4, label: 'Order #BK9610', points: +200, date: '1 week ago', positive: true },
];

const currentTier = tiers.find(t => mockUser.crownPoints >= t.min && mockUser.crownPoints < t.max) || tiers[2];
const nextTier = tiers[tiers.indexOf(currentTier) + 1];
const progress = nextTier ? ((mockUser.crownPoints - currentTier.min) / (nextTier.min - currentTier.min)) * 100 : 100;

export default function Rewards() {
  return (
    <div className="pb-24 animate-fade-in">
      {/* Header */}
      <div className="relative px-5 pt-12 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bk-orange/15 via-bk-orange/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-bk-orange/5 -translate-y-12 translate-x-12" />

        <div className="flex items-center gap-2 mb-6">
          <Crown size={22} className="text-bk-orange" />
          <h1 className="text-2xl font-display tracking-wide text-bk-text">Crown Rewards</h1>
        </div>

        {/* Points card */}
        <div className="bg-gradient-to-br from-bk-card to-bk-muted border border-bk-orange/30 rounded-3xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-bk-orange/5 -translate-y-8 translate-x-8" />
          <p className="text-bk-sub text-xs font-medium uppercase tracking-wider mb-1">Your Balance</p>
          <div className="flex items-end gap-2 mb-1">
            <span className="text-5xl font-display tracking-wide text-bk-text">{mockUser.crownPoints.toLocaleString()}</span>
            <span className="text-bk-orange text-sm font-semibold mb-2">pts</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">{currentTier.emoji}</span>
            <span className="text-sm font-semibold" style={{ color: currentTier.color }}>{currentTier.name} Member</span>
          </div>

          {nextTier && (
            <>
              <div className="flex justify-between text-xs text-bk-sub mb-1.5">
                <span>{mockUser.crownPoints} pts</span>
                <span>{nextTier.min} pts to {nextTier.name}</span>
              </div>
              <div className="h-2 bg-bk-dark rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${progress}%`, background: `linear-gradient(to right, ${currentTier.color}, ${nextTier.color})` }}
                />
              </div>
              <p className="text-xs text-bk-sub mt-2">
                <span className="font-semibold text-bk-text">{nextTier.min - mockUser.crownPoints} pts</span> more to reach {nextTier.name}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Tier progress */}
      <div className="px-5 mb-6">
        <h3 className="text-sm font-semibold text-bk-text mb-3">Membership Tiers</h3>
        <div className="flex gap-2">
          {tiers.map((tier, i) => {
            const reached = mockUser.crownPoints >= tier.min;
            const active = tier.name === currentTier.name;
            return (
              <div key={tier.name} className={`flex-1 rounded-xl p-3 text-center border transition-all ${
                active ? 'border-opacity-50' : reached ? 'border-bk-border' : 'border-bk-border opacity-40'
              }`} style={active ? { borderColor: tier.color + '80', background: tier.color + '15' } : {}}>
                <p className="text-xl mb-1">{tier.emoji}</p>
                <p className="text-[10px] font-semibold" style={{ color: reached ? tier.color : '#9A9A9A' }}>{tier.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rewards */}
      <div className="px-5 mb-6">
        <h3 className="text-sm font-semibold text-bk-text mb-3 flex items-center gap-2">
          <Gift size={15} className="text-bk-red" />
          Redeem Rewards
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {rewards.map(reward => (
            <button
              key={reward.id}
              disabled={!reward.available || mockUser.crownPoints < reward.points}
              className={`bg-bk-card border rounded-2xl p-4 text-left transition-all duration-200 relative ${
                reward.available && mockUser.crownPoints >= reward.points
                  ? 'border-bk-border hover:border-bk-red/40 active:scale-95'
                  : 'border-bk-border opacity-50'
              }`}
            >
              {!reward.available && (
                <Lock size={12} className="absolute top-3 right-3 text-bk-sub" />
              )}
              <span className="text-2xl block mb-2">{reward.emoji}</span>
              <p className="text-sm font-semibold text-bk-text leading-tight mb-2">{reward.name}</p>
              <div className="flex items-center gap-1">
                <Crown size={11} className="text-bk-orange" />
                <span className="text-xs font-bold text-bk-orange">{reward.points} pts</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Transaction history */}
      <div className="px-5">
        <h3 className="text-sm font-semibold text-bk-text mb-3 flex items-center gap-2">
          <Zap size={15} className="text-bk-orange" />
          Points History
        </h3>
        <div className="bg-bk-card border border-bk-border rounded-2xl overflow-hidden">
          {transactions.map((t, i) => (
            <div key={t.id} className={`flex items-center justify-between px-4 py-3.5 ${i < transactions.length - 1 ? 'border-b border-bk-border' : ''}`}>
              <div>
                <p className="text-sm font-medium text-bk-text">{t.label}</p>
                <p className="text-xs text-bk-sub">{t.date}</p>
              </div>
              <span className={`text-sm font-bold ${t.positive ? 'text-green-400' : 'text-bk-red'}`}>
                {t.positive ? '+' : ''}{t.points}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
