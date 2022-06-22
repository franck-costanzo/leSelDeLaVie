<main class='mainFormulaire'>
<?php $message='';?>
<form  method="post" >
<div class='title'>
    <h2>Inscription</h2>

    <input id="firstName" class="input" type="text" placeholder=" " name="firstName" value=''required />
    <label for="firstName" class="placeholder">Prenom</label>

    
    <input id="lastName" class="input" type="text" placeholder=" " name="lastName" value=''required />
    <label for="lastName" class="placeholder">Nom</label>

    <input id="email" class="input" type="email" placeholder=" " name="email" required />
    <label for="email" class="placeholder">Email</label>
    <div id="check"></div>


    <input id="password" class="input" type="password" placeholder=" " name="password" required />
    <label for="password" class="placeholder">Mot de passe</label>
        <p>le mot de passe doit contenir au moins un caractere minuscule</p>
        <p>le mot de passe doit contenir au moins un caractere majuscule</p>
        <p>le mot de passe doit contenir au moins 8 caracteres</p>
        <p>le mot de passe doit contenir au moins 1 chiffre</p>

    <input id="confpassword" class="input" type="password" placeholder=" " name="confpassword" required />
    <label for="confpassword" class="placeholder">Validation mot de passe</label>

    <input id="adress" class="input" type="text" placeholder=" " name="adress" required />
    <label for="adress" class="placeholder">Adresse</label>

    <input id="zip_code" class="input" type="text" placeholder=" " name="zip_code" required />
    <label for="zip_code" class="placeholder">Code Postale</label>

    <input name='sign_up' type="submit" class='submit' value='Inscription'>
    </form>

</main>

