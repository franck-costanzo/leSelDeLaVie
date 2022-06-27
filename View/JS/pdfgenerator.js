export default function pdfGenerator(){    
    
    const pdf = new jsPDF();

    const textLabel = document.getElementById('supaTXTlabel');
    console.log(textLabel.innerHTML);
    const textInput = document.getElementById('supaTXT');
    const textAreaLabel = document.getElementById('supaTXTAREAlabel');
    console.log(textAreaLabel.innerHTML);
    const textArea = document.getElementById('supaTXTAREA');
    const button = document.getElementById('SUPABUTTON');
    const imglabel = document.getElementById('labelimg');
    const imgInput = document.getElementById('image_url');

    imgInput.addEventListener('change', (e) => {
        console.table(e.target.files[0]);
        let file = e.target.files[0];
        let fileReader = new FileReader();
        fileReader.readAsText(file);
        console.log(file)
        let test = window.URL.createObjectURL(file);
        console.log(test.valueOf())
    })

    button.addEventListener('click', (e) => {
        e.preventDefault();
        pdf.text(textLabel.innerHTML, 50, 10 ,{ align: 'center' });
        pdf.text(textInput.value, 10, 20);
        
        pdf.addPage();
        pdf.setPage(2);
        pdf.text(textAreaLabel.innerHTML, 10, 30);
        pdf.text(textArea.value, 10, 40);
        pdf.text(imglabel.innerHTML, 10, 50);
        pdf.save('test.pdf');
        
    });

}