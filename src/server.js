import express from 'express';
const app = express();

app.use(express.json());

// Define a route
app.get('/', (req, res) => {
    res.json({
        message : 'User Mamagement APi'
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});