const checkbox = document.getElementById('manualFecha');
const fechaHoraInput = document.getElementById('fechaHora');


checkbox.addEventListener('change', () => {
    fechaHoraInput.disabled = !checkbox.checked;
});

document.getElementById('novedadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    const tipo = document.getElementById('tipo').value;
    const descripcion = document.getElementById('descripcion').value;
    const fecha_manual = checkbox.checked;
    const fecha_hora = fecha_manual ? document.getElementById('fechaHora').value : new Date().toISOString();

    await fetch('http://localhost:3000/api/novedades/crear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id: userId, tipo_novedad: tipo, descripcion, fecha_hora, fecha_manual })
    });

    alert('Registro guardado');
    // Limpiar campos del formulario
    document.getElementById('novedadForm').reset();
    document.getElementById('fechaHora').disabled = true;

});
