<?php

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

    header("location: home");
    
}