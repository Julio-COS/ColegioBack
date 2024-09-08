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

app.get('/Getusuario', (req, res) => {
    connection.query('SELECT * FROM usuario', (err, results) => {
        if (err) throw err;  // Maneja el error si ocurre
        res.send(results);
    });
});

//DOCENTE 
app.get('/Getdocentes', (req, res) => {
    connection.query('SELECT * FROM docente', (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener los docentes');
            throw err;
        }
        res.send(results);
    });
});

//AULA
app.get('/Getaulas', (req, res) => {
    connection.query('SELECT * FROM aula', (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener las aulas');
            throw err;
        }
        res.send(results);
    });
});

//CURSO
app.get('/Getcursos', (req, res) => {
    connection.query('SELECT * FROM curso', (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener los cursos');
            throw err;
        }
        res.send(results);
    });
});

//HORARIO
app.get('/Gethorarios', (req, res) => {
    connection.query('SELECT * FROM horario', (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener los horarios');
            throw err;
        }
        res.send(results);
    });
});


// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
