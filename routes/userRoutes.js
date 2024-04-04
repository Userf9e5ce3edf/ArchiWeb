const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');

// Inscription d'un nouvel utilisateur
router.post('/register', async (req, res) => {
  const { Nom, Prenom, Mail, MotDePasse } = req.body;
  try {
    const db = req.app.locals.db;
    // Vérifier si l'utilisateur existe déjà
    let utilisateur = await db.collection('utilisateur').findOne({ Mail });
    if (utilisateur) {
      return res.status(400).json({ message: "L'utilisateur existe déjà." });
    }
    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(MotDePasse, 10);
    // Créer un nouvel utilisateur
    const nouvelUtilisateur = {
      Nom,
      Prenom,
      Mail,
      MotDePasse: hashedPassword,
    };
    await db.collection('utilisateur').insertOne(nouvelUtilisateur);
    res.status(201).json({ message: "Utilisateur créé avec succès." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

// Connexion d'un utilisateur
router.post('/login', async (req, res) => {
  const { Mail, MotDePasse } = req.body;
  try {
    const db = req.app.locals.db;
    // Vérifier si l'utilisateur existe
    let utilisateur = await db.collection('utilisateur').findOne({Mail});
    if (!utilisateur) {
      return res.status(400).json({ message: "Email de l'utilisateur invalide." });
    }
    // Vérifier le mot de passe avec bcrypt
    const isMatch = await bcrypt.compare(MotDePasse, utilisateur.MotDePasse);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe de l'utilisateur invalide." });
    }

    // Générer un token JWT
    const payload = { utilisateur: { id: utilisateur.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    console.log("JWT Secret:", process.env.JWT_SECRET);
    res.status(500).send('Erreur serveur');
  }
});

// Obtenir la liste de tous les utilisateurs
router.get('/', async (req, res) => {
    try {
      const db = req.app.locals.db;
      const users = await db.collection('utilisateur').find({}).toArray();
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erreur serveur: ' + err.message); 
    }
  });

  // Exporter le routeur
module.exports = router;
