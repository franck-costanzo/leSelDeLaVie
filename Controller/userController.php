<?php


class UserController
{

    function __construct()
    {
    }

    //-----------------------logique métier inscription+ sécurité---------------------------------------------
    public static function signUpAction($firstName, $lastName, $email, $password, $confpassword, $adress, $zipCode)
    {
        if (empty($email) || empty($password) || empty($firstName) || empty($lastName) || empty($zipCode) || empty($adress || empty($confpassword))) {
            $message = 'veuillez remplir tout les champs';
            return $message;
        } else {
            $a = new User;
            $b = $a->checkUser($email);
            var_dump($b);
            if ($b > 0) {
                return;
            } else {
                $uppercase = preg_match('@[A-Z]@', $password);
                $lowercase = preg_match('@[a-z]@', $password);
                $number    = preg_match('@[0-9]@', $password);

                if (!$uppercase || !$lowercase || !$number || strlen($password) < 6) {
                    $message = 'le mot de passe ne rempli pas les normes de sécurités';
                    return $message;
                } else {
                    if ($password == $confpassword) {

                        $newpassword = password_hash($password, PASSWORD_BCRYPT);
                        User::setUser($firstName, $lastName, $email, $newpassword, $adress, $zipCode);
                        header('Location:connexion.php');
                    } else {
                        return;
                    }
                }
            }
        }
    }

    public static function signInAction($email,$password){
        if (isset($_POST['signIn'])) {  
            $test= new User;
            $test2=$test->checkUser($email);
            if ($test2 < 0) {
                return $message="ce login n'existe pas";
            } else {           
                $signIn=$test->userConnexion($email);
                if (password_verify(htmlspecialchars($password, ENT_QUOTES, "ISO-8859-1"),$signIn['password'])) {
                    $_SESSION['user'] =$signIn; 
                    header('Location:home');
                }else{
                return $message='mot de passe incorrect';
                }
            }
        }
    }
}


