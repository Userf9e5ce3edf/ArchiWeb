const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  intitule: String
});

const Role = mongoose.model('Role', roleSchema);