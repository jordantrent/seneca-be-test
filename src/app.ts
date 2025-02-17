import express from 'express';
import courseRoutes from './routes/courseRoutes';
import sessionRoutes from './routes/sessionRoutes';

const app = express();
app.use(express.json());

app.use('/api', courseRoutes);
app.use('/api', sessionRoutes);

export default app;