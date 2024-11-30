import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './component/Home';

function App() {
  return (
    <div className="App">
     <h1 className='text-3xl'>hello</h1>
     <Routes>
     <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
