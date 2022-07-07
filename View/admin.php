<main>
    <?php if(isset($_SESSION["users"]) && $_SESSION["users"]["id_right"] == 1337) : ?>
    <?php    $test = user::userDisplay(); $test2 = user::rightDisplay(); ?>
    <section class="adminSection">
        <h2>Gestion des utilisateurs</h2>
        <table>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Droit</th>
                    <th>Modifier</th>
                </tr>
            </thead>
            <tbody>
            <?php foreach ($test as $value) : ?>
                <tr>
                    <td> <?=$value['lastname']?></td>
                    <td> <?=$value['firstname']?></td>
                    <td> <?=$value['right_name']?></td>
                    <td>
                        <form method="POST"  id="formRight">
                            <input type="hidden" name="id" value=<?=$value['id_user']?>>
                                <select name="updateRight">
                                <?php foreach ($test2 as $value2) : ?>
                                    <?php if ($value2['right_name'] == $value['right_name']) : ?>
                                        <option value=<?= $value2['id_right'] ?> selected> <?= $value2['right_name'] ?></option>
                                    <?php else : ?>
                                        <option value=<?= $value2['id_right'] ?>> <?= $value2['right_name'] ?></option>
                                    <?php endif; ?>
                                <?php endforeach; ?>                      
                        </form><input type=submit name='update' value='modifier'></form>        
                    </td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
    </section>

    <?php $survey = Article::getArticles(); ?>
    <section class="adminSection">
        <h2> Gestion des articles à valider</h2>
            <table>
                <thead>
                    <tr>
                        <th>Titre</th>                        
                        <th>Catégorie</th>
                        <th>État</th>
                    </tr>
                </thead>
                <tbody>
                <?php   foreach ($survey as $value) : ?>
                    <tr>            
                        <td><?= $value['name_article'] ?> </td>
                        <td><?= $value['name_category'] ?></td>
                        <td><?= $value['name_state'] ?> <a href="articledetail?id_article=<?= $value['id_article']?>&id_form=<?= $value['id_form']?>">Examiner</a></td>
                    </tr>
                <?php endforeach ?>
                </tbody>
        </table>
    </section>

    <?php        
        Admin::formCat();
        $articlesArray = Article::getAllArticles();
    ?>

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

    <section class='carouselSection'>
        <h2>Objets mis en valeur sur la page d'accueil</h2>
        <div>
        <?php for($i=0; $i<4; $i++) : ?>
            <?php $article = Carousel::getArticleById($i);?>
                <label for="<?="form".$i ?>"> Article à la position <?= 1+$i?></label>
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