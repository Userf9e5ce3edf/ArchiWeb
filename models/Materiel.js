const mongoose = require('mongoose');

const materielSchema = new mongoose.Schema({
  nom: String,
  type: String,
  disponibilite: Boolean,
  salle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Salle'
  }
});

const Materiel = mongoose.model('Materiel', materielSchema);