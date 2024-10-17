import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import FruitsUpload from './components/pages/FruitsUpload'
import Error from './components/pages/Error';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetails from './components/pages/ProductDetails';
import Cart from './components/pages/Cart';
import SignIn from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Logout from './components/pages/Logout';
import Wishlist from './components/pages/Wistlist';



function App() {
  return (
  <>
   <ToastContainer/>
   <Router>
    <Header/>
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/upload' element={<FruitsUpload/>}/>
      <Route path='*' element={<Error/>}/>
      <Route path='/product/:id' element={<ProductDetails/>} />
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<SignIn/>}/>
      <Route path='/register' element={<SignUp/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/wishlist' element={<Wishlist/>}/>
    </Routes>
    <Footer/>
   </Router>
  </>
  );
}

export default App;
