const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoControllers');

// GET /pedidos
router.get('/', pedidoController.getAllPedidos);

// GET /pedidos/:id
router.get('/:id', pedidoController.getPedidoById);

// POST /pedidos
router.post('/', pedidoController.createPedido);

// PUT /pedidos/:id
router.put('/:id', pedidoController.updatePedido);

// DELETE /pedidos/:id
router.delete('/:id', pedidoController.deletePedido);

module.exports = router;
