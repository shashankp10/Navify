import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import navifyRoutes from './routes/navify.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/navify", navifyRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
