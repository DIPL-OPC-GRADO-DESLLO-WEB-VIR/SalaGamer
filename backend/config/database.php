<?php
// Archivo: config/database.php

// $dbHost = $_ENV['DB_HOST'];
// $dbPort = $_ENV['DB_PORT'];
// $dbName = $_ENV['DB_NAME'];
// $dbUser = $_ENV['DB_USER'];
// $dbPass = $_ENV['DB_PASS'];




$dbHost = 'database';
$dbPort = '3306';
$dbName = 'sala_gamer';
$dbUser = 'mysql_user';
$dbPass = 'mysql_password';
$connection = new mysqli($dbHost, $dbUser, $dbPass, $dbName);

if ($connection->connect_error) {
    die("Error de conexión: " . $connection->connect_error);
}

$connection->set_charset('utf8');
