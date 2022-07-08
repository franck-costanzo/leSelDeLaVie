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

    public static function createModule($moduleType, $moduleOrder, $moduleLabel,
                                 $idForms, $optionCount = NULL, $optionNames = NULL)
    {
        if ($optionCount == NULL and $optionNames == NULL)
        {
            $params = array($moduleType, $moduleOrder, $moduleLabel, $idForms);

            $sql = 'INSERT INTO modules (module_type, module_order, 
                    module_label, id_form)
                    VALUES (?, ?, ?, ?)';
        }
        else
        {
            $params = array($moduleType, $moduleOrder, $moduleLabel,
                            $optionCount, $optionNames, $idForms);

            $sql = 'INSERT INTO modules (`module_type`,`module_order`, `module_label`, 
            `option_count`, `option_names`,  `id_form`)
                    VALUES (?, ?, ?, ?, ?, ?)';
        }

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

        $sql = 'SELECT forms.name_form, modules.* FROM `forms`
        INNER JOIN modules ON forms.id_form = modules.id_form
        WHERE forms.id_form = ?
        ORDER BY modules.module_order';

        $form = self::requestExecute($sql, $params)->fetchAll(PDO::FETCH_ASSOC);

        return $form;
    }

    public static function getFormByModuleOrder()
    {
        $sql = 'SELECT forms.name_form, modules.* FROM `forms`
                INNER JOIN modules ON forms.id_form = modules.id_form
                ORDER BY modules.module_order';
        
        return (self::requestExecute($sql)->fetchAll(PDO::FETCH_ASSOC));
    }

    
    public static function selectForm()
    {
        $sqlinsert = "SELECT id_form, name_form FROM forms ";
        $infos = self::requestExecute($sqlinsert);
        $return = $infos->fetchAll(PDO::FETCH_ASSOC);
        return $return;
    }

    public static function deleteFormById($id)
    {
        $params = array($id);

        $sql = 'DELETE FROM forms WHERE id_form = ?';

        $register = self::requestExecute($sql, $params);

        return $register;
    }

}