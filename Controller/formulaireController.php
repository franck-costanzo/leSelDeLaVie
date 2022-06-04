<?php //TODO ENORME TODO DE LA MORT : GERER ABSOLUMENT LES DUPLICATIONS DE NOMS POUR CIBLER LE MODULE EXACT ET LE FORMULAIRE EXACT

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

    //TODO ENORME TODO DE LA MORT : GERER ABSOLUMENT LES DUPLICATIONS DE NOMS POUR CIBLER LE MODULE EXACT ET LE FORMULAIRE EXACT
    $idForm = Formulaire::getFormIdByformName($name_form);

    //TODO : isset text/textArea/select/checkbox    
    if(isset($_POST['radio']))
    {
        for ($i=0; $i<sizeof($_POST['radio']); $i++)
        {
            $tempRadioArray = '';
            for ($y=0; $y<(sizeof($_POST['radio'][$i]) - 2); $y++)
            {
                $tempRadioArray .= $_POST['radio'][$i][$y];
            }
            Formulaire::createModuleRadio($_POST['radio'][$i]["name"], $_POST['radio'][$i]["count"], $tempRadioArray);
            $idModule = Formulaire::getModuleIdByFormNameRadioCountAndRadiosNames($_POST['radio'][$i]["name"], $_POST['radio'][$i]["count"], $tempRadioArray);
            Formulaire::createFormModuleLink('radio', $idForm["id_form"], $idModule["id_module"]);
        }
    }

    echo '<pre>';
    echo var_dump($_POST);
    echo '</pre>';    
}