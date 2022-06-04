<main class="mainFormulaire">
    <form action="home" method="POST">
        <label for="name_form">Nom du formulaire</label>
        <input type="text" name="name_form" id="name_form">
        <label for="select_type">choisir un type de champ à ajouter</label>
        <select name="select_type" id="select_type">
            <option value="disabled" selected disabled>choisissez une option</option>
            <option value="text">champ de texte</option>
            <option value="textarea">champ de commentaire</option>
            <option value="select">choix parmis une liste</option>
            <option value="checkbox">choix multiples</option>
            <option value="radio">choix unique (ex: oui/non)</option>
        </select>
        <input type="submit" value="Enregistrer le formulaire" name="reg_form" id="reg_form">
    </form>
</main>