import React, { useState } from 'react';
import { FiAlertTriangle, FiCheckSquare, FiCalendar } from 'react-icons/fi';
import { GoChevronDown } from 'react-icons/go';
import ReactMarkdown from 'react-markdown';

// Import the dedicated CSS file for this component
import './AnalysisPanel.css';

// A minimalist component for displaying key insights
const InsightItem = ({ icon: Icon, title, children }) => (
  <div className="insight-item">
    <Icon className="insight-icon" />
    <div className="insight-text">
      <p className="insight-title">{title}</p>
      <div className="insight-value">{children}</div>
    </div>
  </div>
);

// A custom Accordion component
const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0); // First item open by default

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle on/off
  };

  return (
    <div className="accordion">
      {Object.entries(items).map(([title, content], index) => (
        <div className="accordion-item" key={title}>
          <button className="accordion-header" onClick={() => handleClick(index)}>
            <span>Summary for {title}</span>
            <GoChevronDown className={`accordion-chevron ${activeIndex === index ? 'open' : ''}`} />
          </button>
          <div className={`accordion-content ${activeIndex === index ? 'open' : ''}`}>
            <div className="accordion-content-inner">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


function AnalysisPanel({ result, fullText }) {
  const [activeTab, setActiveTab] = useState('overview');
  const { departments = [], summaries = {}, insights = {} } = result || {};

  const renderTabContent = () => {
    switch (activeTab) {
      case 'departments':
        return (
          <div className="tab-content">
            <h3 className="section-heading">Relevant Departments</h3>
            <div className="tags-container">
              {departments.length > 0 ? (
                departments.map(dept => <span key={dept} className="tag teal">{dept}</span>)
              ) : (
                <p className="placeholder-text-small">No specific departments identified.</p>
              )}
            </div>
            {Object.keys(summaries).length > 0 && <Accordion items={summaries} />}
          </div>
        );
      case 'fullText':
        return (
          <div className="tab-content">
            <pre className="full-text-box">
              {fullText || "No text available."}
            </pre>
          </div>
        );
      case 'overview':
      default:
        return (
          <div className="tab-content">
            <h3 className="section-heading">General Summary</h3>
            <p className="summary-text">{insights.general_summary || "No summary available."}</p>

            <h3 className="section-heading">Key Insights</h3>
            <div className="insights-container">
              <InsightItem icon={FiAlertTriangle} title="Urgency">
                <span className={`tag ${insights.urgency?.startsWith('High') ? 'red' : 'green'}`}>
                  {insights.urgency || 'N/A'}
                </span>
              </InsightItem>
              <InsightItem icon={FiCheckSquare} title="Action Items">
                {insights.action_items?.length ? insights.action_items.join('; ') : 'None identified.'}
              </InsightItem>
              <InsightItem icon={FiCalendar} title="Key Dates">
                {insights.key_dates?.length ? insights.key_dates.join(', ') : 'None identified.'}
              </InsightItem>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="analysis-panel">
      <div className="tab-list">
        <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
          Overview
        </button>
        <button className={`tab ${activeTab === 'departments' ? 'active' : ''}`} onClick={() => setActiveTab('departments')}>
          Department Summaries
        </button>
        <button className={`tab ${activeTab === 'fullText' ? 'active' : ''}`} onClick={() => setActiveTab('fullText')}>
          Full Text
        </button>
      </div>

      {renderTabContent()}
    </div>
  );
}

export default AnalysisPanel;