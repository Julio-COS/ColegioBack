-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-11-2024 a las 22:20:18
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbcolegiopin`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

CREATE TABLE `alumno` (
  `idEstudiante` int(11) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apeMaterno` varchar(100) NOT NULL,
  `apePaterno` varchar(100) NOT NULL,
  `dni` varchar(8) NOT NULL,
  `fechaRegistro` date NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `genero` varchar(8) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `telefono` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumno`
--

INSERT INTO `alumno` (`idEstudiante`, `nombres`, `apeMaterno`, `apePaterno`, `dni`, `fechaRegistro`, `fechaNacimiento`, `genero`, `direccion`, `telefono`) VALUES
(1, 'cesar', 'sal', 'or', '74042', '2024-09-10', '2004-04-09', 'M', 'test', '963196271'),
(2, 'julio', 'torres', 'ord', '70413', '2024-09-10', '2024-09-10', 'M', 'test', '70413135'),
(3, 'julio', 'sal', 'ord', '70413', '2024-09-10', '2024-09-10', 'M', 'testing', '963196271'),
(4, 'julio', 'sal', 'ord', '70413', '2024-09-10', '2024-09-10', 'M', 'testing', '963196271'),
(5, 'roy', 's', 'x', '70000', '2024-09-10', '2024-09-10', 'M', 'test2', '333'),
(6, 'das', 'dsa', 'dsa', 'dsa', '2024-09-10', '2024-09-10', 'M', 'dsa', 'dsa'),
(7, 'z', 'c', 'x', 'q', '2024-09-10', '2024-09-10', 'q', '321', 'q'),
(8, 'a', 'a', 'a', 'a', '2024-09-10', '2024-09-10', 'a', 'a', 'a'),
(11, 'Genesis', 'a', 'a', 'a', '2024-09-27', '2024-09-27', 'F', 'dsadsa', 'a'),
(24, 'Esthefano', 'dsa', 'das', '87978978', '2024-10-09', '2004-04-09', 'F', 'dsa', '999999999'),
(25, 'Paco', 'Salvador', 'Salvador', '70413135', '2024-10-12', '2004-04-09', 'M', 'Los Olivos', '999999987'),
(26, 'cesar', 'sal', 'or', '78889999', '2024-11-03', '2025-01-26', 'F', 'test', '963196271');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apoderado`
--

CREATE TABLE `apoderado` (
  `idApoderado` int(11) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidoP` varchar(100) NOT NULL,
  `apellidoM` varchar(100) NOT NULL,
  `dni` varchar(8) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `direccion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `apoderado`
--

INSERT INTO `apoderado` (`idApoderado`, `nombres`, `apellidoP`, `apellidoM`, `dni`, `telefono`, `direccion`) VALUES
(1, 'aa', 'a', 'a', '70413122', '999999999', 'aa'),
(2, 'Paco', 'dsadsa', 'dsadas', '78797898', '999999999', 'a');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aula`
--

CREATE TABLE `aula` (
  `idAula` int(11) NOT NULL,
  `seccion` varchar(50) NOT NULL,
  `nivel` varchar(50) NOT NULL,
  `gradoActual` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `aula`
--

INSERT INTO `aula` (`idAula`, `seccion`, `nivel`, `gradoActual`) VALUES
(1, 'B', 'Secundaria', '3'),
(2, 'A', 'Primaria', '3'),
(3, 'B', 'Primaria', '2'),
(4, 'G', 'Secundaria', 'H'),
(5, 'T', 'Primaria', 'S');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comprobantepago`
--

CREATE TABLE `comprobantepago` (
  `idComprobante` int(11) NOT NULL,
  `fechaEmision` date DEFAULT NULL,
  `detalles` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comprobantepago`
--

INSERT INTO `comprobantepago` (`idComprobante`, `fechaEmision`, `detalles`) VALUES
(3, '2024-10-01', 'Número de Comprobante: 0\n     Fecha de Emisión: 2024-10-01\n     Tipo de Pago: tarjeta'),
(4, '2024-10-01', 'Número de Comprobante: 0\n     Fecha de Emisión: 2024-10-01\n     Tipo de Pago: efectivo'),
(5, '2024-10-01', 'Número de Comprobante: 0\n     Fecha de Emisión: 2024-10-01\n     Tipo de Pago: efectivo'),
(6, '2024-10-01', 'Número de Comprobante: 0\n     Fecha de Emisión: 2024-10-01\n     Tipo de Pago: tarjeta'),
(7, '2024-10-01', 'Número de Comprobante: 0\n     Fecha de Emisión: 2024-10-01\n     Tipo de Pago: tarjeta'),
(8, '2024-10-09', 'Número de Comprobante: 0\n     Fecha de Emisión: 2024-10-09\n     Tipo de Pago: tarjeta'),
(9, '2024-10-09', 'Número de Comprobante: 0\n     Fecha de Emisión: 2024-10-09\n     Tipo de Pago: tarjeta'),
(10, '2024-11-04', '\n     Fecha de Emisión: 2024-11-04\n     Tipo de Pago: null\n    '),
(11, '2024-11-04', '\n     Fecha de Emisión: 2024-11-04\n     Tipo de Pago: null\n    '),
(12, '2024-11-04', '\n     Fecha de Emisión: 2024-11-04\n     Tipo de Pago: tarjeta\n    '),
(13, '2024-11-04', '\n     Fecha de Emisión: 2024-11-04\n     Tipo de Pago: efectivo\n    '),
(14, '2024-11-04', '\n     Fecha de Emisión: 2024-11-04\n     Tipo de Pago: tarjeta\n    '),
(15, '2024-11-04', '\n     Fecha de Emisión: 2024-11-04\n     Tipo de Pago: tarjeta\n    '),
(16, '2024-11-04', '\n     Fecha de Emisión: 2024-11-04\n     Tipo de Pago: tarjeta\n    '),
(17, '2024-11-04', '\n     Fecha de Emisión: 2024-11-04\n     Tipo de Pago: tarjeta\n    '),
(18, '2024-11-04', '\n     Fecha de Emisión: 2024-11-04\n     Tipo de Pago: tarjeta\n    '),
(19, '2024-11-04', '\n     Fecha de Emisión: 2024-11-04\n     Tipo de Pago: tarjeta\n    ');

--
-- Disparadores `comprobantepago`
--
DELIMITER $$
CREATE TRIGGER `after_comprobante_insert` AFTER INSERT ON `comprobantepago` FOR EACH ROW BEGIN
    UPDATE Pago
    SET idComprobante = NEW.idComprobante, estado = 'completado'
    WHERE idPago = (SELECT MAX(idPago) FROM Pago WHERE idComprobante IS NULL);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `idCurso` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`idCurso`, `nombre`, `descripcion`) VALUES
(1, 'Matematica', 'Curso de Aritmética y Algebra'),
(4, 'Comunicación', 'Estudia'),
(5, 'Religion', 'a'),
(6, 'EF', 'b'),
(7, 'CTA', 'Ciencias'),
(10, 'HGE', ' Historia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docente`
--

CREATE TABLE `docente` (
  `idDocente` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidoPaterno` varchar(100) NOT NULL,
  `apellidoMaterno` varchar(100) NOT NULL,
  `ciudad` varchar(100) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `tipoCargo` varchar(50) NOT NULL,
  `dni` varchar(8) NOT NULL,
  `fechaRegistro` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `docente`
--

INSERT INTO `docente` (`idDocente`, `nombre`, `apellidoPaterno`, `apellidoMaterno`, `ciudad`, `direccion`, `tipoCargo`, `dni`, `fechaRegistro`) VALUES
(1, 'julio', 'ord', 'sal', 'Lima', 'asdfg', '2', '70413135', '2024-09-09'),
(2, 'Fabian', 'test', 'test', 'Lima', 'aaaaa', 'Docente', '12345678', '2024-10-12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

CREATE TABLE `horario` (
  `idHorario` int(11) NOT NULL,
  `idCurso` int(11) NOT NULL,
  `idDocente` int(11) NOT NULL,
  `idAula` int(11) NOT NULL,
  `Fecha_inicio` date NOT NULL,
  `Fecha_final` date NOT NULL,
  `hora_inicio` varchar(50) NOT NULL,
  `hora_final` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `horario`
--

INSERT INTO `horario` (`idHorario`, `idCurso`, `idDocente`, `idAula`, `Fecha_inicio`, `Fecha_final`, `hora_inicio`, `hora_final`) VALUES
(1, 1, 1, 1, '2024-09-10', '2024-09-10', '12:20', '13:10'),
(3, 1, 1, 2, '2024-09-10', '2024-09-10', '15:30', '18:40'),
(4, 1, 1, 2, '2024-09-10', '2024-09-10', '15:30', '18:00'),
(5, 5, 1, 5, '2024-09-25', '2024-09-25', '15:30', '18:30'),
(6, 1, 2, 2, '2024-10-30', '2024-11-21', '04:35', '07:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matricula`
--

CREATE TABLE `matricula` (
  `idMatricula` int(11) NOT NULL,
  `idMVacancia` int(11) NOT NULL,
  `idEstudiante` int(11) NOT NULL,
  `fechaRegistro` date DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `matricula`
--

INSERT INTO `matricula` (`idMatricula`, `idMVacancia`, `idEstudiante`, `fechaRegistro`, `estado`) VALUES
(1, 1, 8, '2024-09-10', 'ok'),
(3, 1, 2, '2024-09-10', 'ok'),
(4, 1, 3, '2024-09-11', 'ok'),
(7, 1, 1, '2024-09-28', 'ok'),
(8, 1, 1, '2024-09-29', 'adas'),
(9, 4, 4, '2024-10-01', 'ok'),
(10, 6, 5, '2024-10-01', 'OK'),
(11, 1, 8, '2024-10-01', 'ok'),
(12, 2, 11, '2024-10-09', 'ok'),
(13, 1, 25, '2024-10-12', 'pendiente');

--
-- Disparadores `matricula`
--
DELIMITER $$
CREATE TRIGGER `decrementar_disponibilidadActual` AFTER DELETE ON `matricula` FOR EACH ROW BEGIN
  UPDATE matriculavacancia 
  SET matriculavacancia.disponibilidadActual = 
  matriculavacancia.disponibilidadActual - 1
  WHERE idMVacancia = OLD.idMVacancia;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `incrementar_idMVacancia` BEFORE INSERT ON `matricula` FOR EACH ROW BEGIN
  UPDATE matriculavacancia 
  SET matriculavacancia.disponibilidadActual = 
  matriculavacancia.disponibilidadActual + 1
  WHERE idMVacancia = NEW.idMVacancia;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `insertarPago` AFTER INSERT ON `matricula` FOR EACH ROW INSERT INTO pago (idEstudiante,idComprobante,monto, tipoPago, estado) VALUES (NEW.idEstudiante, NULL, 200.00, NULL, "pendiente")
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matriculavacancia`
--

CREATE TABLE `matriculavacancia` (
  `idMVacancia` int(11) NOT NULL,
  `idAula` int(11) NOT NULL,
  `disponibilidadActual` int(11) DEFAULT NULL,
  `disponibilidadTotal` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `matriculavacancia`
--

INSERT INTO `matriculavacancia` (`idMVacancia`, `idAula`, `disponibilidadActual`, `disponibilidadTotal`) VALUES
(1, 1, 4, 30),
(2, 2, 0, 30),
(4, 5, 1, 30),
(6, 4, 1, 40),
(8, 3, 0, 60);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `idPago` int(11) NOT NULL,
  `idEstudiante` int(11) NOT NULL,
  `idComprobante` int(11) DEFAULT NULL,
  `monto` int(100) DEFAULT NULL,
  `tipoPago` varchar(100) DEFAULT NULL,
  `estado` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pago`
--

INSERT INTO `pago` (`idPago`, `idEstudiante`, `idComprobante`, `monto`, `tipoPago`, `estado`) VALUES
(3, 1, 3, 200, 'tarjeta', 'completado'),
(4, 4, 4, 200, 'efectivo', 'completado'),
(5, 5, 5, 200, 'efectivo', 'completado'),
(6, 8, 7, 200, 'tarjeta', 'completado'),
(7, 11, 8, 200, 'tarjeta', 'completado'),
(8, 1, 10, 200, 'tarjeta', 'completado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `relacionapoderado`
--

CREATE TABLE `relacionapoderado` (
  `idRelacionApoderado` int(11) NOT NULL,
  `idEstudiante` int(11) NOT NULL,
  `idApoderado` int(11) NOT NULL,
  `tipoRelacion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `relacionapoderado`
--

INSERT INTO `relacionapoderado` (`idRelacionApoderado`, `idEstudiante`, `idApoderado`, `tipoRelacion`) VALUES
(1, 3, 1, 'Padre'),
(4, 1, 2, 'Abuelo'),
(5, 5, 2, 'Hermana'),
(6, 24, 1, 'PERSONA QUE ASUME ACOGIMIENTO FAMILIAR');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `usuario` varchar(50) DEFAULT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `usuario`, `password`) VALUES
(1, 'Julio', 'paco'),
(2, 'Cesar', '12345');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD PRIMARY KEY (`idEstudiante`);

--
-- Indices de la tabla `apoderado`
--
ALTER TABLE `apoderado`
  ADD PRIMARY KEY (`idApoderado`);

--
-- Indices de la tabla `aula`
--
ALTER TABLE `aula`
  ADD PRIMARY KEY (`idAula`);

--
-- Indices de la tabla `comprobantepago`
--
ALTER TABLE `comprobantepago`
  ADD PRIMARY KEY (`idComprobante`);

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`idCurso`);

--
-- Indices de la tabla `docente`
--
ALTER TABLE `docente`
  ADD PRIMARY KEY (`idDocente`),
  ADD UNIQUE KEY `dni` (`dni`);

--
-- Indices de la tabla `horario`
--
ALTER TABLE `horario`
  ADD PRIMARY KEY (`idHorario`),
  ADD KEY `idCurso` (`idCurso`),
  ADD KEY `idDocente` (`idDocente`),
  ADD KEY `idAula` (`idAula`);

--
-- Indices de la tabla `matricula`
--
ALTER TABLE `matricula`
  ADD PRIMARY KEY (`idMatricula`),
  ADD KEY `idMVacancia` (`idMVacancia`),
  ADD KEY `idEstudiante` (`idEstudiante`);

--
-- Indices de la tabla `matriculavacancia`
--
ALTER TABLE `matriculavacancia`
  ADD PRIMARY KEY (`idMVacancia`),
  ADD KEY `idAula` (`idAula`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`idPago`),
  ADD KEY `idComprobante` (`idComprobante`),
  ADD KEY `idEstudiante` (`idEstudiante`);

--
-- Indices de la tabla `relacionapoderado`
--
ALTER TABLE `relacionapoderado`
  ADD PRIMARY KEY (`idRelacionApoderado`),
  ADD KEY `idEstudiante` (`idEstudiante`),
  ADD KEY `idApoderado` (`idApoderado`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumno`
--
ALTER TABLE `alumno`
  MODIFY `idEstudiante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `apoderado`
--
ALTER TABLE `apoderado`
  MODIFY `idApoderado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `aula`
--
ALTER TABLE `aula`
  MODIFY `idAula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `comprobantepago`
--
ALTER TABLE `comprobantepago`
  MODIFY `idComprobante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `idCurso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `docente`
--
ALTER TABLE `docente`
  MODIFY `idDocente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `horario`
--
ALTER TABLE `horario`
  MODIFY `idHorario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `matricula`
--
ALTER TABLE `matricula`
  MODIFY `idMatricula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `matriculavacancia`
--
ALTER TABLE `matriculavacancia`
  MODIFY `idMVacancia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `idPago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `relacionapoderado`
--
ALTER TABLE `relacionapoderado`
  MODIFY `idRelacionApoderado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `horario`
--
ALTER TABLE `horario`
  ADD CONSTRAINT `horario_ibfk_1` FOREIGN KEY (`idCurso`) REFERENCES `curso` (`idCurso`),
  ADD CONSTRAINT `horario_ibfk_2` FOREIGN KEY (`idDocente`) REFERENCES `docente` (`idDocente`),
  ADD CONSTRAINT `horario_ibfk_3` FOREIGN KEY (`idAula`) REFERENCES `aula` (`idAula`);

--
-- Filtros para la tabla `matricula`
--
ALTER TABLE `matricula`
  ADD CONSTRAINT `matricula_ibfk_1` FOREIGN KEY (`idMVacancia`) REFERENCES `matriculavacancia` (`idMVacancia`),
  ADD CONSTRAINT `matricula_ibfk_2` FOREIGN KEY (`idEstudiante`) REFERENCES `alumno` (`idEstudiante`);

--
-- Filtros para la tabla `matriculavacancia`
--
ALTER TABLE `matriculavacancia`
  ADD CONSTRAINT `matriculavacancia_ibfk_1` FOREIGN KEY (`idAula`) REFERENCES `aula` (`idAula`);

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`idComprobante`) REFERENCES `comprobantepago` (`idComprobante`),
  ADD CONSTRAINT `pago_ibfk_2` FOREIGN KEY (`idEstudiante`) REFERENCES `alumno` (`idEstudiante`);

--
-- Filtros para la tabla `relacionapoderado`
--
ALTER TABLE `relacionapoderado`
  ADD CONSTRAINT `relacionapoderado_ibfk_1` FOREIGN KEY (`idEstudiante`) REFERENCES `alumno` (`idEstudiante`),
  ADD CONSTRAINT `relacionapoderado_ibfk_2` FOREIGN KEY (`idApoderado`) REFERENCES `apoderado` (`idApoderado`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
