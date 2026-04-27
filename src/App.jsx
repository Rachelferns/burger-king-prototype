import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import ItemDetail from './pages/ItemDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Rewards from './pages/Rewards';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-bk-dark max-w-md mx-auto relative grain">
      {children}
      <Navbar />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/rewards" element={<Rewards />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}
