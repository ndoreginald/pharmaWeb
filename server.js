const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3001;

// Définition de l'en-tête pour permettre l'accès depuis n'importe où
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
    });

    // Connexion à la base de données en utilisant openUri
    mongoose.connection.openUri('mongodb://127.0.0.1:27017/PharmaDB');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
    db.once('open', () => {
    console.log('Connecté à la base de données MongoDB');
    });


const productSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  price: Number,
  quantity: Number,
  description: String,
  img: String,
});

const Product = mongoose.model('Product', productSchema);

app.get('/produits', (req, res) => {
    // Utilisation de Model.find() sans callback
    Product.find({})
    .then(produits => {
    // Envoi des étudiants en tant que réponse JSON
    res.json(produits);
    })
    .catch(error => {
    // Gestion des erreurs
    console.error('Erreur lors de la récupération des produits :', error);
    res.json({ error: 'Erreur lors de la récupération des produits' });
    });
});



// Démarrage du serveur
app.listen(port, () => {
    console.log("Serveur en cours d'exécution sur le port ${port}");
    });
