import express from 'express';
import cors from 'cors';
import path from 'path';
import spaceRoutes from './routes/spaceRoutes';
import authRoutes from './routes/authRoutes';
import bookingRoutes from './routes/bookingRoutes';

const app = express();

// Configurações de Segurança e JSON
app.use(cors());
app.use(express.json());

// Caminho absoluto para a pasta public (funciona perfeitamente no PC e na Railway)
const publicPath = path.resolve(__dirname, '..', 'public');
app.use(express.static(publicPath));

// Rotas da API com prefixo /api
app.use('/api', spaceRoutes);
app.use('/api', authRoutes);
app.use('/api', bookingRoutes);

// Entrega o index.html na rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`🚀 SpaceHub Server rodando perfeitamente na porta ${PORT}`);
});
