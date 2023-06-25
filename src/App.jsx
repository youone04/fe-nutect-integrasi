import './App.css'
import Home from './page/Home'
import { Routes, Route} from "react-router-dom";
import Login from './page/Login';

function App() {

  return (
    <Routes>
      <Route path='/dashboard' element={<Home />} />
      <Route path='/' element={<Login />} />
    </Routes>
  )
}

export default App