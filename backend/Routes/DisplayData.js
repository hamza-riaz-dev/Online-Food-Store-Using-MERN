const express = require('express');
const router = express.Router();

router.post('/catalogData', (req, res) => {
    try {
        res.send([global.catalog, global.prodCategories])
    } catch (error) {
        console.error(error.message);
        res.send("Server Error");
    }
});

module.exports = router;