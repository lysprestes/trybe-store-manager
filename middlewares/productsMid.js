const {
  createProduct,
  validateNameProduct,
  validateDuplicate,
  validateQuantityProduct,
  getAllProducts,
  searchById,
  updateProduct,
} = require('../services/productsService');

const validateProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const validatedName = await validateNameProduct(name);
  const validatedQuantity = validateQuantityProduct(quantity);
  const validatedDuplicate = await validateDuplicate(name);

  if (validatedName) {
    return res.status(validatedName.status).json({ message: validatedName.message });
  }
  if (validatedDuplicate) {
    return res.status(validatedDuplicate.status).json({ message: validatedDuplicate.message });
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

const productsListMid = async (req, res) => {
  const result = await getAllProducts();
  return res.status(result.status).json(result.result);
};

const searchByIdMid = async (req, res) => {
  const result = await searchById(req.params.id);
  return res.status(result.status).json(result.result);
};

const validateUpdate = async (req, res, next) => {
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

const updateProductMid = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await updateProduct(req.params.id, name, quantity);
  return res.status(result.status).json(result.result);
};

module.exports = {
  createProductMid,
  validateProduct,
  productsListMid,
  searchByIdMid,
  validateUpdate,
  updateProductMid,
};
