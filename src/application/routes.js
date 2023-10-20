const express = require('express');
const CustomerController = require('./controllers/customer-controller');

const router = express.Router();

router.post('/customer', CustomerController.create);
router.get('/customer', CustomerController.list);
router.get('/customer/:id', CustomerController.get);
router.put('/customer/:id', CustomerController.update);
router.delete('/customer/:id', CustomerController.delete);

module.exports = router;