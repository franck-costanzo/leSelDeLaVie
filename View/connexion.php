<?php
    $message='';
    if(isset($_POST['signIn']))
    {
        $message= UserController::signInAction(
            htmlentities($_POST['email'],ENT_QUOTES,"ISO-8859-1"),
            htmlentities($_POST['password'],ENT_QUOTES,"ISO-8859-1")
        );
    }
?>
<main>

    <form  method="post" >

        <h2>Connexion</h2>

        <p><?php echo $message ;?></p>

        <label for="email" class="placeholder">adresse email</label>
        <input id="email" class="input" type="email" placeholder=" " name="email" value=''required />


        <label for="password" class="placeholder">Nom</label>
        <input id="password" class="input" type="password" placeholder=" " name="password" value=''required /> 

        <input name='signIn' type="submit" class='submit' value='connexion'>

    </form>

</main>