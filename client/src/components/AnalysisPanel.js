import React, { useState } from 'react';
import { FiAlertTriangle, FiCheckSquare, FiCalendar } from 'react-icons/fi';
import { GoChevronDown } from 'react-icons/go';
import ReactMarkdown from 'react-markdown';

// Import CSS module
import styles from './AnalysisPanel.module.css';

// A minimalist component for displaying key insights
const InsightItem = ({ icon: Icon, title, children }) => (
  <div className={styles['insight-item']}>
    <Icon className={styles['insight-icon']} />
    <div className={styles['insight-text']}>
      <p className={styles['insight-title']}>{title}</p>
      <div className={styles['insight-value']}>{children}</div>
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
    <div className={styles.accordion}>
      {Object.entries(items).map(([title, content], index) => (
        <div className={styles['accordion-item']} key={title}>
          <button
            className={styles['accordion-header']}
            onClick={() => handleClick(index)}
          >
            <span>Summary for {title}</span>
            <GoChevronDown
              className={`${styles['accordion-chevron']} ${
                activeIndex === index ? styles.open : ''
              }`}
            />
          </button>
          <div
            className={`${styles['accordion-content']} ${
              activeIndex === index ? styles.open : ''
            }`}
          >
            <div className={styles['accordion-content-inner']}>
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
          <div className={styles['tab-content']}>
            <h3 className={styles['section-heading']}>Relevant Departments</h3>
            <div className={styles['tags-container']}>
              {departments.length > 0 ? (
                departments.map((dept) => (
                  <span key={dept} className={`${styles.tag} ${styles.teal}`}>
                    {dept}
                  </span>
                ))
              ) : (
                <p className={styles['placeholder-text-small']}>
                  No specific departments identified.
                </p>
              )}
            </div>
            {Object.keys(summaries).length > 0 && <Accordion items={summaries} />}
          </div>
        );
      case 'fullText':
        return (
          <div className={styles['tab-content']}>
            <pre className={styles['full-text-box']}>
              {fullText || 'No text available.'}
            </pre>
          </div>
        );
      case 'overview':
      default:
        return (
          <div className={styles['tab-content']}>
            <h3 className={styles['section-heading']}>General Summary</h3>
            <p className={styles['summary-text']}>
              {insights.general_summary || 'No summary available.'}
            </p>

            <h3 className={styles['section-heading']}>Key Insights</h3>
            <div className={styles['insights-container']}>
              <InsightItem icon={FiAlertTriangle} title="Urgency">
                <span
                  className={`${styles.tag} ${
                    insights.urgency?.startsWith('High')
                      ? styles.red
                      : styles.green
                  }`}
                >
                  {insights.urgency || 'N/A'}
                </span>
              </InsightItem>
              <InsightItem icon={FiCheckSquare} title="Action Items">
                {insights.action_items?.length
                  ? insights.action_items.join('; ')
                  : 'None identified.'}
              </InsightItem>
              <InsightItem icon={FiCalendar} title="Key Dates">
                {insights.key_dates?.length
                  ? insights.key_dates.join(', ')
                  : 'None identified.'}
              </InsightItem>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={styles['analysis-panel']}>
      <div className={styles['tab-list']}>
        <button
          className={`${styles.tab} ${
            activeTab === 'overview' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === 'departments' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('departments')}
        >
          Department Summaries
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === 'fullText' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('fullText')}
        >
          Full Text
        </button>
      </div>

      {renderTabContent()}
    </div>
  );
}

export default AnalysisPanel;
