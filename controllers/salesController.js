const {
  createSales,
  validateSale,
  salesListById,
  updateSales,
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
  console.log(req.params.id, 'esse eh o req id!');
  res.status(result.status).json(result.response);
};

const updateSalesMid = async (req, res) => {
  const [product] = req.body;
  const result = await updateSales(req.params.id, product.product_id, product.quantity);
  res.status(result.status).json(
    {
      saleId: req.params.id,
      itemUpdated: [product],
    },        
  );
};

module.exports = {
  createSalesMid,
  validateSalesMid,
  salesListMid,
  salesListByIdMid,
  updateSalesMid,
};
