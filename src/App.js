import './App.css';
import Home from './views/Home';
import UserLogin from './views/UserLogin';
import SignUp from './views/SignUp';
import { CartProvider } from './components/ContextReducer';
import OrderHistory from './views/OrderHistory';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/userlogin' element={<UserLogin />} />
            <Route exact path='/createuser' element={<SignUp />} />
            <Route exact path='/orderhistory' element={<OrderHistory />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
