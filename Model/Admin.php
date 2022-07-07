<?php

class Admin extends User
{

    public static function RightUpdate($right, $id)
    {
        user::updateRight($right, $id);
    }

    public static function formCat()
    {
        $survey4 = Categorie::selectCat();
        echo '<section class="adminSection">
                <h2>Gestion des catégories</h2>';
        echo '  <div id="divCateg">
                    <form method="POST">            
                        <input type="text" name="nomCategorie">
                        <input type="submit" name="createCategorie" 
                        value="Créer une catégorie">        
                    </form>';
        echo '      <form method="POST"">
                        <select name="deleteCatOption">';
                        foreach ($survey4 as $value2) {
                            echo '<option value=' . $value2['id_category'] . '>' . $value2['name_category'] . '</option>';
                        }
        echo '          </select>
                        <input type=submit name="deleteCat" value="supprimer">
                    </form>
                </div>
            </section>';
        
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