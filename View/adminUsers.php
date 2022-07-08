<main>   
    <?php if(isset($_SESSION["users"]) && $_SESSION["users"]["id_right"] == 1337) : ?>
    <?php   $allUsers = user::userDisplay(); 
            $rights = user::rightDisplay(); 
            
            $nbArticles = count($allUsers);
            
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
        <h2>Gestion des utilisateurs</h2>
        <table>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Droit</th>
                    <th>Modifier</th>
                </tr>
            </thead>
            <tbody>
            <?php $allUserPagination = User::getAllUsersPagination($premier, $parPage) ?>
            <?php foreach ($allUserPagination as $value) : ?>
                <tr>
                    <td> <?=$value['lastname']?></td>
                    <td> <?=$value['firstname']?></td>
                    <td> <?=$value['right_name']?></td>
                    <td>
                        <form method="POST"  id="formRight">
                            <input type="hidden" name="id" value=<?=$value['id_user']?>>
                                <select name="updateRight">
                                <?php foreach ($rights as $value2) : ?>
                                    <?php if ($value2['right_name'] == $value['right_name']) : ?>
                                        <option value=<?= $value2['id_right'] ?> selected> <?= $value2['right_name'] ?></option>
                                    <?php else : ?>
                                        <option value=<?= $value2['id_right'] ?>> <?= $value2['right_name'] ?></option>
                                    <?php endif; ?>
                                <?php endforeach; ?>                      
                        </form><input type=submit name='update' value='modifier'></form>        
                    </td>
                </tr>
            <?php endforeach; ?>
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