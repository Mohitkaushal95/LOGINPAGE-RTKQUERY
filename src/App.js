import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Product from './pages/Product';
import Protected from './Protected';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/product' element={<Protected><Product/></Protected>} />
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
