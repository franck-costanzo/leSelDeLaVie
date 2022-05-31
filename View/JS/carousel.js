const main = document.querySelector('main');

//----  création du carousel
let carousel = document.createElement('section');

    //---- création du slider
    let slider = document.createElement('div');
    slider.setAttribute('class', 'slider')

        //---- creation des images du slider    
        //lien 1
        let carouselImage1 = document.createElement('img');
        carouselImage1.setAttribute('src', 'View/Media/carousel1.jpg');
        carouselImage1.setAttribute('alt', 'image du carousel');

        //lien 2
        let carouselImage2 = document.createElement('img');
        carouselImage2.setAttribute('src', 'View/Media/carousel2.jpg');
        carouselImage2.setAttribute('alt', 'image du carousel');

        //lien 3
        let carouselImage3 = document.createElement('img');
        carouselImage3.setAttribute('src', 'View/Media/carousel3.jpg');
        carouselImage3.setAttribute('alt', 'image du carousel');

        //lien 4
        let carouselImage4 = document.createElement('img');
        carouselImage4.setAttribute('src', 'View/Media/carousel4.jpg');
        carouselImage4.setAttribute('alt', 'image du carousel');

        //lien 5
        let carouselImage5 = document.createElement('img');
        carouselImage5.setAttribute('src', 'View/Media/carousel5.jpg');
        carouselImage5.setAttribute('alt', 'image du carousel');



    //---- création d'un tableau contenant toutes les images
    let carouselTab = [carouselImage1, carouselImage2, carouselImage3, carouselImage4, carouselImage5];

        //ajout d'enfants au slider
        for(let i=0; i<carouselTab.length; i++)
        {
            slider.appendChild(carouselTab[i]);
        }



    

    //---- création bouton gauche
    let boutonGauche = document.createElement('button');    
    boutonGauche.style.backgroundImage = "url('" + slider.lastChild.src + "')";

    let flecheBtnGauche = document.createElement('img');
    flecheBtnGauche.setAttribute('id', 'flechegauche');
    flecheBtnGauche.setAttribute('src', 'View/Media/flecheGauche.svg');
    flecheBtnGauche.setAttribute('alt', 'fleche carousel gauche');

        //event listener quand on clique sur le bouton ou sur la fleche
        boutonGauche.addEventListener('click', ()=> {
            let firstChildTemp = slider.firstChild;
            let lastChildTemp = slider.lastChild;
            firstChildTemp.before(lastChildTemp);
            boutonGauche.style.backgroundImage = "url('" + slider.lastChild.src + "')";
            boutonDroit.style.backgroundImage = "url('" + slider.children[1].src + "')";
            divExtremeDroite.style.backgroundImage = "url('" + slider.children[2].src + "')";
            divExtremeGauche.style.backgroundImage = "url('" + slider.children[3].src + "')";
        })

        flecheBtnGauche.addEventListener('click', ()=> {
            let firstChildTemp = slider.firstChild;
            let lastChildTemp = slider.lastChild;
            firstChildTemp.before(lastChildTemp);
            boutonGauche.style.backgroundImage = "url('" + slider.lastChild.src + "')";
            boutonDroit.style.backgroundImage = "url('" + slider.children[1].src + "')";
            divExtremeDroite.style.backgroundImage = "url('" + slider.children[2].src + "')";
            divExtremeGauche.style.backgroundImage = "url('" + slider.children[3].src + "')";
        })

    //---- création bouton droit
    let boutonDroit = document.createElement('button');
    boutonDroit.style.backgroundImage = "url('" + slider.children[1].src + "')";

    let flecheBtnDroit = document.createElement('img');
    flecheBtnDroit.setAttribute('id', 'flechedroite');
    flecheBtnDroit.setAttribute('src', 'View/Media/flechedroite.svg');
    flecheBtnDroit.setAttribute('alt', 'fleche carousel droite');
    
    // boutonDroit.appendChild(flecheBtnDroit);

        //event listener quand on clique sur le bouton ou sur la fleche
        boutonDroit.addEventListener('click', ()=> {
            let firstChildTemp = slider.firstChild;
            let lastChildTemp = slider.lastChild;
            lastChildTemp.after(firstChildTemp);
            boutonGauche.style.backgroundImage = "url('" + slider.lastChild.src + "')";
            boutonDroit.style.backgroundImage = "url('" + slider.children[1].src + "')";
            divExtremeDroite.style.backgroundImage = "url('" + slider.children[2].src + "')";
            divExtremeGauche.style.backgroundImage = "url('" + slider.children[3].src + "')";
            
        })

        flecheBtnDroit.addEventListener('click', ()=> {
            let firstChildTemp = slider.firstChild;
            let lastChildTemp = slider.lastChild;
            lastChildTemp.after(firstChildTemp);
            boutonGauche.style.backgroundImage = "url('" + slider.lastChild.src + "')";
            boutonDroit.style.backgroundImage = "url('" + slider.children[1].src + "')";
            divExtremeDroite.style.backgroundImage = "url('" + slider.children[2].src + "')";
            divExtremeGauche.style.backgroundImage = "url('" + slider.children[3].src + "')";
            
        })

    //---- création du bouton pour accéder au descriptif de l'activités
    let boutonActivite = document.createElement('a');
    boutonActivite.href = "#";
    boutonActivite.innerHTML = 'Voir Activités';
    boutonActivite.addEventListener('click', () => {
        console.log('YOUPI!')
    })

    //---- création des divs visibles seulement en mode desktop
    let divExtremeDroite = document.createElement('div');
    divExtremeDroite.setAttribute('class', 'desktopCarouselImgs');
    divExtremeDroite.style.backgroundImage = "url('" + slider.children[2].src + "')";

    let divExtremeGauche = document.createElement('div');
    divExtremeGauche.setAttribute('class', 'desktopCarouselImgs');
    divExtremeGauche.style.backgroundImage = "url('" + slider.children[3].src + "')";



//ajout du slider à la section carousel
carousel.appendChild(divExtremeGauche);
carousel.appendChild(boutonGauche);
carousel.appendChild(slider);
carousel.appendChild(boutonDroit);
carousel.appendChild(divExtremeDroite);
carousel.appendChild(boutonActivite);
carousel.appendChild(flecheBtnGauche);
carousel.appendChild(flecheBtnDroit);


//creation de la function pour exploiter dans un autre fichier Js
export function appendCarousel()
{
    main.firstChild.before(carousel);
}