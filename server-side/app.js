const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const utilisateurRouter = require("./routes/utilisateurs.route");
const categorieRouter = require("./routes/categories.route");
const produitRouter = require("./routes/produit.route");
const commandRouter = require("./routes/command.route");
const contactRouter = require("./routes/contact.route");
//const panierRouter = require("./routes/panier.route");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=> {
    res.send({"message":"Welcome to Server of e-Ectro"});
} );
 // Route pour ajouter un produit
app.post('/api/produits', async (req, res) => {
  const { libelle, description, idCategorie, prix, quantite, image } = req.body;
  // Créer un nouvel objet produit
  const newProduit = new Produit({
    libelle,
    description,
    idCategorie,
    prix,
    quantite,
    image
});
try {
  // Enregistrer le produit dans la collection des produits
  const savedProduit = await newProduit.save();

  // Mettre à jour la catégorie pour y ajouter le produit
  await Categorie.findByIdAndUpdate(
      idCategorie,
      { $push: { produits: savedProduit._id } },
      { new: true, useFindAndModify: false }
  );

  res.status(200).json(savedProduit);
} catch (error) {
  res.status(404).json({ "message": error.message });
}
});

app.get('/data', (req, res) => {
  res.json({
    pieLabels: ['Red', 'Blue', 'Yellow'],
    pieData: [300, 50, 100],
    lineLabels: ['January', 'February', 'March', 'April', 'May', 'June'],
    lineData: [65, 59, 80, 81, 56, 55, 40],
    barLabels: ['January', 'February', 'March', 'April', 'May', 'June'],
    barData: [12, 19, 3, 5, 2, 3],
  });
});


// Connect to MongoDB database
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("DataBase Successfully Connected");
  })
  .catch((err) => {
    console.log("Unable to connect to database", err);
    process.exit();
  });

app.use("/e-Ectro/utilisateur/",utilisateurRouter); 
app.use("/e-Ectro/categorie/",categorieRouter);  
app.use("/e-Ectro/produit/",produitRouter); 
app.use("/e-Ectro/command/",commandRouter );
app.use("/e-Ectro/contact/",contactRouter );

//app.use("/e-Ectro/panier/",panierRouter); 

app.listen(process.env.PORT, () => {
    console.log("Server listen to "+process.env.PORT);
} )

module.exports = app;