<?php

Class Article extends Model
{
    public function __construct() {}

    public static function getAllArticles()
    {
        $sql = 'SELECT * FROM articles';
        $articles = self::requestExecute($sql)->fetchAll(PDO::FETCH_ASSOC);

        return $articles;
    }

    public static function getArticle($id)
    {
        $params = array($id);

        $sql = 'SELECT * FROM articles WHERE id_article = ?';
        $article = self::requestExecute($sql, $params)->fetchAll(PDO::FETCH_ASSOC);

        return $article;
    }

    public static function getAllArticlesByCategory($id_category)
    {
        $params = array($id_category);

        $sql = 'SELECT * FROM articles WHERE id_category = ?';
        $articles = self::requestExecute($sql, $params)->fetchAll(PDO::FETCH_ASSOC);

        return $articles;
    }

    public static function createArticle($name_article, $image_url, $description, $id_category, $id_form)
    {
        $params = array($name_article, $image_url, $description, $id_category, $id_form);

        $sql = 'INSERT INTO articles (name_article, image_url, description_article, id_category, id_state, id_form)
                VALUES (?, ?, ?, ?, 1, ?)';

        $register = self::requestExecute($sql, $params);

        return $register;
    }

    public static function getArticlesPagination($first, $perPage)
    {

        $sql = 'SELECT * FROM articles ORDER BY date_created DESC LIMIT '.$first.','.$perPage;

        $articles = self::requestExecute($sql)->fetchAll(PDO::FETCH_ASSOC);

        return $articles;
    }

    public static function getAllArticlesByCategoryPagination($id_category, $first, $perPage)
    {
        $params = array($id_category);

        $sql = 'SELECT * FROM articles WHERE id_category = ? ORDER BY date_created DESC LIMIT '.$first.','.$perPage;
        $articles = self::requestExecute($sql, $params)->fetchAll(PDO::FETCH_ASSOC);

        return $articles;
    }


}