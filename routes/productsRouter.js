const express = require('express');
const {
  searchByIdMid,
  productsListMid,
  validateUpdate,
  validateProduct,
  createProductMid,
  updateProductMid,
  deleteProductMid,
} = require('../controllers/productsController');

const router = express.Router();

router.get('/:id', searchByIdMid);
router.get('/', productsListMid);

router.put('/:id', validateUpdate, updateProductMid);

router.delete('/:id', deleteProductMid);

router.post('/', validateProduct, createProductMid);

module.exports = router;
