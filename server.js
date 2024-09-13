const express = require('express');     
const mysql = require('mysql2');        
const cors = require('cors');           
const bodyParser = require('body-parser'); 

const app = express();  
app.use(cors());       
app.use(bodyParser.json());  

// Configura la conexión a MariaDB
const connection = mysql.createConnection({
    host: 'localhost',
    database: 'dbcolegiopin', 
    user: 'root',       
    password: '',       

});

// Establece la conexión a la base de datos
connection.connect((err) => {
    if (err) throw err; 
    console.log('Conectado a MariaDB');  
});

//Asignacion base
app.get('/', (req, res) => {
    res.send('¡Bienvenido al servidor Node.js!');
});

app.get('/GETusuario', (req, res) => {
    connection.query('SELECT * FROM usuario', (err, results) => {
        if (err) throw err;  // Maneja el error si ocurre
        res.send(results);
    });
});

//DOCENTE 
app.get('/GETdocentes', (req, res) => {
    connection.query('SELECT * FROM docente', (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener los docentes');
            throw err;
        }
        res.send(results);
    });
});

app.post('/POSTdocente', (req, res) => {
    const { nombre, apellidoPaterno, apellidoMaterno, ciudad, direccion, tipoCargo, dni, fechaRegistro } = req.body;

    if (!nombre || !apellidoPaterno || !apellidoMaterno || !ciudad || !direccion || !tipoCargo || !dni || !fechaRegistro) {
        return res.status(400).send('Todos los campos son requeridos.');
    }

    connection.query(
        'INSERT INTO Docente (nombre, apellidoMaterno, apellidoPaterno, ciudad, direccion, tipoCargo, dni, fechaRegistro) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre, apellidoPaterno, apellidoMaterno, ciudad, direccion, tipoCargo, dni, fechaRegistro],
        (err, results) => {
            if (err) {
                res.status(500).send('Error al agregar el docente');
                throw err;
            }
            res.status(201).send(`Docente agregado exitosamente con ID: ${results.insertId}`);
        }
    );
});

//AULA
app.get('/GETaulas', (req, res) => {
    connection.query('SELECT * FROM aula', (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener las aulas');
            throw err;
        }
        res.send(results);
    });
});

app.post('/POSTaula', (req, res) => {
    const { seccion, nivel, gradoActual } = req.body;

    if (!seccion || !nivel || !gradoActual) {
        return res.status(400).send('Sección, nivel y grado académico son requeridos.');
    }

    connection.query(
        'INSERT INTO Aula (seccion, nivel, gradoActual) VALUES (?, ?, ?)',
        [seccion, nivel, gradoActual],
        (err, results) => {
            if (err) {
                res.status(500).send('Error al agregar el aula');
                throw err;
            }
            res.status(201).send(`Aula agregada exitosamente con ID: ${results.insertId}`);
        }
    );
});



//CURSO
app.get('/GETcursos', (req, res) => {
    connection.query('SELECT * FROM curso', (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener los cursos');
            throw err;
        }
        res.send(results);
    });
});

app.post('/POSTcurso', (req, res) => {
    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion) {
        return res.status(400).send('Nombre y descripción del curso son requeridos.');
    }

    connection.query(
        'INSERT INTO Curso (nombre, descripcion) VALUES (?, ?)',
        [nombre, descripcion],
        (err, results) => {
            if (err) {
                res.status(500).send('Error al agregar el curso');
                throw err;
            }
            res.status(201).send(`Curso agregado exitosamente con ID: ${results.insertId}`);
        }
    );
});

app.put('/PUTcurso/:idCurso', (req, res) => {
    const { idCurso } = req.params;
    const { nombre, descripcion } = req.body;

    const query = `
        UPDATE curso 
        SET nombre = ?, 
            descripcion = ?
        WHERE idCurso = ?
    `;
    
    const values = [nombre, descripcion, idCurso];
    
    connection.query(query, values, (err, results) => {
        if (err) {
            res.status(500).send('Error al actualizar el curso');
            throw err;
        }
        res.send('Curso actualizado exitosamente');
    });
});

//HORARIO
app.get('/GEThorarios', (req, res) => {
    connection.query('SELECT * FROM horario', (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener los horarios');
            throw err;
        }   
        res.send(results);
    });
});

app.post('/POSThorario', (req, res) => {
    const { idCurso, idDocente, idAula, Fecha_inicio, Fecha_final, hora_inicio, hora_final } = req.body;

    if (!idCurso || !idDocente|| !idAula || !Fecha_inicio || !Fecha_final || !hora_inicio || !hora_final) {
        return res.status(400).send('Todos los campos del horario son requeridos.');
    }

    connection.query(
        'INSERT INTO Horario (idCurso, idDocente, idAula, Fecha_inicio, Fecha_final, hora_inicio, hora_final) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [idCurso, idDocente, idAula, Fecha_inicio, Fecha_final, hora_inicio, hora_final],
        (err, results) => {
            if (err) {
                res.status(500).send('Error al agregar el horario');
                throw err;
            }
            res.status(201).send(`Horario agregado exitosamente con ID: ${results.insertId}`);
        }
    );
});

//ALUMNO
app.get('/GETalumnos', (req, res) => {
    connection.query('SELECT * FROM alumno', (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener los alumnos');
            throw err;
        }
        res.send(results);
    });
});

app.post('/POSTalumno', (req, res) => {
    const { nombres, apeMaterno, apePaterno, dni, fechaRegistro, fechaNacimiento, genero, direccion, telefono } = req.body;

    if (!nombres|| !apeMaterno || !apePaterno || !dni || !fechaRegistro || !fechaNacimiento || !genero || !direccion || !telefono) {
        return res.status(400).send('Todos los campos del horario son requeridos.');
    }

    connection.query(
        'INSERT INTO Alumno (nombres, apeMaterno, apePaterno, dni, fechaRegistro, fechaNacimiento, genero, direccion, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nombres, apeMaterno, apePaterno, dni, fechaRegistro, fechaNacimiento, genero, direccion, telefono],
        (err, results) => {
            if (err) {
                res.status(500).send('Error al agregar el alumno');
                throw err;
            }
            res.status(201).send(`Alumno agregado exitosamente con ID: ${results.insertId}`);
        }
    );
});

//MATRICULA
app.get('/GETmatricula', (req, res) => {
    connection.query('SELECT * FROM matricula', (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener las matriculas');
            throw err;
        }
        res.send(results);
    });
});

app.post('/POSTmatricula', (req, res) => {
    const { idMVacancia, idEstudiante, fechaRegistro, estado } = req.body;

    if (!idMVacancia || !idEstudiante || !fechaRegistro || !estado) {
        return res.status(400).send('Todos los campos de la matricula son requeridos.');
    }

    connection.query(
        'INSERT INTO matricula (idMVacancia, idEstudiante, fechaRegistro, estado) VALUES (?, ?, ?, ?)',
        [idMVacancia, idEstudiante, fechaRegistro, estado],
        (err, results) => {
            if (err) {
                res.status(500).send('Error al agregar la matricula');
                throw err;
            }
            res.status(201).send(`Matricula agregado exitosamente con ID: ${results.insertId}`);
        }
    );
});
//MATRICULAVACANCIA
app.get('/GETmatriculaVacancia', (req, res) => {
    connection.query('SELECT * FROM matriculaVacancia', (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener los vacantes');
            throw err;
        }
        res.send(results);
    });
});

app.post('/POSTmatriculaVacancia', (req, res) => {
    const { idAula, disponibilidadActual, disponibilidadTotal } = req.body;

    if (!idAula || !disponibilidadTotal) {
        return res.status(400).send('Todos los campos de la vacancia son requeridos.');
    }

    connection.query(
        'INSERT INTO matriculaVacancia (idAula, disponibilidadActual, disponibilidadTotal) VALUES (?, ?, ?)',
        [idAula, disponibilidadActual, disponibilidadTotal],
        (err, results) => {
            if (err) {
                res.status(500).send('Error al agregar la vacancia');
                throw err;
            }
            res.status(201).send(`Vacancia agregada exitosamente con ID: ${results.insertId}`);
        }
    );
});
// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
