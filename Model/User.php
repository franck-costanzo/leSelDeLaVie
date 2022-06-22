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
        $sqlinsert = "SELECT id_user,firstname,lastname,adress,zip_code,password,email FROM users WHERE email=:email ";
        $signIn =self::getBdd()->prepare($sqlinsert);
        $signIn->execute(array(
            ':email' => $email,
        ));
        $user=$signIn->fetch(PDO::FETCH_ASSOC);
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

    public function lastNamedUpdate($lastName)
    {
        $update=$this->db->prepare("UPDATE `user` SET nom=:lastname WHERE `id`= :id");
        $update->execute(array(
            ':lastname'=>$lastName,
            ':id'=>$_SESSION['user']['id']
        ));
    }

}