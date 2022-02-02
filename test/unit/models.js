const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../models/productsModel');
const connection = require('../../models/connection');
const salesModel = require('../../models/salesModel');

describe('Tests all productsModel functions', () => {
  beforeEach(() => {
    sinon.stub(connection, 'query');
  });

  afterEach(() => {
    connection.query.restore();
  });

  describe('createProduct', () => {
    it('should create a product', async () => {
      connection.query.resolves([{ insertId: 1, name: 'test', quantity: 10 }]);
      const result = await productsModel.createProduct('test', 10);
      expect(result).to.equal(1);
    });
  });

  describe('searchByName', () => {
    it('should search for a product by name', async () => {
      connection.query.resolves([{ name: 'test' }]);
      const result = await productsModel.searchByName('test');
      expect(result).to.deep.equal({ name: 'test' });
    });
  });

  describe('productsList', () => {
    it('should return all products', async () => {
      connection.query.resolves([[{ id: 1, name: 'test', quantity: 10 }]]);
      const result = await productsModel.productsList();
      expect(result).to.deep.equal([{ id: 1, name: 'test', quantity: 10 }]);
    });
  });

  describe('getProductById', () => {
    it('should return a product', async () => {
      connection.query.resolves([{ id: 1, name: 'test', quantity: 10 }]);
      const result = await productsModel.getProductById(1);
      expect(result).to.deep.equal({ id: 1, name: 'test', quantity: 10 });
    });
  });

  describe('updateProduct', () => {
    it('should update a product', async () => {
      connection.query.resolves([[{ id: 1, name: 'test', quantity: 10 }]]);
      const result = await productsModel.updateProduct(1, 'test', 10);
      expect(result).to.deep.equal([{ id: 1, name: 'test', quantity: 10 }]);
    });
  });
});

describe('Tests all salesModel functions', () => {
  beforeEach(() => {
    sinon.stub(connection, 'query');
  });

  afterEach(() => {
    connection.query.restore();
  });

  describe('createSales', () => {
    it('should create a sale', async () => {
      connection.query.resolves([{ insertId: 1 }]);
      const result = await salesModel.createSales();
      expect(result).to.equal(1);
    });
  });

  describe('createSalesProducts', () => {
    it('should create a sale', async () => {
      connection.query.resolves([[{ sale_id: 1, product_id: 1, quantity: 10 }]]);
      const result = await salesModel.createSalesProducts(1, 'test', 10);
      expect(result).to.equal(1);
    });
  });

  describe('salesList', () => {
    it('should return all sales', async () => {
      connection.query.resolves([[{ sale_id: 1, product_id: 1, quantity: 10 }]]);
      const result = await salesModel.salesList();
      expect(result).to.deep.equal([{ sale_id: 1, product_id: 1, quantity: 10 }]);
    });
  })

  describe('salesListById', () => {
    it('should return a sale', async () => {
      connection.query.resolves([[{ sale_id: 1, product_id: 1, quantity: 10 }]]);
      const result = await salesModel.salesListById(1);
      expect(result).to.deep.equal([{ sale_id: 1, product_id: 1, quantity: 10 }]);
    });
  });

  describe('updateSales', () => {
    it('should update a sale', async () => {
      connection.query.resolves([[{ sale_id: 1, product_id: 1, quantity: 10 }]]);
      const result = await salesModel.updateSales(1, 1, 10);
      expect(result).to.deep.equal([{ sale_id: 1, product_id: 1, quantity: 10 }]);
    });
  });
});
