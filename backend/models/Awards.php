<?php

class Awards
{
    private $connection;

    public function __construct($connection)
    {
        $this->connection = $connection;
    }

    public function getAllData()
    {
        $query = "SELECT base64,point FROM awards ";
        $result = $this->connection->query($query);

        $data = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }

        return $data;
    }

    public function insertData($datos)
    {
        try {
            $base64 = $this->connection->real_escape_string($datos['base64']);
            $point = $this->connection->real_escape_string($datos['point']);
            $stmt = $this->connection->prepare("INSERT INTO awards (base64, point) VALUES (?, ?)");
            $stmt->bind_param("si", $base64, $point);
            $stmt->execute();
            $stmt->close();

            return true;
        } catch (Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    public function UpdateData($datos)
    {
        try {
            $base64 = $this->connection->real_escape_string($datos['base64']);
            $point = $this->connection->real_escape_string($datos['point']);
            $id = $this->connection->real_escape_string($datos['id']);
            $stmt = $this->connection->prepare("UPDATE awards SET base64= '$base64', point= ? WHERE id= ? ");
            $stmt->bind_param("ii", $point, $id);
            $stmt->execute();
            $stmt->close();

            return true;
        } catch (Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    public function DeleteData($id)
    {
        try {
            $stmt = $this->connection->prepare("DELETE FROM awards  WHERE id= ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $stmt->close();

            return true;
        } catch (Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
