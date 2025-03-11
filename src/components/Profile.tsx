import React from 'react';

interface ProfileProps {
  name: string;
  industry: string;
  avatar: string;
  onClose: () => void;
}

const Profile: React.FC<ProfileProps> = ({ name, industry, avatar, onClose }) => {
  return (
    <div className="profile-overlay">
      <div className="profile-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="profile-content">
          <div className="profile-image">
            <img src={avatar} alt={name} />
          </div>
          <div className="profile-info">
            <h2>{name}</h2>
            <p className="industry">{industry}</p>
          </div>
          <div className="profile-actions">
            <button className="connect-btn">Connect</button>
            <button className="message-btn">Message</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 