const express = require('express');
const { validateProduct, createProductMid } = require('../middlewares/productsMid');

const router = express.Router();

router.post('/', validateProduct, createProductMid);

module.exports = router;
