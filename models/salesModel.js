const connection = require('./connection');

const createSales = async () => {
  const [{ insertId }] = await connection.query(
    `INSERT INTO StoreManager.sales (id)
    VALUES (DEFAULT)`,
  );
  return insertId;
};

const createSalesProducts = async (saleId, productId, quantity) => {
  const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?, ?, ?)`;
  await connection.query(query, [saleId, productId, quantity]);
  return saleId;
};

module.exports = {
  createSales,
  createSalesProducts,
};
