// src/index.ts

import express from 'express';
import routes from './routes/index'
import cors from 'cors'

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())


app.use(express.json());

app.use('/api', routes)


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
