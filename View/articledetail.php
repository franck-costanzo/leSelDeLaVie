<main>
    <?php 
        $articleDetail = Article::getArticle($_GET['id_article']);
        $formDetail = Formulaire::getFormByIdOrderByModuleOrder($_GET['id_form']);   
    ?>
    <pre><?= var_dump($articleDetail)?></pre>
    <p>******************************</p>
    <pre><?= var_dump($formDetail)?></pre> 
</main>