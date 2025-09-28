import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import LoginPage from "./login";
import PriorityQueuePage from "./PriorityQueuePage";
import BrowsePage from "./BrowsePage";
import UpcomingDeadlinesPage from "./UpcomingDeadlinesPage";
import DocumentDetailPage from "./components/DocumentDetailPage";

// This code is correct for react-router-dom v6
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/priority" element={<PriorityQueuePage />} />
          <Route path="/departments" element={<BrowsePage />} />
          <Route path="/deadlines" element={<UpcomingDeadlinesPage />} />
          <Route path="/document/:documentId" element={<DocumentDetailPage />}></Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

