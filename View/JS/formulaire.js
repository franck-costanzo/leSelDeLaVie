export default function appendForm() {
    //const selectType = document.getElementById('select_type');
    const submitButton = document.getElementById('reg_form');

    const addSelectType = document.createElement('button');
    addSelectType.setAttribute('type', 'button');
    addSelectType.innerText = 'ajouter un champ';
    submitButton.before(addSelectType);
    addSelectType.addEventListener('click', () => {
        selectTypeAppend();
    })

    var selectCount = 0;
    var checkboxCount = 0;
    var radioCount = 0;


    function selectTypeAppend()
    {
        let selectTypeLabel = document.createElement('label');
        selectTypeLabel.setAttribute('for', 'select_type');
        selectTypeLabel.innerText = 'choisir un type de champ à ajouter';

        let deleteSelectType = document.createElement('button');
        deleteSelectType.setAttribute('type', 'button');
        deleteSelectType.innerText = 'Effacer le champ';
        deleteSelectType.addEventListener('click', () => {
            selectType.remove();
            selectTypeLabel.remove();
            choiceDiv.remove();
            deleteSelectType.remove();
        })

        

        let selectType = document.createElement('select');
        selectType.setAttribute('name','select_type[]');
        selectType.setAttribute('id', 'select_type');
        
        function appendOption(valueString, selectedBool, disabledBool, innerHtmlString)
        {
            let option = document.createElement('option');
            option.setAttribute('value', valueString);
            option.selected = selectedBool;
            option.disabled = disabledBool;
            option.innerText = innerHtmlString;
            selectType.appendChild(option);
        }

        appendOption('disabled', true, true, 'choisissez une option');
        appendOption('text', false, false, 'champ de texte');
        appendOption('textarea', false, false,'champ de commentaire');
        appendOption('select', false, false,'choix parmis une liste');
        appendOption('checkbox', false, false,'choix multiples');
        appendOption('radio', false, false,'choix unique (ex: oui/non)');

        let choiceDiv = document.createElement('div');

        selectType.addEventListener('change', () => {
            console.log(selectType.value);     
            switch (selectType.value)
            {
                
                //choix champ de texte
                case "text":
                    let textDiv = document.createElement('input');
                    textDiv.setAttribute('type', 'text');
                    textDiv.setAttribute('name', 'text[]');
                    textDiv.setAttribute('id', 'text');
                    let textDivLabel = document.createElement('label');
                    textDivLabel.setAttribute('for','text');
                    textDivLabel.innerText = "Choisir le champ de référence ( Ex :  Veuillez entrer votre nom )";
                    choiceDiv.appendChild(textDivLabel);
                    textDivLabel.after(textDiv);
                    selectType.disabled = true;
                    break;
    
                //choix champ de commentaire
                case "textarea":
                    let textareaDiv = document.createElement('input');
                    textareaDiv.setAttribute('type', 'textarea');
                    textareaDiv.setAttribute('name', 'textarea[]');
                    textareaDiv.setAttribute('id', 'textarea');
                    let textareaDivLabel = document.createElement('label');
                    textareaDivLabel.setAttribute('for','textarea');
                    textareaDivLabel.innerText = "Choisir le champ de référence ( Ex :  Informations complémentaires )";
                    choiceDiv.appendChild(textareaDivLabel);
                    textareaDivLabel.after(textareaDiv);
                    selectType.disabled = true;
                    break;
    
                //choix parmis une liste
                case "select":
                    let selectDivName = document.createElement('input');
                    selectDivName.setAttribute('type','text[]');
                    selectDivName.setAttribute('name','select['+ selectCount +'][name]')
                    selectDivName.setAttribute('id', 'selectDivName');
                    let selectDivNameLabel = document.createElement('label');
                    selectDivNameLabel.setAttribute('for', 'selectDivName');
                    selectDivNameLabel.innerText = "Choisir le champ de référence (ex: De quel quartier êtes-vous ?)"
                    let selectDiv = document.createElement('input');
                    selectDiv.setAttribute('type', 'number');
                    selectDiv.setAttribute('name', 'select['+ selectCount +'][count]');
                    selectDiv.setAttribute('min', '3');
                    selectDiv.setAttribute('max', '9');
                    selectDiv.setAttribute('id', 'select');
                    let selectDivLabel = document.createElement('label');
                    selectDivLabel.setAttribute('for','select');
                    selectDivLabel.innerText = "Combien de choix dans la liste ? (min 3 - max 9)";
                    choiceDiv.appendChild(selectDivNameLabel);
                    selectDivNameLabel.after(selectDivName);
                    selectDivName.after(selectDivLabel);
                    selectDivLabel.after(selectDiv);
                    selectType.disabled = true;
    
                    selectDiv.addEventListener('keyup', () => {
                        if (selectDiv.value < 3 || selectDiv.value > 9)
                        { alert('veuillez choisir entre 3 et 9!')}
                        else 
                        {
                            for (let i=0; i<selectDiv.value; i++)
                            {
                                let optionName = document.createElement('input');
                                optionName.setAttribute('type', 'text');
                                optionName.setAttribute('name', 'select['+ selectCount +'][]');
                                optionName.setAttribute('id', 'option'+(i+1));
                                let optionNameLabel = document.createElement('label');
                                optionNameLabel.setAttribute('for', 'option'+(i+1))
                                optionNameLabel.innerText = 'Nom du choix '+(i+1);
                                choiceDiv.appendChild(optionNameLabel);
                                optionNameLabel.after(optionName)
                            }
                            selectCount++
                        }
                        
                    })
                    
                    
    
                    break;
    
                //choix multiples
                case "checkbox":
                    let checkboxDivName = document.createElement('input');
                    checkboxDivName.setAttribute('type','text[]');
                    checkboxDivName.setAttribute('name','checkbox['+ checkboxCount +'][name]')
                    checkboxDivName.setAttribute('id', 'checkboxDivName');
                    let checkboxDivNameLabel = document.createElement('label');
                    checkboxDivNameLabel.setAttribute('for', 'checkboxDivName');
                    checkboxDivNameLabel.innerText = "Choisir le champ de référence (ex: De quel quartier êtes-vous ?)"
                    let checkboxDiv = document.createElement('input');
                    checkboxDiv.setAttribute('type', 'number');
                    checkboxDiv.setAttribute('name', 'checkbox['+ checkboxCount +'][count]');
                    checkboxDiv.setAttribute('min', '3');
                    checkboxDiv.setAttribute('max', '9');
                    checkboxDiv.setAttribute('id', 'checkbox');
                    let checkboxDivLabel = document.createElement('label');
                    checkboxDivLabel.setAttribute('for','checkbox');
                    checkboxDivLabel.innerText = "Combien de choix voulez-vous ? (min 3 - max 9)";
                    choiceDiv.appendChild(checkboxDivNameLabel);
                    checkboxDivNameLabel.after(checkboxDivName);
                    checkboxDivName.after(checkboxDivLabel);
                    checkboxDivLabel.after(checkboxDiv);
                    selectType.disabled = true;
                    
                    checkboxDiv.addEventListener('keyup', () => {
                        if (checkboxDiv.value < 3 || checkboxDiv.value > 9)
                        { alert('veuillez choisir entre 3 et 9!')}
                        else 
                        {
                            for (let i=0; i<checkboxDiv.value; i++)
                            {
                                let optionName = document.createElement('input');
                                optionName.setAttribute('type', 'text');
                                optionName.setAttribute('name', 'checkbox['+ checkboxCount +'][]');
                                optionName.setAttribute('id', 'option'+(i+1));
                                let optionNameLabel = document.createElement('label');
                                optionNameLabel.setAttribute('for', 'option'+(i+1))
                                optionNameLabel.innerText = 'Nom du choix '+(i+1);
                                choiceDiv.appendChild(optionNameLabel);
                                optionNameLabel.after(optionName)
                            }
                            checkboxCount++;
                        }
                        
                    })
    
                    break;
    
                //choix unique
                case "radio":
                    let radioDivName = document.createElement('input');
                    radioDivName.setAttribute('type','text[]');
                    radioDivName.setAttribute('name','radio['+ radioCount +'][name]')
                    radioDivName.setAttribute('id', 'radioDivName');
                    let radioDivNameLabel = document.createElement('label');
                    radioDivNameLabel.setAttribute('for', 'radioDivName');
                    radioDivNameLabel.innerText = "Choisir le champ de référence (ex: De quel quartier êtes-vous ?)"
                    let radioDiv = document.createElement('input');
                    radioDiv.setAttribute('type', 'number');
                    radioDiv.setAttribute('name', 'radio['+ radioCount +'][count]')
                    radioDiv.setAttribute('min', '2');
                    radioDiv.setAttribute('max', '3');
                    radioDiv.setAttribute('id', 'radio');
                    let radioDivLabel = document.createElement('label');
                    radioDivLabel.setAttribute('for','radio');
                    radioDivLabel.innerText = "Combien de choix voulez-vous ? (min 2 - max 3)";
                    choiceDiv.appendChild(radioDivNameLabel);
                    radioDivNameLabel.after(radioDivName);
                    radioDivName.after(radioDivLabel);
                    radioDivLabel.after(radioDiv);
                    selectType.disabled = true;
                    
                    radioDiv.addEventListener('keyup', () => {
                        if (radioDiv.value < 2 || radioDiv.value > 3)
                        { alert('veuillez choisir entre 2 et 3!')}
                        else 
                        {
                            for (let i=0; i<radioDiv.value; i++)
                            {
                                let optionName = document.createElement('input');
                                optionName.setAttribute('type', 'text');
                                optionName.setAttribute('name', 'radio['+ radioCount +'][]');
                                optionName.setAttribute('id', 'option'+(i+1));
                                let optionNameLabel = document.createElement('label');
                                optionNameLabel.setAttribute('for', 'option'+(i+1))
                                optionNameLabel.innerText = 'Nom du choix '+(i+1);
                                choiceDiv.appendChild(optionNameLabel);
                                optionNameLabel.after(optionName)
                            }
                            radioCount++;
                        }
                        
                    })
                    break;
            }
        })

        addSelectType.before(selectTypeLabel);
        selectTypeLabel.after(selectType);
        selectType.after(choiceDiv);
        choiceDiv.after(deleteSelectType);
    }
    
}