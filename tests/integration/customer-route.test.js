const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../../src/adapters/customer-controller'); // Importe as rotas do seu arquivo de rotas

// Mock das funções de aplicação, substituindo os módulos reais
const CustomerCreate = require('../../src/application/customer/customer-create');
const CustomerUpdate = require('../../src/application/customer/customer-update');
const CustomerFindById = require('../../src/application/customer/customer-find-by-id');
const CustomerList = require('../../src/application/customer/customer-list');
const CustomerDelete = require('../../src/application/customer/customer-delete');

// Suponha que você tenha mockado as funções de aplicação da seguinte maneira:
jest.mock('../../src/application/customer/customer-create');
jest.mock('../../src/application/customer/customer-update');
jest.mock('../../src/application/customer/customer-find-by-id');
jest.mock('../../src/application/customer/customer-list');
jest.mock('../../src/application/customer/customer-delete');

const winston = require('winston');
const logger = winston.createLogger({ transports: [new winston.transports.Console()] });

app.use(express.json());
app.use(router);

const customerCreateMock = {
  name: "john",
  lastname: "Will",
  age: 27,
  country: "Brasil"
}

const customerUpdateMock = {
  id: 1,
  name: "john2",
  lastname: "Will2",
  age: 27,
  country: "Brasil"
}

const customerReponseMock = {
  name: "john",
  lastname: "Will",
  age: 27,
  country: "Brasil"
}

describe('Testes de cobertura para rotas de cliente', () => {
  it('deve criar um cliente', async () => {
    CustomerCreate.execute.mockResolvedValue(customerCreateMock);

    const response = await request(app)
      .post('/customer')
      .send(customerCreateMock);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(customerReponseMock);
  });

  it('deve listar clientes', async () => {
    CustomerList.execute.mockResolvedValue([customerCreateMock]);

    const response = await request(app).get('/customer');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([customerCreateMock]);
  });

  it('deve encontrar um cliente por ID', async () => {
    CustomerFindById.execute.mockResolvedValue(customerCreateMock);

    const response = await request(app).get('/customer/1'); // Substitua 1 pelo ID válido

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(customerCreateMock);
  });

  it('deve atualizar um cliente', async () => {
    CustomerUpdate.execute.mockResolvedValue(customerUpdateMock);

    const response = await request(app)
      .patch('/customer/1')
      .send(customerUpdateMock);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(customerUpdateMock);
  });

  it('deve excluir um cliente', async () => {
    CustomerDelete.execute.mockResolvedValue(true);

    const response = await request(app).delete('/customer/1');

    expect(response.statusCode).toBe(204);
  });


    it('deve tratar erros ao criar um cliente', async () => {

      CustomerCreate.execute.mockResolvedValue({});

      CustomerCreate.execute.mockImplementation(() => {
        throw new Error('Erro ao criar o cliente');
      });
  
      const response = await request(app)
        .post('/customer')
        .send({customerCreateMock});
  
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: 'Erro ao criar o cliente' });
    });

    it('deve tratar erros ao atualizar um cliente', async () => {

      CustomerUpdate.execute.mockResolvedValue({});

      CustomerUpdate.execute.mockImplementation(() => {
        throw new Error('Erro ao atualizar o cliente');
      });
  
      const response = await request(app)
        .patch('/customer/1')
        .send(customerUpdateMock);
  
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: 'Erro ao atualizar o cliente' });
    });

    it('deve tratar erros ao encontrar um cliente por ID', async () => {

      CustomerFindById.execute.mockResolvedValue(false);

      CustomerFindById.execute.mockImplementation(() => {
        throw new Error('Erro ao encontrar o cliente');
      });
  
      const response = await request(app).get('/customer/aaa');
  
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: 'Erro ao encontrar o cliente' });
    });
    
    it('deve tratar erros ao excluir um cliente', async () => {
      CustomerDelete.execute.mockImplementation(() => {
        throw new Error('Erro ao excluir o cliente');
      });
  
      const response = await request(app).delete('/customer/1');
  
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: 'Erro ao excluir o cliente' });
    });
});
