export default function appendFormView()
{
    //variable relative à la div globale de la preview
    const previewFormDiv = document.getElementById('formArticle');
    console.log(previewFormDiv);

    let idForm = window.location.search.split('&')[1].split('=')[1];
    //---- counter pour dénombrer les elements du meme type rajouté
    var textCount = 1;
    var textAreaCount = 1;
    var selectCount = 1;
    var checkboxCount = 1;
    var radioCount = 1;
    var fileCount = 1;

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

                    case 'textArea':
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
}               