<?php

class player_x_awards
{
    private $connection;

    public function __construct($connection)
    {
        $this->connection = $connection;
    }

    public function getAllData()
    {
        $query = "SELECT regulated_hours,gruop_hour,fk_id_player,fk_id_awards FROM player_x_awards ";
        $result = $this->connection->query($query);

        $data = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }

        return $data;
    }
    public function getAllDataplayer($id)
    {
        $query = "SELECT regulated_hours,
                        gruop_hour,
                        fk_id_player,
                        fk_id_awards,
                        name_award,
                        register_date
                 FROM player_x_awards 
                 LEFT JOIN awards ON fk_id_awards = awards.id
                 WHERE fk_id_player = $id;
                     ";
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
            $stmt = $this->connection->prepare("INSERT INTO player_x_awards (regulated_hours,gruop_hour,fk_id_player,fk_id_awards ) VALUES (?, ?)");
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
            $stmt = $this->connection->prepare("UPDATE player_x_awards SET base64= '$base64', point= ? WHERE id= ? ");
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
            $stmt = $this->connection->prepare("DELETE FROM player_x_awards  WHERE id= ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $stmt->close();

            return true;
        } catch (Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
