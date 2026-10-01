const formulario = document.getElementById('formulario');


formulario.addEventListener('submit', async function (evento) {
  evento.preventDefault(); 

  
  const alumno = {
    nombre: document.getElementById('nombre').value,
    apellido: document.getElementById('apellido').value,
    email: document.getElementById('email').value,
    edad: document.getElementById('edad').value,
    dni: document.getElementById('dni').value
  };

  // Los enviamos al servidor
  const respuesta = await fetch('/alumnos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(alumno)
  });

  const resultado = await respuesta.json();
  document.getElementById('mensaje').textContent = resultado.mensaje;

  formulario.reset();  
  mostrarAlumnos();    
});


async function mostrarAlumnos() {
  const respuesta = await fetch('/alumnos');
  const alumnos = await respuesta.json();

  let filas = '';
  for (const a of alumnos) {
    filas += '<tr><td>' + a.nombre + '</td><td>' + a.apellido + '</td><td>' +
             a.email + '</td><td>' + a.edad + '</td><td>' + a.dni + '</td></tr>';
  }
  document.getElementById('tabla').innerHTML = filas;
}

mostrarAlumnos(); 