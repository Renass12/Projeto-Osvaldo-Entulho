const express = require("express");
const pool = require("./database/db");
const clienteRoutes = require("./routes/clienteRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const app = express();

// Middleware
app.use(express.json());

// rotas principais
app.use("/clientes", clienteRoutes);
app.use("/pedidos", pedidoRoutes);

// Teste de conexão com o banco de dados
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cliente");
    res.json({
      message: "Conexão com PostgreSQL estabelecida com sucesso!",
      timestamp: result.rows[0],
    });
  } catch (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    res.status(500).json({
      error: "Erro ao conectar ao banco de dados",
      details: err.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
