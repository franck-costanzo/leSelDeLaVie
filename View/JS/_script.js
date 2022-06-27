import appendCarousel from './carousel.js';
import changePicture from './ImageAssociation.js';
import appendForm from './formulaire.js';
import article from './article.js';
import pdfGenerator from './pdfgenerator.js';
import signUp from './signUp.js';

document.addEventListener("DOMContentLoaded", (event) => {

    //création d'une variable qui correspond à media query mode desktop
    var media_query = 'screen and (min-width: 968px)';

    //création d'un booléen qui utilise la variable media_query pour vérifier qu'on est en mode desktop
    var matched = window.matchMedia(media_query).matches;

    //----- Implémentation du carousel

        //création de la constante url pour récupérer l'endroit où on est
        const url = window.location.pathname;

        //réduction de l'url pour récupérer la rotue exacte
        const lastSegment = url.split("/").pop();
        
        //affichage du carousel si on est sur home ou sur activités ou sur home mais version ' '
        if (lastSegment == 'home' || lastSegment == 'activites' 
            || lastSegment == '' ||  ( lastSegment == 'association' && matched))
        {
            appendCarousel();
        }
    
    //affichage du changeur d'image pour la rubrique histoire de l'association
    if (lastSegment == 'association')
    {
        changePicture();
    }

    //affichage du générateur de formulaire si l'utilisateur est sur ordinateur
    if (lastSegment == 'formulaire' && matched)
    {
        appendForm();
    }
    else if (lastSegment == 'formulaire' && !matched)
    { 
        document.querySelector('h2').innerHTML = 'Veuillez vous connecter sur un ordinateur pour fabriquer votre formulaire';
        document.querySelector('main div').remove();
        document.querySelector('main fieldset').remove();

        let noMobileImg = document.createElement('img');
        noMobileImg.setAttribute('src','./View/Media/nomobile.svg');
        noMobileImg.setAttribute('class', 'nomobile');
        document.querySelector('h2').after(noMobileImg);

    }

    //affichage du créateur d'évènement si l'utilisateur est sur ordinateur
    if (lastSegment == 'creationarticle' && matched)
    {
        article()
    }
    else if (lastSegment == 'creationarticle' && !matched)
    { 
        document.querySelector('h2').innerHTML = 'Veuillez vous connecter sur un ordinateur pour créer votre article';
        document.querySelector('main div').remove();
        document.querySelector('main fieldset').remove();

        let noMobileImg = document.createElement('img');
        noMobileImg.setAttribute('src','./View/Media/nomobile.svg');
        noMobileImg.setAttribute('class', 'nomobile');
        document.querySelector('h2').after(noMobileImg);

    }
    
    //affichage 
    if (lastSegment == 'test')
    {
        pdfGenerator();
    }

    //Script pour le sign up
    if (lastSegment == 'inscription')
    {
        signUp();
    }
        
});