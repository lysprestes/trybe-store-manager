const productsService = require('../services/productsService');

const registerProductMiddle = async (req, res) => { 
  const { name, quantity } = req.body;
  const registeredProduct = await productsService.registerProduct(name, quantity);
  res.status(registeredProduct.status).json(registeredProduct.response);
};

module.exports = { registerProductMiddle };