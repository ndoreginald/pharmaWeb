const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const utilisateur = require("../models/utilisateur");

//Afficher la liste des utilisateurs
router.get("/", async (req,res) => {
    try {
        const users = await utilisateur.find({},null,{sort:{nom:"asc"}});
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
} );

//Ajouter un nouvel utilisateur
router.post('/',async (req,res)=>{
    const { name, password, email, telephone} = req.body;
    const newUser = new utilisateur(req.body);

    try {
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(404).json({ "message": error.message });
    }
});

//modifier un utilisateur
router.put('/:id',async (req,res)=>{
    const id=req.params.id;
    try {
        // Vérifier si le champ password est modifié dans req.body
        if (req.body.password) {
            // Générer un salt pour le hachage
            const salt = await bcrypt.genSalt(10);
            // Hasher le nouveau mot de passe avec le salt
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        const user =  await utilisateur.findByIdAndUpdate(
            id, 
            { $set: req.body } , 
            { new : true }
        ) ;
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ "message": error.message });
    }
});

//Supprimer un utilisateur
router.delete("/:id", async (req, res) =>{
    const id = req.params.id;
    await utilisateur.findByIdAndDelete(id);
    res.status(200).json("User deleted successfully");
});

module.exports = router;