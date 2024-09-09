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
    const { nombre, apellidoMaterno, apellidoPaterno, ciudad, direccion, tipoCargo, dni, fechaRegistro } = req.body;

    if (!nombre || !apellidoMaterno || !apellidoPaterno || !ciudad || !direccion || !tipoCargo || !dni || !fechaRegistro) {
        return res.status(400).send('Todos los campos son requeridos.');
    }

    connection.query(
        'INSERT INTO Docente (nombre, apellidoMaterno, apellidoPaterno, ciudad, direccion, tipoCargo, dni, fechaRegistro) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre, apellidoMaterno, apellidoPaterno, ciudad, direccion, tipoCargo, dni, fechaRegistro],
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

app.post('/POScurso', (req, res) => {
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

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
