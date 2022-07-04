<?php


    if(isset($_POST['updateArticle'])){

        //recupération du nom de produit et détermination de l'endroit ou stocker l'image uploadée
        $targetPath = 'View/ArticleImg/';
        $filename = $_FILES['image_url']["full_path"];
        $targetFile = $targetPath.$filename;

        //transfert de l'image vers l'endroit
        move_uploaded_file($_FILES['image_url']['tmp_name'], $targetFile);

        Article::updateArticle( $_POST['name_article'], $targetFile, $_POST["description_article"],
                                    date('Y-m-d H:i:s'), $_POST['cat'], $_POST['form'],
                                    $_POST['id_article'],);
    }

    if (isset($_POST['deleteCat'])) {
        Categorie::deleteCategory($_POST['deleteCatOption']);
    }

    if (isset($_POST['update'])) {
        Admin::RightUpdate($_POST['updateRight'], $_POST['id']);
    }

    if(isset($_POST['createCategorie']))
    {
        Categorie::createCategory($_POST['nomCategorie']);
        // $nom = $_POST['nomCategorie'];

        // $categorie->createCategorie($nom);
    }

    if(isset($_POST["objet1"]))
    {
        Carousel::updateToCarousel($_POST['idArticle'],1);
    }

    if(isset($_POST["objet2"]))
    {
        Carousel::updateToCarousel($_POST['idArticle'],2);
    }

    if(isset($_POST["objet3"]))
    {
        Carousel::updateToCarousel($_POST['idArticle'],3);
    }

    if(isset($_POST["objet4"]))
    {
        Carousel::updateToCarousel($_POST['idArticle'],4);
    }
