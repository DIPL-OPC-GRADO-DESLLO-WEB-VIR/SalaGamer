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
        $query = "SELECT user.id, nombres, email, celular, user_type,COALESCE(SUM(hour_played), 0) hour_played FROM user
                    LEFT JOIN user_type ut ON user.fk_tipo_user= ut.id
                    LEFT JOIN player_time pt ON user.id = pt.fk_id_player AND pt.active = 1 AND NOW() <= pt.expiration_date
                    WHERE user.fk_tipo_user != 2
                    GROUP BY nombres,email,celular,user_type
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
    function validarToken($token)
    {
        // Obtener la fecha actual
        $fechaActual = date('Y-m-d H:i:s');

        // Verificar si el token existe y no ha expirado
        $query = "SELECT * FROM usuarios WHERE token = '$token' AND fecha_expiracion > '$fechaActual'";
        $result = $this->connection->query($query);
        if (COUNT($result) > 0) {
            return true; // Token válido y no ha expirado
        } else {
            return false; // Token inválido o ha expirado
        }
    }
    function iniciarSesion($datos)
    {
        $email = $this->connection->real_escape_string($datos['email']);
        $passworld = $this->connection->real_escape_string($datos['password']);
        // Verificar las credenciales del usuario en la base de datos
        $query = "SELECT * FROM user WHERE email = '$email' AND passworld = '$passworld'";
        $result = $this->connection->query($query);
        if ($result->num_rows > 0) {
            // Credenciales válidas, generar y guardar el token
            $token = $this->generarToken();
            $fechaExpiracion = $this->calcularFechaExpiracion(); // Puedes usar una función para calcular la fecha de expiración

            $query = "UPDATE user SET token = '$token', fecha_token = '$fechaExpiracion' WHERE email= '$email'";
            $result = $this->connection->query($query);
            if ($result) {
                return $token; // Inicio de sesión exitoso, devuelve el token
            } else {
                return false; // Error al guardar el token
            }
        } else {
            return false; // Credenciales inválidas
        }
    }
    # la función  uniqid()  para generar un token único basado en la hora actual
    function generarToken()
    {
        $token = uniqid();
        return $token;
    }
    /*
        La función  calcularFechaExpiracion()  se encarga de determinar la fecha de expiración para el token.
         Esto dependerá de tus requisitos y políticas de seguridad.
        Por ejemplo, podrías establecer una duración de validez para el token, como 1 hora o 24 horas.
        Aquí tienes un ejemplo que utiliza la función  date()  para calcular la fecha de expiración 1 hora después del momento actua 
    */
    function calcularFechaExpiracion()
    {
        $fechaActual = date('Y-m-d H:i:s');
        $fechaExpiracion = date('Y-m-d H:i:s', strtotime('+1 hour', strtotime($fechaActual)));
        return $fechaExpiracion;
    }
}
