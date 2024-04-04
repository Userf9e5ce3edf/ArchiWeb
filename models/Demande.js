const mongoose = require('mongoose');

const demandeSchema = new mongoose.Schema({
  type: String,
  statut: String,
  laDate: Date,
  materiel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Materiel'
  },
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur'
  }
});

const Demande = mongoose.model('Demande', demandeSchema);
