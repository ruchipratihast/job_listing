import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import RegisterPage from './pages/Register/RegisterPage';
import LoginPage from './pages/Login/LoginPage';
import JobDetailsPage from './pages/JobDetails/JobDetailsPage';
import JobPostPage from './pages/JobPost/JobPostPage';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={ <RegisterPage/> } />
      <Route path='/login' element={ <LoginPage/> } />
      <Route path='/job-details/:id' element={ <JobDetailsPage/> } />
      <Route path='/job-post' element={ <JobPostPage/> } />
    </Routes>
    </BrowserRouter>
    </> 
  );
}

export default App;
