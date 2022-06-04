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

}