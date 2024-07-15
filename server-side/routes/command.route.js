const express = require('express');
const router = express.Router();
const commande = require("../models/commande"); // Assurez-vous que le chemin est correct


router.post('/', async (req, res) => {
    const { 
        firstName,
        lastName,
        email,
        mobile,
        address1,
       country,
        city,
        cartItems,
    shipping,
    total,
    paymentMethod } = req.body;

    const newCommande = new commande(req.body);

    try {
        const saveCommande = await newCommande.save();
        res.status(200).json(newCommande);
    } catch (error) {
        res.status(404).json({ "message": error.message });
    }
});

// Route pour récupérer toutes les commandes
router.get('/', async (req, res) => {
    try {
        const orders = await commande.find({}, null, { sort: { date_ajout: "desc" } });
        // Récupère toutes les entrées de la table 'commandes'
        res.status(200).json(orders); //res.send(orders);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching orders', error: error.message });
    }
});

//Supprimer une commande
router.delete("/:id", async (req, res) =>{
    const id = req.params.id;
    try {
        await commande.findByIdAndDelete(id);
        await produit.deleteMany({idCategorie: id})
        res.status(200).json("Categorie deleted successfully");
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
});

// Route pour annuler une commande
router.post('/cancel/:id', async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await commande.findById(orderId);
  
      if (!order) {
        return res.status(404).send({ message: 'Order not found' });
      }
  
      if (order.status === 'cancelled') {
        return res.status(400).send({ message: 'Order is already cancelled' });
      }
  
      // Mettre à jour le statut de la commande
      order.status = 'cancelled';
      await order.save();
  
      res.status(200).send({ message: 'Order cancelled successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Error cancelling order', error: error.message });
    }
  });

  // Route pour supprimer une commande
router.delete('/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        const deletedOrder = await commande.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).send({ message: 'Order not found' });
        }

        res.status(200).send({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting order', error: error.message });
    }
});

router.get("/sales", async (req, res) => {
  try {
    const aggregatedData = await commande.aggregate([
      { $unwind: "$cartItems" },
      { $group: { _id: "$cartItems.libelle", totalQuantity: { $sum: "$cartItems.quantite" } } },
      { $sort: { totalQuantity: -1 } },
    ]);
    res.json(aggregatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/monthly-sales", async (req, res) => {
  try {
    const aggregatedData = await commande.aggregate([
      { $unwind: "$cartItems" },
      {
        $group: {
          _id: {
            year: { $year: "$date_ajout" },
            month: { $month: "$date_ajout" },
          },
          totalSales: { $sum: { $multiply: ["$cartItems.quantite", "$cartItems.prix"] } },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);
    res.json(aggregatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
