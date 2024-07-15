const express = require('express');
const router = express.Router();
const contact = require("../models/contact"); 

router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;
  
    const newContact = new contact({
      name,
      email,
      subject,
      message,
    });
  
    try {
      const savedContact = await newContact.save();
      res.status(201).json(savedContact);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const contacts = await contact.find({}, null, { sort: { date: "desc" } });
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  // Route pour supprimer une commande
router.delete('/:id', async (req, res) => {
    try {
        const Id = req.params.id;
        const deletedContact = await contact.findByIdAndDelete(Id);

        if (!deletedContact) {
            return res.status(404).send({ message: 'Order not found' });
        }

        res.status(200).send({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting order', error: error.message });
    }
});

  module.exports = router;