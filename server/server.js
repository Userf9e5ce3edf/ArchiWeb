require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const userRoutes = require('../routes/userRoutes'); 

const app = express();
app.use(express.json());

const mongoURL = "mongodb://localhost:27017/ArchiWeb_db";
const client = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('Connexion à la base de données MongoDB réussie.');
        app.locals.db = client.db("ArchiWeb_db"); 
        // Utiliser les routes d'utilisateur ici, après la connexion à la base de données
        app.use('/api/utilisateurs', userRoutes);

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
    } catch (err) {
        console.error('Erreur lors de la connexion à MongoDB:', err);
    }
}

run().catch(console.dir);
