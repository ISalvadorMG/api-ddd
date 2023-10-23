// Importe a classe CustomerUpdate
const CustomerUpdate = require('../../src/application/customer/customer-update');
const CustomerRepository = require('../../src/adapters/customer-repository');

jest.mock('../../src/adapters/customer-repository', () => {
  return {
    findById: jest.fn(),
    update: jest.fn(),
  };
});

describe('CustomerUpdate', () => {
  it('deve atualizar um cliente com sucesso', async () => {
    const customerId = 1;
    const customerData = { id: 1, name: 'John', lastname: "Doe", age: 25, country: "Brasil" };

    CustomerRepository.findById.mockResolvedValue(customerData);

    CustomerRepository.update.mockResolvedValue(customerData);

    const result = await CustomerUpdate.execute(customerId, customerData);

    expect(result).toEqual(customerData);

    expect(CustomerRepository.findById).toHaveBeenCalledWith(customerId);

    expect(CustomerRepository.update).toHaveBeenCalledWith(customerId, customerData);
  });

  it('deve lidar com erro ao atualizar um cliente', async () => {
    const customerId = 1;
    const customerData = { id: 1, name: 'John', lastname: "Doe", age: 25, country: "Brasil" };

    CustomerRepository.findById.mockResolvedValue(customerData);

    CustomerRepository.update.mockRejectedValue(new Error('Erro ao atualizar cliente'));

    try {
      await CustomerUpdate.execute(customerId, customerData);
      expect(true).toBe(false);
    } catch (err) {
      expect(err.message).toBe('Erro ao atualizar cliente');
    }
  });

  it('deve lidar com cliente inexistente', async () => {
    const customerId = 0;
    const customerData = { name: 'John', lastname: "Doe", age: 25, country: "Brasil" };;

    CustomerRepository.findById.mockResolvedValue(null);

    const result = await CustomerUpdate.execute(customerId, customerData);

    expect(result).toBe(null);
  });
});
