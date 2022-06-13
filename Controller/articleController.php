<?php

if (isset($_POST['reg_article'])) 
{
    //VERIFICATION !!!
    $name_article = $_POST['name_article'];
    $description_article = $_POST['description_article'];
    $id_category = $_POST['id_categorie'];
    $id_form = $_POST['id_form'];
    $file = $_FILES['image_url'];

    //recupération du nom de produit et détermination de l'endroit ou stocker l'image uploadée
    $targetPath = 'View/ArticleImg/';
    $filename = substr($_POST['name_article'],0,10);
    $targetFile = $targetPath.$filename.'.jpg';

    //transfert de l'image vers l'endroit
    move_uploaded_file($_FILES['image_url']['tmp_name'], $targetFile);

    Article::createArticle($name_article, $targetFile, $description_article, $id_category, $id_form);

}
