<main>
    <?php if(isset($_SESSION["users"]) && $_SESSION["users"]["id_right"] == 1337) : ?>
    <?php   $allArticles = Article::getAllArticles(); 
            $nbArticles = count($allArticles);

        // On détermine le nombre d'articles par page
        $parPage = 20;

        // On calcule le nombre de pages total
        $pages = ceil($nbArticles / $parPage);

        if(isset($_GET['page']) && !empty($_GET['page']))
        {
            $currentPage = (int) strip_tags($_GET['page']);
        }
        else
        {
            $currentPage = 1;
        }

        // Calcul du 1er article de la page
        $premier = ($currentPage * $parPage) - $parPage;
    ?>
    
        <section class="adminSection">
            <h2> Gestion des articles à valider</h2>

            <table>
                <thead>
                    <tr>
                        <th>Titre</th>                        
                        <th>Catégorie</th>
                        <th>État</th>
                    </tr>
                </thead>
                <tbody>
                <?php $pageArticles = Article::getArticles($premier, $parPage)?> 
                <?php   foreach ($pageArticles as $value) : ?>
                    <tr>            
                        <td><?= $value['name_article'] ?> </td>
                        <td><?= $value['name_category'] ?></td>
                        <td><?= $value['name_state'] ?> <a href="articledetail?id_article=<?= $value['id_article']?>&id_form=<?= $value['id_form']?>">Examiner</a></td>
                    </tr>
                <?php endforeach ?>
                </tbody>
            </table>

            <?php if ($nbArticles > ($parPage+1)) : ?>
            <nav>
                <ul class="pagination">
                    <!-- Lien vers la page précédente (désactivé si on se trouve sur la 1ère page) -->
                    <li class="page-item <?= ($currentPage == 1) ? "disabled" : "" ?>">
                    <a href="./adminArticles?page=<?php  if (($currentPage - 1) == 0)
                                            { echo 1; } 
                                            else 
                                            { echo ($currentPage - 1); } ?>" class="page-link"><</a>
                    </li>
                    <?php for($page = 1; $page <= $pages; $page++): ?>
                        <!-- Lien vers chacune des pages (activé si on se trouve sur la page correspondante) -->
                        <li class="page-item-numbers <?= ($currentPage == $page) ? "active" : "" ?>">
                            <a href="./adminArticles?page=<?= $page ?>" class="page-link"><?= $page ?></a>
                        </li>
                    <?php endfor ?>
                        <!-- Lien vers la page suivante (désactivé si on se trouve sur la dernière page) -->
                        <li class="page-item <?= ($currentPage == $pages) ? "disabled" : "" ?>">
                        <a href="./adminArticles?page=<?= $currentPage + 1 ?>" class="page-link">></a>
                    </li>
                </ul>
            </nav>
            <?php endif; ?>
            
        </section>
    <?php else : ?>
        <?php header('Location:home'); ?>
    <?php endif; ?>
</main>