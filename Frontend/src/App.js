import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import './App.css';
import HomePage from "./HomePage/Home";
import DatasetsPage from "./Datasets/Dataset"
import ProfileDashboard from './Profile/Profile';
import SignupPage from './Login SignUp/signUp';
import LoginPage from './Login SignUp/Login';
import {ToastContainer} from "react-toastify";

function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/datasets" element={<DatasetsPage />} />
      <Route path="/profile" element={<ProfileDashboard/>} />
      <Route path="/sign-in" element={<SignupPage/>} />
      <Route path="/login" element={<LoginPage/>} />
    </Routes>
    </Router>
    </>
  );
}

export default App;
