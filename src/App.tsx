import React, { useState } from 'react';
import './styles/App.css';
import JobFeed from './components/JobFeed';
import MyCircle from './components/MyCircle';
import Messages from './components/Messages';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'feed' | 'circle'>('feed');
  const [showMessages, setShowMessages] = useState(false);
  const [showMyCircle, setShowMyCircle] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="app">
      {showIntro && (
        <div className="intro-overlay">
          <div className="intro-content">
            <h2>Welcome to Trabaho</h2>
            <div className="intro-messages">
              <div className="intro-message">
                <span className="message-icon">🎯</span>
                <p>Discover real jobs posted by real people</p>
              </div>
              <div className="intro-message">
                <span className="message-icon">🌟</span>
                <p>Invite friends to join your circle for exclusive roles and opportunities</p>
              </div>
              <div className="intro-message">
                <span className="message-icon">🔗</span>
                <p>Cultivate 1st & 2nd degree relationships to rank higher in the job posting system</p>
              </div>
              <div className="intro-message highlight">
                <span className="message-icon">💪</span>
                <p>Traditional sites have given up on the consumer. Trabaho is here to disrupt the recruiting and job posting industry.</p>
              </div>
            </div>
            <button className="intro-close" onClick={() => setShowIntro(false)}>
              Get Started
            </button>
          </div>
        </div>
      )}
      
      <header className="app-header">
        <div className="header-left">
          <h1>Trabaho</h1>
          <div className="header-tagline">
            Real Jobs. Real People. Real Connections.
          </div>
        </div>
        <nav>
          <button 
            className={currentView === 'feed' ? 'active' : ''} 
            onClick={() => setCurrentView('feed')}
          >
            Home
          </button>
          <button 
            className={currentView === 'circle' ? 'active' : ''} 
            onClick={() => setCurrentView('circle')}
          >
            MyCircle
          </button>
          <button onClick={() => setShowMessages(true)}>
            Messages
          </button>
          <button className="post-job-btn">
            Post Job
          </button>
        </nav>
      </header>

      <main className="app-main">
        {currentView === 'feed' ? (
          <JobFeed />
        ) : (
          <MyCircle />
        )}
      </main>

      {showMessages && (
        <Messages onClose={() => setShowMessages(false)} />
      )}
    </div>
  );
};

export default App; 