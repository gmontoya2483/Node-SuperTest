import express from 'express'
import { v4 as uuid } from 'uuid';

const app = express();

app.use(express.json());

app.get('/ping',(req, res) => {
    res.send("pong");
});

app.get('/tasks', (req, res) => {
   res.json([]);
});

app.post('/tasks', (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({message: 'Bad Request'});
    }

    return res.status(201).json({
        id: uuid(),
        title,
        description
    });
});

export default app;
