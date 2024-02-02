import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/Register/RegisterPage';
import LoginPage from './pages/Login/LoginPage';
import JobDetailsPage from './pages/JobDetails/JobDetailsPage';
import JobPostPage from './pages/JobPost/JobPostPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/Home/HomePage';
import ProtectedRote from './components/PrivateComponent/ProtectedRote';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/job-details/:id' element={<JobDetailsPage />} />
          <Route
            path='/job-post'
            element={<ProtectedRote Component={JobPostPage} />}
          />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
