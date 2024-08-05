const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'public/build')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
