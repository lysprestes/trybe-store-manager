const { validateQuantityNumber, validateQuantity } = require('./productsValidations');

const validateQntSales = (quantity) => {
  const validateQnt = validateQuantity(quantity);
  const validateQntNum = validateQuantityNumber(quantity);
  if (validateQnt) return validateQnt;
  if (validateQntNum) return validateQntNum;
};

const validateSale = (reqBody) => {
  for (let i = 0; i < reqBody.length; i += 1) {
    const product = reqBody[i];
    if (!product.product_id) {
      return {
        status: 400,
        message: '"product_id" is required',
      };
    }
    const validateQnt = validateQntSales(product.quantity);
    if (validateQnt) return validateQnt;
  }
  return null;
};

module.exports = {
  validateSale,
};
