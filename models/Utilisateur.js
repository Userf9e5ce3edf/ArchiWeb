const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true,
    unique: true
  },
  motDePasse: {
    type: String,
    required: true
  },
  // Si vous avez des rôles spécifiques, vous pouvez les référencer ici
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  }
});

module.exports = mongoose.model('Utilisateur', utilisateurSchema);
