import React from 'react';

export default function CourseCard({ course, onDelete }) {
  return (
    <div className="course-card">
      <h3>{course.name}</h3>
      <p>{course.description || 'No description'}</p>
      <button onClick={() => onDelete(course.id)}>Delete</button>
    </div>
  );
}
