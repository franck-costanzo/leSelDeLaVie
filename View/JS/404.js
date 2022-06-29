export default function f404() {

    let main404 = document.querySelector('main');
    let main404Height = main404.offsetHeight;
    let main404Width = main404.offsetWidth;

    let image404 = document.createElement('img');
    image404.src = './View/Media/logo-sel-homme-ballon-seul.svg';
    image404.style.position = 'absolute';
    image404.style.width = '4%';

    main404.appendChild(image404);

    let count = 0;

    function randomPosition() {        
        image404.style.bottom = '0px';
        let leftPos = parseInt(Math.round(Math.random() *( main404.offsetWidth - 0)));
        image404.style.left = leftPos + 'px'; 
    }

    randomPosition();
    function increaseHeight()
    {
        if (image404.style.bottom != (main404Height+'px'))
        {
            count += 1;
            image404.style.bottom = count+"px";
        }
        else
        {
            count = 0;
            image404.style.bottom = '0px';
            randomPosition();
        }
    }


    setInterval(increaseHeight, 12);
    
}