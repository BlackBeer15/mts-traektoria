import { Routes, Route} from 'react-router'
import StartPage from './pages/StartPage/StartPage';
import Registration from './pages/Registration/Registration';


function App() {
  return(
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/reg" element={<Registration />} />
    </Routes>
  );
}

export default App
