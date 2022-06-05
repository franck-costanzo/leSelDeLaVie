<?php
$message='';
if(isset($_POST['signIn'])){
    $message= UserController::signInAction(
        htmlentities($_POST['email'],ENT_QUOTES,"ISO-8859-1"),
        htmlentities($_POST['password'],ENT_QUOTES,"ISO-8859-1"));
    }
        ?>

<form  method="post" >
<div class='title'>
    <h2>Inscription</h2>

    <p><?php echo $message ;?></p>
    <input id="email" class="input" type="email" placeholder=" " name="email" value=''required />
    <label for="email" class="placeholder">adresse email</label>

    
    <input id="password" class="input" type="password" placeholder=" " name="password" value=''required />
    <label for="password" class="placeholder">Nom</label>


    <input name='signIn' type="submit" class='submit' value='connexion'>
    </form>

</main>