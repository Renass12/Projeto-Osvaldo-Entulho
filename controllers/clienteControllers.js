const pool = require('../database/db');

exports.getAllClientes = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM cliente');
    res.json(rows);
  } catch (err) {
    console.error('Erro fetching clientes', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getClienteById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM cliente WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Erro fetching cliente', err);
    res.status(500).json({ error: err.message });
  }
};

exports.createCliente = async (req, res) => {
  const { nome, telefone } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO cliente (nome, telefone) VALUES ($1, $2) RETURNING *',
      [nome, telefone]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Erro creating cliente', err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, telefone } = req.body;
  try {
    const { rowCount } = await pool.query(
      'UPDATE cliente SET nome = $1, telefone = $2 WHERE id = $3',
      [nome, telefone, id]
    );
    if (rowCount === 0) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json({ message: 'Atualizado com sucesso' });
  } catch (err) {
    console.error('Erro updating cliente', err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query('DELETE FROM cliente WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json({ message: 'Excluído com sucesso' });
  } catch (err) {
    console.error('Erro deleting cliente', err);
    res.status(500).json({ error: err.message });
  }
};
