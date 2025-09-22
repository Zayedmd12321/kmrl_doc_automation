import React, { useMemo } from 'react';
import { documents as mockDocuments } from './db/mockData';
import Navbar from './components/Navbar';
import DocumentCard from './components/DocumentCard'; // <-- Import the new component
import './PriorityQueuePage.css';

// Define the order of urgency levels
const URGENCY_LEVELS = ['High', 'Medium', 'Low'];

function PriorityQueuePage() {
  const documentsByUrgency = useMemo(() => {
    // Group documents by urgency using reduce for a cleaner approach
    const grouped = mockDocuments.reduce((acc, doc) => {
      const { urgency } = doc.analysis;
      if (!acc[urgency]) {
        acc[urgency] = [];
      }
      acc[urgency].push(doc);
      return acc;
    }, {});

    // Sort documents within each group by date
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