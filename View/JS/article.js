export default function article() {

    let submitButton = document.getElementById('reg_article');
    let inputNameArticle = document.getElementById('name_article');
    let selectIdForm = document.getElementById('id_form');
    let inputImg = document.getElementById('image_url');
    let inputImgDiv = document.getElementById('fileInputCreationArticle')
    let inputDescription = document.getElementById('description_article');

    //---- counter pour dénombrer les elements du meme type rajouté
    var textCount = 1;
    var textAreaCount = 1;
    var selectCount = 1;
    var checkboxCount = 1;
    var radioCount = 1;
    var fileCount = 1;

    submitButton.addEventListener('click', function (e) {
        console.log('YOUPIX');
    });

    //variable relative à la div globale de la preview
    const previewFormDiv = document.getElementById('previewFormulaire');
    const fieldsetLegend = document.querySelector('#previewFormulaire legend');

    //creation et append du titre de la preview
    let titreForm = document.createElement('H2');
    previewFormDiv.appendChild(titreForm);

    let description_article = document.createElement('P');
    previewFormDiv.appendChild(description_article);
    description_article.style.margin = "2% 3%"

    inputNameArticle.addEventListener('keyup', function (e) {
        titreForm.innerHTML = inputNameArticle.value;
    });

    inputDescription.addEventListener('keyup', function (e) {
        description_article.innerHTML = inputDescription.value;
    });

    selectIdForm.addEventListener('change', (e) => {

        console.log(previewFormDiv.lastChild);
        if (previewFormDiv.hasChildNodes())
        {
            while (previewFormDiv.lastChild) 
            {
                if(previewFormDiv.lastChild.tagName == 'P')
                { 
                    break;
                }
                
                previewFormDiv.lastChild.remove();
            }
        }

        let idForm = e.target.value;

        fetch('/leSelDeLaVie/articleForms')
            .then(response =>{
                return response.json();
            })
            .then(response => {

                response.forEach(element => {

                    if (element.id_form == idForm) 
                    {
                        switch (element.module_type)
                        {
                            case 'text':
                                let inputText = document.createElement('INPUT');
                                inputText.setAttribute('type', 'text');
                                inputText.setAttribute('name', 'text[]');
                                inputText.setAttribute('id', 'text'+textCount);
                                let labelText = document.createElement('LABEL');
                                labelText.setAttribute('for', 'text'+textCount);
                                labelText.innerHTML = element.module_label;
                                previewFormDiv.appendChild(labelText);
                                previewFormDiv.appendChild(inputText);
                                textCount++;
                                break;

                            case 'textarea':
                                let inputTextarea = document.createElement('textarea');
                                inputTextarea.setAttribute('name', 'textarea[]');
                                inputTextarea.setAttribute('rows','5');
                                inputTextarea.setAttribute('cols', '50');
                                inputTextarea.setAttribute('id', 'textarea'+textAreaCount);
                                let labelTextarea = document.createElement('LABEL');
                                labelTextarea.setAttribute('for', 'text'+textAreaCount);
                                labelTextarea.innerHTML = element.module_label;
                                previewFormDiv.appendChild(labelTextarea);
                                previewFormDiv.appendChild(inputTextarea);
                                textAreaCount++;
                                break;

                            case 'file':
                                let inputMainDiv = document.createElement('DIV');
                                inputMainDiv.setAttribute('id', 'fileInputCreationArticle')
                                let inputFile = document.createElement('INPUT');
                                inputFile.setAttribute('type', 'file');
                                inputFile.setAttribute('name', 'file[]');
                                inputFile.setAttribute('id', 'file'+fileCount);
                                inputFile.setAttribute('class', 'fileInputs');
                                let labelFile = document.createElement('LABEL');
                                labelFile.setAttribute('for', 'file'+fileCount);
                                let fileImg = document.createElement('IMG');
                                fileImg.setAttribute('src', './View/Media/upload.svg')
                                let fileP = document.createElement('P');
                                fileP.innerHTML = element.module_label;

                                previewFormDiv.appendChild(inputMainDiv);
                                inputMainDiv.appendChild(labelFile);
                                labelFile.appendChild(fileImg);
                                inputMainDiv.appendChild(inputFile);
                                inputMainDiv.appendChild(fileP);

                                fileCount++;
                                break;

                            case 'select':
                                let inputSelect = document.createElement('SELECT');
                                inputSelect.setAttribute('name', 'select[]');
                                inputSelect.setAttribute('id', 'select'+selectCount);
                                let disabledOptionSelect = document.createElement('OPTION');
                                disabledOptionSelect.setAttribute('disabled', 'disabled');
                                disabledOptionSelect.setAttribute('selected', 'selected');
                                disabledOptionSelect.innerHTML = 'Veuillir choisir';
                                inputSelect.appendChild(disabledOptionSelect);
                                let labelSelect = document.createElement('LABEL');
                                labelSelect.setAttribute('for', 'select'+selectCount);
                                labelSelect.innerHTML = element.module_label;
                                let optionNameString = element.option_names;
                                let optionArray = optionNameString.split('||');
                                optionArray.forEach(element => {
                                    let option = document.createElement('OPTION');
                                    option.setAttribute('value', element);
                                    option.innerHTML = element;
                                    inputSelect.appendChild(option);
                                    }
                                );

                                previewFormDiv.appendChild(labelSelect);
                                previewFormDiv.appendChild(inputSelect);

                                selectCount++;
                                break;

                            case 'checkbox':

                                console.log('checkbox');
                                let fieldsetCheckbox = document.createElement('fieldset');
                                fieldsetCheckbox.setAttribute('type', 'checkbox');
                                fieldsetCheckbox.setAttribute('name', 'checkbox[]');
                                fieldsetCheckbox.setAttribute('id', 'checkbox'+checkboxCount);
                                let labelCheckbox = document.createElement('legend');
                                labelCheckbox.innerHTML = element.module_label;
                                let checkboxArray = element.option_names.split('||')
                                checkboxArray.forEach(element => {
                                    let optionDiv = document.createElement('DIV');
                                    let option = document.createElement('INPUT');
                                    option.setAttribute('type', 'checkbox');
                                    option.setAttribute('name', 'checkbox['+ checkboxCount +'][]');
                                    option.setAttribute('value', element);
                                    option.setAttribute('id', 'checkbox'+checkboxCount+'_'+element);
                                    let label = document.createElement('LABEL');
                                    label.setAttribute('for', 'checkbox'+checkboxCount+'_'+element);
                                    label.innerHTML = element;
                                    optionDiv.appendChild(option);
                                    optionDiv.appendChild(label);
                                    fieldsetCheckbox.appendChild(optionDiv);
                                });
                                previewFormDiv.appendChild(fieldsetCheckbox);
                                fieldsetCheckbox.appendChild(labelCheckbox);

                                checkboxCount++;
                                break;

                            case 'radio':
                                console.log('radio');
                                let fieldsetRadio = document.createElement('fieldset');
                                fieldsetRadio.setAttribute('type', 'radio');
                                fieldsetRadio.setAttribute('name', 'radio[]');
                                fieldsetRadio.setAttribute('id', 'radio'+radioCount);
                                let labelRadio = document.createElement('legend');
                                labelRadio.innerHTML = element.module_label;
                                let radioArray = element.option_names.split('||')
                                radioArray.forEach(element => {
                                    let optionDiv = document.createElement('DIV');
                                    let option = document.createElement('INPUT');
                                    option.setAttribute('type', 'radio');
                                    option.setAttribute('name', 'radio['+ radioCount +'][radio]');
                                    option.setAttribute('value', element);
                                    option.setAttribute('id', 'radio'+radioCount+'_'+element);
                                    let label = document.createElement('LABEL');
                                    label.setAttribute('for', 'radio'+radioCount+'_'+element);
                                    label.innerHTML = element;
                                    optionDiv.appendChild(option);
                                    optionDiv.appendChild(label);
                                    fieldsetRadio.appendChild(optionDiv);
                                });
                                previewFormDiv.appendChild(fieldsetRadio);
                                fieldsetRadio.appendChild(labelRadio);

                                radioCount++;
                                break;

                        };
                    }

                    
                })

                let genererPDF = document.createElement('BUTTON');
                genererPDF.innerHTML = 'Générer le PDF';
                previewFormDiv.appendChild(genererPDF);

            })

    });

    inputImg.addEventListener('change', (e) => {
        let allImgs = document.querySelector('#imgPreview');
        let imgPrev = document.querySelector('#imgPreviewArticle')

        if (allImgs != null && imgPrev != null && allImgs.length > 0 && imgPrev.length > 0) 
        {
            allImgs.remove();
            imgPrev.remove();
        }

        let file = e.target.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            let img = document.createElement('IMG');
            img.setAttribute('src', e.target.result);
            img.setAttribute('id', 'imgPreview');
            inputImgDiv.after(img);
            console.log('youpi');

            let imgPreview = document.createElement('IMG');
            imgPreview.setAttribute('src', e.target.result);
            imgPreview.setAttribute('id', "imgPreviewArticle");
            imgPreview.style.maxWidth = '60%';
            imgPreview.style.objectFit = 'contain';
            imgPreview.style.margin = '0 auto'           
            description_article.before(imgPreview);    
            console.log('youpla');
        }
    });



}