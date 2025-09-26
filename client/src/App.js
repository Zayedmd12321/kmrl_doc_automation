// App.js

import React, { useState, useEffect } from "react"; // Import useEffect
import axios from "axios";
import { Spinner as ChakraSpinner } from "@chakra-ui/react";
import io from "socket.io-client"; // Import socket.io-client

import './App.css';
import UploadPanel from "./components/UploadPanel";
import AnalysisPanel from "./components/AnalysisPanel";
import ActionsPanel from "./components/ActionsPanel";
import Navbar from "./components/Navbar";

// --- 1. Establish socket connection outside the component ---
const socket = io(process.env.REACT_APP_BACKEND_URL);

function App() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [fullText, setFullText] = useState("");

  // --- 2. Add useEffect to handle socket events ---
  useEffect(() => {
    // Listener for when an email attachment starts processing
    socket.on("processing:start", (data) => {
      console.log("Socket: Processing started for", data.filename);
      setAnalysisResult(null); // Clear previous results
      setFile({ name: `Processing email attachment: ${data.filename}` }); // Show a message
      setIsLoading(true);
    });

    // Listener for when analysis is complete
    socket.on("processing:complete", (result) => {
      console.log("Socket: Processing complete.");
      setAnalysisResult(result);
      setFullText(result.fullText || "");
      setIsLoading(false);
    });

    // Clean up listeners when the component unmounts
    return () => {
      socket.off("processing:start");
      socket.off("processing:complete");
    };
  }, []); // Empty dependency array means this runs once on mount

  const handleUploadAndAnalyze = async (acceptedFile) => {
    if (!acceptedFile) return;
    setFile(acceptedFile);
    setAnalysisResult(null);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", acceptedFile);

    try {
      // The /upload endpoint now handles the full process
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload`, formData);
      setFullText(res.data.text);
      setAnalysisResult(res.data);
    } catch (err) {
      console.error("An error occurred during analysis:", err);
      alert("Analysis failed. Please check the console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  // The rest of your return statement is unchanged
  return (
     <div className="app-container">
      <Navbar />

      <main className="main-content-new-layout"> {/* New class for main content */}
        {/* The header section (KMRL Insight Engine) is removed */}

        <div className="main-area"> {/* This div now holds all main content */}
          {/* The Upload Panel now takes more space */}
          <div className="upload-section">
            <UploadPanel
              onFileAccepted={handleUploadAndAnalyze}
              isLoading={isLoading}
            />
          </div>

          {/* Conditional content based on loading/analysis result, now below the upload */}
          <div className="analysis-results-section">
            {isLoading ? (
              <div className="loading-container">
                <ChakraSpinner size="xl" color="#00a99d" thickness="4px" />
                <p className="loading-text">Analyzing document...</p>
                 {/* Show the filename being processed, works for both uploads and emails */}
                {file && <p className="processing-filename">{file.name}</p>}
              </div>
            ) : !analysisResult ? (
              <div className="placeholder-content">
                <p className="placeholder-text-large">
                  KMRL Document Analyser
                </p>
                <p className="placeholder-text-small">
                  Upload a document or send an email with an attachment to start.
                </p>
                <ul className="feature-list">
                  <li>OCR and Text Extraction</li>
                  <li>Automated summarization</li>
                  <li>Automated Department classification</li>
                  <li>Secure and private processing</li>
                </ul>
                <p className="call-to-action">
                  Drag and drop your files or click the upload box to get started!
                </p>
              </div>
            ) : (
              <div className="results-wrapper">
                <AnalysisPanel result={analysisResult} fullText={fullText} />
                <ActionsPanel result={analysisResult} fullText={fullText} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;