import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faTrophy,
  faCode,
  faComments,
  faUser,
  faSearch,
  faThumbsUp,
  faDownload,
  faUpload
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import astro from "./earth.png";
import datasetsData from './datasets.json';
import './Datasets.css';

const DatasetsPage = () => {
  const sidebarLinks = [
    { name: 'Home', icon: faHome, active: false },
    { name: 'Competition', icon: faTrophy, active: false },
    { name: 'Datasets', icon: faCode, active: false },
    { name: 'Discussions', icon: faComments, active: false },
    { name: 'Profile', icon: faUser, active: false }
  ];

  const navigate = useNavigate();
  const [datasets, setDatasets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 700); // Track screen width

  // Load datasets from JSON file on component mount
  useEffect(() => {
    setDatasets(datasetsData);
  }, []);

  // Listen for window resize events and update the screen width state
  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 700); // Update condition for 600px
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavigation = (linkName) => {
    const path = `/${linkName.toLowerCase()}`;
    navigate(path);
  };

  // Filter datasets based on search term
  const filteredDatasets = datasets.filter((dataset) =>
    dataset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dataset.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      {isWideScreen && ( // Conditional rendering of the entire sidebar based on screen width
        <div className="sidebar">
          <div className="sidebar-links">
            {sidebarLinks.map((link) => (
              <button
                key={link.name}
                className={`sidebar-link ${link.active ? 'active' : ''}`}
                onClick={() => handleNavigation(link.name)}
              >
                <FontAwesomeIcon icon={link.icon} className="sidebar-icon" />
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="main-content">
        <div className="header-section">
          <div className="title-wrapper">
            <div className="earth">
              <img src={astro} alt="Data Science Illustration" />
            </div>
            <h1 className="page-title">Datasets</h1>
          </div>

          <div className="search-section">
            <div className="search-container">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input 
                type="text"
                placeholder="Search datasets..." 
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="filter-button">
              <FontAwesomeIcon icon={faUpload} className="filter-icon" />
              Upload
            </button>
          </div>
        </div>

        <div className="dataset-grid">
          {filteredDatasets.map((dataset) => (
            <div key={dataset.id} className="dataset-card">
              <img
                src={dataset.imageUrl}
                alt={dataset.title}
                className="dataset-image"
              />
              <div className="dataset-content">
                <h3 className="dataset-title">{dataset.title}</h3>
                <p className="dataset-description">{dataset.description}</p>
              </div>
              <div className="dataset-footer">
                <button className="upvote-button">
                  <FontAwesomeIcon icon={faThumbsUp} className="upvote-icon" />
                  {dataset.upvotes}
                </button>
                <button className="download-button">
                  <FontAwesomeIcon icon={faDownload} className="download-icon" />
                  Download
                </button>
              </div>
            </div>
          ))}
          {filteredDatasets.length === 0 && (
            <p className="no-results">No datasets found for "{searchTerm}"</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatasetsPage;
