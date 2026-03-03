const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteControllers');

// GET /clientes
router.get('/', clienteController.getAllClientes);

// GET /clientes/:id
router.get('/:id', clienteController.getClienteById);

// POST /clientes
router.post('/', clienteController.createCliente);

// PUT /clientes/:id
router.put('/:id', clienteController.updateCliente);

// DELETE /clientes/:id
router.delete('/:id', clienteController.deleteCliente);

module.exports = router;
