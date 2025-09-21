import React from 'react';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { FiDownload } from 'react-icons/fi';

// Import the new CSS file for this component
import './ActionsPanel.css';

function ActionsPanel({ result, fullText }) {
  // This function for creating and downloading DOCX files is unchanged.
  const handleDownload = (content, filename = "document.docx") => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [new Paragraph({ children: [new TextRun(content)] })],
        },
      ],
    });
    Packer.toBlob(doc).then((blob) => saveAs(blob, filename));
  };

  return (
    <div className="actions-panel">
      <h3 className="actions-header">Actions</h3>
      <div className="actions-list">
        <button
          className="action-button primary"
          onClick={() => handleDownload(fullText, "extracted-text.docx")}
        >
          <FiDownload className="button-icon" />
          <span>Download Full Text</span>
        </button>
        {result?.summaries && Object.entries(result.summaries).map(([dept, summary]) => (
          <button
            key={dept}
            className="action-button outline"
            onClick={() => handleDownload(summary, `${dept}-summary.docx`)}
          >
            <FiDownload className="button-icon" />
            <span>Download {dept} Summary</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ActionsPanel;