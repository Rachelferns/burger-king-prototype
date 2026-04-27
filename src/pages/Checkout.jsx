import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, CreditCard, Banknote, Smartphone, Check, ChevronDown, ChevronUp, Clock, Bike } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { mockUser } from '../data/mockData';

const addresses = [
  { id: 'home', label: '🏠 Home', address: 'Flat 502, Lotus Heights, Borivali West, Mumbai - 400052' },
  { id: 'work', label: '💼 Work', address: 'Office 301, Nirlon Knowledge Park, Goregaon East, Mumbai' },
];

const paymentMethods = [
  { id: 'upi', icon: Smartphone, label: 'UPI / GPay / Paytm', sub: 'Instant & secure' },
  { id: 'card', icon: CreditCard, label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay' },
  { id: 'cash', icon: Banknote, label: 'Cash on Delivery', sub: 'Pay when you receive' },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, deliveryFee, total, clearCart } = useCart();
  const [selectedAddress, setSelectedAddress] = useState('home');
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showItems, setShowItems] = useState(false);

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOrderPlaced(true);
      clearCart();
    }, 1800);
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-8 text-center animate-fade-in">
        <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6 animate-pop">
          <Check size={40} className="text-green-400" strokeWidth={2.5} />
        </div>
        <h2 className="text-3xl font-display tracking-wide text-bk-text mb-2">Order Placed!</h2>
        <p className="text-bk-sub text-sm mb-1">Order #BK{Math.floor(Math.random() * 9000 + 1000)}</p>
        <p className="text-bk-sub text-sm mb-8 leading-relaxed">Your order is confirmed and being prepared. Estimated delivery: <span className="text-bk-text font-medium">25-35 mins</span></p>

        <div className="w-full bg-bk-card border border-bk-border rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-bk-orange/20 flex items-center justify-center">
              <Bike size={18} className="text-bk-orange" />
            </div>
            <div>
              <p className="text-sm font-semibold text-bk-text">Out for Delivery</p>
              <p className="text-xs text-bk-sub">Rider: Rahul · MH12 XY 1234</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-bk-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-bk-orange to-bk-yellow rounded-full w-3/4 animate-pulse" />
            </div>
            <span className="text-xs text-bk-sub flex-shrink-0">~28 min</span>
          </div>
        </div>

        <div className="w-full bg-bk-card border border-bk-orange/30 rounded-2xl p-4 mb-8">
          <p className="text-xs text-bk-orange font-semibold mb-1">🎉 Points Earned!</p>
          <p className="text-sm text-bk-text">You earned <span className="font-bold text-bk-orange">+{Math.floor(total / 10)} Crown Points</span> on this order</p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-bk-red text-white rounded-2xl py-4 font-semibold hover:bg-red-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="pb-36 animate-fade-in">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-bk-card border border-bk-border flex items-center justify-center">
          <ChevronLeft size={18} className="text-bk-text" />
        </button>
        <h1 className="text-2xl font-display tracking-wide text-bk-text">Checkout</h1>
      </div>

      <div className="px-5 flex flex-col gap-5">
        {/* Order Summary toggle */}
        <div className="bg-bk-card border border-bk-border rounded-2xl overflow-hidden">
          <button
            onClick={() => setShowItems(!showItems)}
            className="w-full flex items-center justify-between p-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-base">🛍️</span>
              <div className="text-left">
                <p className="text-sm font-semibold text-bk-text">
                  {items.reduce((s, i) => s + i.qty, 0)} items · ₹{subtotal}
                </p>
                <p className="text-[11px] text-bk-sub">{showItems ? 'Hide' : 'Show'} order details</p>
              </div>
            </div>
            {showItems ? <ChevronUp size={16} className="text-bk-sub" /> : <ChevronDown size={16} className="text-bk-sub" />}
          </button>

          {showItems && (
            <div className="border-t border-bk-border px-4 pb-4">
              {items.map(item => (
                <div key={item.cartId} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-bk-sub bg-bk-muted rounded-lg w-6 h-6 flex items-center justify-center font-bold">{item.qty}</span>
                    <div>
                      <p className="text-sm text-bk-text">{item.name}</p>
                      {item.addOns?.length > 0 && (
                        <p className="text-[10px] text-bk-sub">{item.addOns.map(a => a.name).join(', ')}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-bk-text font-medium">₹{item.totalPrice * item.qty}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delivery Address */}
        <div>
          <h3 className="text-sm font-semibold text-bk-text mb-3 flex items-center gap-2">
            <MapPin size={15} className="text-bk-red" />
            Delivery Address
          </h3>
          <div className="flex flex-col gap-2">
            {addresses.map(addr => (
              <button
                key={addr.id}
                onClick={() => setSelectedAddress(addr.id)}
                className={`flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                  selectedAddress === addr.id
                    ? 'bg-bk-red/10 border-bk-red/50'
                    : 'bg-bk-card border-bk-border hover:border-bk-red/30'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 transition-all ${
                  selectedAddress === addr.id ? 'border-bk-red bg-bk-red' : 'border-bk-border'
                }`}>
                  {selectedAddress === addr.id && <span className="w-2 h-2 rounded-full bg-white block" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-bk-text">{addr.label}</p>
                  <p className="text-xs text-bk-sub mt-0.5 leading-relaxed">{addr.address}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Estimated time */}
        <div className="flex items-center gap-3 bg-bk-card border border-bk-border rounded-2xl p-3.5">
          <div className="w-9 h-9 rounded-xl bg-bk-orange/20 flex items-center justify-center flex-shrink-0">
            <Clock size={16} className="text-bk-orange" />
          </div>
          <div>
            <p className="text-sm font-semibold text-bk-text">Estimated Delivery</p>
            <p className="text-xs text-bk-sub">25 – 35 minutes from confirmation</p>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-sm font-semibold text-bk-text mb-3 flex items-center gap-2">
            <CreditCard size={15} className="text-bk-red" />
            Payment Method
          </h3>
          <div className="flex flex-col gap-2">
            {paymentMethods.map(({ id, icon: Icon, label, sub }) => (
              <button
                key={id}
                onClick={() => setSelectedPayment(id)}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                  selectedPayment === id
                    ? 'bg-bk-red/10 border-bk-red/50'
                    : 'bg-bk-card border-bk-border hover:border-bk-red/30'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  selectedPayment === id ? 'bg-bk-red/20' : 'bg-bk-muted'
                }`}>
                  <Icon size={16} className={selectedPayment === id ? 'text-bk-red' : 'text-bk-sub'} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-bk-text">{label}</p>
                  <p className="text-xs text-bk-sub">{sub}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  selectedPayment === id ? 'border-bk-red bg-bk-red' : 'border-bk-border'
                }`}>
                  {selectedPayment === id && <span className="w-2 h-2 rounded-full bg-white block" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Price breakdown */}
        <div className="bg-bk-card border border-bk-border rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-bk-text mb-3">Payment Summary</h3>
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between text-sm"><span className="text-bk-sub">Item Total</span><span className="text-bk-text">₹{subtotal}</span></div>
            <div className="flex justify-between text-sm"><span className="text-bk-sub">Delivery Fee</span><span className="text-bk-text">₹{deliveryFee}</span></div>
            <div className="flex justify-between text-sm"><span className="text-bk-sub">Discount</span><span className="text-green-400">— ₹0</span></div>
            <div className="border-t border-bk-border pt-2.5 flex justify-between">
              <span className="font-bold text-bk-text">Total Payable</span>
              <span className="font-bold text-bk-text text-lg">₹{total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Place order */}
      <div className="fixed bottom-[72px] left-0 right-0 max-w-md mx-auto px-5 py-3 bg-bk-dark/95 backdrop-blur-xl border-t border-bk-border">
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full bg-bk-red text-white rounded-2xl py-4 font-semibold flex items-center justify-center gap-2 hover:bg-red-700 transition-all disabled:opacity-70 active:scale-[0.99]"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Placing Order...
            </>
          ) : (
            <>Place Order · ₹{total}</>
          )}
        </button>
        <p className="text-center text-[11px] text-bk-sub mt-2">By placing order you agree to our terms & conditions</p>
      </div>
    </div>
  );
}
