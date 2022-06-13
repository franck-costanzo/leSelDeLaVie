<?php

Class Article extends Model
{
    public function __construct() {}

    public static function getAllArticles()
    {
        $sql = 'SELECT * FROM articles';
        $articles = self::requestExecute($sql);

        return $articles;
    }

    public static function getArticle($id)
    {
        $params = array($id);

        $sql = 'SELECT * FROM articles WHERE id_article = ?';
        $article = self::requestExecute($sql, $params);

        return $article;
    }

    public static function createArticle($name_article, $image_url, $description, $id_category, $id_state, $id_form)
    {
        $params = array($name_article, $image_url, $description, $id_category, $id_state, $id_form);

        $sql = 'INSERT INTO articles (name_article, image_url, description, id_category, id_state, id_form)
                VALUES (?, ?, ?, ?, 1, ?)';

        $register = self::requestExecute($sql, $params);

        return $register;
    }

}