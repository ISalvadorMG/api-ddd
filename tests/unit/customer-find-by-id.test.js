// Importe a classe CustomerFindById
const CustomerFindById = require('../../src/application/customer/customer-find-by-id');
const CustomerRepository = require('../../src/adapters/customer-repository');

// Mock para CustomerRepository.findById
jest.mock('../../src/adapters/customer-repository', () => {
  return {
    findById: jest.fn(),
  };
});

const customerCreateMock = {id: 1, name: 'John', lastname: " Doe", age: 27, country: "Brasil" }


describe('CustomerFindById', () => {
  it('deve encontrar um cliente com sucesso', async () => {
    const customerId = 1;
  
    CustomerRepository.findById.mockResolvedValue(customerCreateMock);

    const result = await CustomerFindById.execute(customerId);

    expect(result).toEqual(customerCreateMock);
    expect(CustomerRepository.findById).toHaveBeenCalledWith(customerId);
  });

  it('deve lidar com erro ao encontrar um cliente', async () => {
    const customerId = 1;

    CustomerRepository.findById.mockRejectedValue(new Error('Erro ao encontrar cliente'));

    try {
      await CustomerFindById.execute(customerId);
      expect(true).toBe(false);
    } catch (err) {
      expect(err.message).toBe('Erro ao encontrar cliente');
    }
  });
});
