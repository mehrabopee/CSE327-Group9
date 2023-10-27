//createProductController.test.js

import { createProductController } from '../../controllers/productController';
import Products from '../../models/productModel';
jest.mock('../../models/productModel', () => ({
  create: jest.fn(),
}));

describe('createProductController', () => {
  it('should return 500 status and error message if name is missing', async () => {
    const mockRequest = {
      fields: {
        description: 'A test product',
        price: 20.0,
        category: 'Test Category',
        quantity: 10,
      },
      files: {},
    };
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };

    await createProductController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith({ error: 'Name is Required' });
  });
});