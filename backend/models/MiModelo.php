<?php
// Archivo: app/models/MiModelo.php

class MiModelo
{
    private $connection;

    public function __construct($connection)
    {
        $this->connection = $connection;
    }

    public function getAllData()
    {
        $query = "SELECT nombres,email,celular,user_type,passworld,fecha_registro FROM user
                    LEFT JOIN user_type ut ON user.fk_tipo_user= ut.id";
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
            $email = $this->connection->real_escape_string($datos['email']);
            $celular = $this->connection->real_escape_string($datos['celular']);
            $count = 0;
            // Validar si el email ya existe en la base de datos
            $stmt = $this->connection->prepare("SELECT COUNT(*) FROM user WHERE email = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $stmt->bind_result($count);
            $stmt->fetch();
            $stmt->close();

            if ($count > 0) {
                // El email ya existe, mostrar un mensaje de error o tomar la acción correspondiente
                http_response_code(409);
                echo "El email ya está registrado";
                return false;
            }
            $stmt = $this->connection->prepare("SELECT COUNT(*) FROM user WHERE celular = ?");
            $stmt->bind_param("s", $celular);
            $stmt->execute();
            $stmt->bind_result($count);
            $stmt->fetch();
            $stmt->close();

            if ($count > 0) {
                // El celular ya existe, mostrar un mensaje de error o tomar la acción correspondiente
                http_response_code(409);
                echo "El celular ya está registrado";
                return false;
            }
            $nombres = $this->connection->real_escape_string($datos['nombres']);
            $fk_tipo_user = $this->connection->real_escape_string($datos['fk_tipo_user']);
            $passworld = $this->connection->real_escape_string($datos['passworld']);

            $stmt = $this->connection->prepare("INSERT INTO user (nombres, email, fk_tipo_user, celular, passworld) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("ssiis", $nombres, $email, $fk_tipo_user, $celular, $passworld);
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
            $email = $this->connection->real_escape_string($datos['email']);
            $celular = $this->connection->real_escape_string($datos['celular']);
            $count = 0;
            // // Validar si el email ya existe en la base de datos
            // $stmt = $this->connection->prepare("SELECT COUNT(*) FROM user WHERE email = ?");
            // $stmt->bind_param("s", $email);
            // $stmt->execute();
            // $stmt->bind_result($count);
            // $stmt->fetch();
            // $stmt->close();

            // if ($count > 0) {
            //     // El email ya existe, mostrar un mensaje de error o tomar la acción correspondiente
            //     http_response_code(409);
            //     echo "El email ya está registrado";
            //     return false;
            // }
            // $stmt = $this->connection->prepare("SELECT COUNT(*) FROM user WHERE celular = ?");
            // $stmt->bind_param("s", $celular);
            // $stmt->execute();
            // $stmt->bind_result($count);
            // $stmt->fetch();
            // $stmt->close();

            // if ($count > 0) {
            //     // El celular ya existe, mostrar un mensaje de error o tomar la acción correspondiente
            //     http_response_code(409);
            //     echo "El celular ya está registrado";
            //     return false;
            // }
            $nombres = $this->connection->real_escape_string($datos['nombres']);
            $id = $this->connection->real_escape_string($datos['id']);
            $fk_tipo_user = $this->connection->real_escape_string($datos['fk_tipo_user']);
            $passworld = $this->connection->real_escape_string($datos['passworld']);

            $stmt = $this->connection->prepare("UPDATE user SET nombres=?, email=?, fk_tipo_user=?, celular=?, passworld=? WHERE id= ?");
            $stmt->bind_param("ssiisi", $nombres, $email, $fk_tipo_user, $celular, $passworld, $id);
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
            $stmt = $this->connection->prepare("DELETE FROM user  WHERE id= ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $stmt->close();

            return true;
        } catch (Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
