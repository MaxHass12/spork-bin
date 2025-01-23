const express = require('express');

const apiRouter = require('./routes/api');
const binsRouter = require('./routes/bins');
const app = express();

app.use(express.static('dist'));
app.use('/view/*', express.static('dist'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.use('/', binsRouter);
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
