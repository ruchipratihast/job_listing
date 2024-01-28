import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import RegisterPage from './pages/Register/RegisterPage';
import LoginPage from './pages/Login/LoginPage';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={ <RegisterPage/> } />
      <Route path='/login' element={ <LoginPage/> } />
    </Routes>
    </BrowserRouter>
    </> 
  );
}

export default App;
