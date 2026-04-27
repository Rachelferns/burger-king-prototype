import { Link, useLocation } from 'react-router-dom';
import { Home, UtensilsCrossed, ShoppingBag, Crown } from 'lucide-react';
import { useCart } from '../context/CartContext';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/menu', icon: UtensilsCrossed, label: 'Menu' },
  { path: '/cart', icon: ShoppingBag, label: 'Cart' },
  { path: '/rewards', icon: Crown, label: 'Rewards' },
];

export default function Navbar() {
  const location = useLocation();
  const { totalItems } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto">
      <div className="bg-bk-card border-t border-bk-border backdrop-blur-xl bg-opacity-95">
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.map(({ path, icon: Icon, label }) => {
            const active = location.pathname === path;
            const isCart = path === '/cart';
            return (
              <Link
                key={path}
                to={path}
                className={`relative flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all duration-200 ${
                  active ? 'text-bk-red' : 'text-bk-sub hover:text-bk-text'
                }`}
              >
                <div className="relative">
                  <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
                  {isCart && totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-bk-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pop">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className={`text-[11px] font-medium ${active ? 'text-bk-red' : ''}`}>{label}</span>
                {active && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-bk-red" />}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
