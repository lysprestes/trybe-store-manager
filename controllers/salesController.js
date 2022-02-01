const {
  createSales,
  validateSale,
  salesListById,
} = require('../services/salesService');

const { salesList } = require('../models/salesModel');

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

const salesListMid = async (req, res, _next) => {
  const result = await salesList();
  res.status(200).json(result);
};

const salesListByIdMid = async (req, res, _next) => {
  const result = await salesListById(req.params.id);
  res.status(result.status).json(result.response);
};

module.exports = {
  createSalesMid,
  validateSalesMid,
  salesListMid,
  salesListByIdMid,
};
