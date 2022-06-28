//creation de la function pour exploiter dans un autre fichier Js
export default function appendCarousel()
{

//---- création d'une constante pour cibler le main
const main = document.querySelector('main');

//----  création du carousel
let carousel = document.createElement('section');
carousel.setAttribute('id', 'divCarousel');

//---- création de la div pour le backgroup
let carouselBgDiv = document.createElement('div');
carouselBgDiv.className = "BGdiv";

//---- création du slider
let slider = document.createElement('div');
slider.setAttribute('class', 'slider');

fetch('/leSelDeLaVie/articleCarousel')
    .then(response =>{
        return response.json();
    })
    .then(response => {

        response.forEach(element => {

            let carouselImg = document.createElement('img');
            carouselImg.setAttribute('src', element.image_url);
            carouselImg.setAttribute('alt', element.name_article);
            carouselImg.setAttribute('id', element.id_article);
            carouselImg.setAttribute('class', element.id_form);
            slider.appendChild(carouselImg)
            
        })

    })
    .then(() => {

        //---- création du bouton pour accéder au descriptif de l'activités
        let boutonActivite = document.createElement('Input');
        boutonActivite.setAttribute('id', 'boutonActivité');
        boutonActivite.setAttribute('type', 'submit');
        boutonActivite.setAttribute('value', "Voir l'article" );
        boutonActivite.setAttribute('name', 'voir_article');

            //creation du formulaire dans lequel sera le bouton
            let formActivité = document.createElement('FORM');
            formActivité.setAttribute('action', 'articledetail');
            formActivité.setAttribute('method', 'POST');
            formActivité.setAttribute('id', 'formActivité')

            //creation des inputs hidden portant les valeurs à transmettre pour l'affichage de l'article
            let hiddenInputIdArticle = document.createElement('Input');
            hiddenInputIdArticle.setAttribute('type', 'hidden');
            hiddenInputIdArticle.setAttribute('name', 'id_article');
            hiddenInputIdArticle.setAttribute('value', slider.firstChild.id)

            let hiddenInputIdForm = document.createElement('Input');
            hiddenInputIdForm.setAttribute('type', 'hidden');
            hiddenInputIdForm.setAttribute('name', 'id_form')
            hiddenInputIdForm.setAttribute('value', parseInt(slider.firstChild.className))        

            //ajout au DOM
            formActivité.appendChild(hiddenInputIdArticle);
            formActivité.appendChild(hiddenInputIdForm);
            formActivité.appendChild(boutonActivite);

        //---- création du titre de l'évènement
        let titreArticle = document.createElement('H3');
        titreArticle.className = "titreArticle";
        titreArticle.innerHTML = slider.firstChild.alt.charAt(0).toUpperCase() + slider.firstChild.alt.slice(1);

        //----creation de la fleche gauche
        let divFlecheBtnGauche = document.createElement('div');
        divFlecheBtnGauche.setAttribute('id', 'divflechegauche');
        let flecheBtnGauche = document.createElement('img');
        
            flecheBtnGauche.setAttribute('src', 'View/Media/fleche.svg');
            flecheBtnGauche.setAttribute('alt', 'fleche carousel gauche');

            divFlecheBtnGauche.addEventListener('click', ()=> {
                let firstChildTemp = slider.firstChild;
                let lastChildTemp = slider.lastChild;
                firstChildTemp.before(lastChildTemp);
                hiddenInputIdArticle.setAttribute('value', slider.firstChild.id);
                hiddenInputIdForm.setAttribute('value', parseInt(slider.firstChild.className));
                carouselBgDiv.style.backgroundImage = 'url('+slider.firstChild.src+')';
                titreArticle.innerHTML = slider.firstChild.alt.charAt(0).toUpperCase() + slider.firstChild.alt.slice(1);
            });

            divFlecheBtnGauche.appendChild(flecheBtnGauche);

        //----creation de la fleche droite
        let divFlecheBtnDroit = document.createElement('div');
        divFlecheBtnDroit.setAttribute('id', 'divflechedroite');
        let flecheBtnDroit = document.createElement('img');
        
            flecheBtnDroit.setAttribute('src', 'View/Media/fleche.svg');
            flecheBtnDroit.setAttribute('alt', 'fleche carousel droite');
            

            divFlecheBtnDroit.addEventListener('click', ()=> {
                let firstChildTemp = slider.firstChild;
                let lastChildTemp = slider.lastChild;
                lastChildTemp.after(firstChildTemp);
                hiddenInputIdArticle.setAttribute('value', slider.firstChild.id);
                hiddenInputIdForm.setAttribute('value', parseInt(slider.firstChild.className));
                carouselBgDiv.style.backgroundImage = 'url('+slider.firstChild.src+')';
                titreArticle.innerHTML = slider.firstChild.alt.charAt(0).toUpperCase() + slider.firstChild.alt.slice(1);
            })

            divFlecheBtnDroit.appendChild(flecheBtnDroit);

        //ajout du slider à la section carousel
        carousel.appendChild(carouselBgDiv);
        carousel.appendChild(slider);
        carousel.appendChild(divFlecheBtnGauche);
        carousel.appendChild(divFlecheBtnDroit);
        carousel.appendChild(formActivité);
        carousel.appendChild(titreArticle);

        function changeCarousel()
        {
            let firstChildTemp = slider.firstChild;
            let lastChildTemp = slider.lastChild;
            firstChildTemp.before(lastChildTemp);
            hiddenInputIdArticle.setAttribute('value', slider.firstChild.id);
            hiddenInputIdForm.setAttribute('value', parseInt(slider.firstChild.className));
            carouselBgDiv.style.backgroundImage = 'url('+slider.firstChild.src+')';
            titreArticle.innerHTML = slider.firstChild.alt.charAt(0).toUpperCase() + slider.firstChild.alt.slice(1);
        }

        setInterval(changeCarousel, 4000);
        carouselBgDiv.style.backgroundImage = 'url('+slider.firstChild.src+')';
        
    })
    // .then ( )


    main.firstChild.before(carousel);
}