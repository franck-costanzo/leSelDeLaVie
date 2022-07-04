<main>
    <?php
    $articleDetail = Article::getArticle($_GET['id_article']);
    $formDetail = Formulaire::getFormByIdOrderByModuleOrder($_GET['id_form']);
    ?>
    <div id='detailArticle'>
        <h1><?= $articleDetail[0]['name_article'] ?></h1>
        <img src=<?= $articleDetail[0]['image_url']; ?>>
        <fieldset>
            <legend>Description</legend>
            <p><?= $articleDetail[0]['description_article'] ?></p>
        </fieldset>
    </div>
    
 
    <div id='formArticle'></div>

    <?php if (isset($_SESSION["users"]) && $_SESSION["users"]["id_right"] >= 2) : ?>
        <hr>
        <h2> Altération de l'article</h2>
        <form method='post' id='alterForm' enctype="multipart/form-data">
            <input type=hidden name=id_article value=<?= $articleDetail[0]['id_article'] ?>>
            <label for name_article >Titre : <?= $articleDetail[0]['name_article'] ?> </label>
            <input type='text' name=name_article value=<?= $articleDetail[0]['name_article'] ?> >

            <img src=<?= $articleDetail[0]['image_url'] ?>></img>
            <div id="fileInputCreationArticle">
                <label for="fileChange">
                    <img src="./View/Media/upload.svg">
                </label>
                <input type="file" name="image_url" class="fileInputs" id="fileChange">
                <p>changer l'image</p>
            </div>

            <label for description_article >Description</label>
            <textarea name=description_article rows="5" cols='50'><?= $articleDetail[0]['description_article'] ?></textarea>

            <label for cat>Catégorie</label>
            <select name=cat>
                <?php admin::selectCate(); ?>
            </select>

            <label for form>Formulaire attaché</label>
            <select name=form>
                <?php admin::selectFormSelect() ?>
            </select>
            <div id='submitGrp'>
                <input type='submit' name='updateArticle' value='Modifier'>
                <input type='submit' name='delete' value='Supprimer'>
                <?php if(isset($_SESSION["users"]) && $_SESSION["users"]["id_right"] == 1337) : ?>
                    <input type='submit' name='validate' value='Valider'>
                <?php endif; ?>
            </div>    
        </form>
    <?php endif ?>
</main>