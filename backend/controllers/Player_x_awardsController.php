<?php
require_once 'models/Player_x_awards.php';
class Player_x_awardsController
{
    private $model;

    public function __construct($connection)
    {
        $this->model = new Player_x_awards($connection);
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
        if (empty($data) || !isset($data['regulated_hours']) || !isset($data['fk_id_player']) || !isset($data['fk_id_awards'])) {
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
    public function Update()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
            http_response_code(405);
            echo json_encode(['message' => 'Método no permitido2']);
            return;
        }
        $data = json_decode(file_get_contents('php://input'), true);
        if (empty($data) || !isset($data['hour_played']) || !isset($data['fk_id_player']) || !isset($data['fk_id_employee'])) {
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
