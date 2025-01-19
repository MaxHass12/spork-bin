const express = require('express');

const apiRouter = require('./routes/api');
const app = express();

app.use(express.json());
// mount the apiRouter to the '/api' path
app.use('/api', apiRouter);
// how do we want to include/serve static front-end files?
app.use(express.static('dist'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});