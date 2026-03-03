const pool = require('../database/db');

exports.getAllPedidos = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM pedido');
    res.json(rows);
  } catch (err) {
    console.error('Erro fetching pedidos', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getPedidoById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM pedido WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Pedido não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Erro fetching pedido', err);
    res.status(500).json({ error: err.message });
  }
};

exports.createPedido = async (req, res) => {
  const { cliente_id, valor } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO pedido (cliente_id, valor) VALUES ($1, $2) RETURNING *',
      [cliente_id, valor]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Erro creating pedido', err);
    res.status(500).json({ error: err.message });
  }
};

exports.updatePedido = async (req, res) => {
  const { id } = req.params;
  const { cliente_id, valor } = req.body;
  try {
    const { rowCount } = await pool.query(
      'UPDATE pedido SET cliente_id = $1, valor = $2 WHERE id = $3',
      [cliente_id, valor, id]
    );
    if (rowCount === 0) return res.status(404).json({ message: 'Pedido não encontrado' });
    res.json({ message: 'Atualizado com sucesso' });
  } catch (err) {
    console.error('Erro updating pedido', err);
    res.status(500).json({ error: err.message });
  }
};

exports.deletePedido = async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query('DELETE FROM pedido WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ message: 'Pedido não encontrado' });
    res.json({ message: 'Excluído com sucesso' });
  } catch (err) {
    console.error('Erro deleting pedido', err);
    res.status(500).json({ error: err.message });
  }
};
