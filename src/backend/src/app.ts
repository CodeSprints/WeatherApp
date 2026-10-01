import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import weatherRoutes from './routes/weather.js';

dotenv.config();

const app = express();

app.use(helmet());

// Obsługa wielu originów przez zmienną środowiskową CORS_ORIGIN
// Przykład w .env: CORS_ORIGIN=https://pogoda365.pl,https://www.pogoda365.pl
const allowedOrigins: string[] = (process.env['CORS_ORIGIN'] ?? 'http://localhost:4200')
    .split(',')
    .map(o => o.trim())
    .filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            // Zezwól na brak origina (np. curl, Postman) lub na zdefiniowane originy
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error(`Origin ${origin} not allowed by CORS`));
            }
        },
        credentials: true,
    })
);

app.use(express.json());

app.use('/api/weather', weatherRoutes);

const PORT = process.env['PORT'] || 3000;
app.listen(PORT, () => {
    console.log(`[Pogoda365] Server running on port ${PORT}`);
    console.log(`[Pogoda365] Allowed origins: ${allowedOrigins.join(', ')}`);
});

