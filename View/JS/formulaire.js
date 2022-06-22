export default function appendForm() {
    
    //---- creation d'une variable relative au bouton submit du formulaire
    const submitButton = document.getElementById('reg_form');

    //---- création d'un tableau pour stocker le nom de tous les formulaires créés
    let formNames = [];

        //fonction qui va remplir le tableau
        async function getFormName ()
        {
            await fetch('/leSelDeLaVie/names')
            .then(response =>{
                return response.json();
            })
            .then(response => {           
                response.forEach(element => {
                    formNames.push(element.name_form);
                })
            })
        }
        
        //remplissage du tableau
        getFormName();

    //---- création d'une fonction pour ajouter des inscriptions relatives aux erreurs
    function appendErrorP(targetDiv, errorType) {
        
        if (targetDiv.parentNode.querySelector(' p') == null) 
        {
            let errorP = document.createElement('p');
            errorP.innerHTML = errorType;
            errorP.setAttribute('style', 'color: red');
            errorP.setAttribute('class', 'errorP');
            targetDiv.after(errorP);
        }
        
    }

        //creation d'une fonction pour la suppression des p d'erreurs
        function removeErrorP(targetDiv) {
            
            if (targetDiv === nameForm)
            {
                let errorP = targetDiv.parentNode.querySelectorAll('form > .errorP');
                errorP.forEach(element => {
                    element.remove();
                })
            }
            else  
            {
                let errorP = targetDiv.parentNode.querySelectorAll('div > .errorP');
                console.log(errorP);
                if (errorP.length > 0) 
                {
                    errorP.forEach(element => {
                        element.remove();
                    })
                }
            }
            
        }

    //event listener pour vérifications avant enregistrement du formulaire
    submitButton.addEventListener('click', (e) => {    

        let errorArray = [];
        let formGenDiv = document.getElementById('FormulaireGen');

        //array pour vérifier si le formulaire a des champs
        let formGenFieldsets = formGenDiv.querySelectorAll('fieldset');

        //vérification si les champs sont vides et remplissage de l'array errorArray
        let formInputs = formGenDiv.querySelectorAll('input');
        formInputs.forEach( (input) => {
            if (input.value === '' && input !== nameForm) 
            {
                input.setAttribute('style', 'border: 2px dotted red');
                console.log()
                
                if (input.parentNode.querySelector('fieldset > div > label > span') && input.parentNode.querySelector('fieldset > div > label > span').id)
                {
                    input.parentNode.querySelector('fieldset > div > label > span').setAttribute('style', 'color: red');
                }
                errorArray.push(input.name);
                appendErrorP(input, 'Veuillez remplir ce champ');
            }
            else if (input.value == '' && input == nameForm)
            {
                nameForm.setAttribute('style', 'border: 2px dotted red');
                errorArray.push(input.name);
                appendErrorP(nameForm, 'Veuillez remplir ce champ');
            }

        });
        
        //vérification si le nom du formulaire existe déjà et remplissage de l'array errorArray
        formNames.forEach( element => {
            if (element === nameForm.value)
            {
                errorArray.push(nameForm);
                appendErrorP(nameForm, 'Le nom du formulaire existe déjà !');
            }
        });

        //vérification finale et si il y a des erreurs, affichage des erreurs
        if (errorArray.length > 0) 
        {
            e.preventDefault();
        }
        else if (errorArray.length === 0 && formGenFieldsets.length === 0)
        {
            e.preventDefault();
            appendErrorP(nameForm, 'Veuillez créer un champ');
        }
        else if (errorArray.length === 0 && formGenFieldsets.length > 0) 
        {
            alert('Le formulaire '+ nameForm.value +' a bien été enregistré !');                 
        }
        
    });


    //---- creation d'une fonction pour la gestion de l'ordre des divs en bdd
    function getFieldSetOrder()
    {
        let divFormFormulaireGenerator = document.querySelector('div form')
        let fieldsetsInside = divFormFormulaireGenerator.querySelectorAll('fieldset');
        if (fieldsetsInside.length > 0)
        {
            fieldsetsInside.forEach( (element, index) => {
                let hiddenInput = element.querySelector('input[type=hidden]');
                let mainType = element.querySelector('input[type=text]');
                hiddenInput.setAttribute('name', mainType.name.replace('[description]','') + '[order]');
                hiddenInput.setAttribute('value', index);
            })
        }        
    }


    //---- gestion de la preview
        //variable relative à la div globale de la preview
        const previewFormDiv = document.getElementById('previewFormulaire');

        //variable relative à div du nom du formulaire
        const nameForm = document.getElementById('name_form');

        //creation et append du titre de la preview
        let titreForm = document.createElement('H2');
        previewFormDiv.appendChild(titreForm);

        //ajout d'un event listener pour le changement du nom du formulaire dans la preview
        nameForm.addEventListener('keyup', () => { 
            removeErrorP(nameForm);
            titreForm.innerHTML = nameForm.value;
            nameForm.setAttribute('style', 'border: 1px solid black');        
        });

        //variable temporaire utilisée pour l'append dans la preview
        var tempStoredDiv;


    //---- création du bouton d'ajout de champ
    const addSelectType = document.createElement('button');
    addSelectType.setAttribute('type', 'button');
    addSelectType.setAttribute('class', 'addSelectType');

        //append de l'image qui sera utilisée pour le bouton
        let addSelectTypeImg = document.createElement('img');
        addSelectTypeImg.setAttribute('src', './View/Media/plus.svg');
        addSelectType.append(addSelectTypeImg);

        //ajout au DOM
        submitButton.before(addSelectType);

        //ajout de l'event listener pour le bouton d'ajout de champ
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

    //---- creation d'une fonction pour ajouter les champs
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
                if (typeof previewTextDivLabel !== 'undefined')
                {
                    previewTextDivLabel.remove();
                }
                if (typeof previewTextDiv !== 'undefined')
                {
                    previewTextDiv.remove();
                }
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

                    let firstTextBoxDiv = document.createElement('div');
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
                    firstTextBoxDiv.appendChild(textDivLabel);
                    firstTextBoxDiv.appendChild(textDiv);

                    //ajout au dom
                    deleteSelectType.before(fieldsetTextLegend);
                    deleteSelectType.before(firstTextBoxDiv);
                    firstTextBoxDiv.after(hiddenInput);

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
                        textDiv.setAttribute('style', 'border: 1px solid black');
                        removeErrorP(textDiv);
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

                    let firstTextareaDiv = document.createElement('div');
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
                    firstTextareaDiv.appendChild(textareaDivLabel);
                    firstTextareaDiv.appendChild(textareaDiv);

                    //---- création de l'input hidden pour sauvegarder l'order de la div
                    let hiddenTextAreaInput = document.createElement('input');
                    hiddenTextAreaInput.setAttribute('type', 'hidden');

                    //ajout au dom
                    deleteSelectType.before(fieldsetTextareaLegend);
                    deleteSelectType.before(firstTextareaDiv);
                    firstTextareaDiv.after(hiddenTextAreaInput);

                    //add input Textarea Preview
                    let previewTextareaDiv = document.createElement('textarea');
                    previewTextareaDiv.setAttribute('type','Textarea');
                    previewTextareaDiv.setAttribute('id', 'previewTextareaDiv');
                    previewTextareaDiv.setAttribute('rows','5');
                    previewTextareaDiv.setAttribute('cols', '50');
                    let previewTextareaDivLabel = document.createElement('label');
                    previewTextareaDivLabel.setAttribute('for','previewTextareaDiv');
                    
                    //event listener click sur add
                    addSelectTypeInsideFieldset.addEventListener('click', () => {
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
                        textareaDiv.setAttribute('style', 'border: 1px solid black');
                        removeErrorP(textareaDiv);
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

                    let selectFirstBoxDiv = document.createElement('div');
                    //---- création de l'input text pour saisir le champ libellé
                    let selectDivName = document.createElement('input');
                    selectDivName.setAttribute('type','text');
                    selectDivName.setAttribute('name','select['+ selectCount +'][description]');
                    selectDivName.setAttribute('id', 'selectDivName');

                    //label
                    let selectDivNameLabel = document.createElement('label');
                    selectDivNameLabel.setAttribute('for', 'selectDivName');
                    selectDivNameLabel.innerHTML = "Choisir le label de votre champ \n(ex: En quelle classe est votre enfant ?)";
                    selectFirstBoxDiv.appendChild(selectDivNameLabel);
                    selectFirstBoxDiv.appendChild(selectDivName);
                    

                    let selectSecondBoxDiv = document.createElement('div');
                    //creation de l'input number pour avoir le nombre d'option
                    let selectDiv = document.createElement('select');
                    selectDiv.setAttribute('name', 'select['+ selectCount +'][count]');
                    selectDiv.setAttribute('id', 'select');
                    let disabledSelectOption = document.createElement('option');
                    disabledSelectOption.setAttribute('disabled', 'disabled');
                    disabledSelectOption.setAttribute('selected', 'selected');
                    disabledSelectOption.innerText = "Choix";
                    selectDiv.appendChild(disabledSelectOption);
                    let selectOptionArray = [];
                    for(let i=3; i<10; i++)
                    {
                        
                        let option = document.createElement('option');
                        option.setAttribute('value', i);
                        option.innerText = i;
                        selectOptionArray.push(option);
                        selectDiv.appendChild(option);
                    }
                    

                    //label de l'input number
                    let selectDivLabel = document.createElement('label');
                    selectDivLabel.setAttribute('for','select');
                    selectDivLabel.innerText = "Combien de choix dans la liste ? \n";

                        //span à l'intérieur du label
                        let spanSelectDivNameLabel = document.createElement('span');
                        spanSelectDivNameLabel.setAttribute('id', 'spanDivNameLabel');
                        spanSelectDivNameLabel.innerHTML = "(min 3 - max 9)"
                        selectDivLabel.appendChild(spanSelectDivNameLabel);
                    
                    selectSecondBoxDiv.appendChild(selectDivLabel);
                    selectSecondBoxDiv.appendChild(selectDiv);

                    //---- création de l'input hidden pour sauvegarder l'order de la div
                    let hiddenSelectInput = document.createElement('input');
                    hiddenSelectInput.setAttribute('type', 'hidden');

                    //ajout au dom
                    deleteSelectType.before(fieldsetSelectLegend);
                    deleteSelectType.after(selectFirstBoxDiv);
                    selectFirstBoxDiv.after(selectSecondBoxDiv);
                    selectSecondBoxDiv.after(hiddenSelectInput);

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
                        selectDivName.setAttribute('style', 'border: 1px solid black');                        
                        removeErrorP(selectDivName);
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
                        
                    selectDiv.addEventListener('change', (event) => {
                        if (selectDiv.value >= 3 || selectDiv.value <= 9)
                        {
                            if (selectDivOptions.hasChildNodes())
                            {
                                while (selectDivOptions.firstChild)
                                {
                                    selectDivOptions.removeChild(selectDivOptions.firstChild);
                                }

                                while (previewselectDiv.firstChild && previewselectDiv.childElementCount >1)
                                {
                                    previewselectDiv.removeChild(previewselectDiv.lastChild);
                                }

                            }


                            let tempDivName = selectDivName.name.replace('[description]','');
                            selectDiv.setAttribute('style', 'border: 1px solid black');
                            spanSelectDivNameLabel.setAttribute('style', 'color: black');
                            removeErrorP(selectDiv);

                            let selectOptionArray = [];
                            //boucle sur la valeur entrée dans l'input relatif au nombre d'option
                            for (let i=0; i<selectDiv.value; i++)
                            {
                                let optionBoxDiv = document.createElement('div');
                                //---- creation de l'input pour le nom des options
                                selectOptionArray[i] = document.createElement('input');
                                selectOptionArray[i].setAttribute('type', 'text');
                                selectOptionArray[i].setAttribute('name', tempDivName+'[]');
                                selectOptionArray[i].setAttribute('id', 'option'+(i+1));                                

                                //label
                                let optionNameLabel = document.createElement('label');
                                optionNameLabel.setAttribute('for', 'option'+(i+1))
                                optionNameLabel.innerText = 'Nom du choix '+(i+1);

                                //ajout au dom
                                optionBoxDiv.appendChild(optionNameLabel);
                                optionBoxDiv.appendChild(selectOptionArray[i]);
                                selectDivOptions.appendChild(optionBoxDiv);

                                //ajout d'option à la preview
                                let optionPreview = document.createElement('option');
                                previewselectDiv.appendChild(optionPreview);
                                selectOptionArray[i].addEventListener('keyup', () => {
                                    optionPreview.innerHTML = selectOptionArray[i].value;
                                    selectOptionArray[i].setAttribute('style', 'border: 1px solid black');
                                    removeErrorP(selectOptionArray[i]);
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

                    let checkboxtFirstBoxDiv = document.createElement('div');
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
                    checkboxtFirstBoxDiv.appendChild(checkboxDivNameLabel);
                    checkboxtFirstBoxDiv.appendChild(checkboxDivName);
                    
                    let checkboxSecondBoxDiv = document.createElement('div');
                    //creation de l'input number pour avoir le nombre d'option 
                    let checkboxDiv = document.createElement('select');
                    checkboxDiv.setAttribute('name', 'checkbox['+ checkboxCount +'][count]');
                    checkboxDiv.setAttribute('id', 'checkbox');
                    let disabledCheckboxOption = document.createElement('option');
                    disabledCheckboxOption.setAttribute('disabled', 'disabled');
                    disabledCheckboxOption.setAttribute('selected', 'selected');
                    disabledCheckboxOption.innerText = "Choix";
                    checkboxDiv.appendChild(disabledCheckboxOption);
                    let checkboxOptionArray = [];
                    for(let i=3; i<10; i++)
                    {                        
                        let option = document.createElement('option');
                        option.setAttribute('value', i);
                        option.innerText = i;
                        checkboxOptionArray.push(option);
                        checkboxDiv.appendChild(option);
                    }

                    //label de l'input number
                    let checkboxDivLabel = document.createElement('label');
                    checkboxDivLabel.setAttribute('for','checkbox');
                    checkboxDivLabel.innerText = "Combien de cases voulez-vous ? \n";
                        //span à l'intérieur du label
                        let spanCheckboxtDivNameLabel = document.createElement('span');
                        spanCheckboxtDivNameLabel.setAttribute('id', 'spanDivNameLabel');
                        spanCheckboxtDivNameLabel.innerHTML = "(min 3 - max 9)"
                        checkboxDivLabel.appendChild(spanCheckboxtDivNameLabel);
                    checkboxtFirstBoxDiv.appendChild(checkboxDivLabel);
                    checkboxtFirstBoxDiv.appendChild(checkboxDiv);

                    //---- création de l'input hidden pour sauvegarder l'order de la div
                    let hiddenCheckboxInput = document.createElement('input');
                    hiddenCheckboxInput.setAttribute('type', 'hidden');

                    //ajout au dom
                    deleteSelectType.before(fieldsetCheckboxLegend);
                    deleteSelectType.after(checkboxtFirstBoxDiv);
                    deleteSelectType.after(checkboxSecondBoxDiv);
                    deleteSelectType.after(hiddenCheckboxInput);

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
                        checkboxDivName.setAttribute('style', 'border: 1px solid black');
                        removeErrorP(checkboxDivName);
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
                    
                    checkboxDiv.addEventListener('change', (event) => {

                        if (checkboxDiv.value >= 3 || checkboxDiv.value <= 9)
                        {
                            if (checkboxDivOptions.hasChildNodes())
                            {
                                while (checkboxDivOptions.firstChild)
                                {
                                    checkboxDivOptions.removeChild(checkboxDivOptions.firstChild);
                                }

                                while (checkboxPreviewFieldset.firstChild)
                                {
                                    checkboxPreviewFieldset.removeChild(checkboxPreviewFieldset.firstChild);
                                }
                            }
                            
                            let tempDivName = checkboxDiv.name.replace('[count]','');

                            checkboxDiv.setAttribute('style', 'border: 1px solid black');
                            spanCheckboxtDivNameLabel.setAttribute('style', 'color: black');
                            removeErrorP(checkboxDiv);

                            let checkboxOptionArray = [];
                            //boucle sur la valeur entrée dans l'input relatif au nombre d'option
                            for (let i=0; i<checkboxDiv.value; i++)
                            {
                                let optionBoxDiv = document.createElement('div');
                                //---- creation de l'input pour le nom des options
                                checkboxOptionArray[i] = document.createElement('input');
                                checkboxOptionArray[i].setAttribute('type', 'text');
                                checkboxOptionArray[i].setAttribute('name', tempDivName+'[]');
                                checkboxOptionArray[i].setAttribute('id', 'option'+(i+1));

                                //label
                                let optionNameLabel = document.createElement('label');
                                optionNameLabel.setAttribute('for', 'option'+(i+1))
                                optionNameLabel.innerText = 'Nom du choix '+(i+1);

                                //ajout au dom
                                optionBoxDiv.appendChild(optionNameLabel);
                                optionBoxDiv.appendChild(checkboxOptionArray[i]);
                                checkboxDivOptions.appendChild(optionBoxDiv);

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
                                checkboxOptionArray[i].addEventListener('keyup', () => { 
                                    previewcheckboxTextDivLabel.innerHTML = checkboxOptionArray[i].value;
                                    checkboxOptionArray[i].setAttribute('style', 'border: 1px solid black');
                                    removeErrorP(checkboxOptionArray[i]);
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

                    let radioFirstBoxDiv = document.createElement('div');
                    //---- création de l'input text pour saisir le champ libellé
                    let radioDivName = document.createElement('input');
                    radioDivName.setAttribute('type','text');
                    radioDivName.setAttribute('name','radio['+ radioCount +'][description]')
                    radioDivName.setAttribute('id', 'radioDivName');

                    //label
                    let radioDivNameLabel = document.createElement('label');
                    radioDivNameLabel.setAttribute('for', 'radioDivName');
                    radioDivNameLabel.innerText = "Choisir le nom de votre champ"
                                                + "\n(ex: Votre enfant sait-il nager ?)";
                    radioFirstBoxDiv.appendChild(radioDivNameLabel);
                    radioFirstBoxDiv.appendChild(radioDivName);

                    let radioSecondBoxDiv = document.createElement('div');
                    //creation de l'input number pour avoir le nombre d'option 
                    let radioDiv = document.createElement('select');
                    radioDiv.setAttribute('name', 'radio['+ radioCount +'][count]');
                    radioDiv.setAttribute('id', 'radio');
                    let disabledRadioOption = document.createElement('option');
                    disabledRadioOption.setAttribute('disabled', 'disabled');
                    disabledRadioOption.setAttribute('selected', 'selected');
                    disabledRadioOption.innerText = "Choix";
                    radioDiv.appendChild(disabledRadioOption);
                    let radioOptionArray = [];
                    for (let i=2; i<4; i++)
                    {
                        let option = document.createElement('option');
                        option.setAttribute('value', i);
                        option.innerText = i;
                        radioOptionArray.push(option);
                        radioDiv.appendChild(option);
                    }


                    //label de l'input number
                    let radioDivLabel = document.createElement('label');
                    radioDivLabel.setAttribute('for','radio');
                    radioDivLabel.innerText = "Combien de choix voulez-vous ? \n";

                        //span à l'intérieur du label
                        let spanRadiotDivNameLabel = document.createElement('span');
                        spanRadiotDivNameLabel.setAttribute('id', 'spanDivNameLabel');
                        spanRadiotDivNameLabel.innerHTML = "(minimum 2 - maximum 3)"
                        radioDivLabel.appendChild(spanRadiotDivNameLabel);
                    radioSecondBoxDiv.appendChild(radioDivLabel);
                    radioSecondBoxDiv.appendChild(radioDiv);

                    //---- création de l'input hidden pour sauvegarder l'order de la div
                    let hiddenRadioInput = document.createElement('input');
                    hiddenRadioInput.setAttribute('type', 'hidden');

                    //ajout au dom
                    deleteSelectType.before(fieldsetRadioLegend);
                    deleteSelectType.after(radioSecondBoxDiv);
                    deleteSelectType.after(radioFirstBoxDiv);                    
                    deleteSelectType.after(hiddenRadioInput);

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
                        radioDivName.setAttribute('style', 'border: 1px solid black');
                        removeErrorP(radioDivName);
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
                    
                    radioDiv.addEventListener('change', (event) => {
                        if ((radioDiv.value >= 2 || radioDiv.value <= 3)) 
                        {
                            if (radioDivOptions.hasChildNodes())
                            {
                                while (radioDivOptions.firstChild)
                                {
                                    radioDivOptions.removeChild(radioDivOptions.firstChild);
                                }
    
                                while (radioPreviewFieldset.firstChild)
                                {
                                    radioPreviewFieldset.removeChild(radioPreviewFieldset.firstChild);
                                }
                            }
                            

                            radioDiv.setAttribute('style', 'border: 1px solid black');
                            spanRadiotDivNameLabel.setAttribute('style', 'color: black');
                            removeErrorP(radioDiv);
                            let tempDivName = radioDiv.name.replace('[count]','');

                            let radioOptionArray = [];
                            //boucle sur la valeur entrée dans l'input relatif au nombre d'option
                            for (let i=0; i<radioDiv.value; i++)
                            {
                                let optionBoxDiv = document.createElement('div');
                                //---- creation de l'input pour le nom des options
                                radioOptionArray[i] = document.createElement('input');
                                radioOptionArray[i].setAttribute('type', 'text');
                                radioOptionArray[i].setAttribute('name', tempDivName+'[]');
                                radioOptionArray[i].setAttribute('id', 'option'+(i+1));

                                //label
                                let optionNameLabel = document.createElement('label');
                                optionNameLabel.setAttribute('for', 'option'+(i+1))
                                optionNameLabel.innerText = 'Nom du choix '+(i+1);

                                //ajout au dom
                                optionBoxDiv.appendChild(optionNameLabel);
                                optionBoxDiv.appendChild(radioOptionArray[i]);
                                radioDivOptions.appendChild(optionBoxDiv)

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
                                radioOptionArray[i].addEventListener('keyup', () => { 
                                    previewradioTextDivLabel.innerHTML = radioOptionArray[i].value;
                                    radioOptionArray[i].setAttribute('style', 'border: 1px solid black');
                                    removeErrorP(radioOptionArray[i]);
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
                    
                    let firstFileBoxDiv = document.createElement('div');
                    //---- création de l'input text pour saisir le champ libellé
                    let fileDivName = document.createElement('input');
                    fileDivName.setAttribute('type','text');
                    fileDivName.setAttribute('name','file['+ fileCount +'][description]')
                    fileDivName.setAttribute('id', 'fileDivName');

                    fileCount++;

                    //label
                    let fileDivNameLabel = document.createElement('label');
                    fileDivNameLabel.setAttribute('for', 'fileDivName');
                    fileDivNameLabel.innerText = "Choisir le champ de référence (Veuillez ajouter votre carte d'identité)";
                    firstFileBoxDiv.appendChild(fileDivNameLabel);
                    firstFileBoxDiv.appendChild(fileDivName);


                    //---- création de l'input hidden pour sauvegarder l'order de la div
                    let hiddenFileInput = document.createElement('input');
                    hiddenFileInput.setAttribute('type', 'hidden');

                    //ajout au dom
                    deleteSelectType.before(fieldsetFileLegend);
                    deleteSelectType.before(firstFileBoxDiv);
                    deleteSelectType.before(hiddenFileInput);               

                    //add input file Preview
                    let previewfileInput = document.createElement('input');
                    previewfileInput.setAttribute('type','file');
                    previewfileInput.setAttribute('id', 'previewfileInput')
                    previewfileInput.setAttribute('class', 'previewfileInput');

                    let previewfileInputLabel = document.createElement('label');
                    previewfileInputLabel.setAttribute('for','previewfileInput');
                    previewfileInputLabel.setAttribute('class', 'previewfileInputLabel');

                    let previewfileInputLabelImg = document.createElement('img');
                    previewfileInputLabelImg.setAttribute('src', './View/Media/upload.svg');

                    let previewfileInputLabelImgTxt = document.createElement('p');
                    previewfileInputLabelImgTxt.setAttribute('class', 'previewfileInputLabelImgTxt');

                    let previewfileDiv = document.createElement('div');
                    previewfileDiv.setAttribute('class', 'previewfileDiv');
                    previewfileDiv.appendChild(previewfileInputLabel);                    
                    previewfileInputLabel.appendChild(previewfileInputLabelImg);
                    previewfileInputLabel.after(previewfileInputLabelImgTxt);                  
                    previewfileInputLabel.after(previewfileInput);

                    //event listener click sur add
                    addSelectTypeInsideFieldset.addEventListener('click', () => {
                        tempStoredDiv = previewfileDiv;
                        selectTypeAppend(addSelectTypeInsideFieldset.parentNode, 'after'); 
                    })

                    //append du preview
                    if (targetedDiv == null && beforeOrAfter == null)
                    {
                        previewFormDiv.appendChild(previewfileDiv);
                    }
                    else if (targetedDiv != null && beforeOrAfter == 'after')
                    {                       
                        tempStoredDiv.after(previewfileDiv);
                    }

                    fileDivName.addEventListener('keyup', () => { 
                        previewfileInputLabelImgTxt.innerText = fileDivName.value;
                        fileDivName.setAttribute('style', 'border: 1px solid black');
                        removeErrorP(fileDivName);
                    })

                    deleteSelectType.addEventListener('click', () => {                        
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