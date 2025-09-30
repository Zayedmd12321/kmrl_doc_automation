import React from 'react';
import { Link } from 'react-router-dom'; // 1. Link is now the only import needed for navigation

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
  // 2. The useNavigate hook and handleRowClick function have been removed.

  return (
    // 3. The onClick handler is removed from the <tr> element. The row is no longer clickable.
    <tr className="document-row">
      <td data-label="File Name">
        <div className="file-name-cell">
          <Link
            to={`/document/${doc._id}`}
            className="file-name-link"
          >
            <FileIcon fileName={doc.fileName} />
            {doc.fileName}
          </Link>
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
        <span className={`tag tag-urgency tag-${doc.analysis.urgency.split(',')[0].trim().toLowerCase()}`}>
          {doc.analysis.urgency.split(',')[0]}
        </span>
      </td>
      <td data-label="Date Uploaded">{new Date(doc.createdAt).toLocaleDateString()}</td>
      <td className="actions-cell">
        <Link
          to={`/document/${doc._id}`}
          className="file-name-link"
        >
          <span>&rarr;</span>
        </Link>
      </td>
    </tr>
  );
};

export default DocumentRow;