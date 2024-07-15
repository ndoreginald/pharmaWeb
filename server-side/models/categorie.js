const mongoose = require("mongoose");
const produit = require("./produit");

const Schema = mongoose.Schema;

// Create the categorie schema
const categorieSchema = new Schema({
    nom: {type: String, require: true},
    description: {type: String, require: true},
    promotion: {type: Number, require: false},
    produits: [{type:Schema.Types.ObjectId,ref: "produit"}]
});

module.exports = mongoose.model("categorie", categorieSchema);