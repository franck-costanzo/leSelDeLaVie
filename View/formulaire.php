<main class="mainFormulaire">
    <h2 class="titreFormulaire">Attention les formulaires ne sont plus modifiables une fois enregistrés !</h2>
    <div id="FormulaireGen" enctype="multipart/form-data">
        <form action="" method="POST">
            <label for="name_form">Nom du formulaire</label>
            <input type="text" name="name_form" id="name_form">
            <hr>
            <input type="submit" value="Enregistrer le formulaire" name="reg_form" id="reg_form">
        </form>
    </div>

    <div id="previewFormulaire">

    </div>
    
</main>


<!--
POUR LA DEMULTIPLACTION DE NAME D INPUT

In your html you can pass in an array for the name i.e

<input type="text" name="address[]" /> 
This way php will receive an array of addresses.
 -->