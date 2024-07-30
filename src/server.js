import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import songRouter from './routes/songRoutes.js';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

// app config 
const app = express();
const port = process.env.PORT || 5000;
connectDB();
connectCloudinary();

// middlewares 
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: 'https://spotifyvirtual.netlify.app/' // Replace with your actual Netlify URL
}));

// initializing routes
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);

app.get('/', (req, res) => res.send("API working"));

app.listen(port, () => console.log(`Server started on ${port}`));
