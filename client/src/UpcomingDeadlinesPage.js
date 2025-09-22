import React, { useMemo } from 'react';
import { documents as mockDocuments } from './db/mockData';
import Navbar from './components/Navbar';
import './UpcomingDeadlinesPage.css';

// Helper function to determine urgency based on date proximity
const getUrgency = (date) => {
  const today = new Date();
  const oneWeekFromNow = new Date(today);
  oneWeekFromNow.setDate(today.getDate() + 7);
  const oneMonthFromNow = new Date(today);
  oneMonthFromNow.setMonth(today.getMonth() + 1);
  today.setHours(0, 0, 0, 0);

  if (date <= oneWeekFromNow) return 'urgent';
  if (date <= oneMonthFromNow) return 'soon';
  return 'normal';
};

function UpcomingDeadlinesPage() {
  const timelineData = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadlines = mockDocuments.flatMap(doc =>
      doc.analysis.keyDates.map(kd => ({
        date: new Date(kd.date),
        event: kd.event,
        fileName: doc.fileName,
        departments: doc.analysis.departments,
        documentId: doc._id
      }))
    )
    .filter(d => !isNaN(d.date.getTime()) && d.date >= today)
    .sort((a, b) => a.date - b.date);

    // Group deadlines by date string
    const groupedByDate = deadlines.reduce((acc, deadline) => {
      const dateString = deadline.date.toDateString();
      if (!acc[dateString]) {
        acc[dateString] = {
          date: deadline.date,
          urgency: getUrgency(deadline.date),
          items: []
        };
      }
      acc[dateString].items.push(deadline);
      return acc;
    }, {});

    // Convert grouped object back to an array
    const timelineEvents = Object.values(groupedByDate);
    
    // Inject "Today" marker at the beginning
    timelineEvents.unshift({ isToday: true });

    return timelineEvents;
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <div className="page-header">
          <h1>Upcoming Deadlines</h1>
          <p>A chronological timeline of key dates extracted from all documents.</p>
        </div>

        <div className="timeline-container">
          {timelineData.length > 1 ? (
            timelineData.map((group, index) => (
              <TimelineItem key={index} group={group} />
            ))
          ) : (
            <div className="no-deadlines">No upcoming deadlines found.</div>
          )}
        </div>
      </main>
    </div>
  );
}

// Sub-component for a timeline item
const TimelineItem = ({ group }) => {
  // Handle the special "Today" marker
  if (group.isToday) {
    return (
      <div className="timeline-item timeline-item--today">
        <div className="timeline-node"></div>
        <div className="timeline-date">
          <strong>Today</strong>
          <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
        </div>
      </div>
    );
  }

  // Normal date group
  return (
    <div className="timeline-item">
      <div className={`timeline-node timeline-node--${group.urgency}`}></div>
      <div className="timeline-date">
        {group.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </div>
      <div className="timeline-cards-container">
        {group.items.map((item, idx) => (
          <DeadlineCard key={`${item.documentId}-${idx}`} item={item} />
        ))}
      </div>
    </div>
  );
};

// Sub-component for a single deadline card
const DeadlineCard = ({ item }) => {
  const extension = item.fileName.split('.').pop();
  return (
    <div className="deadline-card">
      <div className="deadline-card-header">
        <span className={`file-icon-small file-icon--${extension}`}>.{extension}</span>
        <h3 className="deadline-filename"><a href="#">{item.fileName}</a></h3>
      </div>
      <p className="deadline-event">{item.event}</p>
      <div className="deadline-card-footer">
        <div className="tag-container">
          {item.departments.map(dept => (
            <span key={dept} className="tag tag-department">{dept}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingDeadlinesPage;