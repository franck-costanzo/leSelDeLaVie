<main>
    <?php $allArticles = Article::getAllArticles()?>
    <?php foreach ($allArticles as $article) : ?>
        <div class="article">
            <h2><?= $article['name_article'] ?></h2>
            <img src="<?= $article['image_url'] ?>" alt="">
            <p><?= $article['description_article'] ?></p>
            <form action="articledetail" method='POST'>
                <input type="hidden" name="id_article" value="<?= $article['id_article'] ?>">
                <input type="hidden" name="id_form" value="<?= $article['id_form'] ?>">
                <input type="submit" value="Voir l'article" name='voir_article'>
            </form>
        </div>
    <?php endforeach; ?>
</main>