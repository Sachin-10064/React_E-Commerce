import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CartIcon } from './components/CartIcon';
import { Navbar } from './components/Navbar';
import { Cart } from './pages/Cart';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <CartIcon />
      </div>
    </BrowserRouter>
  );
}

export default App;