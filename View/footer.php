<section class="liensAdministratifs">
    <h3>Liens Administratifs</h3>
    <nav>    
        <a href="https://www.caf.fr/" target="_blank"><img src="View/Media/admin-caf.svg" alt="CAF"></a>
        <a href="https://www.impots.gouv.fr/accueil" target="_blank"><img src="View/Media/admin-impots.svg" alt="impôts"></a>
        <a href="https://www.pole-emploi.fr/accueil/" target="_blank"><img src="View/Media/admin-poleemploi.svg" alt="pôle-emploi"></a>
        <a href="https://www.ameli.fr/" target="_blank"><img src="View/Media/admin-assurancemaladie.svg" alt="assurance maladie"></a>
        <a href="https://www.bouches-du-rhone.gouv.fr/" target="_blank"><img src="View/Media/admin-prefecture.svg" alt="préfecture bouche-du-rhône"></a>
        <a href="https://www.departement13.fr/" target="_blank"><img src="View/Media/admin-bdr.svg" alt="conseil général bouche-du-rhône"></a>
        <a href="https://www.maregionsud.fr/" target="_blank"><img src="View/Media/admin-paca.svg" alt="conseil régional PACA"></a>
    </nav>
</section>

<section class="liensEducation">
    <h3>Education</h3>
    <nav>
        <a href="https://www.univ-amu.fr/" target="_blank"><img src="View/Media/educ-amu.svg" alt="Université Aix-Marseille"></a>
        <a href="https://www.ac-aix-marseille.fr/" target="_blank"><img src="View/Media/educ-academieAixMarseille.svg" alt="Rectorat Académie Aix Marseille"></a>
        <a href="https://agence.erasmusplus.fr/" target="_blank"><img src="View/Media/educ-erasmus.svg" alt="Erasmus"></a>
    </nav>
</section>

<section class="liensDuSite">
    <h3>Liens du site</h3>
    <nav>
        <a href="home">Accueil</a>
        <a href="association">association</a>       
        <?php if(!isset($_SESSION["users"])) : ?>
        <a href="inscription">Inscription</a>
        <a href="connexion">Connexion</a>
        
        <?php endif ?>

        <?php if(isset($_SESSION["users"]) && $_SESSION["users"]["id_right"] >= 0) : ?>
            <a href="profil">Profil</a>
        <?php endif; ?>

        <?php if(isset($_SESSION["users"]) && $_SESSION["users"]["id_right"] == 2) : ?>
            <a href="./admin" id='buttonModo'>Modérateur</a>
        <?php endif; ?>

        <?php if(isset($_SESSION["users"]) && $_SESSION["users"]["id_right"] == 1337) : ?>
            <a href="./admin" id="buttonAdmin">Admin</a>
        <?php endif; ?>
    </nav>

    <fieldset>
        <legend><h4>Nous Contacter</h2></legend>
        <div class="divContact">
            <div class="divLogoContact">
                <a href="tel:+33777777777" class="logoContact">    
                    <img src="View/media/tel.svg" alt="phone">
                </a>
                <a href="tel:+33777777777" class="logoContact">    
                    0777777777
                </a>
                
            </div>
            
            <div class="divLogoContact">
                <a href="mailto:leseldelavie1k@gmail.com" class="logoContact">
                    <img src="View/media/email.svg" alt="e-mail"> 
                </a>
                <a href="mailto:leseldelavie1k@gmail.com" class="logoContact">
                    email
                </a> 
            </div>
                       
        </div>
    </fieldset>

    <p class="contactFooter">Contact - téléphone : 0777777777 - email : leseldelavie1@gmail.com</p>
    
    <p>© Le Sel de la Vie - 2022</p>
</section>
<pre><?= var_dump($_POST) ?></pre>