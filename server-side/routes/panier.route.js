const express = require("express");
const router = express.Router();

const panier = require("../models/panier");

//Afficher les produits du panier
router.get("/:userID", async (req,res) => {
    try {
        //Recupere le panier de l'utilisateur
        let bucket = await panier.findOne({idUtilisateur: req.params.userID},{sort:{nom:"asc"}}).populate("produits");
        if(!bucket){
            bucket = new panier({ idUtilisateur : req.params.userID });
            console.log("Le Panier est vide")
        }
        //Renvoi les produits du paniers
        res.status(200).json(bucket);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
} );

// Ajouter un produit au panier
router.post('/:userID/:productID', async (req, res) => {
    try {
        // Vérifier si le panier existe déjà pour l'utilisateur, sinon le créer
        let bucket = await panier.findOne( { idUtilisateur : req.params.userID } );
        if (!bucket) {
            bucket = new panier( { idUtilisateur : req.params.userID } );
        }
        // Ajouter le produit au panier
        bucket.produits.push(req.params.productID);
        // Enregistrer les modifications du panier dans la base de données
        await bucket.save();
        res.status(200).json(bucket.produits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Supprimer un produit du  panier
router.delete("/:userID/:productID", async (req, res) =>{
    try {
        const bucket = await panier.findOne({ idUtilisateur : req.params.userID });
        if(!bucket){
            console.log("Le panier est vide")
        }
        const index = bucket.produits.indexOf(req.params.productID);
        if (index === -1) {
            res.status(404).json({ message: "Le produit n'existe pas dans le panier" });
        }else{
            bucket.produits.splice(index,1);
            //bucket.produits.pull(req.params.productID);
            await bucket.save();
            console.log("Produit supprimé avec succès");
            res.status(200).json(bucket.produits);
        }
        
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
});

//modifier le status du panier
router.put('/:userID/:status',async (req,res)=>{
    const statutP=req.params.status;
    const userId=req.params.userID;
    try {
        let bucket=await panier.findOne({ idUtilisateur : userId });
        if(!bucket){
            return res.status(404).json('Désolé le panier est vide')
        }
        bucket.updateOne({statutPanier:statutP},()=>{
            res.status(200).json(`le panier a été mis à jour`)
        });
    } catch (error) {
        res.status(404).json({ "message": error.message });
    }
});

module.exports = router;