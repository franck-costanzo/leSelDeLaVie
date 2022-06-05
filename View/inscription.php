<main class='mainFormulaire'>
<?php
$message='';
if(isset($_POST['sign_up'])){
$message= UserController::signUpAction(
                htmlentities($_POST['firstName'],ENT_QUOTES,"ISO-8859-1"),
                htmlentities($_POST['lastName'],ENT_QUOTES,"ISO-8859-1"),
                htmlentities($_POST['email'],ENT_QUOTES,"ISO-8859-1"),
                htmlentities($_POST['password'],ENT_QUOTES,"ISO-8859-1"),
                htmlentities($_POST['confpassword'],ENT_QUOTES,"ISO-8859-1"),         
                htmlentities($_POST['adress'],ENT_QUOTES,"ISO-8859-1"),
                htmlentities($_POST['zip_code'],ENT_QUOTES,"ISO-8859-1"),);
            }
        ?>
<form  method="post" >
<div class='title'>
    <h2>Inscription</h2>

    <p><?php echo $message ;?></p>
    <input id="firstName" class="input" type="text" placeholder=" " name="firstName" value=''required />
    <label for="firstName" class="placeholder">Prenom</label>

    
    <input id="lastName" class="input" type="text" placeholder=" " name="lastName" value=''required />
    <label for="lastName" class="placeholder">Nom</label>

    <input id="email" class="input" type="email" placeholder=" " name="email" required />
    <label for="email" class="placeholder">Email</label>


    <input id="password" class="input" type="password" placeholder=" " name="password" required />
    <label for="password" class="placeholder">Mot de passe</label>

    <input id="confpassword" class="input" type="password" placeholder=" " name="confpassword" required />
    <label for="confpassword" class="placeholder">Validation mot de passe</label>

    <input id="adress" class="input" type="text" placeholder=" " name="adress" required />
    <label for="adress" class="placeholder">Adresse</label>

    <input id="zip_code" class="input" type="text" placeholder=" " name="zip_code" required />
    <label for="zip_code" class="placeholder">Code Postale</label>

    <input name='sign_up' type="submit" class='submit' value='Inscription'>
    </form>

</main>

