import {appendCarousel} from './carousel.js';

document.addEventListener("DOMContentLoaded", (event) => {

    //----- Implémentation du carousel

        //création de la constante url pour récupérer l'endroit où on est
        const url = window.location.pathname;

        //réduction de l'url pour récupérer la rotue exacte
        const lastSegment = url.split("/").pop();
        
        //affichage du carousel si on est sur home ou sur activités ou sur home mais version ' '
        if (lastSegment == 'home' || lastSegment == 'activites' || lastSegment == '')
        {
            appendCarousel();
        }
    

});