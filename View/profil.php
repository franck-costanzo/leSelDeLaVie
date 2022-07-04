<form  method="post" >

    <h2>profil</h2>

    <label for="firstName" class="value">Prenom</label>
    <input id="firstName" class="input" type="text" value="<?php echo $_SESSION['users']['firstname'] ?>" name="firstName" value=''required />

    <label for="lastName" class="value">Nom</label>
    <input id="lastName" class="input" type="text" value="<?php echo $_SESSION['users']['lastname'] ?>" name="lastName" value=''required />

    <label for="email" class="value">Email</label>
    <input id="email" class="input" type="email" value="<?php echo $_SESSION['users']['email'] ?>" name="email" required />
    <div id="check"></div>

    <label for="password" class="value">Mot de passe</label>
    <input id="password" class="input" type="password" value="" name="password" required />
    
    <label for="confpassword" class="value">Validation mot de passe</label>
    <input id="confpassword" class="input" type="password" value="" name="confpassword" required />

    <label for="adress" class="value">Adresse</label>
    <input id="adress" class="input" type="text" value="<?php echo $_SESSION['users']['adress'] ?>" name="adress" required />

    <label for="zip_code" class="value">Code Postal</label>
    <input id="zip_code" class="input" type="text" value="<?php echo $_SESSION['users']['zip_code'] ?>"  name="zip_code" required />

    <input name='sign_up' type="submit" class='submit' value='Inscription'>
    </form>
