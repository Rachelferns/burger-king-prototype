import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { categories, menuItems } from '../data/mockData';
import ItemCard from '../components/ItemCard';

export default function Menu() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'burgers');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegFilter, setVegFilter] = useState('all'); // all | veg | non-veg
  const contentRef = useRef(null);

  const filtered = menuItems.filter(item => {
    const matchCategory = item.categoryId === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchVeg = vegFilter === 'all' || (vegFilter === 'veg' ? item.isVeg : !item.isVeg);
    return matchCategory && matchSearch && matchVeg;
  });

  const searchResults = searchQuery
    ? menuItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : null;

  return (
    <div className="pb-24 animate-fade-in">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 bg-bk-dark sticky top-0 z-10 border-b border-bk-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-display tracking-wide text-bk-text">Our Menu</h1>
          {/* Veg toggle */}
          <div className="flex items-center gap-1 bg-bk-card border border-bk-border rounded-xl p-1">
            {[['all', 'All'], ['veg', '🌿'], ['non-veg', '🍗']].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setVegFilter(val)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                  vegFilter === val ? 'bg-bk-red text-white' : 'text-bk-sub hover:text-bk-text'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-bk-sub" />
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-bk-card border border-bk-border rounded-xl pl-10 pr-10 py-2.5 text-sm text-bk-text placeholder-bk-sub outline-none focus:border-bk-red/50 transition-colors"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-bk-sub hover:text-bk-text">
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Search results */}
      {searchResults ? (
        <div className="px-5 pt-4">
          <p className="text-bk-sub text-xs mb-3">{searchResults.length} results for "{searchQuery}"</p>
          <div className="flex flex-col gap-3">
            {searchResults.map(item => <ItemCard key={item.id} item={item} layout="list" />)}
            {searchResults.length === 0 && (
              <div className="text-center py-12">
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-bk-sub">No items found</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Category layout */
        <div className="flex">
          {/* Sidebar */}
          <div className="w-20 flex-shrink-0 sticky top-[105px] h-[calc(100vh-105px)] overflow-y-auto scrollbar-hide border-r border-bk-border bg-bk-dark">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex flex-col items-center gap-1.5 px-2 py-3.5 transition-all duration-200 relative ${
                  activeCategory === cat.id ? 'text-bk-red' : 'text-bk-sub hover:text-bk-text'
                }`}
              >
                {activeCategory === cat.id && (
                  <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-bk-red rounded-r-full" />
                )}
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-[10px] font-medium text-center leading-tight">{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Items */}
          <div ref={contentRef} className="flex-1 px-3 pt-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{categories.find(c => c.id === activeCategory)?.emoji}</span>
              <h2 className="text-lg font-display tracking-wide text-bk-text">
                {categories.find(c => c.id === activeCategory)?.name}
              </h2>
              <span className="ml-auto text-xs text-bk-sub bg-bk-card border border-bk-border px-2 py-0.5 rounded-full">
                {filtered.length} items
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {filtered.map((item, i) => (
                <div key={item.id} style={{ animationDelay: `${i * 50}ms` }} className="animate-slide-up">
                  <ItemCard item={item} layout="list" />
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-4xl mb-3">🥗</p>
                  <p className="text-bk-sub text-sm">No items match your filter</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
