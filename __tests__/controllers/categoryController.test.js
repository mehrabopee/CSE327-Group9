import request from 'supertest';
import express from 'express';
import categoryRoutes from '../../routes/categoryRoutes'; // Import your router
import categoryModel from '../../models/categoryModel'; // Import your category model
import { singleCategoryController } from '../../controllers/categoryController'; // Import your controller

const app = express();
app.use(categoryRoutes); // Use your router in the Express app

// Mock the categoryModel.findOne function
jest.mock('../../models/categoryModel');

describe('Mocked API Endpoints for singleCategoryController', () => {
  it('should handle a successful request', async () => {
    categoryModel.findOne.mockResolvedValue({
      _id: 'someCategoryId',
      name: 'Sample Category',
      slug: 'sample-category',
      // Add other properties as needed
    });

    const response = await request(app)
      .get('/single-category/sample-category'); // Use the route defined in your router

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Get SIngle Category SUccessfully'); // Corrected message
    expect(response.body.category).toMatchObject({
      _id: 'someCategoryId',
      name: 'Sample Category',
      slug: 'sample-category',
      // Add other properties as needed
    });
  });

  it('should handle an error', async () => {
    categoryModel.findOne.mockRejectedValue(new Error('Category not found'));
  
    const response = await request(app)
      .get('/single-category/sample-category'); // Use the route defined in your router
  
    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Error While getting Single Category');
  });
});
