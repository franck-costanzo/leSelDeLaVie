export default function f404() {

    //----setting variable for main div to append moving img
    let main404 = document.querySelector('main');

        //getting it's height
        let main404Height = main404.offsetHeight;

    //----creating the image, styling it and addint it to the DOM
    let image404 = document.createElement('img');
    image404.src = './View/Media/logo-sel-homme-ballon-seul.svg';
    image404.style.position = 'absolute';
    image404.style.width = '4%';
    image404.style.bottom = '0px';
    main404.appendChild(image404);

    //----creating a KeyFrameEffect on the image that will translate it vertically
    var imgKeyFrame = new KeyframeEffect(
        image404,
        [
            { transform: 'translateY(0px)', left: parseInt(Math.round(Math.random() *( main404.offsetWidth - 0))) + 'px' },
            { transform: 'translateY(-'+main404Height+'px)', left : parseInt(Math.round(Math.random() *( main404.offsetWidth - 0))) + 'px'}
        ], 
        {
            duration: parseInt(Math.round(Math.random() * 7500))           
        }
    );

    //----creating an animation using the keyFrameEffect
    var imgAnim = new Animation(imgKeyFrame, document.timeline);
        
        //launching the animation
        imgAnim.play();

        //randomising again the starting point and its velocity
        imgAnim.onfinish = () => (
            imgKeyFrame.setKeyframes([
                { transform: 'translateY(0px)', left: parseInt(Math.round(Math.random() *( main404.offsetWidth - 0))) + 'px' },
                { transform: 'translateY(-'+main404Height+'px)', left : parseInt(Math.round(Math.random() *( main404.offsetWidth - 0))) + 'px'}
                ]),
            imgKeyFrame.updateTiming( 
                {
                    duration: parseInt(Math.round(Math.random() * 7500))   
                }), 
            imgAnim.play()
        )    
    
}