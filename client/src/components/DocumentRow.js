import React from 'react';

// A simple component to render an icon based on file extension
const FileIcon = ({ fileName }) => {
  const extension = fileName.split('.').pop().toLowerCase();
  let icon;

  switch (extension) {
    case 'pdf':
      icon = '📄'; 
      break;
    case 'docx':
      icon = '📝';
      break;
    default:
      icon = '📁';
  }

  return <span className="file-icon">{icon}</span>;
};


const DocumentRow = ({ doc }) => {
  const handleRowClick = () => {
    // Navigate to analysis page or open a modal
    console.log(`Viewing analysis for ${doc.fileName}`);
  };

  return (
    <tr className="document-row" onClick={handleRowClick}>
      <td data-label="File Name">
        <div className="file-name-cell">
          <FileIcon fileName={doc.fileName} />
          <span>{doc.fileName}</span>
        </div>
      </td>
      <td data-label="Departments">
        <div className="tag-container">
          {doc.analysis.departments.map(dept => (
            <span key={dept} className="tag tag-department">{dept}</span>
          ))}
        </div>
      </td>
      <td data-label="Urgency">
        <span className={`tag tag-urgency tag-${doc.analysis.urgency.toLowerCase()}`}>
          {doc.analysis.urgency}
        </span>
      </td>
      <td data-label="Date Uploaded">{new Date(doc.createdAt).toLocaleDateString()}</td>
      <td className="actions-cell">
        <div className="action-icon">
          <span>&rarr;</span>
        </div>
      </td>
    </tr>
  );
};

export default DocumentRow;