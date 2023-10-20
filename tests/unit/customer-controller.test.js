const CustomerController = require('../../src/application/controllers/customer-controller');
const CustomerService = require('../../src/application/services/customer-service');

jest.mock('../../src/application/services/customer-service');

describe('CustomerController', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should create an existing customer', async () => {
        const req = {
          body: { name: 'Jane', lastname: 'Smith', age: 32, country: 'USA' },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
        const createCustomer = { name: 'Jane', lastname: 'Smith', age: 32, country: 'USA' };
        CustomerService.create.mockResolvedValue(createCustomer);
    
        await CustomerController.create(req, res);
    
        expect(CustomerService.create).toHaveBeenCalledWith(req.body);
        expect(res.json).toHaveBeenCalledWith(createCustomer);
      });
  
    it('should retrieve a list of customers', async () => {
      const req = {};
      const res = {
        json: jest.fn(),
      };
      const customers = [
        { name: 'John', lastname: 'Doe', age: 30, country: 'Brasil' },
        { name: 'Jane', lastname: 'Smith', age: 25, country: 'USA' },
      ];
      CustomerService.list.mockResolvedValue(customers);
  
      await CustomerController.list(req, res);
  
      expect(CustomerService.list).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(customers);
    });
  
    it('should find a customer by ID', async () => {
      const req = {
        params: { id: 1 },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const customer = { name: 'John', lastname: 'Doe', age: 30, country: 'Brasil' };
      CustomerService.get.mockResolvedValue(customer);
  
      await CustomerController.get(req, res);
  
      expect(CustomerService.get).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(customer);
    });
  
    it('should handle customer not found when getting by ID', async () => {
        const req = {
          params: { id: 1 },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
        CustomerService.get.mockResolvedValue(null);
      
        await CustomerController.get(req, res);
      
        expect(CustomerService.get).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Cliente não encontrado' });
      });
  
    it('should update an existing customer', async () => {
      const req = {
        params: { id: 1 },
        body: { name: 'Jane', lastname: 'Smith', age: 32, country: 'USA' },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const updatedCustomer = { name: 'Jane', lastname: 'Smith', age: 32, country: 'USA' };
      CustomerService.update.mockResolvedValue(updatedCustomer);
  
      await CustomerController.update(req, res);
  
      expect(CustomerService.update).toHaveBeenCalledWith(1, req.body);
      expect(res.json).toHaveBeenCalledWith(updatedCustomer);
    });
  
    it('should handle customer not found when updating', async () => {
      const req = {
        params: { id: 1 },
        body: { name: 'Jane', lastname: 'Smith', age: 32, country: 'USA' },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      CustomerService.update.mockResolvedValue(null);
  
      await CustomerController.update(req, res);
  
      expect(CustomerService.update).toHaveBeenCalledWith(1, req.body);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Cliente não encontrado' });
    });
  
    it('should handle update error', async () => {
      const req = {
        params: { id: 1 },
        body: { name: 'Jane', lastname: 'Smith', age: 32, country: 'USA' },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const error = new Error('Error message');
      CustomerService.update.mockRejectedValue(error);
  
      await CustomerController.update(req, res);
  
      expect(CustomerService.update).toHaveBeenCalledWith(1, req.body);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  
    it('should delete a customer', async () => {
      const req = {
        params: { id: 1 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      CustomerService.delete.mockResolvedValue(1);
  
      await CustomerController.delete(req, res);
  
      expect(CustomerService.delete).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });
  
    it('should handle customer not found when deleting', async () => {
      const req = {
        params: { id: 1 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      CustomerService.delete.mockResolvedValue(0);
  
      await CustomerController.delete(req, res);
  
      expect(CustomerService.delete).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Cliente não encontrado' });
    });
  });