<main class='mainFormulaire'>
    <pre><?= var_dump(User::checkUser('john@doe.fr')) ?></pre>
<?php   
if (isset($_POST['sign_up'])){
            signUp::signUpAction(
                htmlentities($_POST['firstName'],ENT_QUOTES,"ISO-8859-1"),
                htmlentities($_POST['lastName'],ENT_QUOTES,"ISO-8859-1"),
                htmlentities($_POST['email'],ENT_QUOTES,"ISO-8859-1"),
                htmlentities($_POST['password'],ENT_QUOTES,"ISO-8859-1"),
                htmlentities($_POST['confpassword'],ENT_QUOTES,"ISO-8859-1"),         
                htmlentities($_POST['adress'],ENT_QUOTES,"ISO-8859-1"),
                htmlentities($_POST['zip_code'],ENT_QUOTES,"ISO-8859-1"),);
           }     
        ?>
<form  method="post">
<div class='title'>
    <h2>Inscription</h2>

    <input id="firstName" class="input" type="text" placeholder=" " name="firstName" required />
    <label for="firstName" class="placeholder">Prenom</label>

    
</main>