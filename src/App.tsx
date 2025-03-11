import { useState } from 'react'
import './styles/App.css'
import JobFeed from './components/JobFeed'
import MyCircle from './components/MyCircle'
import Messages from './components/Messages'
import Profile from './components/Profile'

function App() {
  const [activeTab, setActiveTab] = useState('jobs')

  return (
    <div className="app-container">
      <div className="content-area">
        {activeTab === 'jobs' && <JobFeed />}
        {activeTab === 'circle' && <MyCircle />}
        {activeTab === 'messages' && <Messages />}
        {activeTab === 'profile' && <Profile />}
      </div>
      
      <nav className="bottom-nav">
        <button 
          className={`nav-btn ${activeTab === 'jobs' ? 'active' : ''}`}
          onClick={() => setActiveTab('jobs')}
        >
          Jobs
        </button>
        <button 
          className={`nav-btn ${activeTab === 'circle' ? 'active' : ''}`}
          onClick={() => setActiveTab('circle')}
        >
          My Circle
        </button>
        <button 
          className={`nav-btn ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          Messages
        </button>
        <button 
          className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
      </nav>
    </div>
  )
}

export default App 