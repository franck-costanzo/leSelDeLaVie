<?php

if(isset($_POST['sign_up']))
{
    $errors = [];

    
    // receive all input values from the form
    $prenom = htmlentities($_POST['firstName']);
    $nom = htmlentities($_POST['lastName']);
    $password_1 = htmlentities($_POST['password']);
    $password_2 = htmlentities($_POST['confpassword']);
    $email = htmlentities($_POST['email']);
    $address = htmlentities($_POST['adress']);
    $zipCode = htmlentities($_POST['zip_code']);

    // form validation
    // by adding (array_push()) corresponding error unto $errors array
    if (empty($prenom)) { array_push($errors, "Firstname is required"); }
    if (empty($nom)) { array_push($errors, "Lastname is required"); }
    if (empty($password_1)) { array_push($errors, "Password is required"); }
    if (empty($email)) { array_push($errors, "Email is required"); }
    if (!preg_match('/^[a-z0-9._-]+[@]+[a-zA-Z0-9._-]+[.]+[a-z]{2,3}$/', $email)) { array_push($errors, "Email format is wrong"); }
    if ($password_1 != $password_2) { array_push($errors, "The two passwords do not match"); }
    if (!preg_match('/^[a-zA-Z0-9]{8,}$/', $password_1)) { array_push($errors, "Password format is wrong");}
    if (empty($address)) { array_push($errors, "Address is required"); }
    if (empty($zipCode)) { array_push($errors, "Code postal is required"); }
    if (!preg_match('/^[0-9]{5}$/', $zipCode)) { array_push($errors, "ZipCode format is wrong");}

    //check if user exists
    $chkExists = User::checkUser($email);
    if ( count($chkExists) != 0 ) {array_push($errors, "User already exists"); }

    // Finally, register user if there are no errors in the form
    if ( count($errors) == 0) 
    {
        User::setUser($prenom, $nom, $email, password_hash($password_1, PASSWORD_DEFAULT), $address,$zipCode);
        header('Location: connexion');
    }

}


    //-------------------------logique metier connexion----------------------------------------------
if (isset($_POST['signIn'])) 
{ 
    $errors = [];

    // receive all input values from the form
    $password = htmlentities($_POST['password']);
    $email = htmlentities($_POST['email']);

    // form validation:
    // by adding (array_push()) corresponding error unto $errors array
    if(empty($_POST['email'])){ array_push($errors,'please insert your email'); }
    if(empty($_POST['password'])){ array_push($errors,'please insert your password'); }

    // check the database to make sure 
    // a user does already exist with the same login and password
    $checkExists = User::checkUser($email);
    var_dump($checkExists);
    if ( !$checkExists ) { array_push($errors, "Wrong login/password combination"); }    

    if (count($errors) == 0) 
    {    
        $signIn = User::userConnexion($email);
        if ( password_verify($password, $signIn['password']))
        {
            session_start();
            $_SESSION['users'] = $signIn; 
            header('Location:home');       
        }
        else
        {
            array_push($errors, "Wrong login/password combination");
        }
        
    }

}

    //-------------------------logique metier profil---------------------------------------------- 
if (isset($_POST['UserUpdate']))
{
    $errors = [];

    // receive all input values from the form
    $prenom = htmlentities($_POST['firstName']);
    $nom = htmlentities($_POST['lastName']);
    $password = htmlentities($_POST['password']);
    $email = htmlentities($_POST['email']);
    $address = htmlentities($_POST['adress']);
    $zipCode = htmlentities($_POST['zip_code']);
    
    // form validation
    // by adding (array_push()) corresponding error unto $errors array
    if (empty($prenom)) { array_push($errors, "Firstname is required"); }
    if (empty($nom)) { array_push($errors, "Lastname is required"); }
    if (empty($password)) { array_push($errors, "Password is required"); }
    if (empty($email)) { array_push($errors, "Email is required"); }
    if (!preg_match('/^[a-z0-9._-]+[@]+[a-zA-Z0-9._-]+[.]+[a-z]{2,3}$/', $email)) { array_push($errors, "Email format is wrong"); }
    if (!preg_match('/^[a-zA-Z0-9]{8,}$/', $password)) { array_push($errors, "Password format is wrong");}
    if (empty($address)) { array_push($errors, "Address is required"); }
    if (empty($zipCode)) { array_push($errors, "Code postal is required"); }
    if (!preg_match('/^[0-9]{5}$/', $zipCode)) { array_push($errors, "ZipCode format is wrong");}
    $signIn = User::userConnexion($email);
    if ( !password_verify($password , $signIn['password'])) { array_push($errors, "oldpassword is wrong");} 

    if (count($errors) == 0) 
    {
        session_start();
        session_destroy();
        session_start();
        $_SESSION['users'] = $signIn;
        User::updateUser($prenom, $nom, $email, $address, $zipCode, $_POST['id_user']);
        header('Location: profil');
    }


}

//----- password update
if (isset($_POST['passwordChange']))
{
    $errors = [];

    $oldpassword = htmlentities($_POST['oldpassword']);
    $password_1 = htmlentities($_POST['password']);
    $password_2 = htmlentities($_POST['confpassword']);


    if (empty($password_1)) { array_push($errors, "Password is required"); }
    if ($password_1 != $password_2) { array_push($errors, "The two passwords do not match"); }
    if (!preg_match('/^[a-zA-Z0-9]{8,}$/', $password_1)) { array_push($errors, "Password format is wrong");}
    $signIn = User::userConnexion($_POST['email']);
    if ( !password_verify($oldpassword , $signIn['password'])) { array_push($errors, "oldpassword is wrong");}


    var_dump($errors);
    if (count($errors) == 0) 
    {
        User::passwordUpdate(password_hash($password_1, PASSWORD_DEFAULT), $_POST['id_user']);
        header('Location: home');
    }
    
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
