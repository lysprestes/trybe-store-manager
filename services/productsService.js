const models = require('../models/productsModel');

const validateNameDuplicated = async (name) => {
  const searchProduct = await models.searchProductByName(name);
  if (searchProduct.length !== 0) return true;
  return false;
};

const validateName = async (name) => {
  if (!name || typeof name !== 'string') {
  return { 
    response: { message: '"name" is required' }, status: 400 }; 
}
  if (name.length < 5) {
  return { 
    response: { message: '"name" length must be at least 5 characters long' },
    status: 422 }; 
}
  if (await validateNameDuplicated(name)) {
  return { 
    response: { message: 'Product already exists' }, status: 409 }; 
}
  return false;
};

const validateQuantity = (quantity) => {
  if (!quantity && quantity !== 0) {
  return {
    response: { message: '"quantity" is required' }, status: 400 }; 
}
  if (quantity < 1 || typeof quantity !== 'number') {
  return { 
    response: { 
      message: '"quantity" must be a number larger than or equal to 1', 
    },
    status: 422 }; 
}
  return false;
};

const validateReqBodyProduct = async (name, quantity) => {
  const nameValidated = await validateName(name);
  const qntValidated = validateQuantity(quantity);
  if (nameValidated) return nameValidated;
  if (qntValidated) return qntValidated;
  return false;
};

const registerProduct = async (name, quantity) => {
  const validatedBody = await validateReqBodyProduct(name, quantity);
  if (validatedBody) return validatedBody;
  const regProduct = await models.registerProduct(name, quantity);
  return { status: 201, response: regProduct };
};

module.exports = { 
  validateName,
  validateQuantity,
  registerProduct,
};
