<main>
    <?php
        $articleDetail = Article::getArticle($_GET['id_article']);
    ?>

    <div id='detailArticle'>
        <img src=<?= $articleDetail['image_url']; ?>>
        <fieldset>
            <legend><?= $articleDetail['name_article'] ?></legend>
            <p><?= $articleDetail['description_article'] ?></p>
        </fieldset>
    </div>
     
 
    <Form method="POST" id='formArticle' enctype="multipart/form-data"></Form>

    
    <?php if (isset($_SESSION["users"]) && $_SESSION["users"]["id_right"] >= 2) : ?>
        <hr>
        <h2> Altération de l'article</h2>

        <form method="POST" class='alterForm' enctype="multipart/form-data">
            <input type="hidden" name="id_article" value=<?= $articleDetail['id_article'] ?>>
            <input type="hidden" name="old_img_url" value=<?= $articleDetail['image_url'] ?>>
            
            <img src=<?= $articleDetail['image_url'] ?> class="prevIMG" id='alterIMGchanger'></img>
            <div id="fileInputCreationArticle">
                <label for="fileChange">
                    <img src="./View/Media/upload.svg" >
                </label>
                <input type="file" name="image_url" class="fileInputs" id="fileChange">
                <p>changer l'image</p>
            </div>
            <input type="submit" name="alterIMG" value="Changer l'image" id='alterIMG'>
        </form>

        <form method='POST' class='alterForm' enctype="multipart/form-data">
            <input type=hidden name=id_article value=<?= $articleDetail['id_article'] ?>>
            <label for name_article >Titre</label>
            <input type='text' name=name_article value="<?= $articleDetail['name_article'] ?>" >

            

            <label for description_article >Description</label>
            <textarea name=description_article rows="5" cols='50'><?= $articleDetail['description_article'] ?></textarea>

            <label for cat>Catégorie</label>
            <select name=cat>
                    <?php $categories = Categorie::getAllCategories()?>
                    <?php foreach ($categories as $category) : ?>
                        <?php if($articleDetail["id_category"] == $category['id_category']) : ?>
                            <option value="<?= $category['id_category'] ?>" selected><?= $category['name_category'] ?></option>
                        <?php else : ?>
                            <option value="<?= $category['id_category'] ?>"><?= $category['name_category'] ?></option>
                        <?php endif; ?>                        
                    <?php endforeach; ?>
            </select>

            <label for form>Formulaire attaché</label>
            <select name=form>
                        <option value="NULL">--- Pas de formulaire attaché ---</option>
                <?php $forms = Formulaire::getAllForms()?>
                <?php foreach ($forms as $form) : ?>
                    <?php if ( $form['id_form'] == $articleDetail["id_form"]) : ?>
                        <option value="<?= $form['id_form'] ?>" selected><?= $form['name_form'] ?></option>
                    <?php else : ?>
                        <option value="<?= $form['id_form'] ?>"><?= $form['name_form'] ?></option>
                    <?php endif; ?>  
                <?php endforeach; ?>
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