const mongoose = require("mongoose");
const utilisateur = require("./utilisateur");
const produit = require("./produit");

const Schema = mongoose.Schema;


// Définir le schéma pour les items du panier
const cartItemSchema = new Schema({
    _id: { type: String, required: false },
    libelle: { type: String, required: true },
    quantite: { type: Number, required: true },
    prix: { type: Number, required: true }
});

// Définir le schéma pour les commandes
const commandeSchema = new Schema({
   // _id: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String },
    country: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: false },
    status: { type: String, default: 'validated' },
    zipCode: { type: String, required: false },
    date_ajout : {type: Date, require: true, default: new Date()},
    cartItems: [cartItemSchema],
    subtotal: { type: Number, required: true },
    shipping: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentMethod: { type: String, required: true }
});

module.exports = mongoose.model("commande", commandeSchema);