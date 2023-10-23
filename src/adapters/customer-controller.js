const CustomerCreate = require('../application/customer/customer-create');
const CustomerUpdate = require('../application/customer/customer-update');
const CustomerFindById = require('../application/customer/customer-find-by-id');
const CustomerList = require('../application/customer/customer-list');
const CustomerDelete = require('../application/customer/customer-delete');

const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ]
});

const express = require('express');

const router = express.Router();

router.post('/customer', async (req, res) => {
  try {
    logger.info(`Dados da Requisição: ${JSON.stringify(req.body)}`);
    const cliente = await CustomerCreate.execute(req.body);
    return res.status(201).json(cliente);
  } catch (error) {
    logger.error(`ERROR: ${error}`);
    res.status(400).json({ error: error.message });
  }
});

router.get('/customer', async (req, res) => {
    const clientes = await CustomerList.execute();
    logger.info(`Registros encontrados: ${clientes.length}`);
    res.json(clientes);
});

router.get('/customer/:id', async (req, res) => {
  try {
    const cliente = await CustomerFindById.execute(req.params.id);
    res.json(cliente);
  } catch (error) {
    logger.error(`ERROR: ${error}`);
    res.status(400).json({ error: error.message });
  }
});

router.patch('/customer/:id', async (req, res) => {
  const { id } = req.params;

  logger.info(`Cliente a ser alterado: ${id}`);
  logger.info(`Novos dados: ${req.body}`);
  try {
    const cliente = await CustomerUpdate.execute(id, req.body);
    if (!cliente) {
      logger.warning(`Cliente não encontrado: ${id}`);
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    logger.error(`ERROR: ${error}`);
    res.status(400).json({ error: error.message });
  }
});

router.delete('/customer/:id', async (req, res) => {
  try{
    const id = req.params.id;
    logger.info(`Cliente a ser excluído: ${id}`);
    const result = await CustomerDelete.execute(id);
    if (!result) {
      logger.warning(`Cliente não encontrado: ${id}`);
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.status(204).send();
  }catch (error) {
    logger.error(`ERROR: ${error}`);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;