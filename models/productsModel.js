const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const [{ insertId }] = await connection.query(
    `INSERT INTO products (name, quantity)
    VALUES (?, ?)`, [name, quantity],
  );
  return insertId;
};

const searchByName = async (name) => {
  const result = await connection.query(
    `SELECT name FROM products
    WHERE name = ?`, [name],
  );
  return result[0];
};

const productsList = async () => {
  const result = await connection.query(
    'SELECT * FROM products',
  );
  return result[0];
};

const getProductById = async (id) => {
  const result = await connection.query(
    `SELECT * FROM products
    WHERE id = ?`, [id],
  );
  return result[0];
};

const updateProduct = async (id, name, quantity) => {
  const result = await connection.query(
    `UPDATE products
    SET name = ?, quantity = ?
    WHERE id = ?`, [name, quantity, id],
  );
  return result[0];
};

const deleteProduct = async (id) => {
  const result = await connection.query(
    `DELETE FROM products
    WHERE id = ?`, [id],
  );
  return result[0];
};

module.exports = {
  createProduct,
  searchByName,
  productsList,
  getProductById,
  updateProduct,
  deleteProduct,
};
