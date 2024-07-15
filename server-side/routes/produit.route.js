const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const categorie = require("../models/categorie");
const produit = require("../models/produit");

//Afficher la liste des produits
router.get("/", async (req,res) => {
    try {
        const AllProducts = await produit.find({},null,{sort:{libelle:"asc"},}).populate("idCategorie");
        res.status(200).json(AllProducts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
} );

//Afficher la liste des produits les plus recents
router.get('/recent', async (req, res) => {
    try {
        const recentProducts = await produit.find().sort({ date_ajout: -1 }).limit(8);
        res.json(recentProducts);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Afficher la liste des produits les plus populaire
router.get('/popular', async (req, res) => {
    try {
        const popularProducts = await produit.find().sort({ popularity: -1 }).limit(8);
        res.json(popularProducts);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Ajouter un nouveau produit
router.post('/',async (req,res)=>{
    const { libelle, description, idCategorie,  prix, quantite} = req.body;
    const newProduit = new produit(req.body);

    try {
        const saveProduit = await newProduit.save();
        await categorie.findByIdAndUpdate(
            idCategorie,
            {$push:{produits:saveProduit._id}} ,
            {new:true,useFindAndModify:false}
        );
        res.status(200).json(newProduit);
    } catch (error) {
        res.status(404).json({ "message": error.message });
    }
});

//Recuperer un produit par son id
router.get('/:id',async (req,res)=>{
    const id=req.params.id;
    try {
        const prod =  await produit.findById(id).populate("idCategorie") ;
        res.status(200).json(prod);
    } catch (error) {
        res.status(404).json({ "message": error.message });
    }
});

//modifier un produit
router.put('/:id',async (req,res)=>{
    const id=req.params.id;
    try {
        const prod =  await produit.findByIdAndUpdate(
            id, 
            { $set: req.body } , 
            { new : true }
        ) ;
        res.status(200).json(prod);
    } catch (error) {
        res.status(404).json({ "message": error.message });
    }
});

// Route pour incrémenter la popularité
router.patch('/:id', async (req, res) => {
    try {
      const prod = await produit.findById(req.params.id);
      if (!prod) {
        return res.status(404).json({ message: 'Produit non trouvé' });
      } 
  
      prod.popularity += 1;
      await prod.save();
  
      res.status(200).json(prod);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

//Supprimer une produit
router.delete("/:id", async (req, res) =>{
    const id = req.params.id;
    try {
        await produit.findByIdAndDelete(id);
        res.status(200).json("Product deleted successfully");
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
});

module.exports = router;