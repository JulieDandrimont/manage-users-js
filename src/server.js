import express from 'express';
import dotenv from 'dotenv';
import usersRouter from './users/users.routes.js';
dotenv.config();
const app = express();

app.use(express.json());

// Define a route
app.get('/', (req, res) => {
    res.json({
        message : 'User Mamagement APi'
    });
});

app.use('/users',usersRouter);
// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

