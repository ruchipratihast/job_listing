import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import RegisterPage from './pages/Register/RegisterPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={ <RegisterPage/> } />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
