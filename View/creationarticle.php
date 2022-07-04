<?php if(isset($_SESSION["users"]) && $_SESSION["users"]["id_right"] >= 2) : ?>
<main id="creationArticleMain">
    <h2 class="titreCreationArticle">Creation d'article</h2>
    <div id="FormulaireGen">
        <form action="" method="POST" enctype="multipart/form-data" id="formCreationArticle">

            <div>
                <label for="name_article">Nom de l'article :</label>
                <input type="text" name="name_article" id="name_article">
            </div>
            

            <div id="fileInputCreationArticle">
                <label for="image_url">
                    <img src="./View/Media/upload.svg">
                </label>
                <input type="file" name="image_url" id="image_url">
                <p class="fileInputCreationArticleTxt">Ajouter une photo</p>
            </div>

            <div>
                <label for="description_article">Description de l'article :</label>
                <textarea name="description_article" id="description_article" cols="30" rows="10"></textarea>
            </div>
            
            <div>                
                <label for="id_category">Catégorie :</label>
                <select name="id_categorie" id="id_categorie">
                    <option value="---------------" disabled selected></option>
                    <?php $categories = Categorie::getAllCategories()?>
                    <?php foreach ($categories as $category) : ?>
                        <option value="<?= $category['id_category'] ?>"><?= $category['name_category'] ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div>
                <label for="id_form">Choisir le formulaire :</label>
                <select name="id_form" id="id_form">
                    <option value="---------------" disabled selected></option>
                    <?php $forms = Formulaire::getAllForms()?>
                    <?php foreach ($forms as $form) : ?>
                        <option value="<?= $form['id_form'] ?>"><?= $form['name_form'] ?></option>
                    <?php endforeach; ?>
                </select>  
            </div>

            

            <input type="submit" value="Enregistrer l'article" name="reg_article" id="reg_article">

        </form>
    </div>

    <fieldset id="previewFormulaire">
        <legend>Prévisualisation</legend>

    </fieldset>

</main>
<?php else : ?>
    <?php header('Location:home');?>
<?php endif; ?>