const productsModel = require('../models/productsModel');

const createProduct = async (name, quantity) => {
  const result = await productsModel.createProduct(name, quantity);
  return {
    status: 201,
    result: { id: result, name, quantity },
    };
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

const deleteProduct = async (id) => {
  const result = await productsModel.getProductById(id);
  if (result.length === 0) {
    return {
      status: 404,
      result: {
        message: 'Product not found',
      },
    };
  }
  await productsModel.deleteProduct(id);
  return {
    status: 200,
    result: result[0],
  };
};

module.exports = {
  createProduct,
  getAllProducts,
  searchById,
  updateProduct,
  deleteProduct,
};
