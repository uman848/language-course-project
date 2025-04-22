const express = require("express");
const app = express();
const PORT = 3001;

// Middleware to parse JSON
app.use(express.json());

// Example DELETE route
app.delete('/courses/:id', async (req, res) => {
  const courseId = req.params.id;
  // Normally you'd remove it from a database here
  res.send(`Course with ID ${courseId} deleted`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

