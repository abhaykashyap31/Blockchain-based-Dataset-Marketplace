import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faTrophy, faCode, faComments, faUser, faSearch, faDownload, faUpload, faTrash
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import astro from './earth.png';
import './Datasets.css';
import axios from 'axios';
import FormData from 'form-data';
import Web3 from 'web3';
import StorageContract from '../artifacts/contracts/Storage.json';
import { NETWORK_ID, NETWORK_URL, STORJ_IPFS_API_URL, STORJ_IPFS_GATEWAY_URL } from '../constants';

const DatasetsPage = () => {
  const navigate = useNavigate();
  const [datasets, setDatasets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  // Initialize Web3 and contract
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

  // Load datasets from sessionStorage
  useEffect(() => {
    const savedDatasets = JSON.parse(sessionStorage.getItem('datasets')) || [];
    setDatasets(savedDatasets);
  }, []);

  // Handle screen resize for responsiveness
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
      navigate(`/${linkName.toLowerCase()}`);
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
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageFile(reader.result); // Convert to Base64
      reader.readAsDataURL(file);
    }
  };
  const handleDownload = (url) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dataset.zip';
    a.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData();
    data.append('file', selectedFile);
    data.append('datasetName', datasetName);
    data.append('datasetContent', datasetContent);

    try {
      // Upload dataset file to IPFS/STORJ
      const response = await axios.post(STORJ_IPFS_API_URL, data, {
        headers: { 'Content-Type': `multipart/form-data; boundary=${data._boundary}` },
        maxContentLength: Infinity, maxBodyLength: Infinity,
      });
      const fileHash = response.data;

      // Upload metadata to blockchain
      await contract.methods.addFile(fileHash).send({ from: account, gas: '1000000' });

      // Construct the new dataset entry
      const newFile = {
        name: datasetName,
        content: datasetContent,
        size: fileSize,
        image: imageFile, // Save Base64 image data
        url: `${STORJ_IPFS_GATEWAY_URL}${fileHash}`, // URL to the dataset file
      };

      // Update UI and session storage
      const updatedDatasets = [...datasets, newFile];
      setDatasets(updatedDatasets);
      setUploadedFiles([...uploadedFiles, newFile]);
      sessionStorage.setItem('datasets', JSON.stringify(updatedDatasets));

      // Reset form
      setDatasetName('');
      setDatasetContent('');
      setSelectedFile(null);
      setImageFile(null);
      setFileSize('');
      setShowUploadModal(false);
    } catch (error) {
      console.error('Error uploading dataset:', error);
    }
  };

  return (
    <div className="container">
      {isWideScreen && (
        <div className="sidebar">
          <div className="sidebar-links">
            {[ 
              { name: 'Home', icon: faHome },
              { name: 'Competition', icon: faTrophy },
              { name: 'Datasets', icon: faCode },
              { name: 'Discussions', icon: faComments },
              { name: 'Profile', icon: faUser },
            ].map((link) => (
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
              {dataset.image && <img src={dataset.image} alt="Dataset Preview" className="dataset-image" />}
              {/* Removed image rendering */}
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
                  Dataset Content
                  <textarea
                    value={datasetContent}
                    onChange={(e) => setDatasetContent(e.target.value)}
                    required
                  ></textarea>
                </label>
                <label>
                  Dataset File
                  <input type="file" onChange={handleFileChange} required />
                </label>
                <label>
                  Image File (Optional)
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                </label>
                <button type="submit" className="upload-submit">Upload</button>
                <button
                  type="button"
                  className="upload-cancel"
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatasetsPage;
