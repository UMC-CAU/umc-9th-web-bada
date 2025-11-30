
import './App.css'
import Navbar from './components/Navbar.tsx';
import CartList from './components/CartList.tsx';
import { Provider } from 'react-redux';
import store from './store/store';
import PriceBox from './components/PriceBox.tsx';
import Modal from './components/Modal.tsx';

function App() {
  

  return (
  <Provider store={store}>
  <Navbar/>
  <CartList/>
  <PriceBox/>
  <Modal/>
  
  </Provider>
  )
}

export default App
