import React, { useState, useMemo } from 'react';
import { documents as mockDocuments } from './db/mockData';
import Navbar from './components/Navbar';
import FilterControls from './components/FilterControls';
import DocumentsTable from './components/DocumentsTable';
import './BrowsePage.css';

// Get a unique list of all departments from the data
const allDepartments = ['All', ...new Set(mockDocuments.flatMap(doc => doc.analysis.departments))];

function BrowsePage() {
  const [documents] = useState(mockDocuments);
  const [activeDepartment, setActiveDepartment] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDocuments = useMemo(() => {
    return documents
      .filter(doc => {
        const departmentMatch = activeDepartment === 'All' || doc.analysis.departments.includes(activeDepartment);
        const searchMatch = doc.fileName.toLowerCase().includes(searchTerm.toLowerCase());
        return departmentMatch && searchMatch;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [documents, activeDepartment, searchTerm]);

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <div className="page-header">
          <h1>Browse Documents</h1>
          <p>Search, filter, and manage all analyzed documents.</p>
        </div>

        <FilterControls
          departments={allDepartments}
          activeDepartment={activeDepartment}
          onDepartmentChange={setActiveDepartment}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <DocumentsTable documents={filteredDocuments} />
      </main>
    </div>
  );
}

export default BrowsePage;