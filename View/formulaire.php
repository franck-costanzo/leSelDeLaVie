<main class="mainFormulaire">

    <div id="FormulaireGen">
        <form action="" method="POST">
            <label for="name_form">Nom du formulaire</label>
            <input type="text" name="name_form" id="name_form">
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