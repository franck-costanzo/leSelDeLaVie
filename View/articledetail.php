<main>
    <?php
    $articleDetail = Article::getArticle($_GET['id_article']);
    $formDetail = Formulaire::getFormByIdOrderByModuleOrder($_GET['id_form']);
    ?>
    <h1><?= $articleDetail[0]['name_article'] ?></h1>
    <img src=<?= $articleDetail[0]['image_url']; ?>>
    <p><?= $articleDetail[0]['description_article'] ?></p>

        <?php
            admin::testform($formDetail);
            var_dump($articleDetail[0]['id_article']);
        ?>

<form method='post'>
    
    <input type=hidden name=id_article value=<?= $articleDetail[0]['id_article'] ?>>
    <label for name_article >Titre:<?= $articleDetail[0]['name_article'] ?></label>
        <input type='text' name=name_article value='<?= $articleDetail[0]['name_article'] ?>' >

    <label for image_url >image:<?= $articleDetail[0]['image_url'] ?></label>
        <input type='file' name=image_url value="'.<?= $articleDetail[0]['image_url'] ?>.'">

    <label for description_article >description:<?= $articleDetail[0]['description_article'] ?></label>
        <textarea name=description_article><?= $articleDetail[0]['description_article'] ?></textarea>

    <label for cat><?= $articleDetail[0]['name_category'] ?></label>
        <select name=cat>
            <?php admin::selectCate(); ?>
        </select>

    <label for form><?= $articleDetail[0]['name_form'] ?></label>
    <select name=form>
        <?php admin::selectFormSelect() ?>
    </select>
    <input type='submit' name='updateArticle' value='modifier'>
    <input type='submit' name='delete' value='supprimer'>
    <input type='submit' name='validate' value='valider'>
</form>


    <p>******************************</p>

</main>