<?php


class admin extends User {






public static function idRigth(){
echo'<section><h2>Gestion des utilisateurs</h2>';

$test=user::userDisplay();
$test2=user::rightDisplay();
foreach($test as $value){
echo'<form method='.'POST'.'><input type='.'hidden'.' name='.'id'.' value='.$value['id_user'].'>   
            <label>'.$value['firstname'].'</label>
            <label>'.$value['lastname'].'</label>
            <label>'.$value['right_name'].'</label>
            <select name='.'updateRight'.'>';
            foreach($test2 as $value2){
                echo'<option value='.$value2['id_right'].'>'.$value2['right_name'].'</option>';
            }
            echo'</select>
            <input type=submit name='.'update'.' value='.'modifier'.'></form>'
            ;
}
echo'</section>';
}

public static function RightUpdate($right,$id){
user::updateRight($right,$id);
}

public static function displayArticleStatus(){
$survey=self::getArticles();
echo'<asset>';
foreach($survey as $value){
    echo'<form method='.'POST'.'><input type='.'hidden'.' name='.'id'.' value='.$value['id_article'].'>   
    <label>'.$value['name_state'].'</label>
    <select>'.$value['id_form'].'</select>
    <select>'.$value['id_category'].'</select>
    <select>'.$value['id_url'].'</select>
    <textarea>'.$value['description_article'].'</textarea>
    
    <input type=submit name='.'update'.' value='.'modifier'.'></form>';
}

echo'</asset>';


}

}


if(isset($_POST['update'])){

    admin::RightUpdate($_POST['updateRight'],$_POST['id']);
}