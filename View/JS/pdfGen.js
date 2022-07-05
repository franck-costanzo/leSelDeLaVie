

export default function pdfGen(){

    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();

    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf");


    let inputObject = document.querySelectorAll('.importantLabel, input[type="text"], input[type="radio"], input[type="checkbox"], textarea, select');
    let inputArray = [];

    inputObject.forEach( (element, index) => {
        if (!((element.type == 'radio' || element.type == 'checkbox') && element.checked == false))
        {
            inputArray.push(element);
        }        
    })

    inputArray.forEach( (element) => {
        console.log(element.type)
    })
}