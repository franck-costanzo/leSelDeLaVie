<main>
    <form action="#" method="POST">
        <label for="supaTXT" id="supaTXTlabel">Le label du texte : </label>
        <input type="text" name="supaTXT" id="supaTXT">

        <label for="supaTXTAREA" id="supaTXTAREAlabel">Le label du textarea : </label>
        <textarea name="supaTXTAREA" id="supaTXTAREA" cols="30" rows="10"></textarea>

        <label for="image_url" id="labelimg">Le label de l'image : </label>
        <input type="file" name="image_url" id="image_url">
        <input type="submit" value="submit" name="genPdf">
    </form>
</main>

<form method='post'>
    <input type=hidden name=id_article value=<?= $articleDetail[0]['id_article'] ?>>
    <label for name_article >Titre:'.<?= $articleDetail[0]['name_article'] ?>.'</label>
        <input type='text' name=name_article >

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