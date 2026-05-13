import React from 'react';

export default function ComplaintModal({ showModal, setShowModal, formData, setFormData, handleSubmit }) {
  if (!showModal) return null;

  return (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="title" style={{ fontSize: '20px', margin: 0 }}>File New Complaint</h2>
          <button onClick={() => setShowModal(false)} className="btn-text" style={{ fontSize: '22px', lineHeight: 1 }}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Subject</label>
            <input
              required
              type="text"
              className="input-field"
              placeholder="Title of your issue"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="label">Category</label>
            <select
              className="input-field"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option>General</option>
              <option>Academic</option>
              <option>Infrastructure</option>
              <option>Library</option>
              <option>Hostel</option>
              <option>Transport</option>
              <option>WiFi</option>
              <option>Examination</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label">Description</label>
            <textarea
              required
              rows="4"
              className="input-field"
              placeholder="Describe your issue in detail..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>Submit Complaint</button>
        </form>
      </div>
    </div>
  );
}
