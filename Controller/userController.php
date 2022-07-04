<?php

class UserController {

    //-------------------------logique metier inscription-----------------------------------------------

    static public function signUpAction($email,$password,$firstname,$lastName,$zipCode,$adress,$confpassword)
    {
        if (empty($email) || empty($password) || empty($firstname) 
            || empty($lastName) || empty($zipCode) || empty($adress)|| empty($confpassword)) 
        {
            return ;
        } 
        else 
        {
            $a = new User;
            $b = $a->checkUser($email);
            if ($b > 0) 
            {
                return;
            } 
            else 
            {
                $uppercase = preg_match('@[A-Z]@', $password);
                $lowercase = preg_match('@[a-z]@', $password);
                $number    = preg_match('@[0-9]@', $password);

                if (!$uppercase || !$lowercase || !$number || strlen($password) < 6) 
                {
                    return ;
                } 
                else 
                {
                    if ($password == $confpassword) 
                    {
                        $newpassword = password_hash($password, PASSWORD_BCRYPT);
                        User::setUser($firstname, $lastName,$email, $newpassword,$adress,$zipCode);
                        // header('Location:connexion.php');
                    } 
                    else 
                    {
                        return;
                    }
                }
            }
        }
    }


    //-------------------------logique metier connexion----------------------------------------------
    static public function signInAction($email,$password)
    {
        $test= new User;
        $test2=$test->checkUser($email);
        if ($test2 < 0) 
        {
            return;
        } 
        else 
        {           
            $signIn = $test->userConnexion($email);
            var_dump($signIn);
            var_dump(password_verify(htmlspecialchars($password, ENT_QUOTES, "ISO-8859-1"), $signIn['password']));
            if (password_verify(htmlspecialchars($password, ENT_QUOTES, "ISO-8859-1"), $signIn['password'])) 
            {
                $_SESSION['users'] = $signIn; 
                header('Location:home');
            }
            else
            {
                return;
            }
        }
    }

    //-------------------------logique metier profil---------------------------------------------- 
    public function userUpdate()
    {

        if (empty($_POST['email'])) {
            $_POST['email'] = $_SESSION['users']['email'];
        }
        if (empty($_POST['firstName'])) {
            $_POST['firstName'] = $_SESSION['users']['firstname'];
        }
        if (empty($_POST['lastName'])) {
            $_POST['lastName'] = $_SESSION['users']['lastName'];
        }
        if (empty($_POST['adress'])) {
            $_POST['adress'] = $_SESSION['users']['adress'];
        }
        if (empty($_POST['zip_code'])) {
            $_POST['zip_code'] = $_SESSION['users']['zip_code'];
        }
        if (empty($_POST['password'])) {
            $_POST['password'] = $_SESSION['users']['password'];
        }
        if (empty($_POST['password2'])) {
            $_POST['password2'] = '';
        }
        

        $b=new User;
        $b->checkUser(htmlspecialchars($_POST['login'], ENT_QUOTES, "ISO-8859-1"));
        if ($b>1) {
            return ;
        } 
            $test3=new User;
            $test3->loginUpdate(htmlspecialchars($_POST['login'], ENT_QUOTES, "ISO-8859-1"));        
            $_SESSION['users']['login']=$_POST['login'];


        $password = htmlspecialchars($_POST['password'], ENT_QUOTES, "ISO-8859-1");
        $password2 = htmlspecialchars($_POST['password2'], ENT_QUOTES, "ISO-8859-1");
        $uppercase = preg_match('@[A-Z]@', $password);
        $lowercase = preg_match('@[a-z]@', $password);
        $number    = preg_match('@[0-9]@', $password);

            if(!$uppercase || !$lowercase || !$number || strlen($password) < 6) {
            return;
        }
            if (strlen($_POST['password']) >= 6) {
                if ($password == $password2) {
                    $password = password_hash($password, PASSWORD_BCRYPT);
                    $updatepassword = new User();
                    $updatepassword->passwordUpdate($password);
                }
            }
        header('Location:Profil.php');


    }

}   

if(isset($_POST['sign_up'])){
    UserController::signUpAction($_POST['email'],$_POST['password'],$_POST['firstName'],$_POST['lastName'],$_POST['zip_code'],$_POST['adress'],$_POST['confpassword']);
}
if (isset($_POST['signIn'])) { 
    UserController::signInAction($_POST['email'],$_POST['password']);
}

/*-------------------------------
        DISCONNECT CHANGE 
--------------------------------*/
if (isset($_POST['deconnexion'])) 
{
  session_start();

  session_destroy();
  header('Location: home');
  exit;
}
