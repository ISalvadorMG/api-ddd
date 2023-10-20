const request = require('supertest');
const express = require('express');
const app = express();
const customerRoutes = require('../../src/application/routes');

app.use(express.json());

app.use('/api', customerRoutes);

describe('Customer Routes', () => {
  it('should create a new customer', async () => {
    const newCustomer = {
      name: 'John',
      lastname: 'Doe',
      age: 30,
      country: 'Brasil',
    };

    const response = await request(app)
      .post('/api/customer')
      .send(newCustomer)
      .expect(201);

    expect(response.body).toEqual(newCustomer);
  });

  it('should retrieve a list of customers', async () => {
    const response = await request(app)
      .get('/api/customer')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a customer by ID', async () => {
    // Assume that a customer with ID 1 exists
    const customerId = 1;

    const response = await request(app)
      .get(`/api/customer/${customerId}`)
      .expect(200);
    expect(response.body.id).toBe(customerId);
  });

  it('should update a customer', async () => {
    const customerId = 1;
    const updatedCustomer = {
      name: 'Jane',
      lastname: 'Smith',
      age: 32,
      country: 'USA',
    };

    const response = await request(app)
      .put(`/api/customer/${customerId}`)
      .send(updatedCustomer)
      .expect(200);

    expect(response.body).toEqual(updatedCustomer);
  });

  it('should delete a customer', async () => {
    const customerId = 1;

    await request(app)
      .delete(`/api/customer/${customerId}`)
      .expect(204);
  });
});
