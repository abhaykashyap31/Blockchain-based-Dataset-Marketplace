import React, { useState } from 'react';
import {Link,useNavigate} from "react-router-dom";
import "./Home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faTimes, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import astro from './astro1.png';
import cv from "./cvision.jpeg";
import graph from "./finance.jpeg";
import doct from "./robodoc.jpeg";
import { Auth,db } from '../Firebase/FirebaseAuth';
import {doc, getDoc} from "firebase/firestore";

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const newer = {
        Username: 'JohnDee',
        email : 'johnexample@gmail.com'
      }
    const [userDetails, setUserdetails] = useState(newer);

    function getInitials(name) {
        const firstName = name.split(' ')[0];
        return firstName.charAt(0).toUpperCase();
      }

      const fetchUserData = async () => {
        Auth.onAuthStateChanged(async (user) => {
          
          const docRef = doc(db,"Users",user.uid);
          const docsnap = await getDoc(docRef);
          if(docsnap.exists()){
            setUserdetails(docsnap.data());
            console.log(docsnap.data());
          }else{
            alert("User is not logged in !");
          }
        })
      }
      
      async function handleLogout() {
        try{
          await Auth.signOut();
          alert("User logged out"); 
          navigate('/login');
        }
        catch(error){
          alert(error.message);
        }
      }

    const handleSearch = () => {
        console.log("Searching for:", searchQuery);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
 
    const handleSignIn = () => {
        navigate('/profile');  // Navigate to sign-in page
    };

    const SeeAll = () => {
        navigate('/competition');  // Navigate to sign-in page
    };

    return (
            <div>    
            <header>
                <nav>
                    <div className="logo">DataScience Hub</div>
                    <div className="menu-icon" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
                    </div>
                    <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
                        <li><Link to="/competition">Competitions</Link></li>
                        <li><Link to="/datasets">Datasets</Link></li>
                        <li><Link to="/discussions">Discussions</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                    </ul>
                        <button className="sign-in">Welcome</button>
                </nav>
            </header>
            <section className="hero">
                <div className="hero-image">
                    <img src={astro} alt="Data Science Illustration" />
                </div>
                <div className="hero-content">
                    <h1>Welcome to DataScience Hub</h1>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search for competitions, datasets, or discussions..."
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="search-button" onClick={handleSearch}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>
            </section>

            <section className="featured">
                <h2>Featured Competitions</h2>
                <div className="competition-grid">
                    <div className="competition-card">
                        <img src={doct} alt="AI in Healthcare" className="competition-image" />
                        <h3>AI in Healthcare</h3>
                        <p>Solve challenges related to healthcare using AI</p>
                    </div>
                    <div className="competition-card">
                        <img src={graph} alt="Financial Data Modeling" className="competition-image" />
                        <h3>Financial Data Modeling</h3>
                        <p>Build models to predict financial outcomes</p>
                    </div>
                    <div className="competition-card">
                        <img src={cv} alt="Computer Vision Challenge" className="competition-image" />
                        <h3>Computer Vision Challenge</h3>
                        <p>Improve image recognition using deep learning</p>
                    </div>
                    {/* Add more competition cards as needed */}
                </div>
                <button className="see-all" onClick = {() => SeeAll()}>
                    See All
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </section>

            <footer>
                <p>© 2024 DataScience Hub. All rights reserved.</p>
            </footer>
        </div> 
    );
}

export default HomePage;
