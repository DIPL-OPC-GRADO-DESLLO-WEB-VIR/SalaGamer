<?php
require_once 'models/MiModelo.php';
class ApiController
{
    private $model;

    public function __construct($connection)
    {
        $this->model = new MiModelo($connection);
    }

    public function getAllData()
    {
        $data = $this->model->getAllData();
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    public function insertData()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo json_encode(['message' => 'Método no permitido']);
            return;
        }
        $data = json_decode(file_get_contents('php://input'), true);
        // print_r($data);
        // die($data);
        if (empty($data) || !isset($data['nombres']) || !isset($data['celular']) || !isset($data['id'])) {
            http_response_code(400);
            echo json_encode(['message' => 'Datos incompletos']);
            return;
        }

        if ($this->model->insertData($data)) {
            http_response_code(201);
            echo json_encode(['message' => 'Datos insertados correctamente']);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Error al insertar los datos']);
        }
    }
    public function Login()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo json_encode(['message' => 'Método no permitido']);
            return;
        }
        $data = json_decode(file_get_contents('php://input'), true);
        // print_r($data);
        // die($data);
        if (empty($data) || !isset($data['email']) || !isset($data['password'])) {
            http_response_code(400);
            echo json_encode(['message' => 'Datos incompletos']);
            return;
        }
        $token = $this->model->iniciarSesion($data);
        if (!empty($token)) {
            http_response_code(201);
            echo json_encode(['message' => "Se genero el token $token", "token" => $token]);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Error al iniciar session']);
        }
    }
    public function UpdateUser()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
            http_response_code(405);
            echo json_encode(['message' => 'Método no permitido2']);
            return;
        }
        $data = json_decode(file_get_contents('php://input'), true);
        if (empty($data) || !isset($data['nombres']) || !isset($data['celular'])) {
            http_response_code(400);
            echo json_encode(['message' => 'Datos incompletos']);
            return;
        }

        if ($this->model->UpdateData($data)) {
            http_response_code(201);
            echo json_encode(['message' => 'Datos actualizados correctamente']);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Error al actualizar los datos']);
        }
    }
    public function deleteUser($id)
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
            http_response_code(405);
            echo json_encode(['message' => 'Método no permitido']);
            return;
        }
        if (!isset($id)) {
            http_response_code(400);
            echo json_encode(['message' => 'Datos incompletos']);
            return;
        }
        if ($this->model->DeleteData($id)) {
            http_response_code(201);
            echo json_encode(['message' => 'Dato Eliminado correctamente']);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Error Eliminado los datos']);
        }
    }
}
