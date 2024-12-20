import React, { useState, useEffect } from "react";

const EditModal = ({ isOpen, onClose, onSubmit, workout }) => {
  // State for form inputs
  const [title, setTitle] = useState(workout ? workout.title : "");
  const [load, setLoad] = useState(workout ? workout.load : "");
  const [reps, setReps] = useState(workout ? workout.reps : "");

  // Update states when `workout` prop changes
  useEffect(() => {
    if (workout) {
      setTitle(workout.title);
      setLoad(workout.load);
      setReps(workout.reps);
    }
  }, [workout]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...workout, title, load, reps });
  };

  // If modal is not open, return null
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Workout</h3>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <label>Load (kg):</label>
          <input 
            type="number" 
            value={load} 
            onChange={(e) => setLoad(e.target.value)} 
          />
          <label>Reps:</label>
          <input 
            type="number" 
            value={reps} 
            onChange={(e) => setReps(e.target.value)} 
          />
          <button className="modal-edit" type="submit">Save</button>
          <button className="modal-close" onClick={onClose}>Close</button>
        </form>
        
      </div>
    </div>
  );
};

export default EditModal;