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

const salesList = async () => {
  const result = await connection.query(
    `SELECT sale_id AS saleId,  spr.product_id, spr.quantity, sl.date
    FROM StoreManager.sales_products
    spr JOIN sales sl on sl.id = spr.sale_id;`,
  );
  return result[0];
};

const salesListById = async (saleId) => {
  const result = await connection.query(
    `SELECT spr.product_id, spr.quantity, sl.date
    FROM StoreManager.sales_products
    spr JOIN sales sl on sl.id = spr.sale_id 
    WHERE sale_id = ?;`, [saleId],
    );
  return result[0];
};

const updateSales = async (saleId, productId, quantity) => {
  const result = await connection.query(
    `UPDATE StoreManager.sales_products SET quantity = ?
    WHERE sale_id = ? AND product_id = ?`, [quantity, saleId, productId],
  );
  return result[0];
};

module.exports = {
  createSales,
  createSalesProducts,
  salesList,
  salesListById,
  updateSales,
};
