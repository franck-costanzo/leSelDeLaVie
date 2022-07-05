<?php 

class User extends Model 
{

    public function __construct() {}


    static public function checkUser($email)
    {
            $sql = "SELECT * FROM `users` WHERE users.email=:email";
            $test=self::getBdd()->prepare($sql);
            $test->execute(array(':email'=>$email));
            $test2=$test->rowCount();
            return $test2;      
    }

    
    public static function setUser($firstName,$lastName,$email,$password,$adress,$zipCode)
    {   
        $sqlinsert = "INSERT INTO users (firstname,lastname,email,password,adress,zip_code)
        VALUES(:firstname,:lastname,:email,:password,:adress,:zip_code)";

        self::requestExecute($sqlinsert,$params=array(
            ':firstname' => $firstName,
            ':lastname' => $lastName,
            ':email' => $email,
            ':password' => $password,
            ':adress' => $adress,
            ':zip_code' => $zipCode
        ));
    }


    //---------connexion--------------------------------

    public function userConnexion($email)
    {
        $sqlinsert = "SELECT id_user, firstname, lastname, adress, zip_code, password, email, id_right FROM users WHERE email=:email ";
        $signIn =self::getBdd()->prepare($sqlinsert);
        $signIn->execute(array(
            ':email' => $email,
        ));
        $user = $signIn->fetch(PDO::FETCH_ASSOC);
        return ($user);
    }


    //------------Profil--------------------------------------------------------

    public function loginUpdate($login)
    {
        $update=$this->db->prepare("UPDATE `user` SET login=:login WHERE id= :id");
        $update->execute(array(
            ':login'=>$login,
            ':id'=>$_SESSION['user']['id']
        ));
    }

    public function passwordUpdate($password)
    {
        $update=$this->db->prepare("UPDATE `user` SET password=:password WHERE id= :id");
        $update->execute(array(
            ':password'=>$password,
            ':id'=>$_SESSION['user']['id']
        ));
    }

    public function emailUpdate($email)
    {
        $update=$this->db->prepare("UPDATE `user` SET email=:email WHERE id= :id");
        $update->execute(array(
            ':email'=>$email,
            ':id'=>$_SESSION['user']['id']
        ));
    }

    public function firstNamedUpdate($firstName)
    {
        $update=$this->db->prepare("UPDATE `user` SET prenom=:firstname WHERE id= :id");
        $update->execute(array(
            ':firstname'=>$firstName,
            ':id'=>$_SESSION['user']['id']
        ));
    }

    public function lastNamedUpdate($lastName){
        $update=$this->db->prepare("UPDATE `user` SET nom=:lastname WHERE `id`= :id");
        $update->execute(array(
            ':lastname'=>$lastName,
            ':id'=>$_SESSION['users']['id']
        ));
    }
    //--------------------------select all--------------------------------------
    public static function userDisplay()
    {
        $sqlinsert = "SELECT id_user,lastname,firstname,email,password,adress,zip_code,right_name
        FROM `users`INNER JOIN `rights` ON users.id_right=rights.id_right; ";
        $infos = self::requestExecute($sqlinsert);
        $return = $infos->fetchAll(PDO::FETCH_ASSOC);
        return $return;
    }

    //-------------------------id_rigth-----------------------------------------
    public static function rightDisplay()
    {
        $sqlinsert = "SELECT id_right, right_name FROM rights ";
        $infos = self::requestExecute($sqlinsert);
        $return = $infos->fetchAll(PDO::FETCH_ASSOC);
        return $return;
    }

    public static function updateRight($right,$id)
    {
        $sqlinsert = "UPDATE `users` set id_right=:right WHERE id_user=:id ";
        $params=array(
            ':right'=>$right,
            ':id'=>$id
        );
        self::requestExecute($sqlinsert,$params);

    }

    //-------------------------article update-----------------------------------------

    public static function selectImg()
    {
        $sqlinsert = "SELECT id_right, right_name FROM rights ";
        $infos = self::requestExecute($sqlinsert);
        $return = $infos->fetchAll(PDO::FETCH_ASSOC);
        return $return;
    }

    static public function checkEmail($email)
    {
        $sql = "SELECT * FROM `users` WHERE users.email=:email";
        $test=self::getBdd()->prepare($sql);
        $test->execute(array(':email'=>$email));
        $test2=$test->rowCount();
        if ( $test2 > 0) {
            echo json_encode('cette adresse mail est déjà liée à un compte');
        } else {
            echo json_encode('cette adresse mail est disponible');
        }
    }

}