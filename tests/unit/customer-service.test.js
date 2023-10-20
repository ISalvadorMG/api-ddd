const CustomerService = require('../../src/application/services/customer-service');
const Customer = require('../../src/domain/models/customer');
const CustomerRepository = require('../../src/infra/repositories/customer-repository');

jest.mock('../../src/infra/repositories/customer-repository');

describe('CustomerService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new customer', async () => {
    const customerData = { name: 'John', lastname: 'Doe', age: 30, country: 'Brasil' };
    CustomerRepository.create.mockResolvedValue(customerData);

    const createdCustomer = await CustomerService.create(customerData);

    expect(CustomerRepository.create).toHaveBeenCalledWith(customerData);
    expect(createdCustomer).toEqual(customerData);
  });

  it('should retrieve a list of customers', async () => {
    const customers = [
      { name: 'John', lastname: 'Doe', age: 30, country: 'Brasil' },
      { name: 'Jane', lastname: 'Smith', age: 25, country: 'USA' },
    ];
    CustomerRepository.findAll.mockResolvedValue(customers);

    const retrievedCustomers = await CustomerService.list();

    expect(CustomerRepository.findAll).toHaveBeenCalled();
    expect(retrievedCustomers).toEqual(customers);
  });

  it('should find a customer by ID', async () => {
    const customerData = { name: 'John', lastname: 'Doe', age: 30, country: 'Brasil' };
    const customerId = 1;
    const existingCustomer = new Customer({ ...customerData, id: customerId });
    CustomerRepository.findById.mockResolvedValue(existingCustomer);

    const foundCustomer = await CustomerService.get(customerId);

    expect(CustomerRepository.findById).toHaveBeenCalledWith(customerId);
    expect(foundCustomer).toEqual(existingCustomer);
  });

  it('should update an existing customer', async () => {
    const customerData = { name: 'John', lastname: 'Doe', age: 30, country: 'Brasil' };
    const customerId = 1;
    const existingCustomer = new Customer({ ...customerData, id: customerId });
    CustomerRepository.findById.mockResolvedValue(existingCustomer);

    const updatedCustomerData = { name: 'Jane', lastname: 'Smith', age: 32, country: 'USA' };

    CustomerRepository.update.mockResolvedValue(1);

    const updatedCustomerResult = await CustomerService.update(customerId, updatedCustomerData);

    expect(CustomerRepository.update).toHaveBeenCalledWith(customerId, updatedCustomerData);
    expect(updatedCustomerResult).toEqual(updatedCustomerData);
  });

  it('should delete a customer', async () => {
    const customerId = 1;
    CustomerRepository.delete.mockResolvedValue(1);

    const result = await CustomerService.delete(customerId);

    expect(CustomerRepository.delete).toHaveBeenCalledWith(customerId);
    expect(result).toBe(1);
  });
});
