const { Product } = require('../models/products.js');
const { Category } = require('../models/category.js');
const {Brand} = require('../models/brands.js')
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const query = req.query.q;

    if (!query || query.trim() === '') {
      return res.status(400).json({ msg: 'Search query is required and cannot be empty.' });
    }

    // Requête d'agrégation pour rechercher dans les produits, marques et catégories
    const results = await Product.aggregate([
      {
        $lookup: {
          from: 'brands', // Nom de la collection des marques
          localField: 'brand', // Champ de référence dans le produit
          foreignField: '_id', // Champ de référence dans la collection des marques
          as: 'brand' // Alias pour les détails de la marque
        }
      },
      {
        $lookup: {
          from: 'categories', // Nom de la collection des catégories
          localField: 'category', // Champ de référence dans le produit
          foreignField: '_id',
          as: 'category' // Alias pour les détails de la catégorie
        }
      },
      {
        $match: {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { 'brand.name': { $regex: query, $options: 'i' } },
            { 'category.name': { $regex: query, $options: 'i' } }
          ]
        }
      },
      {
        $limit: 50 // Limite le nombre de résultats
      }
    ])

    if (results.length === 0) {
      return res.status(404).json({ msg: 'No products found for this query.' });
    }

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error, please try again later.' });
  }
});

module.exports = router;
