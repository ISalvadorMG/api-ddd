const CustomerRepository = require('../../src/infra/repositories/customer-repository');
const CustomerModel = require('../../src/domain/models/customer');

// Mock CustomerModel para simular a interação com o banco de dados
jest.mock('../../src/domain/models/customer', () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };
});

describe('CustomerRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new customer', async () => {
    const customer = { name: 'John', lastname: 'Doe', age: 30, country: 'Brasil' };
    CustomerModel.create.mockResolvedValue(customer);

    const createdCustomer = await CustomerRepository.create(customer);

    expect(CustomerModel.create).toHaveBeenCalledWith(customer);
    expect(createdCustomer).toEqual(customer);
  });

  it('should retrieve a list of customers', async () => {
    const customer = [{ name: 'John', lastname: 'Doe', age: 30, country: 'Brasil' }];
    CustomerModel.findAll.mockResolvedValue(customer);

    const retrievedCustomer = await CustomerRepository.findAll();

    expect(CustomerModel.findAll).toHaveBeenCalled();
    expect(retrievedCustomer).toEqual(customer);
  });

  it('should find a customer by ID', async () => {
    const customer = { name: 'John', lastname: 'Doe', age: 30, country: 'Brasil' };
    const customerId = 1;
    CustomerModel.findByPk.mockResolvedValue(customer);

    const foundCustomer = await CustomerRepository.findById(customerId);

    expect(CustomerModel.findByPk).toHaveBeenCalledWith(customerId);
    expect(foundCustomer).toEqual(customer);
  });

  it('should update an existing customer', async () => {
    const customer = { name: 'John', lastname: 'Doe', age: 30, country: 'Brasil' };
    const customerId = 1;
    CustomerModel.update.mockResolvedValue(customer);

    const updatedCliente = await CustomerRepository.update(customerId, customer);

    expect(CustomerModel.update).toHaveBeenCalledWith(customer, { where: { id: customerId } });
    expect(updatedCliente).toEqual(customer);
  });

  it('should delete a cliente', async () => {
    const customerId = 1;
    CustomerModel.destroy.mockResolvedValue(1);

    const result = await CustomerRepository.delete(customerId);

    expect(CustomerModel.destroy).toHaveBeenCalledWith({ where: { id: customerId } });
    expect(result).toBe(1);
  });
});
