<?php 

abstract class User extends Model 
{

    public function __construct() {}

    public static function checkUser($email)
    {
        $sqlinsert = "SELECT * FROM users WHERE email=:email ";
        $params=array(':email'=> $email);
        $infos = self::requestExecute($sqlinsert,$params);
        $return = $infos->fetch(PDO::FETCH_ASSOC);
        return $return;
    }

    
    public static function setUser($firstName,$lastName,$email,$password,$adress,$zipCode)
    {   $sqlinsert = "INSERT INTO users (firstname,lastname,email,password,adress,zip_code,id_right)
        VALUES(:firstname,:lastname,:email,:password,:adress,:zip_code,:id_right)";
        $params=array(
            ":firstname" => $firstName,
            ":lastname" => $lastName,
            ":email" => $email,
            ":password" => $password,
            ":adress" => $adress,
            ":zip_code" => $zipCode,
            ":id_rigth" => '1'        
        );
        Model::requestExecute($sqlinsert,$params);
    }


    //---------connexion--------------------------------

    public function userConnexion($login){
        $sqlinsert = "SELECT * FROM user WHERE login=:login ";
        $signIn = $this->db->prepare($sqlinsert);
        $signIn->execute(array(
            ':login' => $login,
        ));
        $user=$signIn->fetch(PDO::FETCH_ASSOC);
        return ($user);
}


//------------Profil--------------------------------------------------------

public function loginUpdate($login){
    $update=$this->db->prepare("UPDATE `user` SET login=:login WHERE id= :id");
    $update->execute(array(
        ':login'=>$login,
        ':id'=>$_SESSION['user']['id']
    ));
}

public function passwordUpdate($password){
    $update=$this->db->prepare("UPDATE `user` SET password=:password WHERE id= :id");
    $update->execute(array(
        ':password'=>$password,
        ':id'=>$_SESSION['user']['id']
    ));
}

public function emailUpdate($email){
    $update=$this->db->prepare("UPDATE `user` SET email=:email WHERE id= :id");
    $update->execute(array(
        ':email'=>$email,
        ':id'=>$_SESSION['user']['id']
    ));
}

public function firstNamedUpdate($firstName){
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
        ':id'=>$_SESSION['user']['id']
    ));
}

}