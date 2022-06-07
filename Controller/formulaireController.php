<?php 

// query get all forms 
/* 
SELECT * FROM `forms` 
INNER JOIN forms_modules ON forms.id_form = forms_modules.id_form 
INNER JOIN modules ON forms_modules.id_module = modules.id_module; 
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
                Formulaire::createModuleText($_POST['text'][$i]);
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
                Formulaire::createModuleTextArea($_POST['textarea'][$i]);
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
                $tempCount = sizeof($_POST['select'][$i]) - 3;
                for ($y=0; $y<(sizeof($_POST['select'][$i]) - 2); $y++)
                {

                    if ($y == $tempCount)
                    {
                        $tempString .= $_POST['select'][$i][$y];
                    }
                    else
                    {
                        $tempString .= $_POST['select'][$i][$y].'/';
                    }

                }
                Formulaire::createModuleSelect($_POST['select'][$i]["description"], $_POST['select'][$i]["count"], $tempString);
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
                $tempCount = sizeof($_POST['checkbox'][$i]) - 3;
                for ($y=0; $y<(sizeof($_POST['checkbox'][$i]) - 2); $y++)
                {
                    if ($y == $tempCount)
                    {
                        $tempString .= $_POST['checkbox'][$i][$y];
                    }
                    else
                    {
                        $tempString .= $_POST['checkbox'][$i][$y].'/';
                    }
                }
                Formulaire::createModuleCheckbox($_POST['checkbox'][$i]["description"], $_POST['checkbox'][$i]["count"], $tempString);
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
                $tempCount = sizeof($_POST['radio'][$i]) - 3;
                for ($y=0; $y<(sizeof($_POST['radio'][$i]) - 2); $y++)
                {
                    if ($y == $tempCount)
                    {
                        $tempString .= $_POST['radio'][$i][$y];
                    }
                    else
                    {
                        $tempString .= $_POST['radio'][$i][$y].'/';
                    }
                }
                Formulaire::createModuleRadio($_POST['radio'][$i]["description"], $_POST['radio'][$i]["count"], $tempString);
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
                Formulaire::createModuleFile($_POST['file'][$i]);
                $idModule = Formulaire::getLastInsertedId();
                Formulaire::createFormModuleLink('file', $idForm, $idModule);
            }            
        }
    }

    
    // echo '<pre>';
    // echo var_dump($_POST);
    // echo '</pre>';    
}