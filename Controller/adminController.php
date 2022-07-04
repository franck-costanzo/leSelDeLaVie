<?php


class admin extends User
{



    public static function idRigth()
    {
        echo '<section><h2>Gestion des utilisateurs</h2>';

        $test = user::userDisplay();
        $test2 = user::rightDisplay();
        foreach ($test as $value) {
            echo '<form method=' . 'POST' . '><input type=' . 'hidden' . ' name=' . 'id' . ' value=' . $value['id_user'] . '>   
            <label>' . $value['firstname'] . '</label>
            <label>' . $value['lastname'] . '</label>
            <label>' . $value['right_name'] . '</label>
            <select name=' . 'updateRight' . '>';
            foreach ($test2 as $value2) {
                echo '<option value=' . $value2['id_right'] . '>' . $value2['right_name'] . '</option>';
            }
            echo '</select>
            <input type=submit name=' . 'update' . ' value=' . 'modifier' . '></form>';
        }
        echo '</section>';
    }

    public static function RightUpdate($right, $id)
    {
        user::updateRight($right, $id);
    }

    public static function displayArticleStatus()
    {
        $survey = self::getArticles();
        echo '<section>';
        echo '<h1> Gestion des articles à valider</h1>
            <table>
                <thead>
                    <tr>
                        <th>titre</th>
                        <th>état</th>
                        <th>catégorie</th>
                    </tr>
                </thead>
                <tbody>';
        foreach ($survey as $value) {
            echo '<tr>            
                        <td><a href=articledetail?id_article=' . $value['id_article'] . '&id_form=' . $value['id_form'] . '>' . $value['name_article'] . ' </a></td>
                        <td>' . $value['name_state'] . '</td>
                        <td>' . $value['name_category'] . '</td>
                </tr>';
        }
        echo '</tbody>
        </table>
        </section>';
    }



    public static function formCat()
    {
        $survey4 = self::selectCat();
        echo '<h1>Gestion des catégories</h1><form method=' . 'POST' . '>
    <select name=' . 'deleteCatOption' . '>';
        foreach ($survey4 as $value2) {
            echo '<option value=' . $value2['id_category'] . '>' . $value2['name_category'] . '</option>';
        }
        echo '</select>
    <input type=submit name=' . 'deleteCat' . ' value=' . 'supprimer' . '></form>';
    }
    //------------------------recuperation de form en view----------------------------------------------------
    public static function testform($formDetail)
    {
        echo '<form method=Post >';
        foreach ($formDetail as $key => $value) {
            if ($value['module_type'] == 'text'  || $value['module_type'] == 'file') {
                echo '<label>' . $value['module_label'] . '</label>
            <input type=' . $value['module_type'] . '>';
            } elseif ($value['module_type'] == 'textarea') {

                echo '<label>' . $value['module_label'] . '</label>
                <' . $value['module_type'] . '></' . $value['module_type'] . '>';
            } elseif ($value['module_type'] == 'checkbox') {
                $checkBoxChoice = explode('||', $value['option_names']);
                foreach ($checkBoxChoice as $valueChoice) {
                    echo   '<input type=' . $value['module_type'] . ' name=' . $valueChoice . '>
                            <label for=' . $valueChoice . '>' . $valueChoice . '</label>';
                }
            } elseif ($value['module_type'] == 'radio') {
                $choice = explode('||', $value['option_names']);
                foreach ($choice as $valueChoices) {
                    echo ' <input type=' . $value['module_type'] . '  name=' . $valueChoices . ' >
                    <label for=' . $valueChoices . '>' . $valueChoices . '</label>';
                }
            } elseif ($value['module_type'] == 'select') {

                $test = explode('||', $value['option_names']);

                echo '<label>' . $value['module_label'] . '</label>

            <' . $value['module_type'] . '>';
                foreach ($test as $value2) {
                    echo '<option value=' . $value2 . '>' . $value2 . '</option>';
                }
                echo '</' . $value['module_type'] . '>';
            };
        }
        echo '</form  >';
    }
    //------------------------recuperation categori dans un select---------------------------------------------------
    public static function selectCate()
    {
        $surveyCat = self::selectCat();
        foreach ($surveyCat as $value2) {
            echo '<option value=' . $value2['id_category'] . '>' . $value2['name_category'] . '</option>';
        }
    }
    //------------------------recuperation form dans un select---------------------------------------------------
    public static function selectFormSelect()
    {
        $surveyCat = self::selectForm();
        foreach ($surveyCat as $value2) {
            echo '<option value=' . $value2['id_form'] . '>' . $value2['name_form'] . '</option>';
        }
    }
    //------------------------modification d'un article---------------------------------------------------
    public static function adminUpdateArticle($articleDetail)
    {
 if(isset($_POST['updateArticle'])){
        if (empty($_POST['name_article'])) {
            $_POST['name_article'] = $articleDetail[0]['name_article'];
        }
        if (empty($_POST['image_url'])) {
            $_POST['image_url'] = $articleDetail[0]['image_url'];
        }
        if (empty($_POST['description_article'])) {
            $_POST['description_article'] = $articleDetail[0]['description_article'];
        }
        if (empty($_POST['cat'])) {
            $_POST['cat'] = $articleDetail[0]['id_category'];
        }
        if (empty($_POST['form'])) {
            $_POST['form'] = $articleDetail[0]['id_form'];
        }

            Article::updateArticle($_POST['id_article'],$_POST['name_article'],$_POST['image_url'],date('Y-m-d H:i:s'),$_POST['cat'],$_POST['form']);
        }
    }
}
admin::adminUpdateArticle($articleDetail);

if (isset($_POST['deleteCat'])) {
    user::deleteCat($_POST['deleteCatOption']);
}
if (isset($_POST['update'])) {
    admin::RightUpdate($_POST['updateRight'], $_POST['id']);
}
