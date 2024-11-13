import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTrophy, faCode, faComments, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import astro from './compete2.png';
import competitionsData from './competition.json';
import './compete.css';

const Compete = () => {
  const sidebarLinks = [
    { name: 'Home', icon: faHome },
    { name: 'Competition', icon: faTrophy },
    { name: 'Datasets', icon: faCode },
    { name: 'Discussions', icon: faComments },
    { name: 'Profile', icon: faUser }
  ];
  const navigate = useNavigate();
  
  const [competitions, setCompetitions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState("");
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 700); // Track screen width

  useEffect(() => {
    setCompetitions(competitionsData);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 700); // Update condition for 700px
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filteredCompetitions = competitions.filter(comp =>
    (selectedCategory === "All Categories" || comp.category === selectedCategory) &&
    (comp.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     comp.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleNavigation = (linkName) => {
    navigate(`/${linkName.toLowerCase()}`);
  };

  // Open new window with the competition title and upload fields
  const handleJoinClick = (competition) => {
    const competitionTitle = competition.title;

    const newWindow = window.open("", "_blank", "width=600,height=400");
    newWindow.document.write(`
      <html>
        <head>
          <title>${competitionTitle} - Join Competition</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
            h2 { color: #333; }
            .error { color: red; }
            .input-field { margin-top: 10px; }
            .submit-button { margin-top: 15px; padding: 8px 15px; font-size: 14px; }
          </style>
        </head>
        <body>
          <h2>${competitionTitle}</h2>
          <input type="file" accept=".py" id="pyFile" class="input-field" /><br />
          <span id="pyError" class="error"></span><br />
          <input type="file" accept=".txt" id="txtFile" class="input-field" /><br />
          <span id="txtError" class="error"></span><br />
          <button id="submitBtn" class="submit-button" disabled>Submit</button>
          <script>
            const submitBtn = document.getElementById('submitBtn');
            let pyFileUploaded = false;
            let txtFileUploaded = false;

            document.getElementById('pyFile').addEventListener('change', function(e) {
              const pyFile = e.target.files[0];
              if (pyFile && pyFile.name.endsWith('.py')) {
                document.getElementById('pyError').textContent = '';
                pyFileUploaded = true;
              } else {
                document.getElementById('pyError').textContent = 'Invalid file type. Please upload a .py file.';
                pyFileUploaded = false;
              }
              submitBtn.disabled = !(pyFileUploaded && txtFileUploaded);
            });

            document.getElementById('txtFile').addEventListener('change', function(e) {
              const txtFile = e.target.files[0];
              if (txtFile && txtFile.name.endsWith('.txt')) {
                document.getElementById('txtError').textContent = '';
                txtFileUploaded = true;
              } else {
                document.getElementById('txtError').textContent = 'Invalid file type. Please upload a .txt file.';
                txtFileUploaded = false;
              }
              submitBtn.disabled = !(pyFileUploaded && txtFileUploaded);
            });
          </script>
        </body>
      </html>
    `);
  };

  return (
    <div className="container">
      {isWideScreen && ( // Conditional rendering of the entire sidebar based on screen width
        <div className="sidebar">
          <div className="sidebar-links">
            {sidebarLinks.map((link) => (
              <button
                key={link.name}
                className="sidebar-link"
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
            <h1 className="page-title">Competitions</h1>
          </div>

          <div className="search-section">
            <div className="search-container">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search competitions..." 
                className="search-input" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="select-box"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option>All Categories</option>
              <option>Featured</option>
              <option>Research</option>
              <option>Getting Started</option>
            </select>
          </div>
        </div>

        <div className="competition-grid">
          {filteredCompetitions.map((competition) => (
            <div key={competition.id} className="competition-card">
              <img src={competition.imageUrl} alt={competition.title} className="competition-image" />
              <div className="competition-content">
                <div className="competition-header">
                  <span className="prize-badge">{competition.prize}</span>
                  <span className="time-left">{competition.timeLeft}</span>
                </div>
                <h3 className="competition-title">{competition.title}</h3>
                <p className="competition-description">{competition.description}</p>
                <div className="competition-footer">
                  <div className="team-info">
                    <span>{competition.teams}</span>
                  </div>
                  <button className="join-button" onClick={() => handleJoinClick(competition)}>Join</button>
                </div>
              </div>
            </div>
          ))}
          {filteredCompetitions.length === 0 && (
            <p className="no-results">No competitions found for "{searchTerm}"</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Compete;
