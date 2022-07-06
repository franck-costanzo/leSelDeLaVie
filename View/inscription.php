<main class='mainFormulaire'>
<?php $message='';?>
    <form  method="post" >
        <h2>Inscription</h2>

        <label for="firstName" class="placeholder">Prenom</label>
        <input id="firstName" class="input" type="text" placeholder=" " name="firstName" value=''required />

        
        <label for="lastName" class="placeholder">Nom</label>
        <input id="lastName" class="input" type="text" placeholder=" " name="lastName" value=''required />

        <label for="email" class="placeholder">Email</label>
        <input id="email" class="input" type="email" placeholder=" " name="email" required />
        <div id="check"></div>


        <label for="password" class="placeholder">Mot de passe</label>
        <input id="password" class="input" type="password" placeholder=" " name="password" required />
            <p>le mot de passe doit contenir au moins un caractere minuscule</p>
            <p>le mot de passe doit contenir au moins un caractere majuscule</p>
            <p>le mot de passe doit contenir au moins 8 caracteres</p>
            <p>le mot de passe doit contenir au moins 1 chiffre</p>

        <label for="confpassword" class="placeholder">Validation mot de passe</label>
        <input id="confpassword" class="input" type="password" placeholder=" " name="confpassword" required />

        <label for="adress" class="placeholder">Adresse</label>
        <input id="adress" class="input" type="text" placeholder=" " name="adress" required />

        <label for="zip_code" class="placeholder">Code Postal</label>
        <input id="zip_code" class="input" type="text" placeholder=" " name="zip_code" required />

        <input name='sign_up' type="submit" class='submit' value='Inscription'>
        
    </form>

</main>

