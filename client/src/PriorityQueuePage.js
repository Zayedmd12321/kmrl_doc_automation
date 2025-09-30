// PriorityQueuePage.js

import React, { useMemo } from 'react';
import { documents as mockDocuments } from './db/mockData';
import Navbar from './components/Navbar';
import DocumentCard from './components/DocumentCard';
import './PriorityQueuePage.css';

// Define the order of urgency levels
const URGENCY_LEVELS = ['High', 'Medium', 'Low'];

function PriorityQueuePage() {
  const documentsByUrgency = useMemo(() => {
    // --- MODIFICATION IS HERE ---
    const grouped = mockDocuments.reduce((acc, doc) => {
      // 1. Get the full urgency string, providing a fallback like 'Low' if it's missing.
      const fullUrgency = doc?.analysis?.urgency || 'Low';

      // 2. Extract only the level (e.g., "High") by splitting the string at the comma
      //    and taking the first part. .trim() removes any extra spaces.
      const urgencyLevel = fullUrgency.split(',')[0].trim();

      // 3. Use the extracted level (e.g., "High", "Medium") for grouping.
      if (!acc[urgencyLevel]) {
        acc[urgencyLevel] = [];
      }
      acc[urgencyLevel].push(doc);
      return acc;
    }, {});
    // --- END OF MODIFICATION ---

    // Sort documents within each group by date (this part is unchanged)
    for (const urgency in grouped) {
      grouped[urgency].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return grouped;
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <div className="page-header">
          <h1>Priority Queue</h1>
          <p>Documents and tasks requiring review, sorted by urgency.</p>
        </div>

        {URGENCY_LEVELS.map(level => {
          const documents = documentsByUrgency[level] || [];
          if (documents.length === 0) return null;

          return (
            <div key={level} className="queue-section">
              <div className="queue-header">
                <h2 className={`queue-title ${level.toLowerCase()}`}>{level} Urgency</h2>
                <span className="item-count">{documents.length} items</span>
              </div>
              <div className="card-grid">
                {documents.map(doc => <DocumentCard key={doc._id} document={doc} />)}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default PriorityQueuePage;