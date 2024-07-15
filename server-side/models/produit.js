const mongoose = require("mongoose");
const categorie = require("./categorie");

const Schema = mongoose.Schema;

// Create the produit schema
const produitSchema = new Schema({
    libelle: {type: String, require: true},
    description: { type: String, required: true },
    date_ajout : {type: Date, require: true, default: new Date()},
    idCategorie: { type: Schema.Types.ObjectId, ref: "categorie", require: true},
    prix: {type: Number, require: true},
    quantite: {type: Number, default: 0},
    image: { type: String },
    popularity : {type: Number, default: 0, require: false}
});

module.exports = mongoose.model("produit", produitSchema);