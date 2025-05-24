const checkbox = document.getElementById('manualFecha');
const fechaHoraInput = document.getElementById('fechaHora');


checkbox.addEventListener('change', () => {
    fechaHoraInput.disabled = !checkbox.checked;
});

// document.getElementById('novedadForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const userId = localStorage.getItem('userId');
//     const tipo = document.getElementById('tipo').value;
//     const descripcion = document.getElementById('descripcion').value;
//     const fecha_manual = checkbox.checked;
//     function formatearFechaParaSQL(fecha) {
//         const pad = n => n.toString().padStart(2, '0');
//         return `${fecha.getFullYear()}-${pad(fecha.getMonth() + 1)}-${pad(fecha.getDate())} ${pad(fecha.getHours())}:${pad(fecha.getMinutes())}:${pad(fecha.getSeconds())}`;
//     }

//     const fecha_hora = fecha_manual
//         ? document.getElementById('fechaHora').value
//         : formatearFechaParaSQL(new Date());



//     await fetch('http://localhost:3000/api/novedades/crear', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ usuario_id: userId, tipo_novedad: tipo, descripcion, fecha_hora, fecha_manual })
//     });

//     alert('Registro guardado');
//     // Limpiar campos del formulario
//     document.getElementById('novedadForm').reset();
//     document.getElementById('fechaHora').disabled = true;

// });

function formatearFechaParaSQL(fecha) {
    const pad = n => n.toString().padStart(2, '0');
    return `${fecha.getFullYear()}-${pad(fecha.getMonth() + 1)}-${pad(fecha.getDate())} ${pad(fecha.getHours())}:${pad(fecha.getMinutes())}:${pad(fecha.getSeconds())}`;
}

document.getElementById('novedadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    const tipo = document.getElementById('tipo').value;
    const descripcion = document.getElementById('descripcion').value;
    const fecha_manual = checkbox.checked;

    let fecha_hora;
    if (fecha_manual) {
        const fechaInput = document.getElementById('fechaHora').value;
        if (!fechaInput) {
            alert('Por favor selecciona una fecha válida.');
            return;
        }
        // Transformar '2025-05-24T19:00' en '2025-05-24 19:00:00'
        fecha_hora = fechaInput.replace('T', ':') + ':00';
    } else {
        fecha_hora = formatearFechaParaSQL(new Date());
    }

    try {
        await fetch('http://localhost:3000/api/novedades/crear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario_id: userId, tipo_novedad: tipo, descripcion, fecha_hora, fecha_manual })
        });

        alert('Registro guardado');
        document.getElementById('novedadForm').reset();
        document.getElementById('fechaHora').disabled = true;
    } catch (err) {
        console.error('Error al guardar la novedad:', err);
        alert('Error al guardar la novedad.');
    }
});
