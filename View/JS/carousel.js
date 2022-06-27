// TODO : EVOLUTIONS A VENIR :
// rajout de fetch pour récupérer les informations relatives à l'activité prenant la place centrale
// pour afficher le titre de l'activité ET
// faire que le liens "voir l'activité" renvoie vers la page de cette activité

//---- création d'une constante pour cibler le main
const main = document.querySelector('main');

//----  création du carousel
let carousel = document.createElement('section');
carousel.setAttribute('id', 'divCarousel');

//---- création du slider
let slider = document.createElement('div');
slider.setAttribute('class', 'slider')

fetch('/leSelDeLaVie/articleCarousel')
    .then(response =>{
        return response.json();
    })
    .then(response => {

        response.forEach(element => {

            console.log(element)
            let carouselImg = document.createElement('img');
            carouselImg.setAttribute('src', element.image_url);
            carouselImg.setAttribute('alt', 'image du carousel');
            carouselImg.setAttribute('id', element.id_article);
            carouselImg.setAttribute('class', element.id_form);
            slider.appendChild(carouselImg)
            
        })

    })
    .then(response => {

        Array.from(slider.children).forEach((e)=> {
            console.log(e.value)
        })
        //---- création du bouton pour accéder au descriptif de l'activités
        let formActivité = document.createElement('FORM');
        formActivité.setAttribute('action', 'articledetail');
        formActivité.setAttribute('method', 'POST');
        formActivité.setAttribute('id', 'formActivité')

        let hiddenInputIdArticle = document.createElement('Input');
        hiddenInputIdArticle.setAttribute('type', 'hidden');
        hiddenInputIdArticle.setAttribute('name', 'id_article');
        hiddenInputIdArticle.setAttribute('value', slider.firstChild.id)

        let hiddenInputIdForm = document.createElement('Input');
        hiddenInputIdForm.setAttribute('type', 'hidden');
        hiddenInputIdForm.setAttribute('name', 'id_form')
        hiddenInputIdForm.setAttribute('value', parseInt(slider.firstChild.className))

        let boutonActivite = document.createElement('Input');
        boutonActivite.setAttribute('id', 'boutonActivité');
        boutonActivite.setAttribute('type', 'submit');
        boutonActivite.setAttribute('value', "Voir l'article" );
        boutonActivite.setAttribute('name', 'voir_article');

        formActivité.appendChild(hiddenInputIdArticle);
        formActivité.appendChild(hiddenInputIdForm);
        formActivité.appendChild(boutonActivite);

        //---- création bouton gauche
        let divGauche = document.createElement('div');    
        divGauche.style.backgroundImage = "url('" + slider.lastChild.src + "')";
        divGauche.setAttribute('class', 'divSousLesFleches');

        let divFlecheBtnGauche = document.createElement('div');
        divFlecheBtnGauche.setAttribute('id', 'divflechegauche');
        let flecheBtnGauche = document.createElement('img');
        
        flecheBtnGauche.setAttribute('src', 'View/Media/flecheGauche.svg');
        flecheBtnGauche.setAttribute('alt', 'fleche carousel gauche');

        divFlecheBtnGauche.addEventListener('click', ()=> {
            let firstChildTemp = slider.firstChild;
            let lastChildTemp = slider.lastChild;
            firstChildTemp.before(lastChildTemp);
            divGauche.style.backgroundImage = "url('" + slider.lastChild.src + "')";
            divDroit.style.backgroundImage = "url('" + slider.children[1].src + "')";
            divExtremeDroite.style.backgroundImage = "url('" + slider.children[2].src + "')";
            divExtremeGauche.style.backgroundImage = "url('" + slider.children[3].src + "')";
            hiddenInputIdArticle.setAttribute('value', slider.firstChild.id);
            hiddenInputIdForm.setAttribute('value', parseInt(slider.firstChild.className));
        });

        divFlecheBtnGauche.appendChild(flecheBtnGauche);

        //---- création bouton droit
        let divDroit = document.createElement('div');
        divDroit.style.backgroundImage = "url('" + slider.children[1].src + "')";
        divDroit.setAttribute('class','divSousLesFleches');

        let divFlecheBtnDroit = document.createElement('div');
        divFlecheBtnDroit.setAttribute('id', 'divflechedroite');
        let flecheBtnDroit = document.createElement('img');
        
        flecheBtnDroit.setAttribute('src', 'View/Media/flechedroite.svg');
        flecheBtnDroit.setAttribute('alt', 'fleche carousel droite');
        

        divFlecheBtnDroit.addEventListener('click', ()=> {
            let firstChildTemp = slider.firstChild;
            let lastChildTemp = slider.lastChild;
            lastChildTemp.after(firstChildTemp);
            divGauche.style.backgroundImage = "url('" + slider.lastChild.src + "')";
            divDroit.style.backgroundImage = "url('" + slider.children[1].src + "')";
            divExtremeDroite.style.backgroundImage = "url('" + slider.children[2].src + "')";
            divExtremeGauche.style.backgroundImage = "url('" + slider.children[3].src + "')";
            hiddenInputIdArticle.setAttribute('value', slider.firstChild.id);
            hiddenInputIdForm.setAttribute('value', parseInt(slider.firstChild.className));
        })

        divFlecheBtnDroit.appendChild(flecheBtnDroit);

        //---- création des divs visibles seulement en mode desktop
        let divExtremeDroite = document.createElement('div');
        divExtremeDroite.setAttribute('class', 'desktopCarouselImgs');
        divExtremeDroite.style.backgroundImage = "url('" + slider.children[2].src + "')";

        let divExtremeGauche = document.createElement('div');
        divExtremeGauche.setAttribute('class', 'desktopCarouselImgs');
        divExtremeGauche.style.backgroundImage = "url('" + slider.children[3].src + "')";



        //ajout du slider à la section carousel
        carousel.appendChild(divExtremeGauche);
        carousel.appendChild(divGauche);
        carousel.appendChild(slider);
        carousel.appendChild(divDroit);
        carousel.appendChild(divExtremeDroite);
        carousel.appendChild(divFlecheBtnGauche);
        carousel.appendChild(divFlecheBtnDroit);
        carousel.appendChild(formActivité);

    })

//creation de la function pour exploiter dans un autre fichier Js
export default function appendCarousel()
{
    main.firstChild.before(carousel);
}