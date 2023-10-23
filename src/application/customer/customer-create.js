const CustomerRepository = require('../../adapters/customer-repository')
const winston = require('winston');
const emailSender = require('../../infra/email/email-provider')

const logger = winston.createLogger({
  transports : [
      new winston.transports.Console()
  ]
});

class CustomerCreate{
    async execute(data) {
        const dataResult = await CustomerRepository.create(data);
    
        setTimeout(() => {
          const mailOptions = {
            from: process.env.EMAIL_PROVIDER,
            to: process.env.EMAIL_TO_RECEIVE_NOTIFICATION, 
            subject: `Novo cliente cadastrado`, 
            text: `Cliente ${data.name} foi criado`
          };
        
          emailSender.sendMail(mailOptions, (error, info) => {
            if (error) {
              logger.error('Erro ao enviar e-mail:', error);
            } else {
              logger.info('E-mail enviado com sucesso:', info.response);
            }
          });
        }, 2 * 60 * 1000); 
      
        return dataResult
      }
}

module.exports = new CustomerCreate();