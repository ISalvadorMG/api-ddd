const Customer = require('../../domain/models/customer');
const CustomerRepository = require('../../infra/repositories/customer-repository');

class CustomerService {
  async create({ name, lastname, age, country }) {
    const cliente = new Customer({ name, lastname, age, country });
    return CustomerRepository.create(cliente);
  }

  async list() {
    return CustomerRepository.findAll();
  }

  async get(id) {
    return CustomerRepository.findById(id);
  }

  async update(id, { name, lastname, age, country }) {
    const existingCliente = await CustomerRepository.findById(id);
    if (!existingCliente) {
      return null;
    }
    const updatedCliente = new Customer({
        name, lastname, age, country
    });
    await CustomerRepository.update(id, updatedCliente);
    return updatedCliente;
  }

  async delete(id) {
    return CustomerRepository.delete(id);
  }
}

module.exports = new CustomerService();