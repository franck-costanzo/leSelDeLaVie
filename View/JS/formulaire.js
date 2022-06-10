//TODO : AJOUT DE L ELEMENT UPLOAD DE FICHIER !

export default function appendForm() {
    
    const submitButton = document.getElementById('reg_form');

    function getFieldSetOrder()
    {
        let divFormFormulaireGenerator = document.querySelector('div form')
        let fieldsetsInside = divFormFormulaireGenerator.querySelectorAll('fieldset');
        fieldsetsInside.forEach( (element, index) => {
            let hiddenInput = element.querySelector('input[type=hidden]');
            let mainType = element.querySelector('input[type=text]');
            hiddenInput.setAttribute('name', mainType.name.replace('[description]','') + '[order]');
            hiddenInput.setAttribute('value', index);
        })
    }

    //---- gestion de la preview
    const previewFormDiv = document.getElementById('previewFormulaire');
    const nameForm = document.getElementById('name_form');
    let titreForm = document.createElement('H2');
    previewFormDiv.appendChild(titreForm);

    nameForm.addEventListener('keyup', () => { 
        titreForm.innerHTML = nameForm.value;
    });

    //---- création du bouton d'ajout de champ
    const addSelectType = document.createElement('button');
    addSelectType.setAttribute('type', 'button');
    addSelectType.setAttribute('class', 'addSelectType');
    let addSelectTypeImg = document.createElement('img');
    addSelectTypeImg.setAttribute('src', './View/Media/plus.svg');
    addSelectType.append(addSelectTypeImg);

    submitButton.before(addSelectType);

    addSelectType.addEventListener('click', () => {
        selectTypeAppend();
    });

    //---- counter pour dénombrer les elements du meme type rajouté
    var textCount = 0;
    var textAreaCount = 0;
    var selectCount = 0;
    var checkboxCount = 0;
    var radioCount = 0;
    var fileCount = 0;
    var orderCount = 0;

    //variable temporaire utilisée pour l'append dans la preview
    var tempStoredDiv;

    function selectTypeAppend(targetedDiv = null, beforeOrAfter = null)
    {
        //---- creation du select d'element à ajouter au formulaire
            //label
            let selectTypeLabel = document.createElement('label');
            selectTypeLabel.setAttribute('for', 'select_type');
            selectTypeLabel.innerText = 'Choisir un type de champ à ajouter';

            //select
            let selectType = document.createElement('select');
            selectType.setAttribute('name','select_type[]');
            selectType.setAttribute('id', 'select_type');
            
            //function d'append d'option au select
            function appendOption(valueString, selectedBool, disabledBool, innerHtmlString)
            {
                let option = document.createElement('option');
                option.setAttribute('value', valueString);
                option.selected = selectedBool;
                option.disabled = disabledBool;
                option.innerText = innerHtmlString;
                selectType.appendChild(option);
            }

            //utilisation de la fonction d'append
            appendOption('disabled', true, true, 'choisissez une option');
            appendOption('text', false, false, 'champ de texte');
            appendOption('textarea', false, false,'champ de commentaire');
            appendOption('select', false, false,'choix parmis une liste');
            appendOption('checkbox', false, false,'choix multiples, case à cocher');
            appendOption('radio', false, false,'choix unique (ex: oui/non)');
            appendOption('file', false, false, 'ajout de fichier');


        //---- ajout du bouton d'effacement d'un champ
            //creation du bouton
            let deleteSelectType = document.createElement('button');
            deleteSelectType.setAttribute('type', 'button');
            deleteSelectType.setAttribute('class', 'deleteSelectType');
            
            //creation de l'image du bouton
            let deleteSelectTypeImg = document.createElement('img');
            deleteSelectTypeImg.setAttribute('src', './View/Media/poubelle.svg');
            deleteSelectType.append(deleteSelectTypeImg);

            //event listener click sur delete
            deleteSelectType.addEventListener('click', () => {
                choiceDiv.remove();
                previewTextDivLabel.remove();
                previewTextDiv.remove();
                getFieldSetOrder();
            })

        //---- ajout d'un bouton qui ajoute un nouveau selecteur de champ directement apres ce fieldset
            //creation du bouton
            let addSelectTypeInsideFieldset = document.createElement('button');
            addSelectTypeInsideFieldset.setAttribute('type', 'button');
            addSelectTypeInsideFieldset.setAttribute('class', 'addSelectTypeInsideFieldset');

            //creation de l'image du bouton
            let addSelectTypeInsideFieldsetImg = document.createElement('img');
            addSelectTypeInsideFieldsetImg.setAttribute('src', './View/Media/plus.svg');
            addSelectTypeInsideFieldset.append(addSelectTypeInsideFieldsetImg);

            

        //---- creation de la div pour injecter le choix fait dans le select
        let choiceDiv = document.createElement('fieldset');

        //---- ajout au dom des différents éléments
        if (targetedDiv == null && beforeOrAfter == null)
        {
            addSelectType.before(choiceDiv); //ICI DETERMINE LA POSITION DU SELECT DE TYPE D'ELEMENT DANS LE DOM
            choiceDiv.appendChild(selectTypeLabel)
            selectTypeLabel.after(selectType);
            choiceDiv.appendChild(deleteSelectType);
            choiceDiv.appendChild(addSelectTypeInsideFieldset);
        }
        else if (targetedDiv != null && beforeOrAfter == 'after')
        {
            targetedDiv.after(choiceDiv);
            choiceDiv.appendChild(selectTypeLabel)
            selectTypeLabel.after(selectType);
            choiceDiv.appendChild(deleteSelectType);
            choiceDiv.appendChild(addSelectTypeInsideFieldset)
        }  
        


        //---- ajout d'event listener sur le select qui permet de choisir le type d'élément
        selectType.addEventListener('change', () => {

            //switch case pour tester le choix d'option 
            switch (selectType.value)
            {
                
                //choix champ de texte
                case "text":

                    //---- creation de la légende du fieldset
                    let fieldsetTextLegend = document.createElement('legend');
                    fieldsetTextLegend.innerText = 'champ de texte';

                    //---- création de l'input text pour saisir le champ libellé
                    let textDiv = document.createElement('input');
                    textDiv.setAttribute('type', 'text');
                    textDiv.setAttribute('name', 'text['+ textCount +'][description]');
                    textDiv.setAttribute('id', 'text');

                    //---- création de l'input hidden pour sauvegarder l'order de la div
                    let hiddenInput = document.createElement('input');
                    hiddenInput.setAttribute('type', 'hidden');

                    //label
                    let textDivLabel = document.createElement('label');
                    textDivLabel.setAttribute('for','text');
                    textDivLabel.innerText = "Choisissez le label de votre champ"
                                            +"\n ( Ex :  Veuillez entrer votre nom )";

                    //ajout au dom
                    deleteSelectType.before(fieldsetTextLegend);
                    deleteSelectType.before(textDivLabel);
                    textDivLabel.after(textDiv);
                    textDiv.after(hiddenInput);

                    //add input text Preview
                    let previewTextDiv = document.createElement('input');
                    previewTextDiv.setAttribute('type','text');
                    previewTextDiv.setAttribute('id', 'previewTextDiv['+textCount+']')
                    let previewTextDivLabel = document.createElement('label');
                    previewTextDivLabel.setAttribute('for','previewTextDiv');
                    
                    //event listener click sur add
                    addSelectTypeInsideFieldset.addEventListener('click', () => {
                        tempStoredDiv = previewTextDiv;
                        selectTypeAppend(addSelectTypeInsideFieldset.parentNode, 'after'); 
                    })

                    //append du preview
                    if (targetedDiv == null && beforeOrAfter == null)
                    {
                        previewFormDiv.appendChild(previewTextDivLabel);
                        previewTextDivLabel.after(previewTextDiv);
                    }
                    else if (targetedDiv != null && beforeOrAfter == 'after')
                    {                       
                        tempStoredDiv.after(previewTextDivLabel);
                        previewTextDivLabel.after(previewTextDiv);
                    }


                    textDiv.addEventListener('keyup', () => { 
                        previewTextDivLabel.innerHTML = textDiv.value;
                    })

                    deleteSelectType.addEventListener('click', () => {                        
                        previewTextDivLabel.remove();
                        previewTextDiv.remove();
                    })
                    
                    

                    //désactivation de la possibilité de choisir le type d'element
                    selectType.remove()
                    selectTypeLabel.remove();

                    

                    //incrementation du compte pour le type d'element
                    textCount++;

                    getFieldSetOrder();

                    break;
    
                //choix champ de commentaire
                case "textarea":

                    //---- creation de la légende du fieldset
                    let fieldsetTextareaLegend = document.createElement('legend');
                    fieldsetTextareaLegend.innerText = 'champ de commentaire';

                    //---- création de l'input text pour saisir le champ libellé
                    let textareaDiv = document.createElement('input');
                    textareaDiv.setAttribute('type', 'text');
                    textareaDiv.setAttribute('name', 'textarea['+ textAreaCount +'][description]');
                    textareaDiv.setAttribute('id', 'textarea');

                    //label
                    let textareaDivLabel = document.createElement('label');
                    textareaDivLabel.setAttribute('for','textarea');
                    textareaDivLabel.innerText = "Choisissez le label de votre champ"
                                                +"\n(Ex :  Informations complémentaires à nous transmettre )";

                    //---- création de l'input hidden pour sauvegarder l'order de la div
                    let hiddenTextAreaInput = document.createElement('input');
                    hiddenTextAreaInput.setAttribute('type', 'hidden');

                    //ajout au dom
                    deleteSelectType.before(fieldsetTextareaLegend);
                    deleteSelectType.before(textareaDivLabel);
                    textareaDivLabel.after(textareaDiv);
                    textareaDiv.after(hiddenTextAreaInput);

                    //add input Textarea Preview
                    let previewTextareaDiv = document.createElement('textarea');
                    previewTextareaDiv.setAttribute('type','Textarea');
                    previewTextareaDiv.setAttribute('id', 'previewTextareaDiv');
                    previewTextareaDiv.setAttribute('rows','5');
                    previewTextareaDiv.setAttribute('cols', '50')
                    let previewTextareaDivLabel = document.createElement('label');
                    previewTextareaDivLabel.setAttribute('for','previewTextareaDiv');
                    
                    //event listener click sur add
                    addSelectTypeInsideFieldset.addEventListener('click', () => {
                        console.log('youpla');
                        tempStoredDiv = previewTextareaDiv;
                        selectTypeAppend(addSelectTypeInsideFieldset.parentNode, 'after'); 
                    })

                    //append du preview
                    if (targetedDiv == null && beforeOrAfter == null)
                    {
                        previewFormDiv.appendChild(previewTextareaDivLabel);
                        previewTextareaDivLabel.after(previewTextareaDiv);
                    }
                    else if (targetedDiv != null && beforeOrAfter == 'after')
                    {                       
                        tempStoredDiv.after(previewTextareaDivLabel);
                        previewTextareaDivLabel.after(previewTextareaDiv);
                    }

                    textareaDiv.addEventListener('keyup', () => { 
                        previewTextareaDivLabel.innerHTML = textareaDiv.value;
                    })
                    deleteSelectType.addEventListener('click', () => {                        
                        previewTextareaDivLabel.remove();
                        previewTextareaDiv.remove();
                    })

                    //désactivation de la possibilité de choisir le type d'element
                    selectType.remove()
                    selectTypeLabel.remove();

                    //incrementation du compte pour le type d'element
                    textAreaCount++;

                    getFieldSetOrder();

                    break;
    
                //choix parmis une liste
                case "select":

                    //---- creation de la légende du fieldset
                    let fieldsetSelectLegend = document.createElement('legend');
                    fieldsetSelectLegend.innerText = 'Liste déroulante';

                    //---- création de l'input text pour saisir le champ libellé
                    let selectDivName = document.createElement('input');
                    selectDivName.setAttribute('type','text');
                    selectDivName.setAttribute('name','select['+ selectCount +'][description]');
                    selectDivName.setAttribute('id', 'selectDivName');

                    //label
                    let selectDivNameLabel = document.createElement('label');
                    selectDivNameLabel.setAttribute('for', 'selectDivName');
                    selectDivNameLabel.innerText = "Choisir le label de votre champ"
                                                + "\n(ex: En quelle classe est votre enfant ?)"

                    //creation de l'input number pour avoir le nombre d'option                   
                    let selectDiv = document.createElement('input');
                    selectDiv.setAttribute('type', 'number');
                    selectDiv.setAttribute('name', 'select['+ selectCount +'][count]');
                    selectDiv.setAttribute('min', '3');
                    selectDiv.setAttribute('max', '9');
                    selectDiv.setAttribute('id', 'select');

                    //label de l'input number
                    let selectDivLabel = document.createElement('label');
                    selectDivLabel.setAttribute('for','select');
                    selectDivLabel.innerText = "Combien de choix dans la liste ? \n(min 3 - max 9)";

                    //---- création de l'input hidden pour sauvegarder l'order de la div
                    let hiddenSelectInput = document.createElement('input');
                    hiddenSelectInput.setAttribute('type', 'hidden');

                    //ajout au dom
                    deleteSelectType.before(fieldsetSelectLegend);
                    deleteSelectType.before(selectDivNameLabel);
                    selectDivNameLabel.after(selectDivName);
                    selectDivName.after(selectDivLabel);
                    selectDivLabel.after(selectDiv);
                    selectDiv.after(hiddenSelectInput);

                    //add input select Preview
                    let previewselectDiv = document.createElement('select');
                    previewselectDiv.setAttribute('id', 'previewselectDiv');

                    let firstpreviewSelectOption = document.createElement('option');
                    firstpreviewSelectOption.disabled = true;
                    firstpreviewSelectOption.selected = true;
                    firstpreviewSelectOption.innerText = "Veuillez choisir parmis la liste :";
                    previewselectDiv.appendChild(firstpreviewSelectOption);

                    let previewselectDivLabel = document.createElement('label');
                    previewselectDivLabel.setAttribute('for','previewselectDiv');

                    //event listener click sur add
                    addSelectTypeInsideFieldset.addEventListener('click', () => {
                        tempStoredDiv = previewselectDiv;
                        selectTypeAppend(addSelectTypeInsideFieldset.parentNode, 'after'); 
                    })

                    //append du preview
                    if (targetedDiv == null && beforeOrAfter == null)
                    {
                        previewFormDiv.appendChild(previewselectDivLabel);
                        previewselectDivLabel.after(previewselectDiv);
                    }
                    else if (targetedDiv != null && beforeOrAfter == 'after')
                    {                       
                        tempStoredDiv.after(previewselectDivLabel);
                        previewselectDivLabel.after(previewselectDiv);
                    }

                    selectDivName.addEventListener('keyup', () => { 
                        previewselectDivLabel.innerHTML = selectDivName.value;
                    })

                    deleteSelectType.addEventListener('click', () => {                        
                        previewselectDivLabel.remove();
                        previewselectDiv.remove();
                    })
                    

                    //désactivation de la possibilité de choisir le type d'element
                    selectType.remove()
                    selectTypeLabel.remove();

                    //creation de la div pour les options
                    let selectDivOptions = document.createElement('div');                 
                    choiceDiv.appendChild(selectDivOptions);
    
                    selectDiv.addEventListener('keyup', (event) => {

                        console.log(event.key);
                        if ((selectDiv.value < 3 || selectDiv.value > 9) && event.key !== 'Backspace')
                        { 
                            alert('veuillez choisir entre 3 et 9!') 
                        }
                        else if (event.key === 'Backspace' && selectDivOptions.hasChildNodes() 
                                    && previewselectDiv.hasChildNodes())
                        { 
                            while (selectDivOptions.firstChild)
                            {
                                selectDivOptions.removeChild(selectDivOptions.firstChild);
                            }

                            while (previewselectDiv.firstChild && previewselectDiv.childElementCount >1)
                            {
                                console.log(previewselectDiv.childElementCount)
                                previewselectDiv.removeChild(previewselectDiv.lastChild);
                            }
                        }
                        else if ((selectDiv.value >= 3 || selectDiv.value <= 9) && (event.key >= 3 || event.key <= 9))
                        {                           
                            let tempDivName = selectDivName.name.replace('[description]','');

                            //boucle sur la valeur entrée dans l'input relatif au nombre d'option
                            for (let i=0; i<selectDiv.value; i++)
                            {
                                //---- creation de l'input pour le nom des options
                                let optionName = document.createElement('input');
                                optionName.setAttribute('type', 'text');
                                optionName.setAttribute('name', tempDivName+'[]');
                                optionName.setAttribute('id', 'option'+(i+1));                                

                                //label
                                let optionNameLabel = document.createElement('label');
                                optionNameLabel.setAttribute('for', 'option'+(i+1))
                                optionNameLabel.innerText = 'Nom du choix '+(i+1);

                                //ajout au dom
                                selectDivOptions.appendChild(optionNameLabel);
                                selectDivOptions.appendChild(optionName)

                                //ajout d'option à la preview
                                let optionPreview = document.createElement('option');
                                previewselectDiv.appendChild(optionPreview);
                                optionName.addEventListener('keyup', () => {
                                    optionPreview.innerHTML = optionName.value;
                                })

                            }

                        }

                        
                        
                    })
                    
                    //incrementation du compte pour le type d'element
                    selectCount++
    
                    getFieldSetOrder();

                    break;
    
                //choix multiples
                case "checkbox":

                    //---- creation de la légende du fieldset
                    let fieldsetCheckboxLegend = document.createElement('legend');
                    fieldsetCheckboxLegend.innerText = 'Choix multiples, cases à cocher';

                    //---- création de l'input text pour saisir le champ libellé
                    let checkboxDivName = document.createElement('input');
                    checkboxDivName.setAttribute('type','text');
                    checkboxDivName.setAttribute('name','checkbox['+ checkboxCount +'][description]')
                    checkboxDivName.setAttribute('id', 'checkboxDivName');

                    //label
                    let checkboxDivNameLabel = document.createElement('label');
                    checkboxDivNameLabel.setAttribute('for', 'checkboxDivName');
                    checkboxDivNameLabel.innerText = "Choisir le label de votre champ"
                                                    +"\n(ex: Quel matériel avez-vous ?)"

                    //creation de l'input number pour avoir le nombre d'option 
                    let checkboxDiv = document.createElement('input');
                    checkboxDiv.setAttribute('type', 'number');
                    checkboxDiv.setAttribute('name', 'checkbox['+ checkboxCount +'][count]');
                    checkboxDiv.setAttribute('min', '3');
                    checkboxDiv.setAttribute('max', '9');
                    checkboxDiv.setAttribute('id', 'checkbox');

                    //label de l'input number
                    let checkboxDivLabel = document.createElement('label');
                    checkboxDivLabel.setAttribute('for','checkbox');
                    checkboxDivLabel.innerText = "Combien de cases voulez-vous ? \n(min 3 - max 9)";

                    //---- création de l'input hidden pour sauvegarder l'order de la div
                    let hiddenCheckboxInput = document.createElement('input');
                    hiddenCheckboxInput.setAttribute('type', 'hidden');

                    //ajout au dom
                    deleteSelectType.before(fieldsetCheckboxLegend);
                    deleteSelectType.before(checkboxDivNameLabel);
                    checkboxDivNameLabel.after(checkboxDivName);
                    checkboxDivName.after(checkboxDivLabel);
                    checkboxDivLabel.after(checkboxDiv);
                    checkboxDiv.after(hiddenCheckboxInput);

                    //ajout de la preview du checkbox
                    let checkboxPreviewFieldset = document.createElement('fieldset');
                    let checkboxPreviewFieldsetLegend = document.createElement('legend');

                    //event listener click sur add
                    addSelectTypeInsideFieldset.addEventListener('click', () => {
                        tempStoredDiv = checkboxPreviewFieldset;
                        selectTypeAppend(addSelectTypeInsideFieldset.parentNode, 'after'); 
                    })

                    //append du preview
                    if (targetedDiv == null && beforeOrAfter == null)
                    {
                        previewFormDiv.appendChild(checkboxPreviewFieldset);
                        checkboxPreviewFieldset.appendChild(checkboxPreviewFieldsetLegend);
                    }
                    else if (targetedDiv != null && beforeOrAfter == 'after')
                    {                       
                        tempStoredDiv.after(checkboxPreviewFieldset);
                        checkboxPreviewFieldset.appendChild(checkboxPreviewFieldsetLegend);
                    }

                    checkboxDivName.addEventListener('keyup', () => { 
                        checkboxPreviewFieldsetLegend.innerHTML = checkboxDivName.value;
                    })                    

                    deleteSelectType.addEventListener('click', () => {                        
                        checkboxPreviewFieldsetLegend.remove();
                        checkboxPreviewFieldset.remove();
                    })
                    
                    //incrementation du compte pour le type d'element
                    checkboxCount++;

                    //désactivation de la possibilité de choisir le type d'element
                    selectType.remove()
                    selectTypeLabel.remove();

                    //creation de la div pour les options
                    let checkboxDivOptions = document.createElement('div');                 
                    choiceDiv.appendChild(checkboxDivOptions);
                    
                    checkboxDiv.addEventListener('keyup', (event) => {
                        if ((checkboxDiv.value < 3 || checkboxDiv.value > 9) && event.key !== 'Backspace')
                        { 
                            alert('veuillez choisir entre 3 et 9!') 
                        }
                        else if (event.key === 'Backspace' && checkboxDivOptions.hasChildNodes() && checkboxPreviewFieldset.hasChildNodes() )
                        { 
                            console.log('youpi')
                            while (checkboxDivOptions.firstChild)
                            {
                                checkboxDivOptions.removeChild(checkboxDivOptions.firstChild);
                            }

                            while (checkboxPreviewFieldset.firstChild)
                            {
                                checkboxPreviewFieldset.removeChild(checkboxPreviewFieldset.firstChild);
                            }
                        }
                        else if ((checkboxDiv.value >= 3 || checkboxDiv.value <= 9) && (event.key >= 3 || event.key <= 9))
                        {
                            let tempDivName = checkboxDiv.name.replace('[count]','');

                            //boucle sur la valeur entrée dans l'input relatif au nombre d'option
                            for (let i=0; i<checkboxDiv.value; i++)
                            {
                                //---- creation de l'input pour le nom des options
                                let optionName = document.createElement('input');
                                optionName.setAttribute('type', 'text');
                                optionName.setAttribute('name', tempDivName+'[]');
                                optionName.setAttribute('id', 'option'+(i+1));

                                //label
                                let optionNameLabel = document.createElement('label');
                                optionNameLabel.setAttribute('for', 'option'+(i+1))
                                optionNameLabel.innerText = 'Nom du choix '+(i+1);

                                //ajout au dom
                                checkboxDivOptions.appendChild(optionNameLabel);
                                checkboxDivOptions.appendChild(optionName)

                                //add input checkbox Preview
                                let previewcheckboxIndividualDiv = document.createElement('div')
                                let previewcheckboxTextDiv = document.createElement('input');
                                previewcheckboxTextDiv.setAttribute('type','checkbox');
                                previewcheckboxTextDiv.setAttribute('id', 'previewcheckboxTextDiv')
                                let previewcheckboxTextDivLabel = document.createElement('label');
                                previewcheckboxTextDivLabel.setAttribute('for','previewcheckboxTextDiv');
                                checkboxPreviewFieldset.appendChild(previewcheckboxIndividualDiv);
                                previewcheckboxIndividualDiv.appendChild(previewcheckboxTextDiv);
                                previewcheckboxTextDiv.after(previewcheckboxTextDivLabel);
                                optionName.addEventListener('keyup', () => { 
                                    previewcheckboxTextDivLabel.innerHTML = optionName.value;
                                })
                            }


                        }
                        
                    })
    
                    getFieldSetOrder();

                    break;
    
                //choix unique
                case "radio":

                    //---- creation de la légende du fieldset
                    let fieldsetRadioLegend = document.createElement('legend');
                    fieldsetRadioLegend.innerText = 'Choix unique';

                    //---- création de l'input text pour saisir le champ libellé
                    let radioDivName = document.createElement('input');
                    radioDivName.setAttribute('type','text');
                    radioDivName.setAttribute('name','radio['+ radioCount +'][description]')
                    radioDivName.setAttribute('id', 'radioDivName');

                    //label
                    let radioDivNameLabel = document.createElement('label');
                    radioDivNameLabel.setAttribute('for', 'radioDivName');
                    radioDivNameLabel.innerText = "Choisir le label de votre champ"
                                                + "\n(ex: Votre enfant sait-il nager ?)";

                    //creation de l'input number pour avoir le nombre d'option 
                    let radioDiv = document.createElement('input');
                    radioDiv.setAttribute('type', 'number');
                    radioDiv.setAttribute('name', 'radio['+ radioCount +'][count]')
                    radioDiv.setAttribute('min', '2');
                    radioDiv.setAttribute('max', '3');
                    radioDiv.setAttribute('id', 'radio');

                    //label de l'input number
                    let radioDivLabel = document.createElement('label');
                    radioDivLabel.setAttribute('for','radio');
                    radioDivLabel.innerText = "Combien de choix voulez-vous ? \n(min 2 - max 3)";

                    //---- création de l'input hidden pour sauvegarder l'order de la div
                    let hiddenRadioInput = document.createElement('input');
                    hiddenRadioInput.setAttribute('type', 'hidden');

                    //ajout au dom
                    deleteSelectType.before(fieldsetRadioLegend);
                    deleteSelectType.before(radioDivNameLabel);
                    radioDivNameLabel.after(radioDivName);
                    radioDivName.after(radioDivLabel);
                    radioDivLabel.after(radioDiv);
                    radioDiv.after(hiddenRadioInput);

                    //ajout de la preview du radio
                    let radioPreviewFieldset = document.createElement('fieldset');
                    let radioPreviewFieldsetLegend = document.createElement('legend');

                    //event listener click sur add
                    addSelectTypeInsideFieldset.addEventListener('click', () => {
                        tempStoredDiv = radioPreviewFieldset;
                        selectTypeAppend(addSelectTypeInsideFieldset.parentNode, 'after'); 
                    })

                    //append du preview
                    if (targetedDiv == null && beforeOrAfter == null)
                    {
                        previewFormDiv.appendChild(radioPreviewFieldset);
                        radioPreviewFieldset.appendChild(radioPreviewFieldsetLegend);
                    }
                    else if (targetedDiv != null && beforeOrAfter == 'after')
                    {                       
                        tempStoredDiv.after(radioPreviewFieldset);
                        radioPreviewFieldset.appendChild(radioPreviewFieldsetLegend);
                    }

                    radioDivName.addEventListener('keyup', () => { 
                        radioPreviewFieldsetLegend.innerHTML = radioDivName.value;
                    })                    

                    deleteSelectType.addEventListener('click', () => {                        
                        radioPreviewFieldsetLegend.remove();
                        radioPreviewFieldset.remove();
                    })

                    //incrementation du compte pour le type d'element
                    radioCount++;

                    //désactivation de la possibilité de choisir le type d'element
                    selectType.remove()
                    selectTypeLabel.remove();

                    //creation de la div pour les options
                    let radioDivOptions = document.createElement('div');                 
                    choiceDiv.appendChild(radioDivOptions);
                    
                    radioDiv.addEventListener('keyup', (event) => {
                        if ((radioDiv.value < 2 || radioDiv.value > 3) && event.key !== 'Backspace')
                        { 
                            alert('veuillez choisir entre 2 et 3!') 
                        }
                        else if (event.key === 'Backspace' && radioDivOptions.hasChildNodes() && checkboxPreviewFieldset.hasChildNodes())
                        { 
                            while (radioDivOptions.firstChild)
                            {
                                radioDivOptions.removeChild(radioDivOptions.firstChild);
                            }

                            while (checkboxPreviewFieldset.firstChild)
                            {
                                checkboxPreviewFieldset.removeChild(checkboxPreviewFieldset.firstChild);
                            }
                        }
                        else if ((radioDiv.value >= 3 || radioDiv.value <= 9) && (event.key >= 3 || event.key <= 9)) 
                        {
                            let tempDivName = radioDiv.name.replace('[count]','');

                            //boucle sur la valeur entrée dans l'input relatif au nombre d'option
                            for (let i=0; i<radioDiv.value; i++)
                            {
                                //---- creation de l'input pour le nom des options
                                let optionName = document.createElement('input');
                                optionName.setAttribute('type', 'text');
                                optionName.setAttribute('name', tempDivName+'[]');
                                optionName.setAttribute('id', 'option'+(i+1));

                                //label
                                let optionNameLabel = document.createElement('label');
                                optionNameLabel.setAttribute('for', 'option'+(i+1))
                                optionNameLabel.innerText = 'Nom du choix '+(i+1);

                                //ajout au dom
                                radioDivOptions.appendChild(optionNameLabel);
                                radioDivOptions.appendChild(optionName)

                                //add input radio Preview
                                let previewradioIndividualDiv = document.createElement('div')
                                let previewradioTextDiv = document.createElement('input');
                                previewradioTextDiv.setAttribute('type','radio');
                                previewradioTextDiv.setAttribute('id', 'previewradioTextDiv')
                                let previewradioTextDivLabel = document.createElement('label');
                                previewradioTextDivLabel.setAttribute('for','previewradioTextDiv');
                                radioPreviewFieldset.appendChild(previewradioIndividualDiv);
                                previewradioIndividualDiv.appendChild(previewradioTextDiv);
                                previewradioTextDiv.after(previewradioTextDivLabel);
                                optionName.addEventListener('keyup', () => { 
                                    previewradioTextDivLabel.innerHTML = optionName.value;
                                })
                            }

                        }
                        
                    })

                    getFieldSetOrder();

                    break;
            
                //choix file
                case 'file':

                    //---- creation de la légende du fieldset
                    let fieldsetFileLegend = document.createElement('legend');
                    fieldsetFileLegend.innerText = 'Fichier';
                    
                    //---- création de l'input text pour saisir le champ libellé
                    let fileDivName = document.createElement('input');
                    fileDivName.setAttribute('type','text');
                    fileDivName.setAttribute('name','file['+ fileCount +'][description]')
                    fileDivName.setAttribute('id', 'fileDivName');

                    //label
                    let fileDivNameLabel = document.createElement('label');
                    fileDivNameLabel.setAttribute('for', 'fileDivName');
                    fileDivNameLabel.innerText = "Choisir le champ de référence (Veuillez ajouter votre carte d'identité)";

                    //---- création de l'input hidden pour sauvegarder l'order de la div
                    let hiddenFileInput = document.createElement('input');
                    hiddenFileInput.setAttribute('type', 'hidden');

                    //ajout au dom
                    deleteSelectType.before(fieldsetFileLegend);
                    deleteSelectType.before(fileDivNameLabel);
                    fileDivNameLabel.after(fileDivName);
                    fileDivName.after(hiddenFileInput);               

                    //add input file Preview
                    let previewfileDiv = document.createElement('input');
                    previewfileDiv.setAttribute('type','file');
                    previewfileDiv.setAttribute('id', 'previewfileDiv')

                    let previewfileDivLabel = document.createElement('label');
                    previewfileDivLabel.setAttribute('for','previewfileDiv');

                    //event listener click sur add
                    addSelectTypeInsideFieldset.addEventListener('click', () => {
                        tempStoredDiv = previewfileDiv;
                        selectTypeAppend(addSelectTypeInsideFieldset.parentNode, 'after'); 
                    })

                    //append du preview
                    if (targetedDiv == null && beforeOrAfter == null)
                    {
                        previewFormDiv.appendChild(previewfileDivLabel);
                        previewfileDivLabel.after(previewfileDiv)
                    }
                    else if (targetedDiv != null && beforeOrAfter == 'after')
                    {                       
                        tempStoredDiv.after(previewfileDivLabel);
                        previewfileDivLabel.after(previewfileDiv);
                    }

                    fileDivName.addEventListener('keyup', () => { 
                        previewfileDivLabel.innerHTML = fileDivName.value;
                    })

                    deleteSelectType.addEventListener('click', () => {                        
                        previewfileDivLabel.remove();
                        previewfileDiv.remove();
                    })

                    //désactivation de la possibilité de choisir le type d'element
                    selectType.remove()
                    selectTypeLabel.remove();

                    getFieldSetOrder()
                    break;
            }

        })
        
    }
    
}