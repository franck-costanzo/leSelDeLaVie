<?php var_dump($_SESSION['users']);?>
<form  method="post" >

    <h2>profil</h2>

    <input id="firstName" class="input" type="text" placeholder="<?php echo $_SESSION['users']['firstname'] ?>" name="firstName" value=''required />
    <label for="firstName" class="placeholder">Prenom</label>

    <input id="lastName" class="input" type="text" placeholder="<?php echo $_SESSION['users']['lastname'] ?>" name="lastName" value=''required />
    <label for="lastName" class="placeholder">Nom</label>

    <input id="email" class="input" type="email" placeholder="<?php echo $_SESSION['users']['email'] ?>" name="email" required />
    <label for="email" class="placeholder">Email</label>
    <div id="check"></div>


    <input id="password" class="input" type="password" placeholder=" " name="password" required />
    <label for="password" class="placeholder">Mot de passe</label>
    
    <input id="confpassword" class="input" type="password" placeholder="veillez valider votre mot de passe " name="confpassword" required />
    <label for="confpassword" class="placeholder">Validation mot de passe</label>

    <input id="adress" class="input" type="text" placeholder="<?php echo $_SESSION['users']['adress'] ?>" name="adress" required />
    <label for="adress" class="placeholder">Adresse</label>

    <input id="zip_code" class="input" type="text" placeholder="<?php echo $_SESSION['users']['zip_code'] ?>"  name="zip_code" required />
    <label for="zip_code" class="placeholder">Code Postale</label>

    <input name='sign_up' type="submit" class='submit' value='Inscription'>
    </form>
