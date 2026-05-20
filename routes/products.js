const express = require("express");
const router = express.Router();
const db = require("../data/db");

// GET alla produkter (för översiktssidor)
router.get("/", (req, res) => {
    const products = db.prepare("SELECT * FROM clothes LIMIT 8").all();
    res.render("products", { products });
});

// GET enskild produkt via dynamisk route
router.get("/:productName", (req, res) => {
    const { productName } = req.params;
    
    // Hämta alla produkter och sök efter matchning
    const products = db.prepare(`
        SELECT * FROM clothes
    `).all();
    
    const product = products.find(p => {
        const slug = (p.color + '-' + p.model).toLowerCase().replace(/ /g, '-').replace(/å/g, 'a');
        return slug === productName.toLowerCase();
    });
    
    if (!product) {
        return res.status(404).render("error", { 
            message: "Produkt hittades inte",
            error: { status: 404, stack: '' }
        });
    }
    
    res.render("products/detail", { product });
});

module.exports = router;