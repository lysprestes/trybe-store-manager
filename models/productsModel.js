const connection = require('./connection');

const registerProduct = async (name, quantity) => {
  const queryString = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);';
  const [result] = await connection.query(queryString, [name, quantity]);
  return { id: result.insertId, name, quantity };
};

const searchProductByName = async (name) => {
  const queryString = 'SELECT name FROM StoreManager.products WHERE name LIKE ? LIMIT 1;';
  const result = await connection.query(queryString, [name]);
  return result[0];
};

module.exports = {
  registerProduct,
  searchProductByName,
};
