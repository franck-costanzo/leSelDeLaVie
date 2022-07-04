<main>

    <?php
        Admin::idRigth();
        Admin::displayArticleStatus();
        Admin::formCat();
        $articlesArray = Article::getAllArticles();
    ?>

    <section class='carouselSection'>
        <h2>Objets mis en valeur sur la page d'accueil</h2>
        <div>
        <?php for($i=0; $i<4; $i++) : ?>
            <?php $article = Carousel::getArticleById($i);?>
                <label for="<?="form".$i ?>"> Article à la position <?= 1+$i?></label>
                <form method="POST" class="" style="" id=<?="form".$i ?>>
                    <select name="idArticle" id="id_article">
                    <?php foreach($articlesArray as $produit) : ?>
                        <?php if ($produit["id_article"] == $article["id_article"]) :?>
                            <option value="<?= $produit["id_article"] ?>" SELECTED><?= $produit["name_article"] ?></option>
                        <?php else :  ?>
                            <option value="<?= $produit["id_article"] ?>"><?= $produit["name_article"] ?></option>
                        <?php endif; ?>
                    <?php endforeach; ?>
                    </select>
                    <input type="submit" name="objet<?= $i ?>" value="modifier" class="">
                </form>
            <?php endfor; ?>
        </div>            
    </section>

</main>