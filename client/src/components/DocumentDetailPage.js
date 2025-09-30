// src/components/DocumentDetailPage.js

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { documents as mockDocuments } from '../db/mockData';
import Navbar from './Navbar';
import AnalysisPanel from './AnalysisPanel';
import ActionsPanel from './ActionsPanel';
import './DocumentDetailPage.css';

function DocumentDetailPage() {
  const { documentId } = useParams();
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

  // --- CHANGES ARE HERE ---

  // 1. The manual `analysisResult` object has been completely removed.
  //    It's no longer needed because our child components can handle the real data structure.

  // 2. We get `fullText` from the document. We can use generalSummary as a fallback
  //    if the mock data doesn't have a `fullText` property.
  const fullText = document.fullText || document.analysis.generalSummary;

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <div className="page-header">
          <h1>{document.fileName}</h1>
          <p>Detailed analysis and insights for the selected document.</p>
        </div>

        <div className="document-detail-container">
          {/* 3. Pass the entire `document` object as the `result` prop.
               AnalysisPanel is already designed to find the `analysis` object inside it. */}
          <AnalysisPanel result={document} fullText={fullText} />
          <ActionsPanel result={document} fullText={fullText} />
        </div>
      </main>
    </div>
  );
}

export default DocumentDetailPage;