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

    public static function createFormModuleLink($type, $idForm, $idModule)
    {
        $params = array($type, $idForm, $idModule);

        $sql = 'INSERT INTO forms_modules (forms_modules_type, id_form, id_module)
                VALUES (?, ?, ?)';

        $register = self::requestExecute($sql, $params);

        return $register;
    }

    public static function createModuleText($textLabel)
    {
        $params = array($textLabel);

        $sql = 'INSERT INTO modules (text_Label)
                VALUES (?)';

        $register = self::requestExecute($sql, $params);

        return $register;
    }

    public static function createModuleTextArea($textAreaLabel)
    {
        $params = array($textAreaLabel);

        $sql = 'INSERT INTO modules (textarea_Label)
                VALUES (?)';

        $register = self::requestExecute($sql, $params);

        return $register;
    }

    public static function createModuleSelect($selectLabel, $selectCount, $selectNames)
    {
        $params = array($selectLabel, $selectCount, $selectNames);

        $sql = 'INSERT INTO modules (select_label, option_count, option_names)
                VALUES (?, ?, ?)';

        $register = self::requestExecute($sql, $params);

        return $register;
    }

    public static function createModuleCheckbox($checkboxLabel, $checkboxCount, $checkboxNames)
    {
        $params = array($checkboxLabel, $checkboxCount, $checkboxNames);

        $sql = 'INSERT INTO modules (checkbox_label, checkbox_count, checkbox_names)
                VALUES (?, ?, ?)';

        $register = self::requestExecute($sql, $params);

        return $register;

    }

    public static function createModuleRadio($radioLabel, $radioCount, $radioNames)
    {
        $params = array($radioLabel, $radioCount, $radioNames);

        $sql = 'INSERT INTO modules (radio_label, radio_count, radio_names)
                VALUES (?, ?, ?)';

        $register = self::requestExecute($sql, $params);

        return $register;
    }

    // public static function getModuleIdByFormNameRadioCountAndRadiosNames($formName, $radioCount, $radiosNames)
    // {
    //     $params = array($formName, $radioCount, $radiosNames);

    //     $sql = 'SELECT id_module FROM modules 
    //             WHERE name_module LIKE (?)
    //             AND radio_count LIKE (?)
    //             AND radio_names LIKE (?)';

    //     $getquery = self::requestExecute($sql, $params);
                
    //     $infos = $getquery->fetch(PDO::FETCH_ASSOC);

    //     return $infos;

    // }

}