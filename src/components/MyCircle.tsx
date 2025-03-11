import React, { useState } from 'react';

interface CircleMember {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  connections: number;
}

interface Circle {
  id: string;
  name: string;
  description: string;
  members: CircleMember[];
  exclusiveJobs: number;
}

const initialCircles: Circle[] = [
  {
    id: '1',
    name: 'Tech Leaders Circle',
    description: 'Senior tech professionals and leaders in the industry',
    members: [
      {
        id: '1',
        name: 'Sarah Chen',
        title: 'Engineering Director',
        company: 'TechCorp',
        avatar: 'https://i.pravatar.cc/150?img=1',
        connections: 15
      },
      {
        id: '2',
        name: 'Michael Rodriguez',
        title: 'Senior Software Architect',
        company: 'InnovateTech',
        avatar: 'https://i.pravatar.cc/150?img=2',
        connections: 12
      }
    ],
    exclusiveJobs: 15
  },
  {
    id: '2',
    name: 'StartUp Innovators',
    description: 'Entrepreneurs and startup enthusiasts',
    members: [
      {
        id: '3',
        name: 'Alex Kim',
        title: 'Founder & CEO',
        company: 'NextGen Solutions',
        avatar: 'https://i.pravatar.cc/150?img=3',
        connections: 8
      }
    ],
    exclusiveJobs: 8
  }
];

const MyCircle: React.FC = () => {
  const [circles] = useState<Circle[]>(initialCircles);
  const [selectedCircle, setSelectedCircle] = useState<Circle | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="mycircle-container">
      <div className="mycircle-header">
        <h2>My Professional Circles</h2>
        <button 
          className="create-circle-btn"
          onClick={() => setShowCreateModal(true)}
        >
          Create New Circle
        </button>
      </div>

      <div className="circles-grid">
        {circles.map(circle => (
          <div 
            key={circle.id} 
            className="circle-card"
            onClick={() => setSelectedCircle(circle)}
          >
            <div className="circle-card-header">
              <h3>{circle.name}</h3>
              <span className="exclusive-jobs">
                {circle.exclusiveJobs} exclusive positions
              </span>
            </div>
            <p className="circle-description">{circle.description}</p>
            <div className="circle-members">
              <div className="member-avatars">
                {circle.members.map(member => (
                  <img 
                    key={member.id}
                    src={member.avatar}
                    alt={member.name}
                    className="member-avatar"
                  />
                ))}
              </div>
              <span className="member-count">
                {circle.members.length} members
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedCircle && (
        <div className="circle-details-overlay">
          <div className="circle-details">
            <button 
              className="close-btn"
              onClick={() => setSelectedCircle(null)}
            >
              ×
            </button>
            <h2>{selectedCircle.name}</h2>
            <p>{selectedCircle.description}</p>
            
            <div className="members-list">
              <h3>Members</h3>
              {selectedCircle.members.map(member => (
                <div key={member.id} className="member-card">
                  <img 
                    src={member.avatar}
                    alt={member.name}
                    className="member-avatar"
                  />
                  <div className="member-info">
                    <h4>{member.name}</h4>
                    <p>{member.title}</p>
                    <p className="company">{member.company}</p>
                  </div>
                  <div className="member-connections">
                    {member.connections} mutual connections
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="create-circle-overlay">
          <div className="create-circle-modal">
            <button 
              className="close-btn"
              onClick={() => setShowCreateModal(false)}
            >
              ×
            </button>
            <h2>Create New Circle</h2>
            <form className="create-circle-form">
              <div className="form-group">
                <label htmlFor="circleName">Circle Name</label>
                <input 
                  type="text"
                  id="circleName"
                  placeholder="Enter circle name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="circleDescription">Description</label>
                <textarea
                  id="circleDescription"
                  placeholder="Describe your circle"
                />
              </div>
              <button type="submit" className="submit-btn">
                Create Circle
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCircle; 