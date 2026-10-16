const express = require('express');
const cors = require('cors');
const pedidosRoutes = require('./routes/pedidos.routes');
const clientesRoutes = require('./routes/clientes.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json()); // permite leer el JSON del body

// Ruta de prueba
app.get('/', (req, res) => res.json({ mensaje: 'API de Pedidos funcionando' }));

app.use('/api/pedidos', pedidosRoutes);
app.use('/api/clientes', clientesRoutes);

// Si ninguna ruta coincide
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

// El manejador de errores SIEMPRE va al final
app.use(errorHandler);

module.exports = app;