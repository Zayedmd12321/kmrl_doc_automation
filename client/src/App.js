import React, { useState } from "react";
import axios from "axios";
// import { FaBrain } from 'react-icons/fa'; // No longer needed for the removed header

// Import the Chakra Spinner
import { Spinner as ChakraSpinner, Box, VStack, Center, Text } from "@chakra-ui/react";


// Import the new CSS file for styling
import './App.css';

// Import your existing components
import UploadPanel from "./components/UploadPanel";
import AnalysisPanel from "./components/AnalysisPanel";
import ActionsPanel from "./components/ActionsPanel";
import Navbar from "./components/Navbar";
// No longer importing custom Spinner if using Chakra's

function App() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [fullText, setFullText] = useState("");

  const handleUploadAndAnalyze = async (acceptedFile) => {
    if (!acceptedFile) return;
    setFile(acceptedFile);
    setAnalysisResult(null);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", acceptedFile);

    try {
      const extractRes = await axios.post("http://localhost:5000/upload", formData);
      const { text } = extractRes.data;
      setFullText(text);

      const summaryRes = await axios.post("http://localhost:5000/summarize", { text });
      setAnalysisResult(summaryRes.data);
    } catch (err) {
      console.error("An error occurred during analysis:", err);
      alert("Analysis failed. Please check the console for details.");
    } finally {
      setIsLoading(false);
    }
  };

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
              </div>
            ) : !analysisResult ? (
              <div className="placeholder-content">
                <p className="placeholder-text-large">
                  KMRL Document Analyser
                </p>
                <p className="placeholder-text-small">
                  Upload a document to unlock its core information, key entities, and much more.
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