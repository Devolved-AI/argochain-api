const client = require('./connection')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.listen(3300, () => {
    console.log("Server is now listening on Port 3300");
});

// begin client module
client.connect();

// getFromDBAndSend function
function getFromDBAndSend(query, res) {
    client.query(query, (err, result) => {
        if (!err) {
            res.json(result.rows);  // Send JSON response
        } else {
            res.status(500).json({ error: err.message });
        }
    });
}

// Helper function to build query with pagination and sorting
function buildQuery(baseQuery, page, limit, sort, order) {
    const offset = (page - 1) * limit;
    const sorting = sort ? `ORDER BY ${sort} ${order}` : '';
    return `${baseQuery} ${sorting} LIMIT ${limit} OFFSET ${offset}`;
}

// Routes
app.get('/accounts', (req, res) => {
    const { page = 1, limit = 10, sort = 'timestamp', order = 'DESC' } = req.query;
    const LATEST_ACCOUNTS_QUERY = buildQuery('SELECT * FROM accounts', page, limit, sort, order);
    getFromDBAndSend(LATEST_ACCOUNTS_QUERY, res);
});

app.get('/blocks', (req, res) => {
    const { page = 1, limit = 10, sort = 'timestamp', order = 'DESC' } = req.query;
    const LATEST_BLOCKS_QUERY = buildQuery('SELECT * FROM blocks', page, limit, sort, order);
    getFromDBAndSend(LATEST_BLOCKS_QUERY, res);
});

app.get('/transactions', (req, res) => {
    const { page = 1, limit = 10, sort = 'block_number', order = 'DESC' } = req.query;
    const LATEST_TRANSACTIONS_QUERY = buildQuery('SELECT * FROM transactions', page, limit, sort, order);
    getFromDBAndSend(LATEST_TRANSACTIONS_QUERY, res);
});

// Routes
app.get('/accounts', (req, res) => {
    const LATEST_ACCOUNTS_QUERY = 'SELECT * FROM accounts ORDER BY timestamp DESC LIMIT 100';
    getFromDBAndSend(LATEST_ACCOUNTS_QUERY, req, res);
});

app.get('/accounts/:address', (req, res) => {
    const ACCOUNTS_ADDRESS_QUERY = `SELECT * FROM accounts WHERE address = '${req.params.address}'`;
    getFromDBAndSend(ACCOUNTS_ADDRESS_QUERY, req, res);
});

app.get('/accounts/:address/balance', (req, res) => {
    const ACCOUNTS_BALANCE_BY_ADDRESS_QUERY = `SELECT * FROM accounts WHERE address = '${req.params.address}'`;
    getFromDBAndSend(ACCOUNTS_BALANCE_BY_ADDRESS_QUERY, req, res);
});

app.get('/blocks', (req, res) => {
    const LATEST_BLOCKS_QUERY = 'SELECT * FROM blocks ORDER BY timestamp DESC LIMIT 100';
    getFromDBAndSend(LATEST_BLOCKS_QUERY, req, res);
});

app.get('/blocks/:block_number', (req, res) => {
    const BLOCK_BY_NUMBER_QUERY = `SELECT * FROM blocks WHERE block_number = '${req.params.block_number}';`
    getFromDBAndSend(BLOCK_BY_NUMBER_QUERY, req, res);
});

app.get('/transactions', (req, res) => {
    const LATEST_TRANSACTIONS_QUERY = 'SELECT * FROM transactions ORDER BY block_number DESC;';
    getFromDBAndSend(LATEST_TRANSACTIONS_QUERY, req, res);
});

app.get('/transaction/:tx_hash', (req, res) => {
    const TRANSACTION_BY_HASH_QUERY = `SELECT * FROM transactions WHERE tx_hash = '${req.params.tx_hash}'`;
    getFromDBAndSend(TRANSACTION_BY_HASH_QUERY, req, res);
});

app.get('/transaction/:address', (req, res) => {
    const TRANSACTION_BY_HASH_QUERY = `SELECT * FROM transactions WHERE tx_hash = '${req.params.tx_hash}'`;
    getFromDBAndSend(TRANSACTION_BY_HASH_QUERY, req, res);
});

app.get('/transaction/:to_address', (req, res) => {
    const INCOMING_TRANSACTION_BY_HASH_QUERY = `SELECT * FROM transactions WHERE to_address = '${req.params.to_address}'`;
    getFromDBAndSend(INCOMING_TRANSACTION_BY_HASH_QUERY, req, res);
});

app.get('/transaction/:from_address', (req, res) => {
    const OUTGOING_TRANSACTION_BY_HASH_QUERY = `SELECT * FROM transactions WHERE from_address = '${req.params.from_address}'`;
    getFromDBAndSend(OUTGOING_TRANSACTION_BY_HASH_QUERY, req, res);
});

const path = require('path');

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

