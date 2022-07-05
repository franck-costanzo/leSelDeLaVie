export default function pdfGen(){

    let inputObject = document.querySelectorAll('.importantLabel, input[type="text"], input[type="radio"], input[type="checkbox"], textarea, select');
    let inputArray = [];

    inputObject.forEach( (element, index) => {
        if (!((element.type == 'radio' || element.type == 'checkbox') && element.checked == false))
        {
            inputArray.push(element);
        }
        
    })

    console.log(inputArray);
}