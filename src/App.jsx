import './App.css'
import Home from './page/Home'
import { Routes, Route} from "react-router-dom";
import TambahBarang from './page/TambahBarang';
import UpdateBarang from './page/UpdateBarang';
import Login from './page/Login';

function App() {

  return (
    <Routes>
      <Route path='/dashboard' element={<Home />} />
      <Route path='/barang' element={<TambahBarang />} />
      <Route path='/barang/:id' element={<UpdateBarang />} />
      <Route path='/' element={<Login />} />
    </Routes>
  )
}

export default App