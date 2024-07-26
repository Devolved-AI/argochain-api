const client = require('./connection')
const express = require('express');
const app = express();

app.listen(3300, ()=>(
    console.log("Server is now listening on Port 3300")
))

client.connect();

// All transactions, newest first.
app.get('/transactions', (req, res)=>{
  client.query('Select * from transactions ORDER BY block_number DESC;', (err, result)=> {
      if (!err) {
          res.send(result.rows);
      }
  })
    client.end;
})

// All blocks, newest first.
app.get('/blocks', (req, res)=>{
    client.query('Select * from blocks ORDER BY block_number DESC;', (err, result)=> {
        if (!err) {
            res.send(result.rows);
        }
    })
    client.end;
})
