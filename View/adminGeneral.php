<main>
    <?php if(isset($_SESSION["users"]) && $_SESSION["users"]["id_right"] == 1337) : ?>

    <?php $survey4 = Categorie::selectCat(); ?>
    <section class="adminSection">
        <h2>Gestion des catégories</h2>
        <div id="divCateg">
            <form method="POST">            
                <input type="text" name="nomCategorie">
                <input type="submit" name="createCategorie" 
                value="Créer une catégorie">        
            </form>
            <form method="POST">
                <select name="deleteCatOption">';
                <?php foreach ($survey4 as $value2) : ?>
                    <option value=<?= $value2['id_category']?>><?= $value2['name_category'] ?></option>
                <?php endforeach ?>
                </select>
                <input type=submit name="deleteCat" value="supprimer">
            </form>
        </div>
    </section>

    <section class='adminSection'>
        <h2>Formulaires</h2>
        <div class='formulaireDiv'>
            <form method="POST">
                <label for="id_form">Choisir le formulaire :</label>
                <select name="id_form" id="id_form">
                    <option value="---------------" disabled selected></option>
                    <?php $forms = Formulaire::getAllForms()?>
                    <?php foreach ($forms as $form) : ?>
                        <option value="<?= $form['id_form'] ?>"><?= $form['name_form'] ?></option>
                    <?php endforeach; ?>
                </select>
                <input type="submit" name="deleteForm" value="Supprimer">                
            </form>             
        </div>        
    </section>

    <?php $articlesArray = Article::getAllArticles(); ?>
    <section class='carouselSection'>
        <h2>Objets mis en valeur sur la page d'accueil</h2>
        <div>
        <?php for($i=0; $i<4; $i++) : ?>
            <?php $article = Carousel::getArticleById($i);?>
                <label for="<?="form".$i ?>"> Article à la position <?= $i+1?></label>
                <form method="POST" id=<?="form".$i ?>>
                    <select name="idArticle" id="id_article">
                    <?php foreach($articlesArray as $produit) : ?>
                        <?php if ($produit["id_article"] == $article["id_article"]) :?>
                            <option value="<?= $produit["id_article"] ?>" SELECTED><?= $produit["name_article"] ?></option>
                        <?php else :  ?>
                            <option value="<?= $produit["id_article"] ?>"><?= $produit["name_article"] ?></option>
                        <?php endif; ?>
                    <?php endforeach; ?>
                    </select>
                    <input type="submit" name="objet<?= $i ?>" value="modifier">
                </form>
            <?php endfor; ?>
        </div>            
    </section>
    <?php else : ?>
        <?php header('Location:home'); ?>
    <?php endif; ?>
</main>