const client = require('./connection')
const express = require('express');
const app = express();

app.listen(3300, ()=>(
    console.log("Server is now listening on Port 3300")
))

// begin client module
client.connect();

// getFromDBAndSend functiom
function getFromDBAndSend(query, req, res) {
    client.query(query, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        client.end;
    });
}

// `accounts` calls
app.get('/accounts', (req, res) => {
    const LATEST_ACCOUNTS_QUERY = 'SELECT * FROM accounts ORDER BY timestamp DESC LIMIT 100';
    getFromDBAndSend(LATEST_ACCOUNTS_QUERY, req, res);
});

app.get('/accounts/:address', (req, res) => {
    const ACCOUNTS_ADDRESS_QUERY = `SELECT * FROM accounts WHERE address = '${req.params.address}'`;
    getFromDBAndSend(ACCOUNTS_ADDRESS_QUERY, req, res);
});

app.get('/accounts/:address/balance', (req, res) => {
    const ACCOUNTS_ADDRESS_QUERY = `SELECT balance FROM accounts WHERE address = '${req.params.address}'`;
    getFromDBAndSend(ACCOUNTS_ADDRESS_QUERY, req, res);
});

// `blocks` calls

// Fetch 100 latest blocks and send the result
app.get('/blocks', (req, res) => {
    const LATEST_BLOCKS_QUERY = 'SELECT * FROM blocks ORDER BY timestamp DESC LIMIT 100';
    getFromDBAndSend(LATEST_BLOCKS_QUERY, req, res);
});

// `transactions` calls

// All transactions, newest first.
app.get('/transactions', (req, res) => {
    const TRANSACTIONS_QUERY = 'Select * from transactions ORDER BY block_number DESC;';
    getFromDBAndSend(TRANSACTIONS_QUERY, req, res);
})

// Fetch transaction by tx_hash
app.get('/transaction/:tx_hash', (req, res) => {
    const TRANSACTION_BY_HASH_QUERY = `SELECT * FROM transactions WHERE tx_hash = '${req.params.tx_hash}'`;
    getFromDBAndSend(TRANSACTION_BY_HASH_QUERY, req, res);
})
