import { useState, useEffect } from 'react';
import CourseForm from './components/CourseForm';
import CourseCard from './components/CourseCard';
import './App.css';

export default function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses with error handling
  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:3001/courses');
      if (!response.ok) throw new Error('Network response failed');
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add new course
  const handleAddCourse = async (courseData) => {
    try {
      const response = await fetch('http://localhost:3001/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData)
      });
      if (!response.ok) throw new Error('Failed to add course');
      fetchCourses(); // Refresh list
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete course
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/courses/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Deletion failed');
      fetchCourses(); // Refresh list
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app">
      <h1>Course Manager</h1>
      <CourseForm onSubmit={handleAddCourse} />
      <div className="course-list">
        {courses.map(course => (
          <CourseCard 
            key={course.id} 
            course={course} 
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
