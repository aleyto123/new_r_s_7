import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import documentRoutes from './routes/document.routes';
import userRoutes from './routes/user.routes';
import auditRoutes from './routes/audit.routes';
import path from 'node:path';
import fs from 'node:fs';

const app = express();

app.use(cors());
app.use(express.json());
app.use((_req, res, next) => {
  res.setHeader('X-Instance-ID', process.env.INSTANCE_ID || `backend-${process.env.PORT || 4000}`);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/documentos', documentRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/auditoria', auditRoutes);

// Monolith mode: one process serves the React build and the API.
const frontendDist = path.resolve(__dirname, '../../frontend/dist');
app.get('/health', (_req, res) => res.json({
  status: 'ok',
  instance: process.env.INSTANCE_ID || process.env.PORT || 'local'
}));
app.use(express.static(frontendDist));
app.get('/{*splat}', (_req, res) => {
  const index = path.join(frontendDist, 'index.html');
  if (fs.existsSync(index)) return res.sendFile(index);
  return res.status(503).send('Frontend no compilado. Ejecuta npm run build.');
});

const PORT = process.env.PORT || 4000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}

export default app;
