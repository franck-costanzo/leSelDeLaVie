export default function pdfGen(){

    //---- Constante pour ciblage d'élément à utiliser
    const genpdf = document.querySelector('input[type="submit"]');
    const titre = document.querySelector('legend');
    const docHeight = 277;
    let doc;
    
    function creationPdf(){

        //---- Default export is a4 paper, portrait, using millimeters for units
        doc = new jsPDF();

        //---- Creation de l'entête des pdf à imprimer
        //Logo sel de la vie
        let imgEntete = new Image();
        imgEntete.src = 'View/Media/logo-pdf.jpg';
        let canvas = document.createElement('canvas');
        canvas.setAttribute('width', '189px');
        canvas.setAttribute('height', '275px');

        let ctx = canvas.getContext("2d");
        imgEntete.onload = function () {
            ctx.drawImage(imgEntete, 0, 0);
            var imgData = canvas.toDataURL('img/jpeg', 1.0);
            doc.addImage(imgData, 'JPEG',  158, 0, 50, 72);
        }

        //titre
        doc.text("FORMULAIRE D'INSCRIPTION", 105, 30, null, null, "center")
        doc.text(titre.innerHTML, 105, 40, null, null, "center");
        
        doc.addFont('View/Fonts/Roboto-Thin-normal.ttf', 'Roboto-Thin', 'normal');
        doc.setFont('Roboto-Thin', 'normal')

    }
    
    creationPdf();
    
    genpdf.addEventListener('click', () =>
    {
        //---- page function
        function pageFunction()
        {
            if (sizeUp >= docHeight)
            {
                doc.addPage();
                doc.setPage(doc.internal.getNumberOfPages());
                sizeUp = 20;
            }
        }

        //premiere ligne des champs à afficher
        let sizeUp = 80;

        let inputObject = document.querySelectorAll('.importantLabel, input[type="text"], input[type="radio"], input[type="checkbox"], textarea, select');
        let inputArray = [];

        inputObject.forEach( (element, index) => {
            if (!((element.type == 'radio' || element.type == 'checkbox') && element.checked == false))
            {
                inputArray.push(element);
            }        
        })

        inputArray.forEach( (element) => {
            switch(element.tagName) 
            {
                case 'LABEL' :
                case 'LEGEND' :
                    pageFunction()
                    doc.text(element.innerHTML, 10, sizeUp)
                    //after drawing your text
                    const textWidth = doc.getTextWidth(element.innerHTML); 
                    doc.line(10, sizeUp+1, 10 + textWidth, sizeUp+1)
                    sizeUp+=10;
                    break;
                case 'INPUT' :
                case 'SELECT' :
                    pageFunction()
                    doc.text(element.value, 15, sizeUp)
                    sizeUp+=15;
                    break;
                case 'TEXTAREA' :
                    let splitText = doc.splitTextToSize(element.value, 180);
                    splitText.forEach( (text) => {
                        pageFunction()
                        doc.text(text, 15, sizeUp)
                        sizeUp+=10;
                    })
                    sizeUp+=15;
                    break;
            }
        })

        doc.save("formulaireInscript.pdf");
        doc = "";
        creationPdf(doc);
    })
}