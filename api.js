const client = require('./connection')
const express = require('express');
const app = express();

app.listen(3300, ()=>(
    console.log("Server is now listening on Port 3300")
))


//
// begin client module
client.connect();
//
// getFromDBAndSend functiom
function getFromDBAndSend(query, req, res) {
    client.query(query, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        client.end;
    });
}

//
//
// `accounts` calls
//


// fetch latest 100 accounts created.
app.get('/accounts', (req, res) => {
    const LATEST_ACCOUNTS_QUERY = 'SELECT * FROM accounts ORDER BY timestamp DESC LIMIT 100';
    getFromDBAndSend(LATEST_ACCOUNTS_QUERY, req, res);
});

// get account details by address
app.get('/accounts/:address', (req, res) => {
    const ACCOUNTS_ADDRESS_QUERY = `SELECT * FROM accounts WHERE address = '${req.params.address}'`;
    getFromDBAndSend(ACCOUNTS_ADDRESS_QUERY, req, res);
});

// get balance of account by address
app.get('/accounts/:address/balance', (req, res) => {
    const ACCOUNTS_BALANCE_BY_ADDRESS_QUERY = `SELECT * FROM accounts WHERE address = '${req.params.address}'`;
    getFromDBAndSend(ACCOUNTS_BALANCE_BY_ADDRESS_QUERY, req, res);
});


//
// `blocks` calls
//


// Fetch 100 latest blocks and send the result
app.get('/blocks', (req, res) => {
    const LATEST_BLOCKS_QUERY = 'SELECT * FROM blocks ORDER BY timestamp DESC LIMIT 100';
    getFromDBAndSend(LATEST_BLOCKS_QUERY, req, res);
});

// fetch block info for a specific block
app.get('/blocks/:block_number', (req, res) => {
    const BLOCK_BY_NUMBER_QUERY =`Select * from blocks WHERE block_number = '${req.params.block_number}';`
    getFromDBAndSend(BLOCK_BY_NUMBER_QUERY, req, res);
})


//
// `transactions` calls
//


// All transactions, newest first.
app.get('/transactions', (req, res) => {
    const LATEST_TRANSACTIONS_QUERY = 'Select * from transactions ORDER BY block_number DESC;';
    getFromDBAndSend(LATEST_TRANSACTIONS_QUERY, req, res);
})


// Fetch transaction by tx_hash
app.get('/transaction/:tx_hash', (req, res) => {
    const TRANSACTION_BY_HASH_QUERY = `SELECT * FROM transactions WHERE tx_hash = '${req.params.tx_hash}'`;
    getFromDBAndSend(TRANSACTION_BY_HASH_QUERY, req, res);
})


// Fetch all transactions by account address.
app.get('/transaction/:address', (req, res) => {
    const TRANSACTION_BY_HASH_QUERY = `SELECT * FROM transactions WHERE tx_hash = '${req.params.tx_hash}'`;
    getFromDBAndSend(TRANSACTION_BY_HASH_QUERY, req, res);
})


// Fetch incoming transactions by to_address.
app.get('/transaction/:to_address', (req, res) => {
    const INCOMING_TRANSACTION_BY_HASH_QUERY = `SELECT * FROM transactions WHERE to_address = '${req.params.to_address}'`;
    getFromDBAndSend(INCOMING_TRANSACTION_BY_HASH_QUERY, req, res);
})


// Fetch outgoing transactions by from_address.
app.get('/transaction/:from_address', (req, res) => {
    const OUTGOING_TRANSACTION_BY_HASH_QUERY = `SELECT * FROM transactions WHERE from_address = '${req.params.from_address}'`;
    getFromDBAndSend(OUTGOING_TRANSACTION_BY_HASH_QUERY, req, res);
})
