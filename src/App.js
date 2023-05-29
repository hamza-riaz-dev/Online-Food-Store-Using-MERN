import './App.css';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from '../src/Screen/Home';
import Login from '../src/Screen/Login';
import SignUp from './Screen/SignUp';
import MyOrders from './Screen/MyOrders';
import { CartProvider } from './Components/ContextReducer';


function App() {
  return (
    <>
  <CartProvider>  
  <Router>  
    <div>

    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/Login' element={<Login/>}/>
        <Route exact path='/signup' element={<SignUp/>}/>
        <Route exact path='/MyOrders' element={<MyOrders/>}/>
    </Routes>

    </div>
    </Router> 
    </CartProvider> 
    </>
  );
}

export default App;
