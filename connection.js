const {Client} = require('pg');

const client = new Client({
    host: "62.146.229.47",
    user: "christian",
    port: 5432,
    password: "5683",
    database: "argochain"
})

module.exports = client
