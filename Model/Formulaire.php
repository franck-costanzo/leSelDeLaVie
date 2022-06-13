<?php 

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

    public static function createModuleText($textLabel, $order)
    {
        $params = array($textLabel, $order);

        $sql = 'INSERT INTO modules (text_Label, module_order)
                VALUES (?, ?)';

        $register = self::requestExecute($sql, $params);

        return $register;
    }

    public static function createModuleTextArea($textAreaLabel, $order)
    {
        $params = array($textAreaLabel, $order);

        $sql = 'INSERT INTO modules (textarea_Label, module_order)
                VALUES (?, ?)';

        $register = self::requestExecute($sql, $params);

        return $register;
    }

    public static function createModuleSelect($selectLabel, $selectCount, $selectNames, $order)
    {
        $params = array($selectLabel, $selectCount, $selectNames, $order);

        $sql = 'INSERT INTO modules (select_label, option_count, option_names, module_order)
                VALUES (?, ?, ?, ?)';

        $register = self::requestExecute($sql, $params);

        return $register;
    }

    public static function createModuleCheckbox($checkboxLabel, $checkboxCount, $checkboxNames, $order)
    {
        $params = array($checkboxLabel, $checkboxCount, $checkboxNames, $order);

        $sql = 'INSERT INTO modules (checkbox_label, checkbox_count, checkbox_names, module_order)
                VALUES (?, ?, ?, ?)';

        $register = self::requestExecute($sql, $params);

        return $register;

    }

    public static function createModuleRadio($radioLabel, $radioCount, $radioNames, $order)
    {
        $params = array($radioLabel, $radioCount, $radioNames, $order);

        $sql = 'INSERT INTO modules (radio_label, radio_count, radio_names, module_order)
                VALUES (?, ?, ?, ?)';

        $register = self::requestExecute($sql, $params);

        return $register;
    }

    public static function createModuleFile($fileLabel, $order)
    {
        $params = array($fileLabel, $order);

        $sql = 'INSERT INTO modules (file_Label, module_order)
                VALUES (?, ?)';

        $register = self::requestExecute($sql, $params);

        return $register;
    }

    public static function getAllFormsNames()
    {
        $sql = 'SELECT name_form FROM forms';

        $forms = self::requestExecute($sql)->fetchAll(PDO::FETCH_ASSOC);

        return $forms;

    }
    
    public static function getAllForms()
    {
        $sql = 'SELECT * FROM forms';

        $forms = self::requestExecute($sql)->fetchAll(PDO::FETCH_ASSOC);

        return $forms;

    }

    public static function getFormByIdOrderByModuleOrder($idForm)
    {
        $params = array($idForm);

        $sql = 'SELECT * FROM forms WHERE id_form = ?';

        $form = self::requestExecute($sql, $params)->fetch(PDO::FETCH_ASSOC);

        return $form;
    }

}