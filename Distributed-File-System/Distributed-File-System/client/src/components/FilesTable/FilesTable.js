import React from 'react';
import './FilesTable.css';

function FilesTable({ files }) {
	return (
		<div className="files-table">
			{files.map((file, index) => (
				<div className="file-card" key={index}>
					{file.image && <img src={file.image} alt={file.name} className="file-image" />}
					<h3>{file.name}</h3>
					<p>{file.content}</p>
					<p><strong>Size:</strong> {file.size}</p>
					<a href={file.url} target="_blank" rel="noopener noreferrer">
						Download Dataset
					</a>
				</div>
			))}
		</div>
	);
}

export default FilesTable;
