const express = require('express');
const {
  createSalesMid,
  validateSalesMid,
} = require('../controllers/salesController');

const router = express.Router();

router.get('/:id');
router.get('/');

router.put('/:id');

router.delete('/:id');

router.post('/', validateSalesMid, createSalesMid);

module.exports = router;
