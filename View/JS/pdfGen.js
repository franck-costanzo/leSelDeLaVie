export default function pdfGen(){

    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();

    let sizeUp = 10;

    let inputObject = document.querySelectorAll('.importantLabel, input[type="text"], input[type="radio"], input[type="checkbox"], textarea, select');
    let inputArray = [];

    inputObject.forEach( (element, index) => {
        if (!((element.type == 'radio' || element.type == 'checkbox') && element.checked == false))
        {
            inputArray.push(element);
        }        
    })

    console.log(inputArray);

    inputArray.forEach( (element) => {
        switch(element.tagName) {
            case 'LABEL' : 
                doc.text(element.innerHTML, 10, sizeUp)
                sizeUp+=10;
                break;
            case 'INPUT' :
                if (element.type == 'checkbox'){
                    doc.text(element.name, 10, sizeUp)
                sizeUp+=10;
                }else{
                    doc.text(element.value, 10, sizeUp)
                    sizeUp+=10;
                }                
                break;
            case 'TEXTAREA' :
                doc.text(element.innerHTML, 10, sizeUp)
                sizeUp+=10;
                break;
            
            case 'LEGEND' :
                doc.text(element.innerHTML, 10, sizeUp)
                sizeUp+=10;
                break;

            case 'SELECT' :
                doc.text(element.value, 10, sizeUp)
                sizeUp+=10;
                break;
        }
    })

    const submit = document.querySelector('input[type="submit"]')
    submit.addEventListener('click', () =>
    {
        doc.save("a4.pdf");
    })
}