const express = require('express');
const router = express.Router();
const sql = require('../db');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await sql.query`SELECT * FROM Usuarios WHERE username = ${username} AND password = ${password}`;
    if (result.recordset.length > 0) {
        res.json({ success: true, userId: result.recordset[0].id });
    } else {
        res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
});

module.exports = router;
