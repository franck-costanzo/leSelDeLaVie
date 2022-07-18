<?php
    require_once 'View/Renderer.php';
 
    //autoload models
    foreach (glob("Model/*.php") as $classname)
    {
        spl_autoload_register(function ($classname) {
            include 'Model/' .$classname . '.php';
        });
    }
    
    //autoload controllers
    foreach (glob("Controller/*.php") as $filename)
    {
        include $filename;
    }    
    
    //layout because my main layout view is named layout.php, not to be used as an actual page
    if (isset($_GET['url']) && ( $_GET['url'] == "layout" || $_GET['url'] == "Renderer" 
                                || $_GET['url'] == "footer" || $_GET['url'] == "header"))
    {
        $view = New Renderer("home");
        $view->display(); 
    }
    else if (isset($_GET['url']) && ($_GET['url'] == "names" ))
    {
        echo json_encode(Formulaire::getAllFormsNames());
    }
    else if (isset($_GET['url']) && ($_GET['url'] == "articleForms"))
    {
        echo json_encode(Formulaire::getFormByModuleOrder());
    }
    else if (isset($_GET['url']) && ($_GET['url'] == "articleCarousel"))
    {
        echo json_encode(Carousel::getAllArticleInCarousel());
    }
    else if (isset($_GET['url']) && ($_GET['url'] == "getAllCategories"))
    {
        echo json_encode(Categorie::getAllCategories());
    }
    else if( isset($_GET['url']) )
    {
        $view = New Renderer($_GET['url']);
        $view->display();
    }
    else
    {
        $view = New Renderer("home");
        $view->display(); 
    }