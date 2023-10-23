const CustomerRepository = require('../../adapters/customer-repository')
class CustomerDelete{
    async execute(id) {
        return CustomerRepository.delete(id);
    }
}

module.exports = new CustomerDelete();