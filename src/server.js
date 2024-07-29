import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import songRouter from './routes/songRoutes.js';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import albumRouter from './routes/albumRoutes.js';

// App config 
const app = express();
const port = process.env.PORT || 5000;

// Connect to Database and Cloudinary
connectDB();
connectCloudinary();

// Middlewares 
app.use(express.json());
app.use(cors({
  origin: 'https://spotifyvirtual.netlify.app/' // Replace with your frontend domain
}));

// Initializing Routes
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);

// Health Check Route
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// Default Route
app.get('/', (req, res) => res.send("API working"));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start Server
app.listen(port, () => console.log(`Server started on ${port}`));
