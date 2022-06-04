<?php


class SignUp
{

    function __construct()
    {
    }
 
    //-----------------------logique métier inscription+ sécurité---------------------------------------------
    public static function signUpAction($firstName,$lastName,$email,$password,$confpassword,$adress,$zipCode)
    {

var_dump($password);
             if( empty($email)|| empty($password)||empty($firstName)||empty($lastName)||empty($zipCode) || empty($adress) ){
                 echo'test1';
                $message='veuillez remplir tout les champs';
            return $message;
        
            } else {
                $countUser = User::checkUser(htmlentities($email));
                if ($countUser > 0) {
                    echo 'test2';
                    return;
                }
                $uppercase = preg_match('@[A-Z]@', $password);
                $lowercase = preg_match('@[a-z]@', $password);
                $number    = preg_match('@[0-9]@', $password);

                if (!$uppercase || !$lowercase || !$number || strlen($password) < 6) {
                    echo 'test 3';
                    $message = 'le mot de passe ne rempli pas les normes de sécurités';
                    return $message;
                } else {
                    if ($password == $confpassword) {
                        echo'youpi';
                        $newpassword=password_hash($password, PASSWORD_BCRYPT);
                        User::setUser($firstName, $lastName, $email, $newpassword, $adress, $zipCode);
                        header('Location:connexion.php');
                    } else {
                        echo 'test4';
                        return;
                    }
                }
                echo('coucou');
            }
    }

}