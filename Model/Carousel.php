<?php

abstract class Carousel extends Model {

    public static function updateToCarousel($idArticle, $idCarousel)
    {
        $sql="UPDATE carousel_articles 
        SET id_article = ?                    
        WHERE `id_carousel_article` = ?";

        $params = array($idArticle, $idCarousel);

        self::requestExecute($sql, $params);
    }

    public static function getArticleById($idCarousel)
    {
        $sql= "SELECT carousel_articles.id_carousel_article, articles.*
        FROM carousel_articles
        INNER JOIN articles ON carousel_articles.id_article = articles.id_article
        WHERE id_carousel_article = ?";

        $params = array($idCarousel);

        $result = self::requestExecute($sql, $params)->fetch(PDO::FETCH_ASSOC);

        return $result;
    }


    public static function getArticleIdById($idCarousel)
    {
        $sql= "SELECT id_article
        FROM carousel_articles
        WHERE id_carousel_article = ?";

        $params = array($idCarousel);

        $result = self::requestExecute($sql, $params)->fetch(PDO::FETCH_ASSOC);

        return $result;
    }

    public static function getAllArticleInCarousel()
    {
        $sql = "SELECT carousel_articles.id_carousel_article, articles.*, categories.name_category
        FROM carousel_articles
        INNER JOIN articles ON carousel_articles.id_article = articles.id_article
        INNER JOIN categories ON articles.id_category = categories.id_category
        ORDER BY carousel_articles.id_carousel_article";

        $result = self::requestExecute($sql)->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }

}