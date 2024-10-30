import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faTrophy,
    faCode,
    faComments,
    faUser,
    faEnvelope,
    faCoins,
    faEdit
} from '@fortawesome/free-solid-svg-icons';
import './Profile.css';
import def from './default-profile.jpeg';

const ProfileDashboard = () => {
    const [profilePicture, setProfilePicture] = useState(def); // Placeholder profile image
    const [username] = useState('JohnDoe'); // Static username for now
    const [email] = useState('johndoe@example.com'); // Static email for now
    const [currency] = useState(100); // Example currency amount
    const [datasets] = useState(['Dataset 1', 'Dataset 2', 'Dataset 3']); // Sample datasets

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

    const sidebarLinks = [
        { name: 'Home', icon: faHome, active: false },
        { name: 'Competition', icon: faTrophy, active: false },
        { name: 'Model', icon: faCode, active: false },
        { name: 'Discussions', icon: faComments, active: false },
        { name: 'Profile', icon: faUser, active: false }
    ];

    return (
        <div className="whole">
            <div className="usidebar">
                <div className="usidebar-links">
                    {sidebarLinks.map((link) => (
                        <button
                            key={link.name}
                            className={`sidebar-link ${link.active ? 'active' : ''}`}
                        >
                            <FontAwesomeIcon icon={link.icon} className="usidebar-icon" />
                            {link.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="profile-dashboard">
                <div className="left-section">
                    <h2>Profile Dashboard</h2>
                    <div className="user-info">
                        <div className="info-item">
                            <FontAwesomeIcon icon={faUser} className="icon" />
                            <span className="label">Username:</span>
                            <span>{username}</span>
                        </div>
                        <div className="info-item">
                            <FontAwesomeIcon icon={faEnvelope} className="icon" />
                            <span className="label">Email:</span>
                            <span>{email}</span>
                        </div>
                        <div className="info-item">
                            <FontAwesomeIcon icon={faCoins} className="icon" style={{ color: 'yellow' }} />
                            <span className="label">Currency:</span>
                            <span>{currency}</span>
                        </div>
                    </div>
                    <button className="upgrade-button">Upgrade</button>
                    <div className="datasets-section">
                        <h3>Your Datasets</h3>
                        <ul>
                            {datasets.map((dataset, index) => (
                                <li key={index}>{dataset}</li>
                            ))}
                        </ul>
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
                <div className="right-section">
                    
                </div>
            </div>
        </div>
    );
};

export default ProfileDashboard;
