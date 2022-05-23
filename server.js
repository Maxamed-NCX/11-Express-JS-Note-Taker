const express = require('express');

const app = express();


const notes = require('./db/db.json');
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`API server now on port 3001!`);
});

app.get('/api/notes', (req,res ) => {
  console.log(req.query)
 res.json(notes);
} )

const findById = (id, notes) => {
  console.log(notes.filter(note => note.id === id))
  return notes.filter(note => note.id === id)[0]
}
app.get('/api/notes/:id', (req,res ) => {
  const result = findById(req.params.id, notes);
  console.log(notes)
 res.json(result);
} )
