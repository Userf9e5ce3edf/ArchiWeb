const mongoose = require('mongoose');

const salleSchema = new mongoose.Schema({
  nom: String,
  emplacement: String
});

const Salle = mongoose.model('Salle', salleSchema);
