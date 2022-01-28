const {
  createProduct,
  validateNameProduct,
  validateQuantityProduct,
} = require('../services/productsService');

const validateProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const validatedName = await validateNameProduct(name);
  const validatedQuantity = validateQuantityProduct(quantity);

  if (validatedName) {
    return res.status(validatedName.status).json({ message: validatedName.message });
  }
  if (validatedQuantity) {
    return res.status(validatedQuantity.status).json({ message: validatedQuantity.message });
  }
  next();
};

const createProductMid = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await createProduct(name, quantity);
  return res.status(result.status).json(result.result);
};

module.exports = {
  createProductMid,
  validateProduct,
};
