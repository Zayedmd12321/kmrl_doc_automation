import React from 'react';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { FiDownload } from 'react-icons/fi';

// Import the CSS module instead of normal CSS
import styles from './ActionsPanel.module.css';

function ActionsPanel({ result, fullText }) {
  // Function for creating and downloading DOCX files
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
    <div className={styles['actions-panel']}>
      <h3 className={styles['actions-header']}>Actions</h3>
      <div className={styles['actions-list']}>
        <button
          className={`${styles['action-button']} ${styles.primary}`}
          onClick={() => handleDownload(fullText, "extracted-text.docx")}
        >
          <FiDownload className={styles['button-icon']} />
          <span>Download Full Text</span>
        </button>
        {result?.summaries &&
          Object.entries(result.summaries).map(([dept, summary]) => (
            <button
              key={dept}
              className={`${styles['action-button']} ${styles.outline}`}
              onClick={() => handleDownload(summary, `${dept}-summary.docx`)}
            >
              <FiDownload className={styles['button-icon']} />
              <span>Download {dept} Summary</span>
            </button>
          ))}
      </div>
    </div>
  );
}

export default ActionsPanel;
