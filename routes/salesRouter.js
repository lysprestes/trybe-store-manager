const express = require('express');
const {
  createSalesMid,
  validateSalesMid,
  salesListMid,
  salesListByIdMid,
} = require('../controllers/salesController');

const router = express.Router();

router.get('/:id', salesListByIdMid);
router.get('/', salesListMid);

router.put('/:id');

router.delete('/:id');

router.post('/', validateSalesMid, createSalesMid);

module.exports = router;
