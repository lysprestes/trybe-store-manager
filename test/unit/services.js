const { expect } = require('chai');
const sinon = require('sinon');

const productsServices = require('../../services/productsService');
const salesServices = require('../../services/salesService');
const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');

describe('Tests all productsServices functions', () => {
  beforeEach(() => {
    sinon.stub(productsModel, 'createProduct');
    sinon.stub(productsModel, 'getProductById');
    sinon.stub(productsModel, 'productsList');
    sinon.stub(productsModel, 'updateProduct');
    sinon.stub(productsModel, 'deleteProduct');
  });

  afterEach(() => {
    productsModel.createProduct.restore();
    productsModel.getProductById.restore();
    productsModel.productsList.restore();
    productsModel.updateProduct.restore();
    productsModel.deleteProduct.restore();
  });

  describe('createProduct', () => {
    it('should create a product', async () => {
      productsModel.createProduct.resolves(1);
      const result = await productsServices.createProduct('test', 10);
      expect(result).to.deep.equal({
        status: 201,
        result: {
          id: 1,
          name: 'test',
          quantity: 10,
        },
      });
    });
  });

  describe('searchById', () => {
    it('should search for a product by name', async () => {
      productsModel.getProductById.resolves([{ id: 1, name: 'test', quantity: 10}]);
      const result = await productsServices.searchById('test');
      expect(result).to.deep.equal(
        {
          status: 200,
          result: {
            id: 1,
            name: 'test',
            quantity: 10,
          }
        },);
    });
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      productsModel.productsList.resolves([{ id: 1, name: 'test', quantity: 10 }]);
      const result = await productsServices.getAllProducts();
      expect(result).to.deep.equal(
        {
          status: 200,
          result: [ { id: 1, name: 'test', quantity: 10 } ]
        });
    });
  });

  describe('updateProduct', () => {
    it('should update a product', async () => {
      productsModel.updateProduct.resolves([{ id: 1, name: 'test', quantity: 10 }]);
      productsModel.getProductById.resolves([{ id: 1, name: 'test', quantity: 10 }]);
      const result = await productsServices.updateProduct(1, 'test', 10);
      expect(result).to.deep.equal(
        {
          status: 200,
          result: { id: 1, name: 'test', quantity: 10 },
        }
      );
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      productsModel.deleteProduct.resolves([{ id: 1, name: 'test', quantity: 10 }]);
      productsModel.getProductById.resolves([[{ id: 1, name: 'test', quantity: 10 }]]);
      const result = await productsServices.deleteProduct(1);
      expect(result).to.deep.equal(
        {
          status: 200,
          result: [{ id: 1, name: 'test', quantity: 10 }],
        }
      );
    });
  });
});
