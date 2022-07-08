<a href="./"><img src="View/Media/logo-sel-text-seul-blanc.svg" alt="Le sel de la vie logo"></a>
<nav>
    <a href="./">Accueil</a>
    <a href="association">Association</a>
    
    
    <?php if(!isset($_SESSION["users"])) : ?>
        <a href="inscription">Inscription</a>
        <a href="connexion">Connexion</a>
        
    <?php endif ?>

    <?php if(isset($_SESSION["users"]) && $_SESSION["users"]["id_right"] >= 0) : ?>
        <a href="profil">Profil</a>
    <?php endif; ?>

    <?php if(isset($_SESSION["users"]) && $_SESSION["users"]["id_right"] >= 2) : ?>
        <a href="./admin" id="buttonAdmin">Admin</a>
    <?php endif; ?>

    <?php if(isset($_SESSION["users"])) : ?>
        <form method="POST">
            <button type="submit" name="deconnexion" class="header__nav__menu__link" id="decoBtn">Déconnexion
            </button>
        </form>
    <?php endif; ?>
</nav>