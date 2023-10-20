const ClienteService = require('../services/customer-service');
const winston = require('winston');

const logger = winston.createLogger({
  transports : [
      new winston.transports.Console()
  ]
});

class CustomerController {
  async create(req, res) {
    try {
      logger.info(`Dados da Requisição: ${JSON.stringify(req.body)}`);
      const cliente = await ClienteService.create(req.body);
      return res.status(201).json(cliente);
    } catch (error) {
      logger.error(`ERROR: ${error}`);
      return res.status(400).json({ error: error.message });
    }
  }

  async list(req, res) {
    
    const clientes = await ClienteService.list();
    logger.info(`Registros encontrados: ${clientes.length}`);
    return res.json(clientes);
  }

  async get(req, res) {
    const cliente = await ClienteService.get(req.params.id);
    if (!cliente) {
      logger.warning(`Cliente não encontrado: ${id}`);
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    return res.json(cliente);
  }

  async update(req, res) {
    const { id } = req.params;

    logger.info(`Cliente a ser alterado: ${id}`);
    logger.info(`Novos dados: ${req.body}`);
    try {
      const cliente = await ClienteService.update(id, req.body);
      if (!cliente) {
        logger.warning(`Cliente não encontrado: ${id}`);
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      return res.json(cliente);
    } catch (error) {
      logger.error(`ERROR: ${error}`);
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    logger.info(`Cliente a ser excluído: ${id}`);
    const result = await ClienteService.delete(id);
    if (!result) {
      logger.warning(`Cliente não encontrado: ${id}`);
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    return res.status(204).send();
  }
}

module.exports = new CustomerController();