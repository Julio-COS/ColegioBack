-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-09-2024 a las 22:27:19
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
(6, 'das', 'dsa', 'dsa', 'dsa', '2024-09-10', '2024-09-10', 'dsa', 'dsa', 'dsa'),
(7, 'z', 'c', 'x', 'q', '2024-09-10', '2024-09-10', 'q', '321', 'q'),
(8, 'a', 'a', 'a', 'a', '2024-09-10', '2024-09-10', 'a', 'a', 'a'),
(9, 'z', 'z', 'z', 'z', '2024-09-10', '2024-09-10', 'z', 'zzz', 'z'),
(10, 'Y', 'z', 'z', 'z', '2024-09-10', '2024-09-10', 'z', 'zzz', 'z');

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
(1, '2', '1', '3'),
(2, 'x', 'z', 'd'),
(3, 'B', 'A', 'C'),
(4, 'G', 'F', 'H'),
(5, 'T', 'R', 'S'),
(6, 'z', 'z', 'z');

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
(1, 'Matematica', 'Curso de Aritmética y Algebra');

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
(1, 'julio', 'ord', 'sal', 'a', 'asdfg', '2', '70413135', '2024-09-09');

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
(2, 1, 1, 2, '2024-09-10', '2024-09-10', '15:30', '18:00'),
(3, 1, 1, 2, '2024-09-10', '2024-09-10', '15:30', '18:30'),
(4, 1, 1, 2, '2024-09-10', '2024-09-10', '15:30', '18:00');

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
(1, 1, 1, '2024-09-10', 'ok'),
(2, 2, 1, '2024-09-10', 'ok'),
(3, 1, 2, '2024-09-10', 'ok');

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
(1, 1, 0, 30),
(2, 2, 0, 30),
(3, 1, 0, 30),
(4, 1, 0, 30),
(5, 1, 0, 30),
(6, 5, 0, 50),
(7, 3, 0, 25);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellido`) VALUES
(1, 'Julio', 'Ordoñez'),
(2, 'Cesar', 'Salvador');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD PRIMARY KEY (`idEstudiante`);

--
-- Indices de la tabla `aula`
--
ALTER TABLE `aula`
  ADD PRIMARY KEY (`idAula`);

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
  MODIFY `idEstudiante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `aula`
--
ALTER TABLE `aula`
  MODIFY `idAula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `idCurso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `docente`
--
ALTER TABLE `docente`
  MODIFY `idDocente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `horario`
--
ALTER TABLE `horario`
  MODIFY `idHorario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `matricula`
--
ALTER TABLE `matricula`
  MODIFY `idMatricula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `matriculavacancia`
--
ALTER TABLE `matriculavacancia`
  MODIFY `idMVacancia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
