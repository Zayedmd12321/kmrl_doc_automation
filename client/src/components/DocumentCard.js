// src/components/DocumentCard.js

import React from 'react';
import { Link } from 'react-router-dom';

// A simple checkmark icon component
const CheckIcon = () => (
  <svg className="action-item-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M12.736 4.264a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L5.5 10.793l6.236-6.529z"/>
  </svg>
);

const DocumentCard = ({ document }) => {
  // --- CHANGES ARE HERE ---

  // 1. Define a limit for how many items to show.
  const MAX_ACTION_ITEMS = 3;

  const urgencyLevel = document?.analysis?.urgency?.split(',')[0].trim().toLowerCase() || 'low';
  // A safe way to get the action items array
  const actionItems = document?.analysis?.actionItems || [];

  return (
    <div className={`document-card urgency-${urgencyLevel}`}>
      <div className="card-header">
        <h3 className="card-filename">{document.fileName}</h3>
        <span className="card-date">{new Date(document.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
      </div>
      <div className="card-content">
        <h4>Action Items:</h4>
        {actionItems.length > 0 ? (
          <ul className="action-list">
            {/* 2. Use .slice() to get only the first few items from the array */}
            {actionItems.slice(0, MAX_ACTION_ITEMS).map((item, index) => (
              <li key={index}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
            {/* 3. If the original array is longer than our limit, show an ellipsis */}
            {actionItems.length > MAX_ACTION_ITEMS && (
              <li className="more-items-indicator">...</li>
            )}
          </ul>
        ) : (
          <p className="no-items">None identified.</p>
        )}
      </div>
      <div className="card-footer">
        <div className="tag-container">
          {document?.analysis?.departments?.map(dept => (
            <span key={dept} className="tag tag-department">{dept}</span>
          ))}
        </div>
        <Link to={`/document/${document._id}`} className="card-action-button">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default DocumentCard;