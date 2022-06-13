<main class="mainFormulaire">
    <?php /* if (isset($_SESSION['qlqchose''])  : ?>  
    <?php endif; */?> 
    <h2 class="titreFormulaire">Attention les formulaires ne sont plus modifiables une fois enregistrés !</h2>
    

    <div id="FormulaireGen">
        <form action="" method="POST" enctype="multipart/form-data">
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