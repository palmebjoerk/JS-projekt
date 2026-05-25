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

    const products = db.prepare(`SELECT * FROM clothes`).all();

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

    const similar = products
        .filter(p => p.model === product.model && p.id !== product.id)
        .slice(0, 6);

    res.render("products/detail", { product, similar });
});

module.exports = router;