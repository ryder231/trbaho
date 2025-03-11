import React, { useState, useEffect } from 'react';
import { JobPost } from '../data/jobData';

interface ApplicationFormProps {
  job: JobPost;
  onClose: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ job, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resume: null as File | null,
  });

  useEffect(() => {
    // Get current scroll position
    const scrollY = window.scrollY;
    document.documentElement.style.setProperty('--scroll-position', `${scrollY}px`);
    
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Cleanup
      document.body.style.overflow = '';
      document.documentElement.style.removeProperty('--scroll-position');
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the application data to your backend
    console.log('Submitting application:', { ...formData, jobId: job.id });
    // For now, just close the form
    onClose();
  };

  return (
    <div className="application-overlay">
      <div className="application-container">
        <button className="close-application" onClick={onClose}>×</button>
        <div className="application-header">
          <h2>Apply for {job.title}</h2>
          <p>at {job.company}</p>
        </div>
        <form onSubmit={handleSubmit} className="application-form">
          <div className="form-field">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="resume">Resume</label>
            <div className="resume-upload">
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                style={{ display: 'none' }}
                required
              />
              <div 
                className="upload-area"
                onClick={() => document.getElementById('resume')?.click()}
              >
                {formData.resume ? (
                  <span>{formData.resume.name}</span>
                ) : (
                  <>
                    <span>Click to upload</span> or drag and drop
                    <br />
                    PDF, DOC, DOCX (max 5MB)
                  </>
                )}
              </div>
            </div>
          </div>
          <button type="submit" className="submit-application">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm; 