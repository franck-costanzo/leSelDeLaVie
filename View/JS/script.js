import {appendCarousel} from './carousel.js';
import changePicture from './ImageAssociation.js';

document.addEventListener("DOMContentLoaded", (event) => {

    // media query to check
    var media_query = 'screen and (min-width: 968px)';

    // matched or not
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
    
        if (lastSegment == 'association')
        {
            changePicture();
        }
});