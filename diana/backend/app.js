const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');

const port = 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true,
}));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use product routes
app.use('/', productRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
