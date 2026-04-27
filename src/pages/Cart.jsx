import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ChevronRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, updateQty, removeItem, subtotal, deliveryFee, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-8 text-center pb-24 animate-fade-in">
        <div className="w-24 h-24 rounded-full bg-bk-card border border-bk-border flex items-center justify-center mb-6">
          <ShoppingBag size={36} className="text-bk-sub" />
        </div>
        <h2 className="text-2xl font-display tracking-wide text-bk-text mb-2">Your cart is empty</h2>
        <p className="text-bk-sub text-sm mb-8 leading-relaxed">Looks like you haven't added anything yet. Let's fix that!</p>
        <Link
          to="/menu"
          className="bg-bk-red text-white px-8 py-3.5 rounded-2xl font-semibold text-sm hover:bg-red-700 transition-colors"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-40 animate-fade-in">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <h1 className="text-2xl font-display tracking-wide text-bk-text">Your Order</h1>
        <p className="text-bk-sub text-xs">{items.reduce((s, i) => s + i.qty, 0)} items</p>
      </div>

      {/* Cart items */}
      <div className="px-5 flex flex-col gap-3 mb-6">
        {items.map((item, i) => (
          <div
            key={item.cartId}
            className="bg-bk-card border border-bk-border rounded-2xl p-3 flex gap-3 animate-slide-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <img src={item.image} alt={item.name} className="w-20 h-18 rounded-xl object-cover flex-shrink-0 h-[72px]" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-bk-text leading-tight">{item.name}</h3>
                  {item.addOns?.length > 0 && (
                    <p className="text-[11px] text-bk-sub mt-0.5">
                      + {item.addOns.map(a => a.name).join(', ')}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeItem(item.cartId)}
                  className="text-bk-sub hover:text-bk-red transition-colors p-1 flex-shrink-0"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-bold text-bk-text">₹{item.totalPrice * item.qty}</span>
                <div className="flex items-center gap-2 bg-bk-muted rounded-xl px-2 py-1">
                  <button
                    onClick={() => updateQty(item.cartId, item.qty - 1)}
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-bk-sub hover:text-bk-red transition-colors"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="text-sm font-bold text-bk-text w-4 text-center">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.cartId, item.qty + 1)}
                    className="w-6 h-6 rounded-lg bg-bk-red flex items-center justify-center text-white hover:bg-red-700 transition-colors"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add more */}
      <div className="px-5 mb-6">
        <Link
          to="/menu"
          className="flex items-center justify-between bg-bk-card border border-dashed border-bk-border rounded-2xl px-4 py-3 hover:border-bk-red/40 transition-colors group"
        >
          <span className="text-sm text-bk-sub group-hover:text-bk-text transition-colors">+ Add more items</span>
          <ChevronRight size={16} className="text-bk-sub group-hover:text-bk-red transition-colors" />
        </Link>
      </div>

      {/* Coupon */}
      <div className="px-5 mb-6">
        <button className="w-full flex items-center justify-between bg-bk-card border border-bk-border rounded-2xl px-4 py-3.5 hover:border-bk-orange/40 transition-colors group">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-bk-orange/20 flex items-center justify-center">
              <Tag size={15} className="text-bk-orange" />
            </div>
            <span className="text-sm text-bk-sub group-hover:text-bk-text transition-colors">Apply coupon or offer</span>
          </div>
          <ChevronRight size={16} className="text-bk-sub group-hover:text-bk-orange transition-colors" />
        </button>
      </div>

      {/* Price summary */}
      <div className="px-5 mb-6">
        <div className="bg-bk-card border border-bk-border rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-bk-text mb-4">Price Summary</h3>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-sm">
              <span className="text-bk-sub">Subtotal</span>
              <span className="text-bk-text font-medium">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-bk-sub">Delivery Fee</span>
              <span className="text-bk-text font-medium">₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-bk-sub">Taxes & Charges</span>
              <span className="text-bk-sub">Included</span>
            </div>
            <div className="border-t border-bk-border pt-3 flex justify-between">
              <span className="font-semibold text-bk-text">Total</span>
              <span className="font-bold text-bk-text text-lg">₹{total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed checkout button */}
      <div className="fixed bottom-[72px] left-0 right-0 max-w-md mx-auto px-5 py-3 bg-bk-dark/95 backdrop-blur-xl border-t border-bk-border">
        <Link
          to="/checkout"
          className="flex items-center justify-between bg-bk-red text-white rounded-2xl px-5 py-4 hover:bg-red-700 transition-colors active:scale-[0.99]"
        >
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} />
            <span className="font-semibold">Proceed to Checkout</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-bold">₹{total}</span>
            <ChevronRight size={16} />
          </div>
        </Link>
      </div>
    </div>
  );
}
