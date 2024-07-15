const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

// Create the User schema
const userSchema = new Schema({
    nom: {type: String, require: true},
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    telephone: {type: String, require: true, unique: true},
    role: {type:String, enum:["admin", "user"] , default: "user"},
});

// Avant d'enregistrer un utilisateur, hash le mot de passe
userSchema.pre("save", async function(next) {
    try {
        // Vérifier si le mot de passe a été modifié
        if (!this.isModified("password")) {
            return next();
        }
        // Générer un salt pour le hachage
        const salt = await bcrypt.genSalt(10);
        // Hasher le mot de passe avec le salt
        const hashedPassword = await bcrypt.hash(this.password, salt);
        // Remplacer le mot de passe non hashé par le mot de passe hashé
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Méthode pour comparer les mots de passe hashés lors de l'authentification
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = mongoose.model("utilisateur", userSchema);