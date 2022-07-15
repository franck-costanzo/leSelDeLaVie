import appendCarousel from './carousel.js';
import changePicture from './imageAssociation.js';
import appendForm from './formulaire.js';
import article from './article.js';
import signUp from './signUp.js';
import f404 from './404.js';
import home from './home.js';
import appendFormView from './articleDisplay.js';

document.addEventListener("DOMContentLoaded", (event) => {
 
    //création d'une variable qui correspond à media query mode desktop
    var media_query = 'screen and (min-width: 968px)';

    //création d'un booléen qui utilise la variable media_query pour vérifier qu'on est en mode desktop
    var matched = window.matchMedia(media_query).matches;

    if (!matched){
        //----gestion bouton Nav
        let navBar = document.querySelector('header');
        navBar.style.overflowY = "hidden";
        let navBarHeight = navBar.offsetHeight;
        let button = document.createElement('button');
        button.style.position = 'absolute';
        button.style.top = navBarHeight;
        button.style.right = '0';
        button.style.zIndex = '99';
        button.style.backgroundColor = 'transparent';
        button.style.height = '50px';
        button.style.width = '40px';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderBottomLeftRadius = '20px';
        let buttonImg = document.createElement('img');
        buttonImg.src = "View/Media/burger.svg";
        button.appendChild(buttonImg)
        button.addEventListener('click', () => {
            if(navBar.style.overflowY == "hidden")
            {
                navBar.style.overflowY = 'unset';
                buttonImg.src =  "View/Media/crossW.svg";
            }
            else
            {
                navBar.style.overflowY = 'hidden';
                buttonImg.src = "View/Media/burger.svg";
            }
            
        })
        navBar.after(button);
    }

    //----- Implémentation du carousel

        //création de la constante url pour récupérer l'endroit où on est
        const url = window.location.pathname;

        //réduction de l'url pour récupérer la rotue exacte
        const lastSegment = url.split("/").pop();
        console.log(lastSegment);
        
        //affichage du carousel si on est sur home ou sur activités ou sur home mais version ' '
        if (lastSegment == 'home' || lastSegment == 'activites' 
            || lastSegment == '' ||  ( lastSegment == 'association' && matched))
        {
            // appendCarousel();
            appendCarousel();
        }

        if (lastSegment == 'home' || lastSegment == 'activites' 
            || lastSegment == ''  && !matched)
        {
            home();
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
    
    if (lastSegment == 'articledetail')
    {        
        appendFormView();      
    }

    //Script pour le sign up
    if (lastSegment == 'inscription')
    {
        signUp();
    }

    //erreur 404
    if (document.title == "404" && matched)
    {
        f404();
    }    
        
});