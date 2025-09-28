// src/components/DocumentDetailPage.js

import React from 'react';
import { useParams, Link } from 'react-router-dom'; // Assuming you use React Router
import { documents as mockDocuments } from '../db/mockData'; // Adjust path if needed
import Navbar from './Navbar';
import AnalysisPanel from './AnalysisPanel'; // Reuse your existing component
import ActionsPanel from './ActionsPanel';
import './DocumentDetailPage.css'; // We'll create this CSS file next

function DocumentDetailPage() {
  const { documentId } = useParams(); // Get the ID from the URL
  const document = mockDocuments.find(doc => doc._id === documentId);

  if (!document) {
    return (
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <div className="document-not-found">
            <h2>Document Not Found</h2>
            <p>The document you are looking for does not exist.</p>
            <Link to="/" className="button-primary">Go to Dashboard</Link>
          </div>
        </main>
      </div>
    );
  }

  // We need to create a `fullText` variable for the AnalysisPanel,
  // we can just use the general summary for the mock-up.
  const fullText = document.analysis.generalSummary;
  
  // The result prop for AnalysisPanel and ActionsPanel needs to match the structure.
  const analysisResult = {
    departments: document.analysis.departments,
    insights: {
        general_summary: document.analysis.generalSummary,
        action_items: document.analysis.actionItems,
        key_dates: document.analysis.keyDates.map(kd => kd.date), // Extract just the date strings
        urgency: document.analysis.urgency
    },
    summaries: document.analysis.summaries
  };

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <div className="page-header">
          <h1>{document.fileName}</h1>
          <p>Detailed analysis and insights for the selected document.</p>
        </div>

        <div className="document-detail-container">
          <AnalysisPanel result={analysisResult} fullText={fullText} />
          <ActionsPanel result={analysisResult} fullText={fullText} />
        </div>
      </main>
    </div>
  );
}

export default DocumentDetailPage;