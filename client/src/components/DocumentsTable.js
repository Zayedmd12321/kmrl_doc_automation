import React from 'react';
import DocumentRow from './DocumentRow';

const DocumentsTable = ({ documents }) => {
  if (documents.length === 0) {
    return <div className="no-results-card">No documents found.</div>;
  }

  return (
    <div className="table-container-card">
      <table>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Departments</th>
            <th>Urgency</th>
            <th>Date Uploaded</th>
            <th className="actions-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map(doc => (
            <DocumentRow key={doc._id} doc={doc} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentsTable;