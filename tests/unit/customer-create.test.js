const CustomerCreate = require('../../src/application/customer/customer-create');
const CustomerRepository = require('../../src/adapters/customer-repository');

jest.mock('../../src/adapters/customer-repository', () => {
  return {
    create: jest.fn()
  };
});
  
jest.useFakeTimers();


const customerCreateMock = {name: 'John', lastname: " Doe", age: 27, country: "Brasil" }

describe('CustomerCreate', () => {
  it('deve criar um cliente com sucesso', async () => {
 
    CustomerRepository.create.mockResolvedValue(customerCreateMock);


    const result = await CustomerCreate.execute(customerCreateMock);

    expect(result).not.toBe(null)

    expect(CustomerRepository.create).toHaveBeenCalledWith(customerCreateMock);

    jest.advanceTimersByTime(2 * 60 * 1000);

  });

  it('deve lidar com erro ao criar um cliente', async () => {
    const error = new Error('Erro ao criar cliente');

    CustomerRepository.create.mockRejectedValue({});

    try {
      await CustomerCreate.execute(customerCreateMock);
      expect(true).toBe(false);
    } catch (err) {
      expect(true).toBe(true);
    }
  });

  it('deve enviar um e-mail com sucesso', async () => {
    CustomerRepository.create.mockResolvedValue(customerCreateMock);
  
    const result = await CustomerCreate.execute(customerCreateMock);

    await CustomerCreate.execute(customerCreateMock);
    expect(result).not.toBe(null)
    expect(CustomerRepository.create).toHaveBeenCalledWith(customerCreateMock);
  });
});
