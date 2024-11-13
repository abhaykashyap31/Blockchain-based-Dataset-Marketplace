import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome,
  faTrophy,
  faCode,
  faComments,
  faUser,
  faSearch,
  faFilter,
  faThumbsUp,
  faDownload 
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import astro from "./earth.png";
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

  const datasets = [
    {
      id: 1,
      title: 'Image Classification Dataset',
      description: 'A comprehensive dataset for image classification tasks',
      upvotes: 234,
      downloads: 1500,
      imageUrl: 'https://uploads-ssl.webflow.com/614c82ed388d53640613982e/635b9f200bda3dcee9e1700e_6320786193e491309ee5b99b_image-classification-vs.-object-detection.png'
    },
    {
      id: 2,
      title: 'Natural Language Dataset',
      description: 'Large-scale text corpus for NLP tasks',
      upvotes: 189,
      downloads: 980,
      imageUrl: 'https://th.bing.com/th/id/OIP.MsfVMY1muy4moxu0WKwCSwHaEH?rs=1&pid=ImgDetMain'
    }
  ];

  const handleNavigation = (linkName) => {
    const path = `/${linkName.toLowerCase()}`; // Navigate to the lowercase version of linkName
    navigate(path);
  };


  return (
    <div className="container">
      {/* Fixed Sidebar */}
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

      {/* Main content */}
      <div className="main-content">
        {/* Header and Search */}
       
        <div className="header-section">
  <div className="title-wrapper">
          <div className="earth">
            <img src={astro} alt="Data Science Illustration" />
          </div>
          <h1 className="page-title">Datasets</h1>
        </div>

        {/* Search and Filter Section */}
        <div className="search-section">
          <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input 
              type="text"
              placeholder="Search datasets..." 
              className="search-input"
            />
          </div>
          <button className="filter-button">
            <FontAwesomeIcon icon={faFilter} className="filter-icon" />
            Filters
          </button>
        </div>
      </div>


        {/* Dataset Grid */}
        <div className="dataset-grid">
          {datasets.map((dataset) => (
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
        </div>
      </div>
    </div>
  );
};

export default DatasetsPage;