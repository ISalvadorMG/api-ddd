// Importe a classe CustomerDelete
const CustomerDelete = require('../../src/application/customer/customer-delete');
const CustomerRepository = require('../../src/adapters/customer-repository');

// Mock para CustomerRepository.delete
jest.mock('../../src/adapters/customer-repository', () => {
  return {
    delete: jest.fn(),
  };
});

describe('CustomerDelete', () => {
  it('deve excluir um cliente com sucesso', async () => {
    const customerId = 1;
    CustomerRepository.delete.mockResolvedValue(true);

    const result = await CustomerDelete.execute(customerId);
    expect(result).toBe(true);
    expect(CustomerRepository.delete).toHaveBeenCalledWith(customerId);
  });

  it('deve lidar com erro ao excluir um cliente', async () => {
    const customerId = 1;
    CustomerRepository.delete.mockRejectedValue(new Error('Erro ao excluir cliente'));

    try {
      await CustomerDelete.execute(customerId);      expect(true).toBe(false);
    } catch (err) {
      expect(err.message).toBe('Erro ao excluir cliente');
    }
  });
});
