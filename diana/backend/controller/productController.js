const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../products.json');

// Utility function to read products from the JSON file
const readProductsFromFile = () => {
    const data = fs.readFileSync(productsFilePath, 'utf8');
    return JSON.parse(data);
};

// Utility function to write products to the JSON file
const writeProductsToFile = (products) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
};

// Display all products
const getProducts = (req, res) => {
    const products = readProductsFromFile();
    res.json(products);
};

// Display a product by ID
const getProductById = (req, res) => {
    const products = readProductsFromFile();
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
};

// Add a new product
const addProduct = (req, res) => {
    const { name, price, description } = req.body;
    const products = readProductsFromFile();
    const newProduct = {
        id: Date.now(), // Use timestamp as a unique ID
        name,
        price,
        description,
        image:  path.join('uploads', req.file.filename).replace(/\\/g, '/')
    };
    // imagePath = path.join('uploads', req.file.filename).replace(/\\/g, '/');
    products.push(newProduct);
    writeProductsToFile(products);
    res.status(201).json(newProduct);
};

// Update a product
const updateProduct = (req, res) => {
    const { name, description, price } = req.body;
    const products = readProductsFromFile();
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }
    products[index] = {
        ...products[index],
        name,
        description,
        price
    };
    writeProductsToFile(products);
    res.json(products[index]);
};

// Delete a product
const deleteProduct = (req, res) => {
    const products = readProductsFromFile();
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }
    products.splice(index, 1);
    writeProductsToFile(products);
    res.json({ message: 'Product deleted successfully' });
};

module.exports = { getProducts, getProductById, addProduct, updateProduct, deleteProduct };
