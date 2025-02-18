import express from 'express';
import courseRoutes from './routes/courseRoutes';
import sessionRoutes from './routes/sessionRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(express.json());

app.use('/api', courseRoutes);
app.use('/api', sessionRoutes);
app.use('/api', userRoutes);


export default app;