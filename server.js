const express = require('express');
const path = require('path')
const app = express();
const fs = require('fs')
const {v4: uuidv4} = require('uuid')

const notes = require('./db/db.json');
const PORT = process.env.PORT || 3001;
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.post('/api/notes', (req,res ) => {
  console.log(notes)

  const note = req.body
  console.log(req.body)
  note.id = uuidv4()
  notes.push(note)
  fs.writeFile('./db/db.json', JSON.stringify(notes), function(err) {
    if (err) {
      return console.log(err);
    }
  } )
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

app.delete('/api/notes/:id', (req,res ) => {
const id =req.params.id
const result = notes.filter(note => note.id !== id)
console.log(result)
fs.writeFileAsync('./db/db.json', JSON.stringify(result), function(err) {
  if (err) {
    return console.log(err);}} ) 
  console.log('delete method')
 res.json(result);
} )

