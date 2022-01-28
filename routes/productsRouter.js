const express = require('express');

const router = express.Router();

const { 
  registerProductMiddle, 
} = require('../controllers/productsController');

router.post('/', registerProductMiddle);

module.exports = router;