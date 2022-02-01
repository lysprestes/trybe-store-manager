const {
  createSales,
  validateSale,
} = require('../services/salesService');

const createSalesMid = async (req, res, _next) => {
  const result = await createSales(req.body);
  return res.status(201).json(result);
};

const validateSalesMid = (req, res, next) => {
  const result = validateSale(req.body);
  if (result) {
    return res.status(result.status).json({ message: result.message });
  }
  next();
};

module.exports = {
  createSalesMid,
  validateSalesMid,
};
