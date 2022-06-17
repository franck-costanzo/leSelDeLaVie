import appendCarousel from './carousel.js';
import changePicture from './ImageAssociation.js';
import appendForm from './formulaire.js';

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

        if (lastSegment == 'formulaire')
        {
            appendForm();
        }
    
});