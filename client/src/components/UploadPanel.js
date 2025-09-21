import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiX } from 'react-icons/fi';
import { FaFilePdf, FaFileImage, FaFileWord, FaFileAlt } from 'react-icons/fa';

// Import the CSS file for styling
import './UploadPanel.css';

function UploadPanel({ onFileAccepted, isLoading, onClose }) {
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const maxSize = 15 * 1024 * 1024; // 15MB

      if (file.size > maxSize) {
        alert("File is too large! Please upload a file smaller than 15 MB.");
        return;
      }
      onFileAccepted(file);
    }
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': [],
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': []
    },
    multiple: false,
  });

  const handleSave = () => {
    // This is where you would trigger the actual upload to a server
    alert("Files Saved!");
    if (onClose) onClose();
  };

  // Conditionally apply a CSS class when a file is being dragged over
  const dropzoneClassName = isDragActive ? 'dropzone active' : 'dropzone';

  return (
    <div className="upload-panel">
      {onClose && (
        <button onClick={onClose} className="close-button">
          <FiX size={24} />
        </button>
      )}

      {/* "UPLOAD FILES" Header */}
      <div className="header">
        <hr className="divider" />
        <p className="header-title">UPLOAD FILES</p>
        <hr className="divider" />
      </div>

      {/* Drag & Drop Area */}
      <div {...getRootProps()} className={dropzoneClassName}>
        <input {...getInputProps()} />
        <div className="dropzone-content">
          <FiUploadCloud className="upload-icon" size={48} />
          <p className="dropzone-text-bold">Drag & Drop</p>
          <p className="dropzone-text-normal">
            {isDragActive ? "Drop the file here..." : "Your files here Or Browse to upload"}
          </p>
          <p className="dropzone-text-small">
            Only JPEG, PNG, GIF, and PDF files with a max size of 15 Mb.
          </p>
        </div>
      </div>

      {/* Supported File Type Icons */}
      <div className="file-icons-container">
        <FileIcon type="JPEG" icon={<FaFileImage size={24} />} color="#f6ad55" />
        <FileIcon type="PNG" icon={<FaFileImage size={24} />} color="#68d391" />
        <FileIcon type="GIF" icon={<FaFileAlt size={24} />} color="#63b3ed" />
        <FileIcon type="PDF" icon={<FaFilePdf size={24} />} color="#f56565" />
        <FileIcon type="DOC" icon={<FaFileWord size={24} />} color="#4299e1" />
      </div>

      {/* SAVE FILES Button */}
      <div className="save-button-container">
        <button onClick={handleSave} disabled={isLoading} className="save-button">
          {isLoading ? 'SAVING...' : 'SAVE FILES'}
        </button>
      </div>
    </div>
  );
}

// Helper component for file type icons
const FileIcon = ({ type, icon, color }) => (
  <div className="file-icon">
    <div className="icon-background" style={{ backgroundColor: color }}>
      {icon}
    </div>
    <p className="icon-label">{type}</p>
  </div>
);

export default UploadPanel;