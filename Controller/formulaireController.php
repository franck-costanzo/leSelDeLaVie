<?php 

/*-------------------------------
          REGISTER FORM 
--------------------------------*/

if (isset($_POST['reg_form'])) 
{
    // receive all input values from the form
    $name_form = htmlentities($_POST['name_form']);

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

        function moduleCreation($postVariable, $moduleType, $idForm)
        {
            if(isset($postVariable))
            {
                foreach($postVariable as $key => $value)
                {
                    if(isset($value['description']))
                    {
                        if ($moduleType == 'text' || $moduleType == 'textarea' || $moduleType == 'file')
                        {
                            Formulaire::createModule($moduleType, htmlentities($value['order']), htmlentities($value['description']), $idForm);
                        }
                        else if ($moduleType == 'select' || $moduleType == 'checkbox' || $moduleType == 'radio')
                        {
                            $tempString = '';

                            foreach($value as $key2 => $element)
                            {
                                if (is_int($key2) && $key2 === array_key_last($value)) 
                                {

                                    $tempString .= htmlentities($element);
                                }
                                else if (is_int($key2))
                                {
                                    $tempString .= htmlentities($element).'||';
                                }                    
                            }

                            $idModule = Formulaire::getLastInsertedId();
                            Formulaire::createModule( $moduleType, htmlentities($value['order']), htmlentities($value['description']), 
                                                    $idForm, htmlentities($value['count']), $tempString);
                        }                    
                    }
                }
            }
        }

        if(isset($_POST['text'])) { moduleCreation($_POST['text'], 'text', $idForm); }
        if(isset($_POST['textarea'])) { moduleCreation($_POST['textarea'], 'textarea', $idForm); } 
        if(isset($_POST['file'])) { moduleCreation($_POST['file'], 'file', $idForm); }  
        if(isset($_POST['select'])) { moduleCreation($_POST['select'], 'select', $idForm); }  
        if(isset($_POST['checkbox'])) { moduleCreation($_POST['checkbox'], 'checkbox', $idForm); } 
        if(isset($_POST['radio'])) { moduleCreation($_POST['radio'], 'radio', $idForm); }    
    }
}