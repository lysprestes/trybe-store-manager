const express = require('express');
const {
  createSalesMid,
  validateSalesMid,
  salesListMid,
  salesListByIdMid,
  updateSalesMid,
} = require('../controllers/salesController');

const router = express.Router();

router.get('/:id', salesListByIdMid);
router.get('/', salesListMid);

router.put('/:id', validateSalesMid, updateSalesMid);

router.delete('/:id');

router.post('/', validateSalesMid, createSalesMid);

module.exports = router;
