import React, { useState } from 'react';
import JobCard from './JobCard';
import { mockJobs } from '../data/jobData';

const JobFeed: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const navigateJobs = (direction: 'up' | 'down') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(prev => {
      const nextIndex = direction === 'up' ? prev - 1 : prev + 1;
      return Math.max(0, Math.min(nextIndex, mockJobs.length - 1));
    });
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (isTransitioning) return;

    if (e.deltaY > 0 && currentIndex < mockJobs.length - 1) {
      navigateJobs('down');
    } else if (e.deltaY < 0 && currentIndex > 0) {
      navigateJobs('up');
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (isTransitioning) return;

    const swipeDistance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0 && currentIndex < mockJobs.length - 1) {
        navigateJobs('down');
      } else if (swipeDistance < 0 && currentIndex > 0) {
        navigateJobs('up');
      }
    }
  };

  return (
    <div 
      className="job-feed" 
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="job-feed-slider" 
        style={{ 
          transform: `translateY(-${currentIndex * 100}%)`,
          transition: isTransitioning ? 'transform 0.3s ease-out' : 'none'
        }}
      >
        {mockJobs.map((job, index) => (
          <div key={`${job.id}-${index}`} className="job-feed-item">
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobFeed; 