import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faTrophy,
    faCode,
    faComments,
    faUser,
    faEnvelope,
    faCoins,
    faEdit,
    faLink,
    faFileContract
} from '@fortawesome/free-solid-svg-icons';
import astro from "./profile-new.png";
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { Auth, db } from '../Firebase/FirebaseAuth';
import { doc, getDoc } from "firebase/firestore";
import def from './default-profile.jpeg';

const ProfileDashboard = () => {
    const [profilePicture, setProfilePicture] = useState(def); // Placeholder profile image
    const [userDetails, setUserdetails] = useState({
      Username: 'JohnDee',
      email: 'johnexample@gmail.com'
    });
    const [currency] = useState(100); // Example currency amount
    const [ethereumAddress] = useState("0x87FDd2A1924aC77D1F15AFF3e8D68650d5826deC"); // Placeholder Ethereum address
    const [contractBalance] = useState("1000 ETH"); // Placeholder contract balance
    const navigate = useNavigate();

    const fetchUserData = async () => {
      Auth.onAuthStateChanged(async (user) => {
        const docRef = doc(db, "Users", user.uid);
        const docsnap = await getDoc(docRef);
        if(docsnap.exists()){
          setUserdetails(docsnap.data());
          console.log(docsnap.data());
        } else {
          alert("User is not logged in!");
        }
      });
    };

    async function handleLogout() {
      try {
        await Auth.signOut();
        alert("User logged out"); 
        navigate('/login');
      } catch(error) {
        alert(error.message);
      }
    }

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result); // Set the new profile picture
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    useEffect(() => {
      fetchUserData();
    }, []);

    const sidebarLinks = [
      { name: 'Home', icon: faHome, active: false },
      { name: 'Competition', icon: faTrophy, active: false },
      { name: 'Datasets', icon: faCode, active: false },
      { name: 'Discussions', icon: faComments, active: false },
      { name: 'Profile', icon: faUser, active: false }
    ];

    const handleNavigation = (linkName) => {
      const path = `/${linkName.toLowerCase()}`;
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
          <div className="header-section">
            <div className="title-wrapper">
              <div className="earth">
                <img src={astro} alt="Data Science Illustration" />
              </div>
            </div>

            <div className="profile-dashboard">
              <div className="left-section">
                <h2>Profile Dashboard</h2>
                <div className="user-info">
                  <div className="info-item">
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <span className="label">Username:</span>
                    <span>{userDetails.Username}</span>
                  </div>
                  <div className="info-item">
                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                    <span className="label">Email:</span>
                    <span>{userDetails.email}</span>
                  </div>
                  <div className="info-item">
                    <FontAwesomeIcon icon={faCoins} className="icon" style={{ color: 'yellow' }} />
                    <span className="label">Currency:</span>
                    <span>{currency}</span>
                  </div>
                </div>
                <button 
                className="upgrade-button" 
                onClick={() => alert('No new currency additions!')}
              >
                Upgrade
              </button>
                <div className="datasets-section">
                    <h3>Your Ethereum and Contract Info</h3>
                    <div className="info-item">
                        <FontAwesomeIcon icon={faLink} className="icon" />
                        <span className="label">Ethereum Address:</span>
                        <span>{ethereumAddress}</span>
                    </div>
                    <div className="info-item">
                        <FontAwesomeIcon icon={faFileContract} className="icon" />
                        <span className="label">Contract Balance:</span>
                        <span>{contractBalance}</span>
                    </div>
                </div>
              </div>

              <div className="profile-picture-container">
                  <img src={profilePicture} alt="Profile" className="profile-picture" />
                  <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      style={{ display: 'none' }} // Hide the default file input
                      id="file-input"
                  />
                  <label htmlFor="file-input" className="edit-button">
                      <FontAwesomeIcon icon={faEdit} />
                  </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ProfileDashboard;
