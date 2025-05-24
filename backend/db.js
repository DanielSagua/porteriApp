const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

console.log('Conectando a servidor SQL:', process.env.DB_SERVER);

sql.connect(config).catch(err => console.error('Error de conexión:', err));

module.exports = sql;
    