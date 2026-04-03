import { Routes, Route} from 'react-router'
import StartPage from './pages/StartPage/StartPage';
import Registration from './pages/Registration/Registration';
import Jobs from './pages/Jobs/Jobs';


function App() {
  return(
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/reg" element={<Registration />} />
      <Route path="/jobs" element={<Jobs />} />
    </Routes>
  );
}

export default App
