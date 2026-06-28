const express = require('express');
const path = require('path');

const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Flask Backend URL
const BACKEND_URL =
    process.env.BACKEND_URL || 'http://localhost:8000/api';

// Home Page
app.get('/', (req, res) => {

    res.render('index', {
        result: null
    });

});

// Form Submission
app.post('/submit', async (req, res) => {

    try {

        const { name, age, email } = req.body;

        const response = await fetch(BACKEND_URL, {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                name,
                age,
                email
            })

        });

        if (!response.ok) {

            throw new Error(`Backend returned ${response.status}`);

        }

        const data = await response.json();

        res.render('submit', {
         student: data.student
        });

    }

    catch (err) {

    console.error(err);

    res.send(`
        <h2>Error</h2>
        <p>${err.message}</p>
        <a href="/">Go Back</a>
    `);

}

});

// Start Server
app.listen(3000, () => {

    console.log("=================================");
    console.log("🚀 Frontend running successfully");
    console.log("🌐 http://localhost:3000");
    console.log("🔗 Backend :", BACKEND_URL);
    console.log("=================================");

});