<?php
require_once 'models/Awards.php';
class AwardsController
{
    private $model;

    public function __construct($connection)
    {
        $this->model = new Awards($connection);
    }

    public function getAllData()
    {
        $data = $this->model->getAllData();
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    public function getAllDataFilter($name)
    {
        $data = $this->model->getAllDataFilter($name);
        header('Content-Type: application/json');
        echo json_encode($data);
    }
    public function getAllDataId($id)
    {
        $data = $this->model->getAllDataId($id);
        header('Content-Type: application/json');
        echo json_encode($data);
    }
    public function insertData()
    {
        $longitud_base64 = 60983;

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo json_encode(['message' => 'Método no permitido']);
            return;
        }
        $data = json_decode(file_get_contents('php://input'), true);
        if (empty($data) || !isset($data['point']) || !isset($data['base64'])) {
            http_response_code(400);
            echo json_encode(['message' => 'Datos incompletos']);
            return;
        }
        // print_r(strlen($data['base64']));
        if (strlen($data['base64']) > $longitud_base64) {
            http_response_code(400);
            echo json_encode(['message' => 'El valor de imagen excede la longitud máxima, comprima la imagen']);
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
    public function Update()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
            http_response_code(405);
            echo json_encode(['message' => 'Método no permitido2']);
            return;
        }
        $data = json_decode(file_get_contents('php://input'), true);
        if (empty($data) || !isset($data['point']) || !isset($data['base64'])) {
            http_response_code(400);
            echo json_encode(['message' => 'Datos incompletos']);
            return;
        }
        if (strlen($data['base64']) > 255) {
            http_response_code(400);
            echo json_encode(['message' => 'El valor de imagen excede la longitud máxima, comprima la imagen']);
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
    public function delete($id)
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
            http_response_code(200);
            echo json_encode(['message' => 'Dato Eliminado correctamente']);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Error Eliminado los datos']);
        }
    }
}
