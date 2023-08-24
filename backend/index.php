<?php
require_once './config/database.php';
require_once './controllers/ApiController.php';
require_once './controllers/PlayerTimeController.php';
require_once './controllers/AwardsController.php';
require_once './controllers/Player_x_awardsController.php';

$connection = $connection; // Variable de la conexión que está en "config/database.php"
$controller = new ApiController($connection);
$player_time_controller = new PlayerTimeController($connection);
$awards_controller = new AwardsController($connection);
$player_x_awardsController = new Player_x_awardsController($connection);
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");

// Permitir solicitudes con métodos específicos (GET, POST, etc.)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

// Permitir encabezados personalizados (si es necesario)
header("Access-Control-Allow-Headers: Authorization, Content-Type");

// Permitir que las cookies se incluyan en las solicitudes (si es necesario)
header("Access-Control-Allow-Credentials: true");

// Otros encabezados CORS opcionales
header("Access-Control-Max-Age: 86400"); // Caché preflight por 1 día
// Verificar si es una solicitud OPTIONS y responder con éxito
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Resto del códig

$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];
switch ($requestMethod) {
    case 'GET':
        $requestUri_array = explode("?", $requestUri);
        if ($requestUri_array[0] === '/api/users') {
            // Obtener los parámetros enviados a través de la URL
            $queryParams = array();
            if (strpos($requestUri, '?') !== false) {
                $queryString = parse_url($requestUri, PHP_URL_QUERY);
                parse_str($queryString, $queryParams);
            }
            $controller->getAllData();
        }
        if ($requestUri_array[0] === '/api/player_time') {
            $player_time_controller->getAllData();
        }
        if ($requestUri_array[0] === '/api/wards') {
            $awards_controller->getAllData();
        }
        if ($requestUri_array[0] === '/api/wards_filter') {
            // Obtener los parámetros enviados a través de la URL
            $queryParams = array();
            if (strpos($requestUri, '?') !== false) {
                $queryString = parse_url($requestUri, PHP_URL_QUERY);
                parse_str($queryString, $queryParams);
            }
            $awards_controller->getAllDataFilter($queryParams['name']);
        }
        if ($requestUri_array[0] === '/api/wards_get') {
            // Obtener los parámetros enviados a través de la URL
            $queryParams = array();
            if (strpos($requestUri, '?') !== false) {
                $queryString = parse_url($requestUri, PHP_URL_QUERY);
                parse_str($queryString, $queryParams);
            }
            $awards_controller->getAllDataId($queryParams['id']);
        }
        if ($requestUri_array[0] === '/api/playerxawards') {
            // Obtener los parámetros enviados a través de la URL
            $queryParams = array();
            if (strpos($requestUri, '?') !== false) {
                $queryString = parse_url($requestUri, PHP_URL_QUERY);
                parse_str($queryString, $queryParams);
            }
            // die($queryParams['id']);
            $player_x_awardsController->getAllDataPlayer($queryParams['id']);
        }
        break;
    case 'POST':
        if ($requestUri === '/api/users') {
            $controller->insertData();
        }
        if ($requestUri === '/api/login') {
            $controller->Login();
        }
        if ($requestUri === '/api/player_time') {
            $player_time_controller->insertData();
        }
        if ($requestUri === '/api/wards') {
            $awards_controller->insertData();
        }
        if ($requestUri === '/api/player_x_awards') {
            $player_x_awardsController->insertData();
        }
        break;
    case 'PUT':
        if ($requestUri === '/api/users') {
            $controller->UpdateUser();
        }
        if ($requestUri === '/api/player_time') {
            $player_time_controller->Update();
        }
        if ($requestUri === '/api/wards') {
            $awards_controller->Update();
        }
        break;
    case 'DELETE':
        $requestUri_array = explode("?", $requestUri);
        if ($requestUri_array[0] === '/api/users') {
            $queryParams = array();
            if (strpos($requestUri, '?') !== false) {
                $queryString = parse_url($requestUri, PHP_URL_QUERY);
                parse_str($queryString, $queryParams);
            }
            $controller->deleteUser($queryParams["id"]);
        }
        if ($requestUri_array[0] === '/api/player_time') {
            $queryParams = array();
            if (strpos($requestUri, '?') !== false) {
                $queryString = parse_url($requestUri, PHP_URL_QUERY);
                parse_str($queryString, $queryParams);
            }
            $player_time_controller->delete($queryParams["id"]);
        }
        if ($requestUri_array[0] === '/api/wards') {
            $queryParams = array();
            if (strpos($requestUri, '?') !== false) {
                $queryString = parse_url($requestUri, PHP_URL_QUERY);
                parse_str($queryString, $queryParams);
            }
            $awards_controller->delete($queryParams["id"]);
        }
        break;
    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}
