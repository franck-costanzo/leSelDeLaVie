<?php

Class Categorie extends Model
{
    public function __construct() {}

    public static function getAllCategories()
    {
        $sql = 'SELECT * FROM categories';
        $categories = self::requestExecute($sql)->fetchAll(PDO::FETCH_ASSOC);

        return $categories;
    }

    public static function selectCat()
    {
        $sqlinsert = "SELECT id_category, name_category FROM categories ";
        $infos = self::requestExecute($sqlinsert);
        $return = $infos->fetchAll(PDO::FETCH_ASSOC);
        return $return;
    }

    public static function getCategory($id)
    {
        $params = array($id);

        $sql = 'SELECT * FROM categories WHERE id_category = ?';
        $category = self::requestExecute($sql, $params);

        return $category;
    }

    public static function createCategory($name_category)
    {
        $params = array($name_category);

        $sql = 'INSERT INTO categories (name_category)
                VALUES (?)';

        $register = self::requestExecute($sql, $params);

        return $register;
    }

    public static function updateCategory($id_category, $name_category)
    {
        $params = array($name_category, $id_category);

        $sql = 'UPDATE categories SET name_category = ? WHERE id_category = ?';

        $register = self::requestExecute($sql, $params);

        return $register;
    }

    public static function deleteCategory($id_category)
    {
        $params = array($id_category);

        $sql = 'DELETE FROM categories WHERE id_category = ?';

        $register = self::requestExecute($sql, $params);

        return $register;
    }

    public static function deleteCat($idcat)
    {
        $sqlinsert = "DELETE FROM categories WHERE id_category=:id ";
        $params=array(':id'=>$idcat);
        $infos = self::requestExecute($sqlinsert,$params);
        
    }

    //getAllCategoriesNameById
    public static function getAllCategoriesNameById($id_category)
    {
        $params = array($id_category);

        $sql = 'SELECT name_category FROM categories WHERE id_category = ?';
        $categories = self::requestExecute($sql, $params);

        return $categories;
    }

}