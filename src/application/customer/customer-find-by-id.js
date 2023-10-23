const CustomerRepository = require('../../adapters/customer-repository')
class CustomerFindById{
    async execute(id) {
        return CustomerRepository.findById(id);
    }
}

module.exports = new CustomerFindById();