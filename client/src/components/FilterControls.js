import React from 'react';

const FilterControls = ({ departments, activeDepartment, onDepartmentChange, searchTerm, onSearchChange }) => {
  return (
    <div className="filter-controls-card">
      <div className="department-filters">
        {departments.map(dept => (
          <button
            key={dept}
            className={`filter-button ${activeDepartment === dept ? 'active' : ''}`}
            onClick={() => onDepartmentChange(dept)}
          >
            {dept === 'All' ? 'All Departments' : dept}
          </button>
        ))}
      </div>
      <div className="search-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="search-icon" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
        <input
          type="text"
          placeholder="Search by filename..."
          className="search-input"
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterControls;