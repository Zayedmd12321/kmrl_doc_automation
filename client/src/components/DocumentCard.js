import React from 'react';

// A simple checkmark icon component
const CheckIcon = () => (
  <svg className="action-item-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M12.736 4.264a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L5.5 10.793l6.236-6.529z"/>
  </svg>
);

const DocumentCard = ({ document }) => {
  return (
    <div className={`document-card urgency-${document.analysis.urgency.toLowerCase()}`}>
      <div className="card-header">
        <h3 className="card-filename">{document.fileName}</h3>
        <span className="card-date">{new Date(document.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="card-content">
        <h4>Action Items:</h4>
        {document.analysis.actionItems.length > 0 ? (
          <ul className="action-list">
            {document.analysis.actionItems.map((item, index) => (
              <li key={index}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-items">None identified.</p>
        )}
      </div>
      <div className="card-footer">
        <div className="tag-container">
          {document.analysis.departments.map(dept => (
            <span key={dept} className="tag tag-department">{dept}</span>
          ))}
        </div>
        <button className="card-action-button">View Details</button>
      </div>
    </div>
  );
};

export default DocumentCard;