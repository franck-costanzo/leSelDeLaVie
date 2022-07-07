<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?></title>
    <script src="View\JS\_script.js" type="module"></script>    
    <script src="View\JS\jspdf.min.js" type="module"></script>
    <script src="View\JS\jspdf.debug.js" type="module"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="View/CSS/<?= $title ?>.css">
    <link rel="stylesheet" type="text/css" href="View/CSS/main.css">
</head>
<body>
    <header>
        <?php require_once ('View/header.php') ?>
    </header>

    <?= $content ?>

    <footer>
        <?php require_once ('View/footer.php') ?>   
    </footer>
</body>
</html>