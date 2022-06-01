const imageEl = document.getElementById("fadingImage");
const images = [
    'View/Media/carousel1.jpg',
    'View/Media/carousel2.jpg',
    'View/Media/carousel3.jpg',
    'View/Media/carousel4.jpg',
    'View/Media/carousel5.jpg'
];

export default function changePicture() {
    imageEl.style.backgroundImage = `url('View/Media/carousel1.jpg')`;
    window.setInterval(intervalChange, 5000);
    let i = 0;
    function intervalChange() {
    i++;
    if (i > images.length - 1) i = 0;
    imageEl.style.backgroundImage = `url(${images[i]})`;
    // imageEl.setAttribute('style', `--test:url('${images[i]}');`);
    }
}
