import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import './App.css';
import HomePage from "./HomePage/Home";
import DatasetsPage from "./Datasets/Dataset"
import ProfileDashboard from './Profile/Profile';

function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/datasets" element={<DatasetsPage />} />
      <Route path="/profile" element={<ProfileDashboard/>} />
    </Routes>
    </Router>
    </>
  );
}

export default App;
