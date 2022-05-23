
const express = require('express');

const app = express();


const notes = require('./db/db.json');
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`API server now on port 3001!`);
});

app.get('/banaa', (req,res ) => {
  console.log(req.query)
 res.json(notes);
} )