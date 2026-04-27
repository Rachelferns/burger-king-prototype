import { Link } from 'react-router-dom';
import { Star, Plus, Leaf, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ItemCard({ item, layout = 'grid' }) {
  const { addItem, items } = useCart();
  const inCart = items.find(i => i.id === item.id);

  if (layout === 'list') {
    return (
      <Link to={`/item/${item.id}`} className="flex gap-3 bg-bk-card rounded-2xl p-3 border border-bk-border hover:border-bk-red/40 transition-all duration-200 group">
        <div className="relative w-24 h-20 rounded-xl overflow-hidden flex-shrink-0">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          {item.isBestseller && (
            <span className="absolute top-1 left-1 bg-bk-orange text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full">BEST</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                {item.isVeg
                  ? <span className="w-3 h-3 rounded-sm border border-green-500 flex items-center justify-center"><span className="w-1.5 h-1.5 rounded-full bg-green-500 block" /></span>
                  : <span className="w-3 h-3 rounded-sm border border-red-500 flex items-center justify-center"><span className="w-1.5 h-1.5 rounded-full bg-red-500 block" /></span>
                }
                {item.isNew && <span className="text-[9px] bg-bk-red/20 text-bk-red px-1.5 rounded-full font-semibold">NEW</span>}
              </div>
              <h3 className="text-sm font-semibold text-bk-text leading-tight">{item.name}</h3>
              <p className="text-[11px] text-bk-sub mt-0.5 line-clamp-1">{item.description}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div>
              <span className="text-base font-bold text-bk-text">₹{item.price}</span>
              <div className="flex items-center gap-1 mt-0.5">
                <Star size={10} className="text-bk-yellow fill-bk-yellow" />
                <span className="text-[10px] text-bk-sub">{item.rating}</span>
                <span className="text-[10px] text-bk-sub">• {item.calories} kcal</span>
              </div>
            </div>
            <button
              onClick={(e) => { e.preventDefault(); addItem(item); }}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
                inCart ? 'bg-bk-red text-white' : 'bg-bk-muted text-bk-text hover:bg-bk-red hover:text-white'
              }`}
            >
              <Plus size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/item/${item.id}`} className="bg-bk-card rounded-2xl overflow-hidden border border-bk-border hover:border-bk-red/40 transition-all duration-200 group block">
      <div className="relative h-40 overflow-hidden">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {item.isBestseller && (
          <span className="absolute top-2 left-2 bg-bk-orange text-black text-[10px] font-bold px-2 py-0.5 rounded-full">BESTSELLER</span>
        )}
        {item.isNew && (
          <span className="absolute top-2 right-2 bg-bk-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
        )}
        <div className="absolute bottom-2 left-2 flex items-center gap-1">
          <Star size={11} className="text-bk-yellow fill-bk-yellow" />
          <span className="text-xs text-white font-semibold">{item.rating}</span>
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-1.5 mb-1">
          {item.isVeg
            ? <span className="w-3.5 h-3.5 rounded-sm border border-green-500 flex items-center justify-center flex-shrink-0"><span className="w-2 h-2 rounded-full bg-green-500 block" /></span>
            : <span className="w-3.5 h-3.5 rounded-sm border border-red-500 flex items-center justify-center flex-shrink-0"><span className="w-2 h-2 rounded-full bg-red-500 block" /></span>
          }
          <h3 className="text-sm font-semibold text-bk-text truncate">{item.name}</h3>
        </div>
        <p className="text-[11px] text-bk-sub line-clamp-2 mb-3 leading-relaxed">{item.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-base font-bold text-bk-text">₹{item.price}</span>
            <p className="text-[10px] text-bk-sub">{item.calories} kcal</p>
          </div>
          <button
            onClick={(e) => { e.preventDefault(); addItem(item); }}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-90 ${
              inCart ? 'bg-bk-red text-white shadow-lg shadow-bk-red/30' : 'bg-bk-muted text-bk-text hover:bg-bk-red hover:text-white'
            }`}
          >
            <Plus size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </Link>
  );
}
