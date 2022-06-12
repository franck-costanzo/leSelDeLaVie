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
    // counter for modules
    $module_count = 0;

    // receive all input values from the form
    $name_form = htmlspecialchars($_POST['name_form']);

    // check if form already exists
    $names = Formulaire::getAllFormsNames();
    $form_exists = false;
    foreach ($names as $name) 
    {
        if ($name['name_form'] == $name_form) 
        {
            $form_exists = true;
        }
    }

    // if form doesn't exist, create it
    if (!$form_exists) 
    {
        Formulaire::createForm($name_form);
         
        $idForm = Formulaire::getLastInsertedId();

        
        if(isset($_POST['text']))
        {
            foreach($_POST['text'] as $key => $value)
            {
                if(isset($value['description']))
                {
                    Formulaire::createModuleText($value['description'], $value['order']);
                    $idModule = Formulaire::getLastInsertedId();
                    Formulaire::createFormModuleLink('text', $idForm, $idModule);
                    $module_count++;
                }
            }
        }

        if (isset($_POST['textarea']))
        {
            foreach($_POST['textarea'] as $key => $value)
            {
                if(isset($value['description']))
                {
                    Formulaire::createModuleTextArea($value['description'], $value['order']);
                    $idModule = Formulaire::getLastInsertedId();
                    Formulaire::createFormModuleLink('textArea', $idForm, $idModule);
                    $module_count++;
                }
            }
        }

        if (isset($_POST['select']))
        {

            foreach($_POST['select'] as $key => $value)
            {
                if(isset($value['description']))
                {
                    $tempString = '';

                    foreach($value as $key2 => $element)
                    {
                        if (is_int($key2) && $key2 === array_key_last($value)) 
                        {
                            $tempString .= $element;
                        }
                        else if (is_int($key2))
                        {
                            $tempString .= $element.'/';
                        }                    
                    }

                    Formulaire::createModuleSelect($value['description'], $value['count'], $tempString, $value['order']);
                    $idModule = Formulaire::getLastInsertedId();
                    Formulaire::createFormModuleLink('select', $idForm, $idModule);
                    $module_count++;
                }
            }

            
        }

        if (isset($_POST['checkbox']))
        {

            foreach($_POST['checkbox'] as $key => $value)
            {
                if(isset($value['description']))
                {
                    $tempString = '';
                    foreach($value as $key2 => $element)
                    {
                        if (is_int($key2) && $key2 === array_key_last($value)) 
                        {
                            $tempString .= $element;
                        }
                        else if (is_int($key))
                        {
                            $tempString .= $element.'/';
                        }                    
                    }
                    Formulaire::createModuleCheckbox($value['description'], $value['count'], $tempString, $value['order']);
                    $idModule = Formulaire::getLastInsertedId();
                    Formulaire::createFormModuleLink('checkbox', $idForm, $idModule);
                    $module_count++;
                }
            }
        } 
        
        if(isset($_POST['radio']))
        {

            foreach($_POST['radio'] as $key => $value)
            {
                if(isset($value['description']))
                {
                    $tempString = '';
                    foreach($key as $key2 => $element)
                    {
                        if (is_int($key2) && $key2 === array_key_last($value)) 
                        {
                            $tempString .= $element;
                        }
                        else if (is_int($key))
                        {
                            $tempString .= $element.'/';
                        }                    
                    }
                    Formulaire::createModuleRadio($value['description'], $value['count'], $tempString, $value['order']);
                    $idModule = Formulaire::getLastInsertedId();
                    Formulaire::createFormModuleLink('radio', $idForm, $idModule);
                    $module_count++;
                }
            }
        }

        if(isset($_POST['file']))
        {

            foreach($_POST['file'] as $key => $value)
            {
                if(isset($value['description']))
                {
                    Formulaire::createModuleFile($value['description'], $value['order']);
                    $idModule = Formulaire::getLastInsertedId();
                    Formulaire::createFormModuleLink('file', $idForm, $idModule);
                    $module_count++;
                }
            }
        }

    }

    // if ($module_count > 0) 
    // {
    //     session_destroy();
    //     session_start();
    //     $_SESSION['message'] = 'Formulaire créé avec succès';
    //     header('Location: formulaire');
    // }
    // else
    // {
    //     $_SESSION['message'] = 'Erreur lors de la création du formulaire';
    //     header('Location: formulaire');
    // }
}