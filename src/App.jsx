import { Routes, Route} from 'react-router'
import StartPage from './pages/StartPage/StartPage';
import Registration from './pages/Registration/Registration';
import Jobs from './pages/Jobs/Jobs';
import Login from './pages/Login/Login';
import Trajectory from './pages/Trajectory/Trajectory';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';


function App() {
  return(
    <Routes>
      <Route path="/" element={<PublicRoute element={StartPage} />} />
      <Route path="/reg" element={<PublicRoute element={Registration} />} />
      <Route path="/login" element={<PublicRoute element={Login} />} />
      <Route path="/jobs" element={<ProtectedRoute element={Jobs} />} />
      <Route path="/trajectory" element={<ProtectedRoute element={Trajectory} />} />
    </Routes>
  );
}

export default App
