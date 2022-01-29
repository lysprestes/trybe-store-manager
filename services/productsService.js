const productsModel = require('../models/productsModel');

const createProduct = async (name, quantity) => {
  const result = await productsModel.createProduct(name, quantity);
  return {
    status: 201,
    result: { id: result, name, quantity },
    };
};

const validateName = (name) => {
  if (!name) {
    return {
      status: 400,
      message: '"name" is required',
    };
  }
};

const validateNameLength = (name) => {
  if (name.length < 5) {
    return {
      status: 422,
      message: '"name" length must be at least 5 characters long',
    };
  }
};

const validateQuantity = (quantity) => {
  if (!quantity && quantity !== 0) {
    return {
      status: 400,
      message: '"quantity" is required',
    };
  }
};

const validateQuantityNumber = (quantity) => {
  if (typeof quantity !== 'number' || quantity < 1) {
    return {
      status: 422,
      message: '"quantity" must be a number larger than or equal to 1',
    };
  }
};

const validateDuplicate = async (name) => {
  const result = await productsModel.searchByName(name);
  if (result.length > 0) {
    return {
      status: 409,
      message: 'Product already exists',
    };
  }
};

const validateNameProduct = async (name) => {
  if (validateName(name)) return validateName(name);
  if (validateNameLength(name)) return validateNameLength(name);
};

const validateQuantityProduct = (quantity) => {
  if (validateQuantity(quantity)) return validateQuantity(quantity);
  if (validateQuantityNumber(quantity)) return validateQuantityNumber(quantity);
};

const getAllProducts = async () => {
  const result = await productsModel.productsList();
  return {
    status: 200,
    result,
    };
};

const searchById = async (id) => {
  const result = await productsModel.getProductById(id);
  if (result.length === 0) {
    return {
      status: 404,
      result: {
        message: 'Product not found',
      },
    };
  }
  return {
    status: 200,
    result: result[0],
    };
};

const updateProduct = async (id, name, quantity) => {
  const result = await productsModel.getProductById(id);
  if (result.length === 0) {
    return {
      status: 404,
      result: {
        message: 'Product not found',
      },
    };
  }
  await productsModel.updateProduct(id, name, quantity);
  return {
    status: 200,
    result: { id, name, quantity },
  };
};

module.exports = {
  createProduct,
  validateNameProduct,
  validateDuplicate,
  validateQuantityProduct,
  getAllProducts,
  searchById,
  updateProduct,
};
