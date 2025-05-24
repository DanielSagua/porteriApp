const express = require('express');
const router = express.Router();
const sql = require('../db'); // Ya estás usando sql.query aquí, así que no necesitas `dbConfig`

// Crear un nuevo registro
// router.post('/crear', async (req, res) => {
//     const { usuario_id, tipo_novedad, descripcion, fecha_hora, fecha_manual } = req.body;
//     try {
//         await sql.query`
//             INSERT INTO Novedades (usuario_id, tipo_novedad, descripcion, fecha_hora, fecha_manual)
//             VALUES (${usuario_id}, ${tipo_novedad}, ${descripcion}, ${fecha_hora}, ${fecha_manual})
//         `;
//         res.json({ success: true });
//     } catch (err) {
//         console.error('Error al crear novedad:', err);
//         res.status(500).json({ success: false, error: 'Error al crear la novedad' });
//     }
// });

router.post('/crear', async (req, res) => {
    const { usuario_id, tipo_novedad, descripcion, fecha_hora, fecha_manual } = req.body;

    try {

        console.log('Recibido del frontend:', req.body);

        // Forzamos conversión segura a tipo Date
        const fechaFormateada = new Date(fecha_hora);

        if (isNaN(fechaFormateada.getTime())) {
            return res.status(400).json({ success: false, error: 'Formato de fecha inválido' });
        }

        await sql.query`
            INSERT INTO Novedades (usuario_id, tipo_novedad, descripcion, fecha_hora, fecha_manual)
            VALUES (${usuario_id}, ${tipo_novedad}, ${descripcion}, ${fechaFormateada}, ${fecha_manual})
        `;
        res.json({ success: true });
    } catch (err) {
        console.error('Error al crear novedad:', err);
        res.status(500).json({ success: false, error: 'Error al crear la novedad' });
    }
});


router.get('/listar', async (req, res) => {
    try {
        const result = await sql.query`
            SELECT N.*, U.username as nombre_usuario
            FROM Novedades N
            LEFT JOIN Usuarios U ON N.usuario_id = U.id
        `;
        res.json(result.recordset);
    } catch (err) {
        console.error('Error al obtener registros:', err);
        res.status(500).send('Error al obtener todos los registros');
    }
});


// Obtener registros por usuario
router.get('/listar/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;
    try {
        const result = await sql.query`
            SELECT * FROM Novedades WHERE usuario_id = ${usuario_id}
        `;
        res.json(result.recordset);
    } catch (err) {
        console.error('Error al obtener registros del usuario:', err);
        res.status(500).send('Error al obtener registros del usuario');
    }
});

module.exports = router;
