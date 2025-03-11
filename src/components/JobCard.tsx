import React, { useState } from 'react';
import { JobPost } from '../data/jobData';
import ApplicationForm from './ApplicationForm';

interface JobCardProps {
  job: JobPost;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [showApplication, setShowApplication] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleApply = () => {
    if (job.isExclusive && !isUnlocked) {
      return;
    }
    setShowApplication(true);
  };

  const handleUnlock = () => {
    // In a real app, this would make an API call to process the token payment
    console.log(`Processing ${job.unlockPrice} tokens to unlock job`);
    setIsUnlocked(true);
  };

  const getNetworkScoreColor = (score: number) => {
    if (score >= 80) return '#00ff87';
    if (score >= 60) return '#60efff';
    return '#FFB800';
  };

  const getConnectionDegreeText = (degree: number) => {
    switch (degree) {
      case 1: return '1st degree connection';
      case 2: return '2nd degree connection';
      case 3: return '3rd degree connection';
      default: return `${degree}th degree connection`;
    }
  };

  const showCompanyInfo = !job.isExclusive || isUnlocked;

  return (
    <div className={`job-card ${job.isExclusive ? 'exclusive' : ''}`}>
      <div className="job-content">
        <div className="network-banner">
          <div className="network-score" style={{ 
            background: `linear-gradient(135deg, ${getNetworkScoreColor(job.networkScore || 0)}, transparent)` 
          }}>
            <span className="score-value">{job.networkScore}%</span>
            <span className="score-label">Network Match</span>
          </div>
          <div className="mutual-connections">
            👥 {job.postedBy.mutualConnections} mutual connections
          </div>
        </div>

        <div className="poster-info">
          <img 
            src={job.postedBy.avatar}
            alt={job.postedBy.username}
            className="avatar"
          />
          <div className="poster-details">
            <h3>{job.postedBy.username}</h3>
            <p>{getConnectionDegreeText(job.circle?.connectionDegree || 0)}</p>
          </div>
        </div>

        <div className="job-details">
          {job.isExclusive && !isUnlocked && (
            <div className="exclusive-badge">
              <div className="exclusive-header">
                <span className="lock-icon">🔒</span>
                <div className="exclusive-info">
                  <h4>{job.circle?.name}</h4>
                  <p>{job.circle?.memberCount} members</p>
                </div>
              </div>
              <button onClick={handleUnlock} className="unlock-btn">
                <span className="token-icon">⭐</span>
                Unlock for {job.unlockPrice} tokens
                <span className="unlock-hint">Click to reveal full details</span>
              </button>
            </div>
          )}
          <h2>{job.title}</h2>
          {showCompanyInfo && <h4>{job.company}</h4>}
          <div className="job-meta">
            <span className="location">📍 {job.location}</span>
            <span className="salary">💰 {job.salary}</span>
          </div>
          <div className="description">
            {isUnlocked || !job.isExclusive ? job.description : job.description.substring(0, 100) + '... 🔒'}
          </div>
          {job.postedBy && (
            <div className="posted-by">
              <div className="poster-info">
                <h4>{job.postedBy.title}</h4>
                <p>{job.postedBy.industry}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="interaction-buttons">
        {job.isExclusive && !isUnlocked ? (
          <div className="unlock-prompt">
            <p>Unlock this exclusive job posting to apply</p>
            <button onClick={handleUnlock} className="unlock-btn-large">
              <span className="token-icon">⭐</span>
              Spend {job.unlockPrice} tokens to unlock
            </button>
          </div>
        ) : (
          <button 
            onClick={handleApply} 
            className="apply-btn"
          >
            Apply Now
          </button>
        )}
      </div>

      {showApplication && (
        <ApplicationForm 
          job={job}
          onClose={() => setShowApplication(false)}
        />
      )}
    </div>
  );
};

export default JobCard; 