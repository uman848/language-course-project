import { useState } from 'react';

export default function CourseForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(formData);
    }}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Course name"
        minLength={3}
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        rows={3}
      />
      <button type="submit">Add Course</button>
    </form>
  );
}
