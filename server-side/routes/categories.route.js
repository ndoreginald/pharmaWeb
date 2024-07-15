const express = require("express");
const router = express.Router();
const categorie = require("../models/categorie");
const produit = require("../models/produit");

//Afficher la liste des categories
router.get("/", async (req,res) => {
    try {
        const cat = await categorie.find({},null,{sort:{nom:"asc"}}).populate("produits");
        res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
} );

//Afficher une categorie à partie de son id
router.get("/:id", async (req,res) => {
    const {id} = req.params;
    try {
        const cat = await categorie.findById(id).populate("produits")
        .populate('produits') // Charge les produits associés
        .exec();
        if(!cat){
            return res.status(404).json({message: "Categorie non trouvée" })
        }
        res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
} );

//Ajouter une nouvelle categorie
router.post('/', async (req, res) => {
    const { nom, description, produits } = req.body;
    // Créer une nouvelle instance de catégorie
    const newCategorie = new categorie({ nom, description });
    try {
        // Sauvegarder la nouvelle catégorie
        const savedCategorie = await newCategorie.save();
        // Créer et sauvegarder les produits associés
        const produitPromises = produits.map(async (prod) => {
            const newProduit = new produit({ ...prod, idCategorie: savedCategorie._id });
            return await newProduit.save();
        });
        // Attendre que tous les produits soient sauvegardés
        const savedProduits = await Promise.all(produitPromises);
        // Ajouter les produits sauvegardés à la catégorie
        savedCategorie.produits = savedProduits.map(produit => produit._id);

        // Sauvegarder la catégorie mise à jour
        await savedCategorie.save();

        // Répondre avec la catégorie et les produits associés
        res.status(200).json({ categorie: savedCategorie, produits: savedProduits });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

//modifier une categorie
router.put('/:id',async (req,res)=>{
    const id=req.params.id;
    try {
        const cat =  await categorie.findByIdAndUpdate(
            id, 
            { $set: req.body } , 
            { new : true }
        ) ;
        res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ "message": error.message });
    }
});

//Supprimer une categorie
router.delete("/:id", async (req, res) =>{
    const id = req.params.id;
    try {
        await categorie.findByIdAndDelete(id);
        await produit.deleteMany({idCategorie: id})
        res.status(200).json("Categorie deleted successfully");
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
});

module.exports = router;