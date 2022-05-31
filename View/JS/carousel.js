const main = document.querySelector('main');

//création du carousel
let carousel = document.createElement('section');

//lien 1
let carousel1 = document.createElement('a');
carousel1.href = "#";
let carouselImage1 = document.createElement('img');
carouselImage1.setAttribute('src', 'View/Media/carousel1.jpg');
carouselImage1.setAttribute('alt', 'image du carousel');
carousel1.appendChild(carouselImage1);

//lien 2
let carousel2 = document.createElement('a');
carousel2.href = "#";
let carouselImage2 = document.createElement('img');
carouselImage2.setAttribute('src', 'View/Media/carousel2.jpg');
carouselImage2.setAttribute('alt', 'image du carousel');
carousel2.appendChild(carouselImage2);

//lien 3
let carousel3 = document.createElement('a');
carousel3.href = "#";
let carouselImage3 = document.createElement('img');
carouselImage3.setAttribute('src', 'View/Media/carousel3.jpg');
carouselImage3.setAttribute('alt', 'image du carousel');
carousel3.appendChild(carouselImage3);

//lien 4
let carousel4 = document.createElement('a');
carousel4.href = "#";
let carouselImage4 = document.createElement('img');
carouselImage4.setAttribute('src', 'View/Media/carousel4.jpg');
carouselImage4.setAttribute('alt', 'image du carousel');
carousel4.appendChild(carouselImage4);

//lien 5
let carousel5 = document.createElement('a');
carousel5.href = "#";
let carouselImage5 = document.createElement('img');
carouselImage5.setAttribute('src', 'View/Media/carousel5.jpg');
carouselImage5.setAttribute('alt', 'image du carousel');
carousel5.appendChild(carouselImage5);

let carouselTab = [carousel1, carousel2, carousel3, carousel4, carousel5];

for(let i=0; i<carouselTab.length; i++)
{
    carousel.appendChild(carouselTab[i]);
}

//creation de la function pour exploiter dans un autre fichier Js
export function appendCarousel()
{
    main.appendChild(carousel);
}