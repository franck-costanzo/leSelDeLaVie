<main class="mainFormulaire">
    <?php /* if (isset($_SESSION['message']) && $_SESSION['message'] != '') : ?>
        <p class="messageErreur"><?= $_SESSION['message'] ?></p>  
    <?php endif; */?> 
    <h2 class="titreFormulaire">Attention les formulaires ne sont plus modifiables une fois enregistrés !</h2>
    

    <div id="FormulaireGen" enctype="multipart/form-data">
        <form action="" method="POST">
            <label for="name_form">Nom du formulaire</label>
            <input type="text" name="name_form" id="name_form">
            <hr>
            <input type="submit" value="Enregistrer le formulaire" name="reg_form" id="reg_form">
        </form>
    </div>

    <fieldset id="previewFormulaire">
        <legend>Prévisualisation</legend>

    </fieldset>
    
</main>

<pre><?= var_dump($_POST)?></pre>