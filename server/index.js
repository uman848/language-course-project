// Add DELETE endpoint
app.delete('/courses/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase
    .from('courses')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error });
  res.json({ success: true });
});

// Add input validation middleware
const validateCourse = (req, res, next) => {
  const { name } = req.body;
  if (!name?.trim()) return res.status(400).json({ error: 'Course name required' });
  if (name.length < 3) return res.status(400).json({ error: 'Name too short' });
  next();
};

// Apply validation to POST
app.post('/courses', validateCourse, async (req, res) => {
  // ... existing code ...
});
