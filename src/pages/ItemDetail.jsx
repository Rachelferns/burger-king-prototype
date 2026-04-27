import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Star, Minus, Plus, ShoppingBag, Flame, Leaf, Check } from 'lucide-react';
import { menuItems } from '../data/mockData';
import { useCart } from '../context/CartContext';

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, items } = useCart();
  const item = menuItems.find(i => i.id === id);

  const [qty, setQty] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [added, setAdded] = useState(false);

  if (!item) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-4xl mb-4">🍔</p>
      <p className="text-bk-sub mb-4">Item not found</p>
      <button onClick={() => navigate(-1)} className="text-bk-red text-sm">Go back</button>
    </div>
  );

  const toggleAddOn = (addOn) => {
    setSelectedAddOns(prev =>
      prev.find(a => a.id === addOn.id) ? prev.filter(a => a.id !== addOn.id) : [...prev, addOn]
    );
  };

  const addOnsTotal = selectedAddOns.reduce((s, a) => s + a.price, 0);
  const itemTotal = (item.price + addOnsTotal) * qty;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(item, selectedAddOns);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Related items
  const related = menuItems.filter(i => i.categoryId === item.categoryId && i.id !== item.id).slice(0, 3);

  return (
    <div className="pb-32 animate-fade-in">
      {/* Hero image */}
      <div className="relative h-72 overflow-hidden">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bk-dark via-transparent to-black/30" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 w-10 h-10 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Cart button */}
        <Link
          to="/cart"
          className="absolute top-12 right-4 w-10 h-10 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          <ShoppingBag size={18} />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-bk-red rounded-full text-[10px] flex items-center justify-center font-bold">
              {items.reduce((s, i) => s + i.qty, 0)}
            </span>
          )}
        </Link>

        {/* Badges */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          {item.tags.map(tag => (
            <span key={tag} className="text-[11px] font-semibold bg-bk-red/90 text-white px-2.5 py-1 rounded-full backdrop-blur-sm">{tag}</span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-5">
        {/* Title row */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {item.isVeg
                ? <span className="w-4 h-4 rounded-sm border border-green-500 flex items-center justify-center"><span className="w-2.5 h-2.5 rounded-full bg-green-500 block" /></span>
                : <span className="w-4 h-4 rounded-sm border border-red-500 flex items-center justify-center"><span className="w-2.5 h-2.5 rounded-full bg-red-500 block" /></span>
              }
              <span className="text-xs text-bk-sub">{item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}</span>
            </div>
            <h1 className="text-2xl font-display tracking-wide text-bk-text">{item.name}</h1>
          </div>
          <div className="flex items-center gap-1 bg-bk-card border border-bk-border rounded-xl px-2.5 py-1.5 flex-shrink-0">
            <Star size={13} className="text-bk-yellow fill-bk-yellow" />
            <span className="text-sm font-bold text-bk-text">{item.rating}</span>
          </div>
        </div>

        <p className="text-bk-sub text-sm leading-relaxed mb-4">{item.description}</p>

        {/* Nutrition */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 bg-bk-card border border-bk-border rounded-xl p-3 text-center">
            <Flame size={16} className="text-bk-red mx-auto mb-1" />
            <p className="text-base font-bold text-bk-text">{item.calories}</p>
            <p className="text-[10px] text-bk-sub">Calories</p>
          </div>
          <div className="flex-1 bg-bk-card border border-bk-border rounded-xl p-3 text-center">
            <span className="text-base block mb-1">💰</span>
            <p className="text-base font-bold text-bk-text">₹{item.price}</p>
            <p className="text-[10px] text-bk-sub">Base Price</p>
          </div>
          <div className="flex-1 bg-bk-card border border-bk-border rounded-xl p-3 text-center">
            <span className="text-base block mb-1">{item.isVeg ? '🌿' : '🍗'}</span>
            <p className="text-base font-bold text-bk-text">{item.isVeg ? 'Veg' : 'Non-Veg'}</p>
            <p className="text-[10px] text-bk-sub">Type</p>
          </div>
        </div>

        {/* Add-ons */}
        {item.addOns.length > 0 && (
          <div className="mb-6">
            <h3 className="text-base font-semibold text-bk-text mb-3">Customise Your Order</h3>
            <div className="flex flex-col gap-2">
              {item.addOns.map(addOn => {
                const selected = selectedAddOns.find(a => a.id === addOn.id);
                return (
                  <button
                    key={addOn.id}
                    onClick={() => toggleAddOn(addOn)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 ${
                      selected ? 'bg-bk-red/10 border-bk-red/50' : 'bg-bk-card border-bk-border hover:border-bk-red/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                        selected ? 'bg-bk-red border-bk-red' : 'border-bk-border'
                      }`}>
                        {selected && <Check size={12} className="text-white" strokeWidth={3} />}
                      </div>
                      <span className="text-sm text-bk-text">{addOn.name}</span>
                    </div>
                    <span className={`text-sm font-semibold ${selected ? 'text-bk-red' : 'text-bk-sub'}`}>+₹{addOn.price}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Related items */}
        {related.length > 0 && (
          <div className="mb-6">
            <h3 className="text-base font-semibold text-bk-text mb-3">Goes Well With</h3>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
              {related.map(rel => (
                <Link key={rel.id} to={`/item/${rel.id}`} className="flex-shrink-0 w-32 bg-bk-card border border-bk-border rounded-xl overflow-hidden hover:border-bk-red/40 transition-colors">
                  <img src={rel.image} alt={rel.name} className="w-full h-20 object-cover" />
                  <div className="p-2">
                    <p className="text-xs font-medium text-bk-text truncate">{rel.name}</p>
                    <p className="text-xs text-bk-red font-semibold mt-0.5">₹{rel.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fixed bottom bar */}
      <div className="fixed bottom-[72px] left-0 right-0 max-w-md mx-auto px-5 py-3 bg-bk-dark/95 backdrop-blur-xl border-t border-bk-border">
        <div className="flex items-center gap-3">
          {/* Quantity */}
          <div className="flex items-center gap-2 bg-bk-card border border-bk-border rounded-xl px-3 py-2">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-6 h-6 rounded-lg bg-bk-muted flex items-center justify-center text-bk-text hover:bg-bk-red hover:text-white transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="w-6 text-center text-sm font-bold text-bk-text">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-6 h-6 rounded-lg bg-bk-red flex items-center justify-center text-white hover:bg-red-700 transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className={`flex-1 rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
              added ? 'bg-green-600 text-white' : 'bg-bk-red text-white hover:bg-red-700 active:scale-95'
            }`}
          >
            {added ? (
              <>
                <Check size={16} strokeWidth={2.5} />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                Add to Cart · ₹{itemTotal}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
