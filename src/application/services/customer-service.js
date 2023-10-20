const CustomerRepository = require('../../infra/repositories/customer-repository');

class CustomerService {
  async create(data) {
    return CustomerRepository.create(data);
  }

  async list() {
    return CustomerRepository.findAll();
  }

  async get(id) {
    return CustomerRepository.findById(id);
  }

  async update(id, data) {
    const existingCliente = await CustomerRepository.findById(id);
    if (!existingCliente) {
      return null;
    }
    return await CustomerRepository.update(id, data);
  }

  async delete(id) {
    return CustomerRepository.delete(id);
  }
}

module.exports = new CustomerService();