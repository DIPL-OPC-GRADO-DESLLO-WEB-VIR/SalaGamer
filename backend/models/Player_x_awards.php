<?php

class Player_x_awards
{
    private $connection;

    public function __construct($connection)
    {
        $this->connection = $connection;
    }

    public function getAllData()
    {
        $query = "SELECT player_x_awards.id,  hour_played, played.nombres name_played,employee.nombres name_employee FROM player_x_awards 
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
    public function getAllDataplayer($id)
    {
        $query = "SELECT awards.id, regulated_hours,
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
            $regulated_hours = $this->connection->real_escape_string($datos['regulated_hours']);
            $fk_id_player = $this->connection->real_escape_string($datos['fk_id_player']);
            $fk_id_employee = $this->connection->real_escape_string($datos['fk_id_employee']);
            $fk_id_awards = $this->connection->real_escape_string($datos['fk_id_awards']);
            $regulated_hours_award = $this->connection->real_escape_string($datos['regulated_hours_award']);
            $expiration_date = '';
            $sum_hour_played = 0;
            $result_hour_total = 0;
            $query = "SELECT player_time.id,
                    hour_played,
                    played.nombres name_played,
                    employee.nombres name_employee,
                    expiration_date
                     FROM player_time 
                    LEFT JOIN  user played ON fk_id_player=played.id
                    LEFT JOIN  user employee ON fk_id_employee=employee.id
                    WHERE   played.id = $fk_id_player
                    AND player_time.active = 1 AND NOW() <= player_time.expiration_date
                    ORDER BY expiration_date
                    ";
            // print_r($query);
            $result = $this->connection->query($query);
            $gruop_hour = [];
            $data = array();
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    // print_r($row);
                    $sum_hour_played += $row['hour_played'];
                    $expiration_date = $row['expiration_date'];
                    $gruop_hour[] = $row["id"];
                    $data[] = $row;
                }
            }
            $result_hour_total = $sum_hour_played - $regulated_hours_award;
            $gruop_hour_string = json_encode($gruop_hour);
            $stmt = $this->connection->prepare("INSERT INTO player_x_awards (fk_id_awards, fk_id_player, regulated_hours, gruop_hour) VALUES (?, ?, ?,?)");
            $stmt->bind_param("iiis", $fk_id_awards, $fk_id_player, $sum_hour_played, $gruop_hour_string);
            $stmt->execute();
            $fk_id_player_time = $this->connection->insert_id; // Obtener el ID generado
            $separar_gruop_hour = '"' . implode('", "', $gruop_hour) . '"';
            // print_r("UPDATE player_time SET active = 0 WHERE fk_id_player IN ($separar_gruop_hour) ");
            $stmt = $this->connection->prepare("UPDATE player_time SET active = 0 WHERE id IN ($separar_gruop_hour) ");
            // $stmt->bind_param("s", $separar_gruop_hour);
            $stmt->execute();
            if ($result_hour_total > 0) {
                $stmt = $this->connection->prepare("INSERT INTO player_time (hour_played,fk_id_player,fk_id_employee, expiration_date , fk_id_player_time) VALUES(?,?,?,?,?)");
                $stmt->bind_param("issss", $result_hour_total, $fk_id_player, $fk_id_employee, $expiration_date, $fk_id_player_time);
                $stmt->execute();
            }
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

            $stmt = $this->connection->prepare("UPDATE player_x_awards SET hour_played=?, fk_id_player=?, fk_id_employee=? WHERE id= ?");
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
