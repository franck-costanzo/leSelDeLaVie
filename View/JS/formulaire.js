export default function appendForm() {
    const selectType = document.getElementById('select_type');
    const submitButton = document.getElementById('reg_form');

    selectType.addEventListener('change', () => {
        console.log(selectType.value);     
        switch (selectType.value)
        {
            //choix champ de texte
            case "text":
                console.log('youpla!')
                let textDiv = document.createElement('input');
                textDiv.setAttribute('type', 'text');
                textDiv.setAttribute('name', 'boom');
                textDiv.setAttribute('id', 'boom');
                let textDivLabel = document.createElement('label');
                textDivLabel.setAttribute('for','boom');
                textDivLabel.innerText = "LE LABEL DE LA MORT";
                submitButton.before(textDivLabel);
                textDivLabel.after(textDiv);
                break;

            //choix champ de commentaire
            case "textarea":
                console.log('youpla area!')
                let textareaDiv = document.createElement('input');
                textareaDiv.setAttribute('type', 'textarea');
                textareaDiv.setAttribute('name', 'boomarea');
                textareaDiv.setAttribute('id', 'boomarea');
                let textareaDivLabel = document.createElement('label');
                textareaDivLabel.setAttribute('for','boomarea');
                textareaDivLabel.innerText = "LE LABEL DE LA MORT area";
                submitButton.before(textareaDivLabel);
                textareaDivLabel.after(textareaDiv);
                break;

            //choix parmis une liste
            case "select":
                console.log('youpla select!')
                
                let selectDiv = document.createElement('input');
                selectDiv.setAttribute('type', 'number');
                selectDiv.setAttribute('min', '3');
                selectDiv.setAttribute('max', '9');
                selectDiv.setAttribute('id', 'boomselect');
                let selectDivLabel = document.createElement('label');
                selectDivLabel.setAttribute('for','boomselect');
                selectDivLabel.innerText = "combien (min 3 - max 9)";
                submitButton.before(selectDivLabel);
                selectDivLabel.after(selectDiv);

                selectDiv.addEventListener('keyup', () => {
                    if (selectDiv.value < 3 || selectDiv.value > 9)
                    { alert('veuillez choisir entre 3 et 9!')}
                    else 
                    {
                        for (let i=0; i<selectDiv.value; i++)
                        {
                            let optionName = document.createElement('input');
                            optionName.setAttribute('type', 'text');
                            optionName.setAttribute('name', 'option'+(i+1));
                            optionName.setAttribute('id', 'option'+(i+1));
                            let optionNameLabel = document.createElement('label');
                            optionNameLabel.setAttribute('for', 'option'+(i+1))
                            optionNameLabel.innerText = 'label pour option '+(i+1);
                            submitButton.before(optionNameLabel);
                            optionNameLabel.after(optionName)
                        }
                    }
                    
                })
                
                

                break;

            //choix multiples
            case "checkbox":
                console.log('youpla checkbox!')
                
                let checkboxDiv = document.createElement('input');
                checkboxDiv.setAttribute('type', 'number');
                checkboxDiv.setAttribute('min', '3');
                checkboxDiv.setAttribute('max', '9');
                checkboxDiv.setAttribute('id', 'boomcheckbox');
                let checkboxDivLabel = document.createElement('label');
                checkboxDivLabel.setAttribute('for','boomcheckbox');
                checkboxDivLabel.innerText = "combien (min 3 - max 9)";
                submitButton.before(checkboxDivLabel);
                checkboxDivLabel.after(checkboxDiv);
                
                checkboxDiv.addEventListener('keyup', () => {
                    if (checkboxDiv.value < 3 || checkboxDiv.value > 9)
                    { alert('veuillez choisir entre 3 et 9!')}
                    else 
                    {
                        for (let i=0; i<checkboxDiv.value; i++)
                        {
                            let optionName = document.createElement('input');
                            optionName.setAttribute('type', 'text');
                            optionName.setAttribute('name', 'option'+(i+1));
                            optionName.setAttribute('id', 'option'+(i+1));
                            let optionNameLabel = document.createElement('label');
                            optionNameLabel.setAttribute('for', 'option'+(i+1))
                            optionNameLabel.innerText = 'label pour option '+(i+1);
                            submitButton.before(optionNameLabel);
                            optionNameLabel.after(optionName)
                        }
                    }
                    
                })

                break;

            //choix unique
            case "radio":
                console.log('youpla radio!')
                
                let radioDiv = document.createElement('input');
                radioDiv.setAttribute('type', 'number');
                radioDiv.setAttribute('min', '2');
                radioDiv.setAttribute('max', '3');
                radioDiv.setAttribute('id', 'boomradio');
                let radioDivLabel = document.createElement('label');
                radioDivLabel.setAttribute('for','boomradio');
                radioDivLabel.innerText = "combien (min 2 - max 3)";
                submitButton.before(radioDivLabel);
                radioDivLabel.after(radioDiv);
                
                radioDiv.addEventListener('keyup', () => {
                    if (radioDiv.value < 2 || radioDiv.value > 3)
                    { alert('veuillez choisir entre 2 et 3!')}
                    else 
                    {
                        for (let i=0; i<radioDiv.value; i++)
                        {
                            let optionName = document.createElement('input');
                            optionName.setAttribute('type', 'text');
                            optionName.setAttribute('name', 'option'+(i+1));
                            optionName.setAttribute('id', 'option'+(i+1));
                            let optionNameLabel = document.createElement('label');
                            optionNameLabel.setAttribute('for', 'option'+(i+1))
                            optionNameLabel.innerText = 'label pour option '+(i+1);
                            submitButton.before(optionNameLabel);
                            optionNameLabel.after(optionName)
                        }
                    }
                    
                })
                break;
        }
    })
}