<?php


    if(isset($_POST['updateArticle'])){        

        if ($_POST["form"] == "NULL"){
            Article::updateArticle( $_POST['name_article'], $_POST["description_article"],
                                    date('Y-m-d H:i:s'), $_POST['cat'], $_POST['id_article']);
        }
        else {
            Article::updateArticle( $_POST['name_article'], $_POST["description_article"],
                                    date('Y-m-d H:i:s'), $_POST['cat'], $_POST['id_article'], $_POST['form']);
            
        }
        

    }

    if(isset($_POST['alterIMG']))
    {
        if (file_exists($_POST['old_img_url']) ) 
        {
            unlink($_POST['old_img_url']); 
        };

        //recupération du nom de produit et détermination de l'endroit ou stocker l'image uploadée
        $targetPath = 'View/ArticleImg/';
        $filename = $_FILES['image_url']["name"];
        $targetFile = $targetPath.$filename;

        //transfert de l'image vers l'endroit
        move_uploaded_file($_FILES['image_url']['tmp_name'], $targetFile);
        Article::updateArticleIMG($targetFile, $_POST['id_article']);        
    }

    //-----------------------  CATEGORIES
    if (isset($_POST['deleteCat'])) {
        Categorie::deleteCategory($_POST['deleteCatOption']);
    }

    if (isset($_POST['update'])) {
        User::updateRight($_POST['updateRight'], $_POST['id']);
    }

    if(isset($_POST['createCategorie']))
    {
        Categorie::createCategory($_POST['nomCategorie']);
    }


    //-----------------------  FORMULAIRES
    if(isset($_POST['deleteForm']))
    {
        Formulaire::deleteFormById($_POST['id_form']);
    }




    //-----------------------  CAROUSEL
    if(isset($_POST["objet0"]))
    {
        Carousel::updateToCarousel($_POST['idArticle'],0);
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
