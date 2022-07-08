//création d'une constante pour cibler la balise contenant les images
const imageEl = document.getElementById("fadingImage");

//fabrication d'un array qui contient les urls des images du changeur d'image
const images = [
    'View/Media/carousel1.jpg',
    'View/Media/carousel2.jpg',
    'View/Media/carousel3.jpg',
    'View/Media/carousel4.jpg',
    'View/Media/carousel5.jpg'
];


//creation de la function pour exploiter dans un autre fichier Js
export default function changePicture() {

    //définition de la première image à afficher via JS, impossibilité de le faire via CSS, bug obscur
    imageEl.style.backgroundImage = `url('View/Media/carousel1.jpg')`;

    //création d'un compteur extérieur à fonction
    let i = 0;
    function intervalChange() 
    {
        //à chaque interval qui va utiliser la fonction, on ajoute +1 à i pour cibler une entrée différente du tableau d'image
        i++;

        //si i est > à l'index maximal, alors on le met à zéro pour recommencer par la premiere image du tableau à l'index 0
        if (i > images.length - 1)
        {
            i = 0;
        }

        //on change l'url du background image par celui relatif au tableau images pré-créé
        imageEl.style.backgroundImage = `url(${images[i]})`;
    }

    window.setInterval(intervalChange, 5000);
}