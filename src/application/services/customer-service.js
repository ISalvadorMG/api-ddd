const CustomerRepository = require('../../infra/repositories/customer-repository');
const transporter = require('../../infra/email/email-provider'); // Importe o módulo de configuração

const winston = require('winston');

const logger = winston.createLogger({
  transports : [
      new winston.transports.Console()
  ]
});


class CustomerService {
  async create(data) {
    const dataResult = await CustomerRepository.create(data);

    setTimeout(() => {
      const mailOptions = {
        from: process.env.EMAIL_PROVIDER,
        to: process.env.EMAIL_TO_RECEIVE_NOTIFICATION, 
        subject: `Novo cliente cadastrado`, 
        text: `Cliente ${data.name} foi criado`
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          logger.error('Erro ao enviar e-mail:', error);
        } else {
          logger.info('E-mail enviado com sucesso:', info.response);
        }
      });
    }, 2 * 60 * 1000); 
  
    return dataResult
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