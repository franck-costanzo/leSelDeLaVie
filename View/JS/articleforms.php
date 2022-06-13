<?php

    $bdd;

    $servername = 'localhost';
    $username = 'root';
    $password = '';
    $db = 'le_sel_de_la_vie_site';

    try
    {
        $bdd = new PDO( "mysql:host=$servername;dbname=$db", $username, $password,
                        array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION) );
    }
    catch (PDOException $e)
    {
        echo "Connection failed: " . $e->getMessage();
    }

    $sql = 'SELECT forms.*, forms_modules.forms_modules_type, modules.* FROM `forms` 
            INNER JOIN forms_modules ON forms.id_form = forms_modules.id_form 
            INNER JOIN modules ON forms_modules.id_module = modules.id_module
            ORDER BY modules.module_order;';

    $forms = $bdd->query($sql);

    $names = $forms->fetchAll(PDO::FETCH_ASSOC);

    $formNamesJSON = json_encode($names);

    echo $formNamesJSON;