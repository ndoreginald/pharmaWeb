const mongoose = require("mongoose");
const utilisateur = require("./utilisateur");
const produit = require("./produit");

const Schema = mongoose.Schema;

// Create the panier schema
const panierSchema = new Schema({
    idUtilisateur: {type: Schema.Types.ObjectId, ref: utilisateur, require: true},
    produits: [{ type: Schema.Types.ObjectId, ref: produit }],
    statusPanier: {type: Boolean, default: false} // True si le panier est enregistré et False s'il n
});

module.exports = mongoose.model("panier", panierSchema);