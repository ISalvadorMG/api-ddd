const CustomerRepository = require('../../adapters/customer-repository')
class CustomerUpdate{
    async execute(id, data) {
        const existingCliente = await CustomerRepository.findById(id);
        if (!existingCliente) {
          return null;
        }
        return await CustomerRepository.update(id, data);
      }
}

module.exports = new CustomerUpdate();