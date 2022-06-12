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

$sql = 'SELECT name_form FROM forms';

$forms = $bdd->query($sql);

$names = $forms->fetchAll(PDO::FETCH_ASSOC);

$formNamesJSON = json_encode($names);

echo $formNamesJSON;