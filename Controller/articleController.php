<?php

if (isset($_POST['reg_article'])) 
{
    //VERIFICATION !!!
    $name_article = $_POST['name_article'];
    $description_article = $_POST['description_article'];
    $id_category = $_POST['id_categorie'];
    $id_form = $_POST['id_form'];
    $file = $_FILES['image_url'];

    //recupération du nom de produit et détermination de l'endroit ou stocker l'image uploadée
    $targetPath = 'View/ArticleImg/';
    $filename = substr($_POST['name_article'],0,10);
    $targetFile = $targetPath.$filename.'.jpg';

    //transfert de l'image vers l'endroit
    move_uploaded_file($_FILES['image_url']['tmp_name'], $targetFile);

    Article::createArticle($name_article, $targetFile, $description_article, $id_category, $id_form);

}

if (isset($_POST['voir_article']))
{
    $id_article = $_POST['id_article'];
    $id_form = $_POST['id_form'];
    header('Location: ./articledetail?id_article='.$id_article.'&id_form='.$id_form);
}

// if (isset($_POST['genPdf']))
// {
//     require('./_librairiephp/fpdf.php');

//     $pdf = new FPDF();
//     $pdf->AddPage();
//     $pdf->SetFont('Arial','B',16);
//     foreach($_POST as $key => $value)
//     {
//         if($key != 'genPdf' && $key != 'image_url')
//         {
//             $pdf->Cell(40,10,$value);
//         }
//     }
//     foreach($_FILES as $key => $value)
//     {
//         $pdf->Image($value['tmp_name'],10,10,50,50);
//     }
//     $pdf->Output();

// }
