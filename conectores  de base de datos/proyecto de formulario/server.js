const express = require('express');
const Database = require('better-sqlite3');

const app = express();
app.use(express.json());
app.use(express.static('formulario'));

const db = new Database('alumnos.db');



app.post('/alumnos', (req, res) => {
  const { nombre, apellido, email, edad, dni } = req.body;

  try {
    db.prepare(
      'INSERT INTO alumnos (nombre, apellido, email, edad, dni) VALUES (?, ?, ?, ?, ?)'
    ).run(nombre, apellido, email, edad, dni);

    res.json({ mensaje: 'Alumno guardado' });
  } catch (error) {
    res.status(400).json({ mensaje: 'No se pudo guardar (¿DNI repetido?)' });
  }
});

// fabri esto servia para traer los datos pq no se me ocurrio otra manerra de extraerlo
app.get('/alumnos', (req, res) => {
  const alumnos = db.prepare('SELECT * FROM alumnos').all();
  res.json(alumnos);
});

app.listen(3000, () => {
  console.log('Servidor listo en http://localhost:3000');
});