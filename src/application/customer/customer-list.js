const CustomerRepository = require('../../adapters/customer-repository')
class CustomerList{
    async execute() {
        return CustomerRepository.findAll();
    }
}

module.exports = new CustomerList();