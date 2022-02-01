const salesModel = require('../models/salesModel');

const createSales = async (saleProducts) => {
  const insertId = await salesModel.createSales();
  await Promise.all(
    saleProducts.map(async (product) => {
    await salesModel.createSalesProducts(insertId, product.product_id, product.quantity);
    }),
  );
  return {
    id: insertId,
    itemsSold: saleProducts,
  };
};

const salesListById = async (saleId) => {
  const list = await salesModel.salesListById(saleId);
  if (list.length === 0) {
    return {
      status: 404,
      response: {
        message: 'Sale not found',
      },
    };
  }
  return {
    status: 200,
    response: list,
  };
};

const updateSales = async (saleId, productId, quantity) => {
  const result = await salesModel.updateSales(saleId, productId, quantity);
  return {
    status: 200,
    response: result,
  };
};

module.exports = {
  createSales,
  salesListById,
  updateSales,
};
