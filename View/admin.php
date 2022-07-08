<main>    
    <nav>
    <?php if(isset($_SESSION["users"]) && $_SESSION["users"]["id_right"] >= 2) : ?>
        <a href="creationarticle"><img src="View/Media/filePlus.svg" alt="">Création d'article</a>
        <a href="formulaire"><img src="View/Media/clipboardList.svg" alt="">Création de Formulaire</a>
    <?php endif; ?>
    <?php if(isset($_SESSION["users"]) && $_SESSION["users"]["id_right"] == 1337) : ?>
        <a href="adminArticles"><img src="View/Media/fileCheck.svg" alt="">Gestion des articles</a>
        <a href="adminUsers"><img src="View/Media/users.svg" alt="">Gestion des utilisateurs</a>
        <a href="adminGeneral"><img src="View/Media/settings.svg" alt="">Gestion Divers</a>
    <?php endif; ?>
    </nav>

    <?php if(isset($_SESSION["users"]) && $_SESSION["users"]["id_right"] < 2) : ?>
        <?php header('Location:home'); ?>
    <?php endif; ?>
</main>