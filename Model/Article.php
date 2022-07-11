<?php

Class Article extends Model
{
    public function __construct() {}

    public static function getAllArticles()
    {
        $sql = 'SELECT * FROM articles WHERE id_state=2';
        $articles = self::requestExecute($sql)->fetchAll(PDO::FETCH_ASSOC);

        return $articles;
    }

    public static function getArticle($id)
    {
        $params = array($id);

        $sql = 'SELECT * FROM articles 
        INNER JOIN categories ON articles.id_category=categories.id_category
        LEFT JOIN forms ON articles.id_form = forms.id_form
        WHERE articles.id_article = ?';
        $article = self::requestExecute($sql, $params)->fetch();

        return $article;
    }

    public static function getAllArticlesByCategory($id_category,$state=2)
    {
        $params = array($id_category,$state);

        $sql = 'SELECT * FROM articles WHERE id_category = ? AND id_state =?';
        $articles = self::requestExecute($sql, $params)->fetchAll(PDO::FETCH_ASSOC);

        return $articles;
    }

    public static function createArticle($name_article, $image_url, $description, $id_category, $id_form = NULL)
    {
        $params = array($name_article, $image_url, $description, $id_category, $id_form);

        $sql = 'INSERT INTO articles (name_article, image_url, description_article, id_category, id_state, id_form)
                VALUES (?, ?, ?, ?, 1, ?)';

        $register = self::requestExecute($sql, $params);

        return $register;
    }

    public static function createArticleNoImg($name_article, $description, $id_category, $id_form = NULL)
    {
        $params = array($name_article, $description, $id_category, $id_form);

        $sql = 'INSERT INTO articles (name_article, description_article, id_category, id_state, id_form)
                VALUES (?, ?, ?, 1, ?)';

        $register = self::requestExecute($sql, $params);

        return $register;
    }

    public static function getArticlesPagination($first, $perPage)
    {

        $sql = 'SELECT * FROM articles WHERE id_state=2 ORDER BY `date_created` DESC LIMIT '.$first.','.$perPage.' ';

        $articles = self::requestExecute($sql)->fetchAll(PDO::FETCH_ASSOC);

        return $articles;
    }

    public static function getAllArticlesByCategoryPagination($id_category, $first, $perPage)
    {
        $params = array($id_category);

        $sql = 'SELECT * FROM articles WHERE id_category = ? AND id_state=2 ORDER BY date_created DESC LIMIT '.$first.','.$perPage;

        return self::requestExecute($sql, $params)->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function deleteArticle($id_article)
    {
        $params = array($id_article);
        $sql = 'DELETE FROM `articles` WHERE id_article=?';

        $articles = self::requestExecute($sql,$params);
    }

    public static function valideArticle($id_article)
    {
        $params = array($id_article);
        $sql = 'UPDATE `articles` set id_state=2 WHERE id_article=?';

        $articles = self::requestExecute($sql,$params);
    }

    public static function updateArticle($nameArticle, $description, 
                                            $date, $id_category, 
                                            $id_article, $id_form = NULL)
    {
        $params = array($nameArticle, $description,
                            $date, $id_category, 1, $id_form,
                            $id_article);
        $sql = 'UPDATE `articles` 
                set name_article = ?, description_article = ?,
                    date_created = ?, id_category = ?, id_state = ?, 
                    id_form = ? 
                WHERE id_article = ?';

        $articles = self::requestExecute($sql,$params);
    }  
    
    public static function updateArticleIMG($image_url, $id_article)
    {
        $params = array($image_url, 1, $id_article);
        $sql = 'UPDATE `articles`
                set image_url = ?, id_state = ?
                WHERE id_article = ?';
        return self::requestExecute($sql,$params);
    }
    
    public static function getArticles($first, $perPage)
    {
        $sqlinsert = "SELECT articles.*, states.name_state, categories.name_category
                    FROM articles
                    INNER JOIN categories ON articles.id_category = categories.id_category
                    INNER JOIN states ON articles.id_state = states.id_state        
                    WHERE articles.id_state = 1
                    ORDER BY articles.date_created
                    DESC LIMIT $first,$perPage";

        return self::requestExecute($sqlinsert)->fetchAll(PDO::FETCH_ASSOC);
    }

}