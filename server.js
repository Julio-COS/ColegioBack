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

app.get('/GETdocente/:idDocente', (req, res) => {
    const idDocente = req.params.idDocente;

    connection.query('SELECT * FROM docente WHERE idDocente = ?', [idDocente], (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener el docente');
            throw err;
        }
        if (results.length === 0) {
            res.status(404).send('Docente no encontrado');
        } else {
            res.send(results[0]);
        }
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

app.put('/PUTdocente/:idDocente', (req, res) => {
    const idDocente = req.params.idDocente;
    const { nombre, apellidoPaterno, apellidoMaterno, ciudad, direccion, tipoCargo, dni, fechaRegistro } = req.body;

    const query = `
        UPDATE docente
        SET nombreDocente = ?, apellidoPaterno = ?, apellidoMaterno = ?, ciudad = ?, direccion = ?, tipoCargo = ?, dni = ?, fechaRegistro = ?
        WHERE idDocente = ?
    `;

    connection.query(query, [nombreDocente, apellidoPaterno, apellidoMaterno, ciudad, direccion, tipoCargo, dni, fechaRegistro, idDocente], (err, result) => {
        if (err) {
            res.status(500).send('Error al actualizar el docente');
            throw err;
        }
        res.send('Docente actualizado correctamente');
    });
});

app.delete('/DELETEdocente/:idDocente', (req, res) => {
    const idDocente = req.params.idDocente;

    const query = `DELETE FROM docente WHERE idDocente = ?`;

    connection.query(query, [idDocente], (err, result) => {
        if (err) {
            res.status(500).send('Error al eliminar el docente');
            throw err;
        }
        res.send('Docente eliminado correctamente');
    });
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

app.get('/GETaula/:idAula', (req, res) => {
    const idAula = req.params.idAula;

    connection.query('SELECT * FROM aula WHERE idAula = ?', [idAula], (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener el aula');
            throw err;
        }
        if (results.length === 0) {
            res.status(404).send('Aula no encontrada');
        } else {
            res.send(results[0]);
        }
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

app.put('/PUTaula/:idAula', (req, res) => {
    const idAula = req.params.idAula;
    const { seccion, nivel, gradoActual} = req.body;

    if ( !seccion || !nivel || !gradoActual) {
        return res.status(400).send('Todos los campos son requeridos para actualizar el aula.');
    }

    const query = `UPDATE aula SET 
                   seccion = ?, 
                   nivel = ?,
                   gradoActual = ?
                   WHERE idAula = ?`;

    connection.query(query, [seccion, nivel, gradoActual, idAula], (err, results) => {
        if (err) {
            res.status(500).send('Error al actualizar el aula');
            throw err;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Aula no encontrada');
        } else {
            res.send('Aula actualizada correctamente');
        }
    });
});

app.delete('/DELETEaula/:idAula', (req, res) => {
    const idAula = req.params.idAula;

    const query = `DELETE FROM aula WHERE idAula = ?`;

    connection.query(query, [idAula], (err, results) => {
        if (err) {
            res.status(500).send('Error al eliminar el aula');
            throw err;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Aula no encontrada');
        } else {
            res.send('Aula eliminada correctamente');
        }
    });
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

app.get('/GETcurso/:idCurso', (req, res) => {
    const { idCurso } = req.params;
    const query ='SELECT * FROM curso WHERE idCurso = ?';

    connection.query(query,[idCurso], (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener los cursos');
            throw err;
        }
        res.send(results[0]);
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

app.delete('/DELETEcurso/:idCurso', (req, res) => {
    const { idCurso } = req.params;

    const query = 'DELETE FROM curso WHERE idCurso = ?';

    connection.query(query, [idCurso], (err, results) => {
        if (err) {
            res.status(500).send('Error al eliminar el curso');
            throw err;
        }
        res.send('Curso eliminado exitosamente');
    });
});

//HORARIO
app.get('/GEThorarios', (req, res) => {
    connection.query(`SELECT 
            h.idHorario,
            DATE_FORMAT(h.Fecha_inicio, '%Y-%m-%d') as Fecha_inicio, 
            DATE_FORMAT(h.Fecha_final, '%Y-%m-%d') as Fecha_final, 
            h.hora_inicio, 
            h.hora_final, 
            CONCAT(a.gradoActual, ' - ', a.seccion, ' - ', a.nivel) as nombreAula, 
            d.nombre as nombreDocente, c.nombre as nombreCurso 
            FROM horario h 
            INNER JOIN aula a ON h.idAula = a.idAula 
            INNER JOIN docente d ON h.idDocente = d.idDocente 
            INNER JOIN curso c ON h.idCurso = c.idCurso;`, (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener los horarios');
            throw err;
        }   
        res.send(results);
    });
});

app.get('/GEThorario/:idHorario', (req, res) => {
    const idHorario = req.params.idHorario;

    connection.query(`
        SELECT 
            DATE_FORMAT(h.Fecha_inicio, '%Y-%m-%d') as Fecha_inicio, 
            DATE_FORMAT(h.Fecha_final, '%Y-%m-%d') as Fecha_finalFecha_final, 
            h.hora_inicio, 
            h.hora_final, 
            CONCAT(a.gradoActual, ' - ', a.seccion, ' - ', a.nivel) as nombreAula, 
            d.nombre as nombreDocente, 
            c.nombre as nombreCurso 
        FROM horario h 
        INNER JOIN aula a ON h.idAula = a.idAula 
        INNER JOIN docente d ON h.idDocente = d.idDocente 
        INNER JOIN curso c ON h.idCurso = c.idCurso
        WHERE h.idHorario = ?;`, [idHorario], (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener el horario');
            throw err;
        }
        if (results.length === 0) {
            res.status(404).send('Horario no encontrado');
        } else {
            res.send(results[0]);
        }
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

app.put('/PUThorario/:idHorario', (req, res) => {
    const idHorario = req.params.idHorario;
    const { Fecha_inicio, Fecha_final, hora_inicio, hora_final, idCurso, idDocente, idAula } = req.body;

    const query = `UPDATE horario SET 
                   Fecha_inicio = ?, 
                   Fecha_final = ?, 
                   hora_inicio = ?, 
                   hora_final = ?, 
                   idCurso = ?, 
                   idDocente = ?, 
                   idAula = ?
                   WHERE idHorario = ?`;

    connection.query(query, [Fecha_inicio, Fecha_final, hora_inicio, hora_final, idCurso, idDocente, idAula, idHorario], (err, results) => {
        if (err) {
            res.status(500).send('Error al actualizar el horario');
            throw err;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Horario no encontrado');
        } else {
            res.send('Horario actualizado correctamente');
        }
    });
});

app.delete('/DELETEhorario/:idHorario', (req, res) => {
    const idHorario = req.params.idHorario;

    const query = `DELETE FROM Horario WHERE idHorario = ?`;

    connection.query(query, [idHorario], (err, result) => {
        if (err) {
            res.status(500).send('Error al eliminar el horario');
            throw err;
        }
        res.send('Horario eliminado correctamente');
    });
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

app.get('/GETalumno/:idEstudiante', (req, res) => {
    const idEstudiante = req.params.idEstudiante;

    connection.query('SELECT * FROM alumno WHERE idEstudiante = ?', [idEstudiante], (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener el alumno');
            throw err;
        }
        if (results.length === 0) {
            res.status(404).send('Alumno no encontrado');
        } else {
            res.send(results[0]);
        }
    });
});

app.put('/PUTalumno/:idEstudiante', (req, res) => {
    const idEstudiante = req.params.idEstudiante;
    const { nombres, apeMaterno, apePaterno, dni, fechaRegistro, fechaNacimiento, genero, direccion, telefono } = req.body;

    const query = `UPDATE alumno SET 
                   nombres = ?, 
                   apeMaterno = ?, 
                   apePaterno = ?, 
                   dni = ?, 
                   fechaRegistro = ?, 
                   fechaNacimiento = ?, 
                   genero = ?, 
                   direccion = ?, 
                   telefono = ?
                   WHERE idEstudiante = ?`;

    connection.query(query, [nombres, apeMaterno, apePaterno, dni, fechaRegistro, fechaNacimiento, genero, direccion, telefono, idEstudiante], (err, results) => {
        if (err) {
            res.status(500).send('Error al actualizar el alumno');
            throw err;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Alumno no encontrado');
        } else {
            res.send('Alumno actualizado correctamente');
        }
    });
});

app.delete('/DELETEalumno/:idEstudiante', (req, res) => {
    const idEstudiante = req.params.idEstudiante;

    const query = `DELETE FROM alumno WHERE idEstudiante = ?`;

    connection.query(query, [idEstudiante], (err, results) => {
        if (err) {
            res.status(500).send('Error al eliminar el alumno');
            throw err;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Alumno no encontrado');
        } else {
            res.send('Alumno eliminado correctamente');
        }
    });
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

app.get('/GETmatricula/:idMatricula', (req, res) => {
    const idMatricula = req.params.idMatricula;

    connection.query('SELECT * FROM matricula WHERE idMatricula = ?', [idMatricula], (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener la matricula');
            throw err;
        }
        if (results.length === 0) {
            res.status(404).send('Matrícula no encontrada');
        } else {
            res.send(results[0]);
        }
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

app.put('/PUTmatricula/:idMatricula', (req, res) => {
    const idMatricula = req.params.idMatricula;
    const { idMVacancia, idEstudiante, fechaRegistro, estado } = req.body;

    const query = `UPDATE matricula SET 
                   idMVacancia = ?, 
                   idEstudiante = ?, 
                   fechaRegistro = ?, 
                   estado = ?
                   WHERE idMatricula = ?`;

    connection.query(query, [idMVacancia, idEstudiante, fechaRegistro, estado, idMatricula], (err, results) => {
        if (err) {
            res.status(500).send('Error al actualizar la matricula');
            throw err;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Matricula no encontrada');
        } else {
            res.send('Matricula actualizada correctamente');
        }
    });
});

app.delete('/DELETEmatricula/:idMatricula', (req, res) => {
    const idMatricula = req.params.idMatricula;

    const query = `DELETE FROM matricula WHERE idMatricula = ?`;

    connection.query(query, [idMatricula], (err, results) => {
        if (err) {
            res.status(500).send('Error al eliminar la matricula');
            throw err;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Matricula no encontrada');
        } else {
            res.send('Matricula eliminada correctamente');
        }
    });
});

//MATRICULAVACANCIA
app.get('/GETmatriculaVacancia', (req, res) => {
    connection.query(`
            SELECT 
            m.idMVacancia,
            CONCAT(a.gradoActual, ' - ', a.seccion, ' - ', a.nivel) as nombreAula, 
            m.disponibilidadActual,
            m.disponibilidadTotal
            FROM matriculaVacancia m 
            INNER JOIN aula a ON m.idAula = a.idAula`, (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener los vacantes');
            throw err;
        }
        res.send(results);
    });
});

app.get('/GETmatriculaVacancia/:idMVacancia', (req, res) => {
    const idMVacancia = req.params.idMVacancia;

    connection.query('SELECT * FROM matriculaVacancia WHERE idMVacancia = ?', [idMVacancia], (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener la matricula vacante');
            throw err;
        }
        if (results.length === 0) {
            res.status(404).send('Vacancia no encontrada');
        } else {
            res.send(results[0]);
        }
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

app.put('/PUTmatriculaVacancia/:idMVacancia', (req, res) => {
    const idMVacancia = req.params.idMVacancia;
    const { idAula, disponibilidadActual, disponibilidadTotal } = req.body;

    if (!idAula || !disponibilidadActual || !disponibilidadTotal) {
        return res.status(400).send('Todos los campos son requeridos para actualizar la vacancia.');
    }

    const query = `UPDATE matriculaVacancia SET 
                   idAula = ?, 
                   disponibilidadActual = ?, 
                   disponibilidadTotal = ?
                   WHERE idMVacancia = ?`;

    connection.query(query, [idAula, disponibilidadActual, disponibilidadTotal, idMVacancia], (err, results) => {
        if (err) {
            res.status(500).send('Error al actualizar la vacancia');
            throw err;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Vacancia no encontrada');
        } else {
            res.send('Vacancia actualizada correctamente');
        }
    });
});

app.delete('/DELETEmatriculaVacancia/:idMVacancia', (req, res) => {
    const idMVacancia = req.params.idMVacancia;

    const query = `DELETE FROM matriculaVacancia WHERE idMVacancia = ?`;

    connection.query(query, [idMVacancia], (err, results) => {
        if (err) {
            res.status(500).send('Error al eliminar la vacancia');
            throw err;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Vacancia no encontrada');
        } else {
            res.send('Vacancia eliminada correctamente');
        }
    });
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
