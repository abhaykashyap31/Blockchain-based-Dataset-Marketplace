import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faTrophy, faCode, faComments, faUser, faSearch, faDownload, faUpload, faTrash
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import astro from "./earth.png";
import './Datasets.css';
import axios from 'axios';
import FormData from 'form-data';
import Web3 from 'web3';
import StorageContract from '../artifacts/contracts/Storage.json';
import { NETWORK_ID, NETWORK_URL, STORJ_IPFS_API_URL, STORJ_IPFS_GATEWAY_URL } from '../constants';

const DatasetsPage = () => {
  const navigate = useNavigate();
  const [datasets, setDatasets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 700);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [datasetName, setDatasetName] = useState('');
  const [datasetContent, setDatasetContent] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const init = async () => {
      const web3 = new Web3(NETWORK_URL);
      const contract = new web3.eth.Contract(StorageContract.abi, StorageContract.networks[NETWORK_ID].address);
      setContract(contract);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      const uploadedFiles = await contract.methods.getFiles().call();
      setUploadedFiles(uploadedFiles);
    };
    init();
  }, []);

  useEffect(() => {
    const savedDatasets = JSON.parse(sessionStorage.getItem('datasets')) || [];
    const userUploadedDatasets = savedDatasets.filter(dataset => dataset.size && dataset.size !== '0 MB');
    setDatasets(userUploadedDatasets);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 700);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavigation = (linkName) => {
    if (linkName === 'Upload') {
      setShowUploadModal(true);
    } else {
      const path = `/${linkName.toLowerCase()}`;
      navigate(path);
    }
  };

  const filteredDatasets = datasets.filter((dataset) => {
    const title = dataset.name || '';
    const description = dataset.content || '';
    return title.toLowerCase().includes(searchTerm.toLowerCase()) || description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileSize(file ? (file.size / 1024 / 1024).toFixed(2) + ' MB' : '');
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData();
    data.append('file', selectedFile);
    data.append('image', imageFile);
    data.append('datasetName', datasetName);
    data.append('datasetContent', datasetContent);
  
    try {
      // Upload dataset file and image to IPFS or STORJ
      const response = await axios.post(STORJ_IPFS_API_URL, data, {
        headers: { 'Content-Type': `multipart/form-data; boundary=${data._boundary}` },
        maxContentLength: Infinity, maxBodyLength: Infinity,
      });
      const fileHash = response.data;
  
      // Upload metadata to blockchain
      await contract.methods.addFile(fileHash).send({ from: account, gas: '1000000' });
  
      // Construct the new dataset entry with image URL from storage
      const newFile = {
        name: datasetName,
        content: datasetContent,
        image: `${STORJ_IPFS_GATEWAY_URL}${fileHash}/image`,  // URL to the stored image
        size: fileSize,
        url: `${STORJ_IPFS_GATEWAY_URL}${fileHash}`,          // URL to the stored dataset file
      };
  
      // Update the UI with new dataset entry
      setUploadedFiles([...uploadedFiles, newFile]);
      const updatedDatasets = [...datasets, newFile];
      setDatasets(updatedDatasets);
  
      // Save datasets with image URLs in sessionStorage
      sessionStorage.setItem('datasets', JSON.stringify(updatedDatasets));
  
      // Reset form fields
      setDatasetName('');
      setDatasetContent('');
      setSelectedFile(null);
      setImageFile(null);
      setFileSize('');
      setShowUploadModal(false);
    } catch (error) {
      console.error("Error uploading dataset:", error);
    }
  };
  

  const handleDownload = (url) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dataset.zip';
    a.click();
  };

  const handleDelete = async (datasetToDelete) => {
    try {
      // Extract file hash from dataset URL (ensure it's unique)
      const fileHash = datasetToDelete.url.split(STORJ_IPFS_GATEWAY_URL)[1]; // Extract file hash from URL
      
      // Call the correct method to remove the file from the contract
      await contract.methods.deleteFile(fileHash).send({ from: account, gas: '1000000' });
  
      // Remove dataset from UI and sessionStorage
      const updatedDatasets = datasets.filter(dataset => dataset.url !== datasetToDelete.url);
      setDatasets(updatedDatasets);
      sessionStorage.setItem('datasets', JSON.stringify(updatedDatasets));
      
    } catch (error) {
      console.error("Error deleting dataset:", error);
    }
  };
  
  return (
    <div className="container">
      {isWideScreen && (
        <div className="sidebar">
          <div className="sidebar-links">
            {[ 
              { name: 'Home', icon: faHome, active: false },
              { name: 'Competition', icon: faTrophy, active: false },
              { name: 'Datasets', icon: faCode, active: false },
              { name: 'Discussions', icon: faComments, active: false },
              { name: 'Profile', icon: faUser, active: false },
            ].map((link) => (
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
            <button
              className="filter-button"
              onClick={() => handleNavigation('Upload')}
            >
              <FontAwesomeIcon icon={faUpload} className="filter-icon" />
              Upload
            </button>
          </div>
        </div>

        <div className="dataset-grid">
          {filteredDatasets.map((dataset) => (
            <div key={dataset.url} className="dataset-card">
              <img src={dataset.image} alt={dataset.name} className="dataset-image" />
              <div className="dataset-content">
                <h3 className="dataset-title">{dataset.name}</h3>
                <p className="dataset-description">{dataset.content}</p>
                <p className="dataset-size">Size: {dataset.size || '0 MB'}</p>
              </div>
              <div className="dataset-footer">
                <button
                  className="download-button"
                  onClick={() => handleDownload(dataset.url)}
                >
                  <FontAwesomeIcon icon={faDownload} className="download-icon" />
                  Download
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(dataset)}
                >
                  <FontAwesomeIcon icon={faTrash} className="delete-icon" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {showUploadModal && (
          <div className="upload-modal">
            <div className="upload-modal-content">
              <h2>Upload Dataset</h2>
              <form onSubmit={handleSubmit}>
                <label>
                  Dataset Name
                  <input
                    type="text"
                    value={datasetName}
                    onChange={(e) => setDatasetName(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Dataset Description
                  <textarea
                    value={datasetContent}
                    onChange={(e) => setDatasetContent(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Dataset File
                  <input type="file" onChange={handleFileChange} required />
                </label>
                <label>
                  Dataset Image (optional)
                  <input type="file" onChange={handleImageChange} />
                </label>
                <div className="upload-actions">
                  <button type="submit" className="submit-button">Upload</button>
                  <button type="button" className="cancel-button" onClick={() => setShowUploadModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatasetsPage;
