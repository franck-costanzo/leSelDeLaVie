<?php

class Admin extends User
{

    public static function idRigth()
    {
        echo '<section class="adminSection"><h2>Gestion des utilisateurs</h2>';

        $test = user::userDisplay();
        $test2 = user::rightDisplay();
        echo '
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Droit</th>
                        <th>Modifier</th>
                    </tr>
                </thead>
                <tbody>';
                foreach ($test as $value) {
                    echo  
                    '<tr>
                        <td>'.$value['lastname'].'</td>
                        <td>'.$value['firstname'].'</td>
                        <td>'.$value['right_name'].'</td>
                        <td>
                            <form method="POST"  id="formRight">
                                <input type="hidden" name="id" value=<'.$value['id_user'].'>
                                    <select name="updateRight">';
                                    foreach ($test2 as $value2) {
                                        if ($value2['right_name'] == $value['right_name'])
                                        {
                                            echo '<option value='.$value2['id_right'].' selected>'.$value2['right_name'].'</option>';
                                        }
                                        else
                                        {
                                            echo '<option value='.$value2['id_right'].'>'.$value2['right_name'].'</option>';
                                        }
                                        
                                    };                      
                            echo '</form><input type=submit name=' . 'update' . ' value=' . 'modifier' . '></form>        
                        </td>
                    </tr>';
                };
            echo'    </tbody>
            </table></section>';
    }

    public static function RightUpdate($right, $id)
    {
        user::updateRight($right, $id);
    }

    public static function displayArticleStatus()
    {
        $survey = Article::getArticles();
        echo '<section class="adminSection">';
        echo '<h2> Gestion des articles à valider</h2>
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
        $survey4 = Categorie::selectCat();
        echo '<section class="adminSection"><h2>Gestion des catégories</h2>';
        echo '<form action="" method="POST" class="">            
            <input type="text" name="nomCategorie">
            <input type="submit" name="createCategorie" 
            value="Créer une catégorie" class="">        
        </form>';
        echo '<form method=' . 'POST' . '>
        <select name=' . 'deleteCatOption' . '>';
            foreach ($survey4 as $value2) {
                echo '<option value=' . $value2['id_category'] . '>' . $value2['name_category'] . '</option>';
            }
            echo '</select>
        <input type=submit name=' . 'deleteCat' . ' value=' . 'supprimer' . '></form></section>';
        
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
    }

    //------------------------recuperation form dans un select---------------------------------------------------
    public static function selectFormSelect()
    {
        $surveyCat = self::selectForm();
        foreach ($surveyCat as $value2) {
            echo '<option value=' . $value2['id_form'] . '>' . $value2['name_form'] . '</option>';
        }
    }

}