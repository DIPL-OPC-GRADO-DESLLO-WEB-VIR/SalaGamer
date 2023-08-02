<?php

class PlayerTime
{
    private $connection;

    public function __construct($connection)
    {
        $this->connection = $connection;
    }

    public function getAllData()
    {
        $query = "SELECT player_time.id,  hour_played, played.nombres name_played,employee.nombres name_employee FROM player_time 
                    LEFT JOIN  user played ON fk_id_player=played.id
                    LEFT JOIN  user employee ON fk_id_employee=employee.id
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
            $hour_played = $this->connection->real_escape_string($datos['hour_played']);
            $fk_id_player = $this->connection->real_escape_string($datos['fk_id_player']);
            $fk_id_employee = $this->connection->real_escape_string($datos['fk_id_employee']);

            $stmt = $this->connection->prepare("INSERT INTO player_time (hour_played, fk_id_player, fk_id_employee) VALUES (?, ?, ?)");
            $stmt->bind_param("iii", $hour_played, $fk_id_player, $fk_id_employee);
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
            $hour_played = $this->connection->real_escape_string($datos['hour_played']);
            $fk_id_player = $this->connection->real_escape_string($datos['fk_id_player']);
            $fk_id_employee = $this->connection->real_escape_string($datos['fk_id_employee']);
            $id = $this->connection->real_escape_string($datos['id']);

            $stmt = $this->connection->prepare("UPDATE player_time SET hour_played=?, fk_id_player=?, fk_id_employee=? WHERE id= ?");
            $stmt->bind_param("iiii", $hour_played, $fk_id_player, $fk_id_employee, $id);
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
            $stmt = $this->connection->prepare("DELETE FROM player_time  WHERE id= ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $stmt->close();

            return true;
        } catch (Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
