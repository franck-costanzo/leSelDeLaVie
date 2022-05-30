<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?></title>
    <script src="View\JS\script.js"></script>
    <link rel="stylesheet" type="text/css" href="View/CSS/style.css">
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