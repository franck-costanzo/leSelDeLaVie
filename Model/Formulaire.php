<?php //TODO ENORME TODO DE LA MORT : GERER ABSOLUMENT LES DUPLICATIONS DE NOMS POUR CIBLER LE MODULE EXACT ET LE FORMULAIRE EXACT

abstract class Formulaire extends Model 
{

    public function __construct() {}

    public static function createForm($formName) 
    {
        $params = array($formName);

        $sql = 'INSERT INTO forms (name_form)
                VALUES (?)';

        $register = self::requestExecute($sql, $params);

        return $register;
    }

    public static function getFormIdByformName($formName) //probleme de la multiplication des formulaires avec le meme nom
    {
        $params = array($formName);

        $sql = 'SELECT id_form FROM forms 
                WHERE name_form LIKE (?)';

        $getquery = self::requestExecute($sql, $params);
                
        $infos = $getquery->fetch(PDO::FETCH_ASSOC);

        return $infos;
    }

    public static function createFormModuleLink($type, $idForm, $idModule)
    {
        $params = array($type, $idForm, $idModule);

        $sql = 'INSERT INTO forms_modules (forms_modules_type, id_form, id_module)
                VALUES (?, ?, ?)';

        $register = self::requestExecute($sql, $params);

        return $register;
    }

    public static function createModuleText()
    {
        
    }

    public static function createModuleTextArea()
    {

    }

    public static function createModuleSelect()
    {

    }

    public static function createModuleCheckbox()
    {

    }

    public static function createModuleRadio($formName, $radioCount, $radiosNames)
    {
        $params = array($formName, $radioCount, $radiosNames);

        $sql = 'INSERT INTO modules (name_module, radio_count, radio_names)
                VALUES (?, ?, ?)';

        $register = self::requestExecute($sql, $params);

        return $register;
    }

    public static function getModuleIdByFormNameRadioCountAndRadiosNames($formName, $radioCount, $radiosNames)
    {
        $params = array($formName, $radioCount, $radiosNames);

        $sql = 'SELECT id_module FROM modules 
                WHERE name_module LIKE (?)
                AND radio_count LIKE (?)
                AND radio_names LIKE (?)';

        $getquery = self::requestExecute($sql, $params);
                
        $infos = $getquery->fetch(PDO::FETCH_ASSOC);

        return $infos;

    }

}