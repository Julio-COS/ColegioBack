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
    res.json('¡Bienvenido al servidor Node.js!');
});

app.get('/GETusuario', (req, res) => {
    connection.query('SELECT * FROM usuario', (err, results) => {
        if (err) throw err;  // Maneja el error si ocurre
        res.json(results);
    });
});

//DOCENTE 
app.get('/GETdocentes', (req, res) => {
    connection.query('SELECT * FROM docente', (err, results) => {
        if (err) {
            res.status(500).json('Error al obtener los docentes');
            throw err;
        }
        res.json(results);
    });
});

app.get('/GETdocente/:idDocente', (req, res) => {
    const idDocente = req.params.idDocente;

    connection.query('SELECT * FROM docente WHERE idDocente = ?', [idDocente], (err, results) => {
        if (err) {
            res.status(500).json('Error al obtener el docente');
            throw err;
        }
        if (results.length === 0) {
            res.status(404).json('Docente no encontrado');
        } else {
            res.json(results[0]);
        }
    });
});

app.post('/POSTdocente', (req, res) => {
    const { nombre, apellidoPaterno, apellidoMaterno, ciudad, direccion, tipoCargo, dni, fechaRegistro } = req.body;

    if (!nombre || !apellidoPaterno || !apellidoMaterno || !ciudad || !direccion || !tipoCargo || !dni || !fechaRegistro) {
        return res.status(400).json('Todos los campos son requeridos.');
    }

    connection.query(
        'INSERT INTO Docente (nombre, apellidoMaterno, apellidoPaterno, ciudad, direccion, tipoCargo, dni, fechaRegistro) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre, apellidoPaterno, apellidoMaterno, ciudad, direccion, tipoCargo, dni, fechaRegistro],
        (err, results) => {
            if (err) {
                res.status(500).json('Error al agregar el docente');
                throw err;
            }
            res.status(201).json({ isSuccess: true, message: `Docente agregado exitosamente con ID: ${results.insertId}`});
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
            res.status(500).json('Error al actualizar el docente');
            throw err;
        }
        res.json('Docente actualizado correctamente');
    });
});

app.delete('/DELETEdocente/:idDocente', (req, res) => {
    const idDocente = req.params.idDocente;

    const query = `DELETE FROM docente WHERE idDocente = ?`;

    connection.query(query, [idDocente], (err, result) => {
        if (err) {
            res.status(500).json('Error al eliminar el docente');
            throw err;
        }
        res.json('Docente eliminado correctamente');
    });
});


//AULA
app.get('/GETaulas', (req, res) => {
    connection.query('SELECT * FROM aula', (err, results) => {
        if (err) {
            res.status(500).json('Error al obtener las aulas');
            throw err;
        }
        res.json(results);
    });
});

app.get('/GETaula/:idAula', (req, res) => {
    const idAula = req.params.idAula;

    connection.query('SELECT * FROM aula WHERE idAula = ?', [idAula], (err, results) => {
        if (err) {
            res.status(500).json('Error al obtener el aula');
            throw err;
        }
        if (results.length === 0) {
            res.status(404).json('Aula no encontrada');
        } else {
            res.json(results[0]);
        }
    });
});

app.post('/POSTaula', (req, res) => {
    const { seccion, nivel, gradoActual } = req.body;

    if (!seccion || !nivel || !gradoActual) {
        return res.status(400).json('Sección, nivel y grado académico son requeridos.');
    }

    connection.query(
        'INSERT INTO Aula (seccion, nivel, gradoActual) VALUES (?, ?, ?)',
        [seccion, nivel, gradoActual],
        (err, results) => {
            if (err) {
                res.status(500).json('Error al agregar el aula');
                throw err;
            }
            res.status(201).json({ isSuccess: true, message: `Aula agregada exitosamente con ID: ${results.insertId}`});
        }
    );
});

app.put('/PUTaula/:idAula', (req, res) => {
    const idAula = req.params.idAula;
    const { seccion, nivel, gradoActual} = req.body;

    if ( !seccion || !nivel || !gradoActual) {
        return res.status(400).json('Todos los campos son requeridos para actualizar el aula.');
    }

    const query = `UPDATE aula SET 
                   seccion = ?, 
                   nivel = ?,
                   gradoActual = ?
                   WHERE idAula = ?`;

    connection.query(query, [seccion, nivel, gradoActual, idAula], (err, results) => {
        if (err) {
            res.status(500).json('Error al actualizar el aula');
            throw err;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Aula no encontrada');
        } else {
            res.json('Aula actualizada correctamente');
        }
    });
});

app.delete('/DELETEaula/:idAula', (req, res) => {
    const idAula = req.params.idAula;

    const query = `DELETE FROM aula WHERE idAula = ?`;

    connection.query(query, [idAula], (err, results) => {
        if (err) {
            res.status(500).json('Error al eliminar el aula');
            throw err;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Aula no encontrada');
        } else {
            res.json('Aula eliminada correctamente');
        }
    });
});

//CURSO
app.get('/GETcursos', (req, res) => {
    connection.query('SELECT * FROM curso', (err, results) => {
        if (err) {
            res.status(500).json('Error al obtener los cursos');
            throw err;
        }
        res.json(results);
    });
});

app.get('/GETcurso/:idCurso', (req, res) => {
    const { idCurso } = req.params;
    const query ='SELECT * FROM curso WHERE idCurso = ?';

    connection.query(query,[idCurso], (err, results) => {
        if (err) {
            res.status(500).json('Error al obtener los cursos');
            throw err;
        }
        res.json(results[0]);
    });
});

app.post('/POSTcurso', (req, res) => {
    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion) {
        return res.status(400).json('Nombre y descripción del curso son requeridos.');
    }

    connection.query(
        'INSERT INTO Curso (nombre, descripcion) VALUES (?, ?)',
        [nombre, descripcion],
        (err, results) => {
            if (err) {
                res.status(500).json('Error al agregar el curso');
                throw err;
            }
            res.status(201).json({ isSuccess: true, message: `Curso agregado exitosamente con ID: ${results.insertId}`});
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
            res.status(500).json('Error al actualizar el curso');
            throw err;
        }
        res.json('Curso actualizado exitosamente');
    });
});

app.delete('/DELETEcurso/:idCurso', (req, res) => {
    const { idCurso } = req.params;

    const query = 'DELETE FROM curso WHERE idCurso = ?';

    connection.query(query, [idCurso], (err, results) => {
        if (err) {
            res.status(500).json('Error al eliminar el curso');
            throw err;
        }
        res.json('Curso eliminado exitosamente');
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
            CONCAT(d.nombre, ' ', d.apellidoPaterno, ' ',d.apellidoMaterno) as nombreDocente,
            c.nombre as nombreCurso 
            FROM horario h 
            INNER JOIN aula a ON h.idAula = a.idAula 
            INNER JOIN docente d ON h.idDocente = d.idDocente 
            INNER JOIN curso c ON h.idCurso = c.idCurso;`, (err, results) => {
        if (err) {
            res.status(500).json('Error al obtener los horarios');
            throw err;
        }   
        res.json(results);
    });
});

app.get('/GEThorario/:idHorario', (req, res) => {
    const {idHorario}= req.params;
    connection.query(`SELECT * FROM horario WHERE idHorario = ?`, [idHorario], (err, results) => {
        if (err) {
            res.status(500).json('Error al obtener el horario');
            throw err;
        }
        if (results.length === 0) {
            res.status(404).json('Horario no encontrado');
        } else {
            res.json(results[0]);
        }
    });
});

app.post('/POSThorario', (req, res) => {
    const { idCurso, idDocente, idAula, Fecha_inicio, Fecha_final, hora_inicio, hora_final } = req.body;

    if (!idCurso || !idDocente|| !idAula || !Fecha_inicio || !Fecha_final || !hora_inicio || !hora_final) {
        return res.status(400).json('Todos los campos del horario son requeridos.');
    }

    connection.query(
        'INSERT INTO Horario (idCurso, idDocente, idAula, Fecha_inicio, Fecha_final, hora_inicio, hora_final) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [idCurso, idDocente, idAula, Fecha_inicio, Fecha_final, hora_inicio, hora_final],
        (err, results) => {
            if (err) {
                res.status(500).json('Error al agregar el horario');
                throw err;
            }
            res.status(201).json({ isSuccess: true, message: `Horario agregado exitosamente con ID: ${results.insertId}`});
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
            res.status(500).json('Error al actualizar el horario');
            throw err;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Horario no encontrado');
        } else {
            res.json('Horario actualizado correctamente');
        }
    });
});

app.delete('/DELETEhorario/:idHorario', (req, res) => {
    const idHorario = req.params.idHorario;

    const query = `DELETE FROM Horario WHERE idHorario = ?`;

    connection.query(query, [idHorario], (err, result) => {
        if (err) {
            res.status(500).json('Error al eliminar el horario');
            throw err;
        }
        res.json('Horario eliminado correctamente');
    });
});

//ALUMNO
app.get('/GETalumnos', (req, res) => {
    connection.query('SELECT * FROM alumno', (err, results) => {
        if (err) {
            res.status(500).json('Error al obtener los alumnos');
            throw err;
        }
        res.json(results);
    });
});

app.post('/POSTalumno', (req, res) => {
    const { nombres, apeMaterno, apePaterno, dni, fechaRegistro, fechaNacimiento, genero, direccion, telefono } = req.body;

    if (!nombres|| !apeMaterno || !apePaterno || !dni || !fechaRegistro || !fechaNacimiento || !genero || !direccion || !telefono) {
        return res.status(400).json('Todos los campos del alumno son requeridos.');
    }

    connection.query(
        'INSERT INTO Alumno (nombres, apeMaterno, apePaterno, dni, fechaRegistro, fechaNacimiento, genero, direccion, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nombres, apeMaterno, apePaterno, dni, fechaRegistro, fechaNacimiento, genero, direccion, telefono],
        (err, results) => {
            if (err) {
                res.status(500).json({ isSuccess: false, message:'Error al agregar el alumno'});
                throw err;
            }
            res.status(201).json({ isSuccess: true, message: `Alumno agregado exitosamente con ID: ${results.insertId}`});
        }
    );
});

app.get('/GETalumno/:idEstudiante', (req, res) => {
    const idEstudiante = req.params.idEstudiante;

    connection.query('SELECT * FROM alumno WHERE idEstudiante = ?', [idEstudiante], (err, results) => {
        if (err) {
            res.status(500).json('Error al obtener el alumno');
            throw err;
        }
        if (results.length === 0) {
            res.status(404).json('Alumno no encontrado');
        } else {
            res.json(results[0]);
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
            res.status(500).json({ isSuccess: false, message:'Error al actualizar el alumno'});
            throw err;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ isSuccess: false, message:'Alumno no encontrado'});
        } else {
            res.json({ isSuccess: true, message:'Alumno actualizado correctamente'});
        }
    });
});

app.delete('/DELETEalumno/:idEstudiante', (req, res) => {
    const idEstudiante = req.params.idEstudiante;

    const query = `DELETE FROM alumno WHERE idEstudiante = ?`;

    connection.query(query, [idEstudiante], (err, results) => {
        if (err) {
            res.status(500).json({ isSuccess: false, message:'Error al eliminar el alumno'});
            throw err;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ isSuccess: false, message:'Alumno no encontrado'});
        } else {
            res.json({ isSuccess: true, message:'Alumno eliminado correctamente'});
        }
    });
});

//MATRICULA
app.get('/GETmatriculas', (req, res) => {
    connection.query(`
            SELECT 
            m.idMatricula,
            CONCAT(a.gradoActual, '-', a.seccion, '-', a.nivel, ' | Actual:', mv.disponibilidadActual, ' | Total:', mv.disponibilidadTotal) as Vacancia, 
            CONCAT(e.nombres,' ', e.apePaterno,' ', e.apeMaterno) as Estudiante, 
            DATE_FORMAT(m.fechaRegistro, '%Y-%m-%d') as fechaRegistro,
            m.estado
            FROM matricula m 
            INNER JOIN matriculavacancia mv ON m.idMVacancia = mv.idMVacancia
            INNER JOIN alumno e ON m.idEstudiante = e.idEstudiante
            INNER JOIN aula a ON mv.idAula = a.idAula;`, (err, results) => {
        if (err) {
            res.status(500).json('Error al obtener las matriculas');
            throw err;
        }
        res.json(results);
    });
});

app.get('/GETmatricula/:idMatricula', (req, res) => {
    const idMatricula = req.params.idMatricula;

    connection.query('SELECT * FROM matricula WHERE idMatricula = ?', [idMatricula], (err, results) => {
        if (err) {
            res.status(500).json('Error al obtener la matricula');
            throw err;
        }
        if (results.length === 0) {
            res.status(404).json('Matrícula no encontrada');
        } else {
            res.json(results[0]);
        }
    });
});

app.post('/POSTmatricula', (req, res) => {
    const { idMVacancia, idEstudiante, fechaRegistro, estado } = req.body;

    if (!idMVacancia || !idEstudiante || !fechaRegistro || !estado) {
        return res.status(400).json('Todos los campos de la matricula son requeridos.');
    }

    connection.query(
        'INSERT INTO matricula (idMVacancia, idEstudiante, fechaRegistro, estado) VALUES (?, ?, ?, ?)',
        [idMVacancia, idEstudiante, fechaRegistro, estado],
        (err, results) => {
            if (err) {
                res.status(500).json('Error al agregar la matricula');
                throw err;
            }
            res.status(201).json({ isSuccess: true, message: `Matricula agregado exitosamente con ID: ${results.insertId}`});
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
            res.status(500).json('Error al actualizar la matricula');
            throw err;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Matricula no encontrada');
        } else {
            res.json('Matricula actualizada correctamente');
        }
    });
});

app.delete('/DELETEmatricula/:idMatricula', (req, res) => {
    const idMatricula = req.params.idMatricula;

    const query = `DELETE FROM matricula WHERE idMatricula = ?`;

    connection.query(query, [idMatricula], (err, results) => {
        if (err) {
            res.status(500).json('Error al eliminar la matricula');
            throw err;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Matricula no encontrada');
        } else {
            res.json('Matricula eliminada correctamente');
        }
    });
});

//MATRICULAVACANCIA
app.get('/GETmatriculaVacancias', (req, res) => {
    connection.query(`
            SELECT 
            m.idMVacancia,
            CONCAT(a.gradoActual, ' - ', a.seccion, ' - ', a.nivel) as nombreAula, 
            m.disponibilidadActual,
            m.disponibilidadTotal
            FROM matriculaVacancia m 
            INNER JOIN aula a ON m.idAula = a.idAula`, (err, results) => {
        if (err) {
            res.status(500).json('Error al obtener los vacantes');
            throw err;
        }
        res.json(results);
    });
});

app.get('/GETmatriculaVacancia/:idMVacancia', (req, res) => {
    const idMVacancia = req.params.idMVacancia;

    connection.query('SELECT * FROM matriculaVacancia WHERE idMVacancia = ?', [idMVacancia], (err, results) => {
        if (err) {
            res.status(500).json('Error al obtener la matricula vacante');
            throw err;
        }
        if (results.length === 0) {
            res.status(404).json('Vacancia no encontrada');
        } else {
            res.json(results[0]);
        }
    });
});

app.post('/POSTmatriculaVacancia', (req, res) => {
    const { idAula, disponibilidadActual, disponibilidadTotal } = req.body;

    if (!idAula || !disponibilidadTotal) {
        return res.status(400).json('Todos los campos de la vacancia son requeridos.');
    }

    connection.query(
        'INSERT INTO matriculaVacancia (idAula, disponibilidadActual, disponibilidadTotal) VALUES (?, ?, ?)',
        [idAula, disponibilidadActual, disponibilidadTotal],
        (err, results) => {
            if (err) {
                res.status(500).json('Error al agregar la vacancia');
                throw err;
            }
            res.status(201).json({ isSuccess: true, message: `Vacancia agregada exitosamente con ID: ${results.insertId}`});
        }
    );
});

app.put('/PUTmatriculaVacancia/:idMVacancia', (req, res) => {
    const idMVacancia = req.params.idMVacancia;
    const { idAula, disponibilidadActual, disponibilidadTotal } = req.body;

    if (!idAula || !disponibilidadTotal) {
        return res.status(400).json('Todos los campos son requeridos para actualizar la vacancia.');
    }

    const query = `UPDATE matriculaVacancia SET 
                   idAula = ?, 
                   disponibilidadActual = ?, 
                   disponibilidadTotal = ?
                   WHERE idMVacancia = ?`;

    connection.query(query, [idAula, disponibilidadActual, disponibilidadTotal, idMVacancia], (err, results) => {
        if (err) {
            res.status(500).json('Error al actualizar la vacancia');
            throw err;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Vacancia no encontrada');
        } else {
            res.json('Vacancia actualizada correctamente');
        }
    });
});

app.delete('/DELETEmatriculaVacancia/:idMVacancia', (req, res) => {
    const idMVacancia = req.params.idMVacancia;

    const query = `DELETE FROM matriculaVacancia WHERE idMVacancia = ?`;

    connection.query(query, [idMVacancia], (err, results) => {
        if (err) {
            res.status(500).json('Error al eliminar la vacancia');
            throw err;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Vacancia no encontrada');
        } else {
            res.json('Vacancia eliminada correctamente');
        }
    });
});

//APODERADO
app.get('/GETapoderados', (req, res) => {
    connection.query('SELECT * FROM Apoderado', (err, results) => {
        if (err) {
            res.status(500).json('Error al obtener los apoderados');
            throw err;
        }
        res.json(results);
    });
});

app.get('/GETapoderado/:idApoderado', (req, res) => {
    const idApoderado = req.params.idApoderado;

    connection.query('SELECT * FROM Apoderado where idApoderado = ?', [idApoderado], (err, results) => {
        if (err) {
            res.status(500).json('Error al obtener la relación de apoderado');
            throw err;
        }
        if (results.length === 0) {
            res.status(404).json('Relación de apoderado no encontrada');
        } else {
        res.json(results[0]);
        }
    });
});

app.post('/POSTapoderado', (req, res) => {
    const { nombres, apellidoP, apellidoM, dni, telefono, direccion } = req.body;

    if (!nombres || !apellidoP || !apellidoM || !dni || !telefono || !direccion) {
        return res.status(400).json('Todos los campos son requeridos');
    }

    connection.query('INSERT INTO Apoderado (nombres, apellidoP, apellidoM, dni, telefono, direccion) VALUES (?, ?, ?, ?, ?, ?)', 
    [nombres, apellidoP, apellidoM, dni, telefono, direccion], 
    (err, results) => {
        if (err) {
            res.status(500).json('Error al agregar el apoderado');
            throw err;
        }
        res.status(201).json({ isSuccess: true, message: `Apoderado agregado con ID: ${results.insertId}`});
    });
});

app.put('/PUTapoderado/:idApoderado', (req, res) => {
    const idApoderado = req.params.idApoderado;
    const { nombres, apellidoP, apellidoM, dni, telefono, direccion } = req.body;

    connection.query('UPDATE Apoderado SET nombres = ?, apellidoP = ?, apellidoM = ?, dni = ?, telefono = ?, direccion = ? WHERE idApoderado = ?',
    [nombres, apellidoP, apellidoM, dni, telefono, direccion, idApoderado], 
    (err, results) => {
        if (err) {
            res.status(500).json('Error al actualizar el apoderado');
            throw err;
        }
        res.json('Apoderado actualizado correctamente');
    });
});

app.delete('/DELETEapoderado/:idApoderado', (req, res) => {
    const idApoderado = req.params.idApoderado;

    connection.query('DELETE FROM Apoderado WHERE idApoderado = ?', [idApoderado], (err, results) => {
        if (err) {
            res.status(500).json('Error al eliminar el apoderado');
            throw err;
        }
        res.json('Apoderado eliminado correctamente');
    });
});

//RELACION APODERADO
app.get('/GETrelacionApoderados', (req, res) => {
    connection.query(`
            SELECT 
            r.idRelacionApoderado,
            CONCAT(e.nombres,' ', e.apePaterno,' ', e.apeMaterno) as Estudiante, 
            CONCAT(a.nombres,' ', a.apellidoP,' ',a.apellidoM)as Apoderado,
            r.tipoRelacion
            FROM relacionapoderado r
            INNER JOIN alumno e ON r.idEstudiante = e.idEstudiante
            INNER JOIN apoderado a ON r.idApoderado = a.idApoderado`,
            (err, results) => {
        if (err) {
            res.status(500).json('Error al obtener las relaciones de apoderado');
            throw err;
        }
        res.json(results);
    });
});

app.get('/GETrelacionApoderado/:idRelacionApoderado', (req, res) => {
    const idRelacionApoderado = req.params.idRelacionApoderado;

    connection.query('SELECT * FROM RelacionApoderado WHERE idRelacionApoderado = ?', [idRelacionApoderado], (err, results) => {
        if (err) {
            res.status(500).json('Error al obtener la relación de apoderado');
            throw err;
        }
        if (results.length === 0) {
            res.status(404).json('Relación de apoderado no encontrada');
        } else {
            res.json(results[0]);
        }
    });
});

app.post('/POSTrelacionApoderado', (req, res) => {
    const { idEstudiante, idApoderado, tipoRelacion } = req.body;

    if (!idEstudiante || !idApoderado || !tipoRelacion) {
        return res.status(400).json('Todos los campos son requeridos');
    }

    connection.query('INSERT INTO RelacionApoderado (idEstudiante, idApoderado, tipoRelacion) VALUES (?, ?, ?)', 
    [idEstudiante, idApoderado, tipoRelacion], 
    (err, results) => {
        if (err) {
            res.status(500).json('Error al agregar la relación de apoderado');
            throw err;
        }
        res.status(201).json({ isSuccess: true, message: `Relación de apoderado agregada con ID: ${results.insertId}`});
    });
});

app.put('/PUTrelacionApoderado/:idRelacionApoderado', (req, res) => {
    const idRelacionApoderado = req.params.idRelacionApoderado;
    const { idEstudiante, idApoderado, tipoRelacion } = req.body;

    connection.query('UPDATE RelacionApoderado SET idEstudiante = ?, idApoderado = ?, tipoRelacion = ? WHERE idRelacionApoderado = ?',
    [idEstudiante, idApoderado, tipoRelacion, idRelacionApoderado], 
    (err, results) => {
        if (err) {
            res.status(500).json('Error al actualizar la relación de apoderado');
            throw err;
        }
        res.json('Relación de apoderado actualizada correctamente');
    });
});

app.delete('/DELETErelacionApoderado/:idRelacionApoderado', (req, res) => {
    const idRelacionApoderado = req.params.idRelacionApoderado;

    connection.query('DELETE FROM RelacionApoderado WHERE idRelacionApoderado = ?', [idRelacionApoderado], (err, results) => {
        if (err) {
            res.status(500).json('Error al eliminar la relación de apoderado');
            throw err;
        }
        res.json('Relación de apoderado eliminada correctamente');
    });
});
//pagos
app.get('/GETpagos', (req, res) => {
    connection.query('SELECT * FROM Pago', (err, results) => {
        if (err) {
            res.status(500).json('Error al obtener los pagos');
            throw err;
        }
        res.json(results);
    });
});

app.get('/GETpago/:idPago', (req, res) => {
    const idPago = req.params.idPago;

    connection.query('SELECT * FROM Pago WHERE idPago = ?', [idPago], (err, results) => {
        if (err) {
            res.status(500).json('Error al obtener el pago');
            throw err;
        }
        if (results.length === 0) {
            res.status(404).json('Pago no encontrado');
        } else {
            res.json(results[0]);
        }
    });
});

app.post('/POSTpago', (req, res) => {
    const { idEstudiante, idComprobante, monto, tipoPago, estado } = req.body;

    if (!idEstudiante || !monto|| !estado) {
        return res.status(400).json('Todos los campos son requeridos');
    }

    connection.query('INSERT INTO Pago (idEstudiante, idComprobante, monto, tipoPago, estado) VALUES (?, ?, ?, ?, ?)', 
    [idEstudiante, idComprobante, monto, tipoPago, estado], 
    (err, results) => {
        if (err) {
            res.status(500).json('Error al agregar el pago');
            throw err;
        }
        res.status(201).json({ isSuccess: true, message: `Pago agregado con ID: ${results.insertId}`});
    });
});

app.put('/PUTpago/:idPago', (req, res) => {
    const idPago = req.params.idPago;
    const { idEstudiante, idComprobante, monto, tipoPago, estado } = req.body;

    connection.query('UPDATE Pago SET idEstudiante = ?, idComprobante = ?, monto = ?, tipoPago = ?, estado = ? WHERE idPago = ?',
    [idEstudiante, idComprobante, monto, tipoPago, estado, idPago], 
    (err, results) => {
        if (err) {
            res.status(500).json('Error al actualizar el pago');
            throw err;
        }
        res.json('Pago actualizado correctamente');
    });
});

app.delete('/DELETEpago/:idPago', (req, res) => {
    const idPago = req.params.idPago;

    connection.query('DELETE FROM Pago WHERE idPago = ?', [idPago], (err, results) => {
        if (err) {
            res.status(500).json('Error al eliminar el pago');
            throw err;
        }
        res.json('Pago eliminado correctamente');
    });
});

app.get('/GETcomprobantePagos', (req, res) => {
    connection.query('SELECT * FROM ComprobantePago', (err, results) => {
        if (err) {
            res.status(500).json('Error al obtener los comprobantes de pago');
            throw err;
        }
        res.json(results);
    });
});

app.get('/GETcomprobantePago/:idComprobante', (req, res) => {
    const idComprobante = req.params.idComprobante;

    connection.query('SELECT * FROM ComprobantePago WHERE idComprobante = ?', [idComprobante], (err, results) => {
        if (err) {
            res.status(500).json('Error al obtener el comprobante de pago');
            throw err;
        }
        if (results.length === 0) {
            res.status(404).json('Comprobante de pago no encontrado');
        } else {
            res.json(results[0]);
        }
    });
});

app.post('/POSTcomprobantePago', (req, res) => {
    const { fechaEmision, detalles } = req.body;

    if (!fechaEmision || !detalles) {
        return res.status(400).json('Todos los campos son requeridos');
    }

    connection.query('INSERT INTO ComprobantePago (fechaEmision, detalles) VALUES (?, ?)', 
    [fechaEmision, detalles], 
    (err, results) => {
        if (err) {
            res.status(500).json('Error al agregar el comprobante de pago');
            throw err;
        }
        res.status(201).json({ isSuccess: true, message: `Comprobante de pago agregado con ID: ${results.insertId}`});
    });
});

app.put('/PUTcomprobantePago/:idComprobante', (req, res) => {
    const idComprobante = req.params.idComprobante;
    const { fechaEmision, detalles } = req.body;

    connection.query('UPDATE ComprobantePago SET fechaEmision = ?, detalles = ? WHERE idComprobante = ?',
    [fechaEmision, detalles, idComprobante], 
    (err, results) => {
        if (err) {
            res.status(500).json('Error al actualizar el comprobante de pago');
            throw err;
        }
        res.json('Comprobante de pago actualizado correctamente');
    });
});

app.delete('/DELETEcomprobantePago/:idComprobante', (req, res) => {
    const idComprobante = req.params.idComprobante;

    connection.query('DELETE FROM ComprobantePago WHERE idComprobante = ?', [idComprobante], (err, results) => {
        if (err) {
            res.status(500).json('Error al eliminar el comprobante de pago');
            throw err;
        }
        res.json('Comprobante de pago eliminado correctamente');
    });
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
