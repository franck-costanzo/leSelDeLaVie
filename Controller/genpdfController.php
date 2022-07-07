<?php

if(isset($_POST['genPdf']))
{
    $pdf = new FPDF();
    
    foreach ($_FILES as $file){
        if ( ( $file["type"] == 'image/jpeg' ||  $file["type"] == 'image/png' ) && $file["size"] < 1000000)
        {
            $pdf->AddPage();
            //recupération du nom de produit et détermination de l'endroit ou stocker l'image uploadée
            $targetPath = 'View/tempImg';
            $filename = $file["name"];
            $targetFile = $targetPath.$filename;

            //transfert de l'image vers l'endroit
            move_uploaded_file($file["tmp_name"], $targetFile);
            $pdf->Image($targetFile,10,10,-300);
            unlink($targetFile);
        }        
    };

    $pdf->Output('D','piecesJointes.pdf');

}