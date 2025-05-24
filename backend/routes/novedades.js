const express = require('express');
const router = express.Router();
const sql = require('../db');

router.post('/crear', async (req, res) => {
    const { usuario_id, tipo_novedad, descripcion, fecha_hora, fecha_manual } = req.body;
    await sql.query`
        INSERT INTO Novedades (usuario_id, tipo_novedad, descripcion, fecha_hora, fecha_manual)
        VALUES (${usuario_id}, ${tipo_novedad}, ${descripcion}, ${fecha_hora}, ${fecha_manual})
    `;
    res.json({ success: true });
});

router.get('/listar/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;
    const result = await sql.query`SELECT * FROM Novedades WHERE usuario_id = ${usuario_id}`;
    res.json(result.recordset);
});

module.exports = router;
