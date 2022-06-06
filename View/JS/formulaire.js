//TODO : AJOUT DE L ELEMENT UPLOAD DE FICHIER !

export default function appendForm() {
    
    const submitButton = document.getElementById('reg_form');

    //---- gestion de la preview
    const previewFormDiv = document.getElementById('previewFormulaire');
    const nameForm = document.getElementById('name_form');
    let titreForm = document.createElement('H2');
    previewFormDiv.appendChild(titreForm);
    nameForm.addEventListener('keyup', () => { 
        titreForm.innerHTML = nameForm.value;
    })

    //---- création du bouton d'ajout de champ
    const addSelectType = document.createElement('button');
    addSelectType.setAttribute('type', 'button');
    addSelectType.innerText = 'ajouter un champ';
    submitButton.before(addSelectType);
    addSelectType.addEventListener('click', () => {
        selectTypeAppend();
    })

    //---- counter pour dénombrer les elements du meme type rajouté
    var textCount = 0;
    var textAreaCount = 0;
    var selectCount = 0;
    var checkboxCount = 0;
    var radioCount = 0;


    function selectTypeAppend()
    {

        //---- creation du select d'element à ajouter au formulaire
            //labal
            let selectTypeLabel = document.createElement('label');
            selectTypeLabel.setAttribute('for', 'select_type');
            selectTypeLabel.innerText = 'choisir un type de champ à ajouter';

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
            appendOption('checkbox', false, false,'choix multiples');
            appendOption('radio', false, false,'choix unique (ex: oui/non)');

        //---- ajout du bouton d'effacement d'un champ
        let deleteSelectType = document.createElement('button');
        deleteSelectType.setAttribute('type', 'button');
        deleteSelectType.innerText = 'Effacer le champ';

            //event listener click sur delete
            deleteSelectType.addEventListener('click', () => {
                selectType.remove();
                selectTypeLabel.remove();
                choiceDiv.remove();
                deleteSelectType.remove();
                previewTextDivLabel.remove();
                previewTextDiv.remove();
            })

        //---- creation de la div pour injecter le choix fait dans le select
        let choiceDiv = document.createElement('div');

        //---- ajout au dom des différents éléments
        addSelectType.before(selectTypeLabel);
        selectTypeLabel.after(selectType);
        selectType.after(choiceDiv);
        choiceDiv.after(deleteSelectType);

        //---- ajout d'event listener sur le select qui permet de choisir le type d'élément
        selectType.addEventListener('change', () => {

            //switch case pour tester le choix d'option 
            switch (selectType.value)
            {
                
                //choix champ de texte
                case "text":

                    //---- création de l'input text pour saisir le champ libellé
                    let textDiv = document.createElement('input');
                    textDiv.setAttribute('type', 'text');
                    textDiv.setAttribute('name', 'text['+ textCount +']');
                    textDiv.setAttribute('id', 'text');

                    //label
                    let textDivLabel = document.createElement('label');
                    textDivLabel.setAttribute('for','text');
                    textDivLabel.innerText = "Choisir le champ de référence ( Ex :  Veuillez entrer votre nom )";

                    //ajout au dom
                    choiceDiv.appendChild(textDivLabel);
                    textDivLabel.after(textDiv);

                    //add input text Preview
                    let previewTextDiv = document.createElement('input');
                    previewTextDiv.setAttribute('type','text');
                    previewTextDiv.setAttribute('id', 'previewTextDiv')
                    let previewTextDivLabel = document.createElement('label');
                    previewTextDivLabel.setAttribute('for','previewTextDiv');
                    previewFormDiv.appendChild(previewTextDivLabel);
                    previewTextDivLabel.after(previewTextDiv);
                    textDiv.addEventListener('keyup', () => { 
                        previewTextDivLabel.innerHTML = textDiv.value;
                    })
                    deleteSelectType.addEventListener('click', () => {                        
                        previewTextDivLabel.remove();
                        previewTextDiv.remove();
                    })
                    
                    

                    //désactivation de la possibilité de choisir le type d'element
                    selectType.disabled = true;

                    

                    //incrementation du compte pour le type d'element
                    textCount++;
                    break;
    
                //choix champ de commentaire
                case "textarea":

                    //---- création de l'input text pour saisir le champ libellé
                    let textareaDiv = document.createElement('input');
                    textareaDiv.setAttribute('type', 'text');
                    textareaDiv.setAttribute('name', 'textarea['+ textAreaCount +']');
                    textareaDiv.setAttribute('id', 'textarea');

                    //label
                    let textareaDivLabel = document.createElement('label');
                    textareaDivLabel.setAttribute('for','textarea');
                    textareaDivLabel.innerText = "Choisir le champ de référence ( Ex :  Informations complémentaires )";

                    //ajout au dom
                    choiceDiv.appendChild(textareaDivLabel);
                    textareaDivLabel.after(textareaDiv);

                    //add input Textarea Preview
                    let previewTextareaDiv = document.createElement('textarea');
                    previewTextareaDiv.setAttribute('type','Textarea');
                    previewTextareaDiv.setAttribute('id', 'previewTextareaDiv');
                    previewTextareaDiv.setAttribute('rows','5');
                    previewTextareaDiv.setAttribute('cols', '50')
                    let previewTextareaDivLabel = document.createElement('label');
                    previewTextareaDivLabel.setAttribute('for','previewTextareaDiv');
                    previewFormDiv.appendChild(previewTextareaDivLabel);
                    previewTextareaDivLabel.after(previewTextareaDiv);
                    textareaDiv.addEventListener('keyup', () => { 
                        previewTextareaDivLabel.innerHTML = textareaDiv.value;
                    })
                    deleteSelectType.addEventListener('click', () => {                        
                        previewTextareaDivLabel.remove();
                        previewTextareaDiv.remove();
                    })

                    //désactivation de la possibilité de choisir le type d'element
                    selectType.disabled = true;

                    //incrementation du compte pour le type d'element
                    textAreaCount++;
                    break;
    
                //choix parmis une liste
                case "select":

                    //---- création de l'input text pour saisir le champ libellé
                    let selectDivName = document.createElement('input');
                    selectDivName.setAttribute('type','text');
                    selectDivName.setAttribute('name','select['+ selectCount +'][description]')
                    selectDivName.setAttribute('id', 'selectDivName');

                    //label
                    let selectDivNameLabel = document.createElement('label');
                    selectDivNameLabel.setAttribute('for', 'selectDivName');
                    selectDivNameLabel.innerText = "Choisir le champ de référence (ex: De quel quartier êtes-vous ?)"

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
                    selectDivLabel.innerText = "Combien de choix dans la liste ? (min 3 - max 9)";

                    //ajout au dom
                    choiceDiv.appendChild(selectDivNameLabel);
                    selectDivNameLabel.after(selectDivName);
                    selectDivName.after(selectDivLabel);
                    selectDivLabel.after(selectDiv);

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

                    previewFormDiv.appendChild(previewselectDivLabel);
                    previewselectDivLabel.after(previewselectDiv);

                    selectDivName.addEventListener('keyup', () => { 
                        previewselectDivLabel.innerHTML = selectDivName.value;
                    })

                    deleteSelectType.addEventListener('click', () => {                        
                        previewselectDivLabel.remove();
                        previewselectDiv.remove();
                    })
                    

                    //désactivation de la possibilité de choisir le type d'element
                    selectType.disabled = true;

                    //creation de la div pour les options
                    let selectDivOptions = document.createElement('div');                 
                    choiceDiv.appendChild(selectDivOptions);
    
                    selectDiv.addEventListener('keyup', (event) => {

                        console.log(event.key);
                        if ((selectDiv.value < 3 || selectDiv.value > 9) && event.key !== 'Backspace')
                        { 
                            alert('veuillez choisir entre 3 et 9!') 
                        }
                        else if (event.key === 'Backspace' && selectDivOptions.hasChildNodes() && previewselectDiv.hasChildNodes())
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

                            //boucle sur la valeur entrée dans l'input relatif au nombre d'option
                            for (let i=0; i<selectDiv.value; i++)
                            {
                                //---- creation de l'input pour le nom des options
                                let optionName = document.createElement('input');
                                optionName.setAttribute('type', 'text');
                                optionName.setAttribute('name', 'select['+ selectCount +'][]');
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

                            //incrementation du compte pour le type d'element
                            selectCount++

                        }
                        
                    })
                    
                    
    
                    break;
    
                //choix multiples
                case "checkbox":

                    //---- création de l'input text pour saisir le champ libellé
                    let checkboxDivName = document.createElement('input');
                    checkboxDivName.setAttribute('type','text[]');
                    checkboxDivName.setAttribute('name','checkbox['+ checkboxCount +'][description]')
                    checkboxDivName.setAttribute('id', 'checkboxDivName');

                    //label
                    let checkboxDivNameLabel = document.createElement('label');
                    checkboxDivNameLabel.setAttribute('for', 'checkboxDivName');
                    checkboxDivNameLabel.innerText = "Choisir le champ de référence (ex: De quel quartier êtes-vous ?)"

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
                    checkboxDivLabel.innerText = "Combien de choix voulez-vous ? (min 3 - max 9)";

                    //ajout au dom
                    choiceDiv.appendChild(checkboxDivNameLabel);
                    checkboxDivNameLabel.after(checkboxDivName);
                    checkboxDivName.after(checkboxDivLabel);
                    checkboxDivLabel.after(checkboxDiv);

                    //ajout de la preview du checkbox
                    let checkboxPreviewFieldset = document.createElement('fieldset');
                    let checkboxPreviewFieldsetLegend = document.createElement('legend');

                    previewFormDiv.appendChild(checkboxPreviewFieldset);
                    checkboxPreviewFieldset.appendChild(checkboxPreviewFieldsetLegend);

                    checkboxDivName.addEventListener('keyup', () => { 
                        checkboxPreviewFieldsetLegend.innerHTML = checkboxDivName.value;
                    })                    

                    deleteSelectType.addEventListener('click', () => {                        
                        checkboxPreviewFieldsetLegend.remove();
                        checkboxPreviewFieldset.remove();
                    })
                    

                    //désactivation de la possibilité de choisir le type d'element
                    selectType.disabled = true;

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
                            //boucle sur la valeur entrée dans l'input relatif au nombre d'option
                            for (let i=0; i<checkboxDiv.value; i++)
                            {
                                //---- creation de l'input pour le nom des options
                                let optionName = document.createElement('input');
                                optionName.setAttribute('type', 'text');
                                optionName.setAttribute('name', 'checkbox['+ checkboxCount +'][]');
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

                            //incrementation du compte pour le type d'element
                            checkboxCount++;

                        }
                        
                    })
    
                    break;
    
                //choix unique
                case "radio":

                    //---- création de l'input text pour saisir le champ libellé
                    let radioDivName = document.createElement('input');
                    radioDivName.setAttribute('type','text[]');
                    radioDivName.setAttribute('name','radio['+ radioCount +'][description]')
                    radioDivName.setAttribute('id', 'radioDivName');

                    //label
                    let radioDivNameLabel = document.createElement('label');
                    radioDivNameLabel.setAttribute('for', 'radioDivName');
                    radioDivNameLabel.innerText = "Choisir le champ de référence (ex: De quel quartier êtes-vous ?)";

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
                    radioDivLabel.innerText = "Combien de choix voulez-vous ? (min 2 - max 3)";

                    //ajout au dom
                    choiceDiv.appendChild(radioDivNameLabel);
                    radioDivNameLabel.after(radioDivName);
                    radioDivName.after(radioDivLabel);
                    radioDivLabel.after(radioDiv);

                    //ajout de la preview du radio
                    let radioPreviewFieldset = document.createElement('fieldset');
                    let radioPreviewFieldsetLegend = document.createElement('legend');

                    previewFormDiv.appendChild(radioPreviewFieldset);
                    radioPreviewFieldset.appendChild(radioPreviewFieldsetLegend);

                    radioDivName.addEventListener('keyup', () => { 
                        radioPreviewFieldsetLegend.innerHTML = radioDivName.value;
                    })                    

                    deleteSelectType.addEventListener('click', () => {                        
                        radioPreviewFieldsetLegend.remove();
                        radioPreviewFieldset.remove();
                    })

                    //désactivation de la possibilité de choisir le type d'element
                    selectType.disabled = true;

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
                            //boucle sur la valeur entrée dans l'input relatif au nombre d'option
                            for (let i=0; i<radioDiv.value; i++)
                            {
                                //---- creation de l'input pour le nom des options
                                let optionName = document.createElement('input');
                                optionName.setAttribute('type', 'text');
                                optionName.setAttribute('name', 'radio['+ radioCount +'][]');
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

                            //incrementation du compte pour le type d'element
                            radioCount++;

                        }
                        
                    })
                    break;
            
            }

        })
        
    }
    
}