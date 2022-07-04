<?php if(isset($_SESSION["users"]) && $_SESSION["users"]["id_right"] >= 2) : ?>
    <main>
        <a href="./formulaire">Création de formulaire</a>
        <a href="./creationarticle">Création d'article</a>
    </main>   

<?php else : ?>
    <?php header('Location:home');?>
<?php endif; ?>