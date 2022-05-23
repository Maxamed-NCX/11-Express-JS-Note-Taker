const express = require('express');
const path = require('path')
const app = express();


const notes = require('./db/db.json');
const PORT = process.env.PORT || 3001;
app.use(express.static('public'));
app.listen(PORT, () => {
  console.log(`API server now on port 3001!`);
});

app.get('/', (req,res ) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
} )

app.get('/notes', (req,res ) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
} )

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


