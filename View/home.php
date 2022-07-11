
<main>
    <div class="mainHome">
        <nav class="categoryNav">
            <h2>Catégories</h2>
            <hr>
            <?php $allCategories = Categorie::getAllCategories(); ?>
            <ul>
                <li><a href="./">Toutes les Catégories</a></li>
                <hr>
                <?php foreach($allCategories as $categorie): ?>
                    <li><a href="./?id_category=<?= $categorie['id_category'] ?>" name='<?= $categorie['id_category'] ?>'><?= ucfirst($categorie['name_category']) ?></a></li>
                <?php endforeach; ?>
            </ul>
        </nav>
        <nav class="categoryNavSelect">
            <h2>Catégories</h2>
            <hr>
            <?php $allCategories = Categorie::getAllCategories(); ?>
            <select name="CategorySelect" id="CategorySelect">
                <option value="" selected disabled>--Please choose an option--</option>
            </select>
        </nav>
        <div class="displayArticle">
            <?php if(isset($_GET['id_category']) && !empty($_GET['id_category'])): ?>
            <?php 
                //récupération des articles
                $allArticles = Article::getAllArticlesByCategory($_GET['id_category']);
                $nbArticles = count($allArticles);

                // On détermine le nombre d'articles par page
                $parPage = 8;

                // On calcule le nombre de pages total
                $pages = ceil($nbArticles / $parPage);

                if(isset($_GET['page']) && !empty($_GET['page'])){
                    $currentPage = (int) strip_tags($_GET['page']);
                }else{
                    $currentPage = 1;
                }

                // Calcul du 1er article de la page
                $premier = ($currentPage * $parPage) - $parPage;
            ?>
                <?php $allArticlesByCategory = 
                        Article::getAllArticlesByCategoryPagination( $_GET['id_category'], $premier, $parPage ); 
                        $nbArticlesPerCat = count($allArticlesByCategory) 
                ?>
                <?php foreach($allArticlesByCategory as $article): ?>
                    <div class="article">
                        <h3><?= $article['name_article'] ?></h3>
                        <div class="imgArticleContainer">
                            <img src="<?= $article['image_url'] ?>" alt="">
                        </div>                        
                        <p><?= substr($article['description_article'], 0, 250)." ..." ?></p>
                        <form action="articledetail" method='POST'>
                            <input type="hidden" name="id_article" value="<?= $article['id_article'] ?>">
                            <input type="hidden" name="id_form" value="<?= $article['id_form'] ?>">
                            <input type="submit" value="Voir l'article" name='voir_article' class="redirectArticle">
                        </form>
                    </div>
                <?php endforeach; ?>
                <?php if ( $nbArticlesPerCat >  8 ) : ?>
                <nav>
                    <ul class="pagination">
                        <!-- Lien vers la page précédente (désactivé si on se trouve sur la 1ère page) -->
                        <li class="page-item <?= ($currentPage == 1) ? "disabled" : "" ?>">
                            <a href="./?page=<?php  if (($currentPage - 1) == 0)
                                                    { echo 1; } 
                                                    else 
                                                    { echo ($currentPage - 1); } ?>&id_category=<?= $_GET['id_category']?>" class="page-link"><</a>
                        </li>
                        <?php for($page = 1; $page <= $pages; $page++): ?>
                            <!-- Lien vers chacune des pages (activé si on se trouve sur la page correspondante) -->
                            <li class="page-item-numbers <?= ($currentPage == $page) ? "active" : "" ?>">
                                <a href="./?page=<?= $page ?>&id_category=<?= $_GET['id_category']?>" class="page-link"><?= $page ?></a>
                            </li>
                        <?php endfor ?>
                            <!-- Lien vers la page suivante (désactivé si on se trouve sur la dernière page) -->
                            <li class="page-item <?= ($currentPage == $pages) ? "disabled" : "" ?>">
                            <a href="./?page=<?= $currentPage + 1 ?>&id_category=<?= $_GET['id_category']?>" class="page-link">></a>
                        </li>
                    </ul>
                </nav>
                <?php endif; ?>
            <?php else: ?>
            <?php 
                //récupération des articles
                $allArticles = Article::getAllArticles();
                $nbArticles = count($allArticles);

                // On détermine le nombre d'articles par page
                $parPage = 8;

                // On calcule le nombre de pages total
                $pages = ceil($nbArticles / $parPage);

                if(isset($_GET['page']) && !empty($_GET['page'])){
                    $currentPage = (int) strip_tags($_GET['page']);
                }else{
                    $currentPage = 1;
                }

                // Calcul du 1er article de la page
                $premier = ($currentPage * $parPage) - $parPage;
            ?>
            <?php $pageArticles = Article::getArticlesPagination($premier, $parPage)?>           
            <?php foreach ($pageArticles as $article) : ?>
                <div class="article">
                    <h3><?= $article['name_article'] ?></h3>
                    <div class="imgArticleContainer">
                        <img src="<?= $article['image_url'] ?>" alt="">
                    </div>
                    <p><?= substr($article['description_article'], 0, 250)." ..." ?></p>
                    <form action="articledetail" method='POST'>
                        <input type="hidden" name="id_article" value="<?= $article['id_article'] ?>">
                        <input type="hidden" name="id_form" value="<?= $article['id_form'] ?>">
                        <input type="submit" value="Voir l'article" name='voir_article' class="redirectArticle">
                    </form>
                </div>
            <?php endforeach; ?>
            <?php if ( $nbArticles > 8 ) : ?>
            <nav>
                <ul class="pagination">
                    <!-- Lien vers la page précédente (désactivé si on se trouve sur la 1ère page) -->
                    <li class="page-item <?= ($currentPage == 1) ? "disabled" : "" ?>">
                        <a href="./?page=<?php  if (($currentPage - 1) == 0)
                                                { echo 1; } 
                                                else 
                                                { echo ($currentPage - 1); } ?>" class="page-link"><</a>
                    </li>
                    <?php for($page = 1; $page <= $pages; $page++): ?>
                        <!-- Lien vers chacune des pages (activé si on se trouve sur la page correspondante) -->
                        <li class="page-item-numbers <?= ($currentPage == $page) ? "active" : "" ?>">
                            <a href="./?page=<?= $page ?>" class="page-link"><?= $page ?></a>
                        </li>
                    <?php endfor ?>
                        <!-- Lien vers la page suivante (désactivé si on se trouve sur la dernière page) -->
                        <li class="page-item <?= ($currentPage == $pages) ? "disabled" : "" ?>">
                        <a href="./?page=<?= $currentPage + 1 ?>" class="page-link">></a>
                    </li>
                </ul>
            </nav>
            <?php endif ; ?>
            <?php endif; ?>
        </div>        
    </div>
    
    
</main>