const ClienteService = require('../services/customer-service');

class CustomerController {
  async create(req, res) {
    try {
      const cliente = await ClienteService.create(req.body);
      return res.status(201).json(cliente);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async list(req, res) {
    const clientes = await ClienteService.list();
    return res.json(clientes);
  }

  async get(req, res) {
    const cliente = await ClienteService.get(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    return res.json(cliente);
  }

  async update(req, res) {
    const { id } = req.params;
    try {
      const cliente = await ClienteService.update(id, req.body);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      return res.json(cliente);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const result = await ClienteService.delete(id);
    if (!result) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    return res.status(204).send();
  }
}

module.exports = new CustomerController();