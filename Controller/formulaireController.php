<?php 

// query get all forms 
/* 
SELECT forms.*, forms_modules.forms_modules_type, modules.* FROM `forms` 
INNER JOIN forms_modules ON forms.id_form = forms_modules.id_form 
INNER JOIN modules ON forms_modules.id_module = modules.id_module
ORDER BY modules.module_order; 
*/

/*-------------------------------
          REGISTER FORM 
--------------------------------*/

if (isset($_POST['reg_form'])) 
{
    // receive all input values from the form
    $name_form = htmlspecialchars($_POST['name_form']);

    // form validation
    // by adding (array_push()) corresponding error unto $errors array
    if (empty($name_form)) { /*TODO*/ }

    // Finally, register user if there are no errors in the form
    //TODO : if ( errors == 0) {}
    Formulaire::createForm($name_form);

    
    $idForm = Formulaire::getLastInsertedId();

    
    if(isset($_POST['text']))
    {
        for ($i=0; $i<sizeof($_POST['text']); $i++)
        {
            if(isset($_POST['text'][$i]))
            {
                Formulaire::createModuleText($_POST['text'][$i]['description'], $_POST['text'][$i]['order']);
                $idModule = Formulaire::getLastInsertedId();
                Formulaire::createFormModuleLink('text', $idForm, $idModule);
            }            
        }
    }

    if (isset($_POST['textarea']))
    {
        for ($i=0; $i<sizeof($_POST['textarea']); $i++)
        {
            if(isset($_POST['textarea'][$i]))
            {
                Formulaire::createModuleTextArea($_POST['textarea'][$i]['description'],$_POST['textarea'][$i]['order']);
                $idModule = Formulaire::getLastInsertedId();
                Formulaire::createFormModuleLink('textArea', $idForm, $idModule);
            }
        }
    }

    if (isset($_POST['select']))
    {
        for ($i=0; $i<sizeof($_POST['select']); $i++)
        {
            if (isset($_POST['select'][$i]))
            {
                $tempString = '';

                foreach($_POST['select'][$i] as $key => $element)
                {
                    if (is_int($key) && $key === array_key_last($_POST['select'][$i])) {
                        $tempString .= $element;
                    }
                    else if (is_int($key))
                    {
                        $tempString .= $element.'/';
                    }                    
                }

                Formulaire::createModuleSelect($_POST['select'][$i]["description"], $_POST['select'][$i]["count"], $tempString, $_POST['select'][$i]["order"]);
                $idModule = Formulaire::getLastInsertedId();
                Formulaire::createFormModuleLink('select', $idForm, $idModule);
            }            
        }
    }

    if (isset($_POST['checkbox']))
    {
        for ($i=0; $i<sizeof($_POST['checkbox']); $i++)
        {
            if (isset($_POST['checkbox'][$i]))
            {
                $tempString = '';
                foreach($_POST['checkbox'][$i] as $key => $element)
                {
                    if (is_int($key) && $key === array_key_last($_POST['checkbox'][$i])) {
                        $tempString .= $element;
                    }
                    else if (is_int($key))
                    {
                        $tempString .= $element.'/';
                    }                    
                }
                Formulaire::createModuleCheckbox($_POST['checkbox'][$i]["description"], $_POST['checkbox'][$i]["count"], $tempString, $_POST['checkbox'][$i]["order"]);
                $idModule = Formulaire::getLastInsertedId();
                Formulaire::createFormModuleLink('checkbox', $idForm, $idModule);
            }
        }
    } 
       
    if(isset($_POST['radio']))
    {
        for ($i=0; $i<sizeof($_POST['radio']); $i++)
        {
            if (isset($_POST['radio'][$i]))
            {
                $tempString = '';
                foreach($_POST['radio'][$i] as $key => $element)
                {
                    if (is_int($key) && $key === array_key_last($_POST['radio'][$i])) {
                        $tempString .= $element;
                    }
                    else if (is_int($key))
                    {
                        $tempString .= $element.'/';
                    }                    
                }
                Formulaire::createModuleRadio($_POST['radio'][$i]["description"], $_POST['radio'][$i]["count"], $tempString, $_POST['radio'][$i]["order"]);
                $idModule = Formulaire::getLastInsertedId();
                Formulaire::createFormModuleLink('radio', $idForm, $idModule);
            }
        }
    }

    if(isset($_POST['file']))
    {
        for ($i=0; $i<sizeof($_POST['file']); $i++)
        {
            if(isset($_POST['file'][$i]))
            {
                Formulaire::createModuleFile($_POST['file'][$i]['description'], $_POST['file'][$i]['order']);
                $idModule = Formulaire::getLastInsertedId();
                Formulaire::createFormModuleLink('file', $idForm, $idModule);
            }            
        }
    }

    
    echo '<pre>';
    echo var_dump($_POST);
    echo '</pre>';    
}