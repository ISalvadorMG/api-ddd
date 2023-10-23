// src/infrastructure/repositories/clienteRepository.js
const CustomerModel = require('../domain/models/customer');

class CustomerRepository {
  async create(customer) {
    return CustomerModel.create(customer);
  }

  async findAll() {
    return CustomerModel.findAll();
  }

  async findById(id) {
    return CustomerModel.findByPk(id);
  }

  async update(id, customer) {
    return CustomerModel.update(customer, {
      where: { id },
    });
  }

  async delete(id) {
    return CustomerModel.destroy({
      where: { id },
    });
  }
}

module.exports = new CustomerRepository();
