const CustomerList = require('../../src/application/customer/customer-list');
const CustomerRepository = require('../../src/adapters/customer-repository');

jest.mock('../../src/adapters/customer-repository', () => {
  return {
    findAll: jest.fn(),
  };
});

describe('CustomerList', () => {
  it('deve listar clientes com sucesso', async () => {
    const customerData = [{ id: 1, name: 'John', lastname: 'Doe', age: 28, country: "Brasil"}, { id: 12, name: 'Jojhn', lastname: 'Doje', age: 48, country: "Brasil"}];

    CustomerRepository.findAll.mockResolvedValue(customerData);

    const result = await  CustomerList.execute();

    expect(result).toEqual(customerData);

    expect(CustomerRepository.findAll).toHaveBeenCalled();
  });

  it('deve lidar com erro ao listar clientes', async () => {
    CustomerRepository.findAll.mockRejectedValue(new Error('Erro ao listar clientes'));

    try {
      await  CustomerList.execute();
      expect(true).toBe(false);
    } catch (err) {
      expect(err.message).toBe('Erro ao listar clientes');
    }
  });
});
