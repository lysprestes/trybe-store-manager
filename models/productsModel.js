const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const result = await connection.query(
    `INSERT INTO products (name, quantity)
    VALUES (?, ?)`, [name, quantity],
  );
  return result[0].insertId;
};

const searchByName = async (name) => {
  const result = await connection.query(
    `SELECT name FROM products
    WHERE name = ?`, [name],
  );
  return result[0];
};

module.exports = {
  createProduct,
  searchByName,
};
