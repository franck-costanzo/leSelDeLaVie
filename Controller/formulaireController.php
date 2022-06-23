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
                    Formulaire::createModule('text', $value['order'], $value['description'], $idForm);
                }
            }
        }

        if (isset($_POST['textarea']))
        {
            foreach($_POST['textarea'] as $key => $value)
            {
                if(isset($value['description']))
                {
                    Formulaire::createModule('textarea', $value['order'], $value['description'], $idForm);
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
                            $tempString .= $element.'||';
                        }                    
                    }

                    $idModule = Formulaire::getLastInsertedId();
                    Formulaire::createModule('select', $value['order'], $value['description'], 
                                            $idForm, $value['count'], $tempString);
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
                        else if (is_int($key2))
                        {
                            $tempString .= $element.'||';
                        }                    
                    }
                    $idModule = Formulaire::getLastInsertedId();
                    Formulaire::createModule('checkbox', $value['order'], $value['description'], 
                                                $idForm, $value['count'], $tempString);
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
                    foreach($value as $key2 => $element)
                    {
                        if (is_int($key2) && $key2 === array_key_last($value)) 
                        {
                            $tempString .= $element;
                        }
                        else if (is_int($key2))
                        {
                            $tempString .= $element.'||';
                        }                    
                    }
                    $idModule = Formulaire::getLastInsertedId();
                    Formulaire::createModule('radio', $value['order'], $value['description'], 
                                                $idForm, $value['count'], $tempString);
                }
            }
        }

        if(isset($_POST['file']))
        {
            foreach($_POST['file'] as $key => $value)
            {
                if(isset($value['description']))
                {
                    $idModule = Formulaire::getLastInsertedId();
                    Formulaire::createModule('file', $value['order'], $value['description'], $idForm);
                }
            }
        }
    }
}