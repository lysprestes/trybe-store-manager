const express = require('express');
const {
  searchByIdMid,
  productsListMid,
  validateProduct,
  createProductMid,
} = require('../middlewares/productsMid');

const router = express.Router();

router.get('/:id', searchByIdMid);
router.get('/', productsListMid);
router.post('/', validateProduct, createProductMid);

module.exports = router;
