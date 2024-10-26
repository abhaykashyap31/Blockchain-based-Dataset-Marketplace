import React, { useState } from 'react';
import "./Home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import astro from './astro1.png';
import cv from "./cvision.jpeg";
import graph from "./finance.jpeg";
import doc from "./robodoc.jpeg";


const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    
    const handleSearch = () => {
        console.log("Searching for:", searchQuery);
    };

    return (
        <div>
            <header>
                <nav>
                    <div className="logo">DataScience Hub</div>
                    <ul>
                        <li>Competitions</li>
                        <li>Datasets</li>
                        <li>Courses</li>
                        <li>Discussion</li>
                    </ul>
                    <button className="sign-in">SIGN IN</button>
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
                        <img src={doc} alt="AI in Healthcare" className="competition-image" />
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
                </div>
            </section>

            <footer>
                <p>© 2024 DataScience Hub. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default HomePage;