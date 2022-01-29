const express = require('express');
const {
  searchByIdMid,
  productsListMid,
  validateUpdate,
  validateProduct,
  createProductMid,
  updateProductMid,
} = require('../middlewares/productsMid');

const router = express.Router();

router.get('/:id', searchByIdMid);
router.get('/', productsListMid);

router.put('/:id', validateUpdate, updateProductMid);

router.post('/', validateProduct, createProductMid);

module.exports = router;
