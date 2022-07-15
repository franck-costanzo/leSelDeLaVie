<?php

if (isset($_POST['reg_article'])) 
{
    //VERIFICATION !!!
    $name_article = $_POST['name_article'];
    $description_article = $_POST['description_article'];
    $id_category = $_POST['id_categorie'];

    if (isset($_POST['id_form']))
    {
        $id_form = $_POST['id_form'];
    }
    else
    {
        $id_form = NULL;
    }
    
    $file = $_FILES['image_url'];

    //recupération du nom de produit et détermination de l'endroit ou stocker l'image uploadée
    $targetPath = 'View/ArticleImg/';
    $filename = $_FILES['image_url']["name"];
    $targetFile = $targetPath.$filename;

    //transfert de l'image vers l'endroit
    move_uploaded_file($_FILES['image_url']['tmp_name'], $targetFile);

    if ($_FILES['image_url']['name'] != "")
    {
        Article::createArticle($name_article, $targetFile, $description_article, $id_category, $id_form);
    }
    else
    {
        Article::createArticleNoImg($name_article, $description_article, $id_category, $id_form);
    }

}

if (isset($_POST['voir_article']))
{
    $id_article = $_POST['id_article'];
    $id_form = $_POST['id_form'];
    header('Location: ./articledetail?id_article='.$id_article.'&id_form='.$id_form);
}

if(isset($_POST['delete']))
{
    Article::deleteArticle($_POST['id_article']);
}

if(isset($_POST['validate']))
{
    Article::valideArticle($_POST['id_article']);
}