-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 19-10-2016 a las 15:51:41
-- Versión del servidor: 5.6.28
-- Versión de PHP: 7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `birds`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `avistamientos`
--

CREATE TABLE `avistamientos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(254) COLLATE utf8_unicode_ci NOT NULL,
  `pajaro` varchar(254) COLLATE utf8_unicode_ci NOT NULL,
  `lastview` date NOT NULL,
  `veces` int(11) NOT NULL,
  `latitud` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `longitud` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `avistamientos`
--

INSERT INTO `avistamientos` (`id`, `titulo`, `pajaro`, `lastview`, `veces`, `latitud`, `longitud`) VALUES
(1, 'Parque Castrelos', 'Mirlo', '2016-10-18', 3, '42.2144416', '-8.7300677'),
(2, 'Lagares medio', 'Lechuza', '2016-10-17', 1, '42.2023782', '-8.7592716'),
(3, 'Lagares medio', 'Martín pescador', '2016-10-13', 2, '42.2011860', '-8.7683697'),
(4, 'Desembocadura Lagares', 'Garceta común', '2016-10-16', 5, '42.2014244', '-8.7784762'),
(5, 'Lagares desembocadura', 'Garceta común', '2016-10-13', 24, '42.2031253', '-8.7789054');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `avistamientos`
--
ALTER TABLE `avistamientos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `avistamientos`
--
ALTER TABLE `avistamientos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
