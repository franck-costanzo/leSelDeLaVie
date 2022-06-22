<?php

abstract class Model {

    private static $bdd;
    
    // Effectue la connexion à la BDD
    // Instancie et renvoie l'objet PDO associé 
    public static function getBdd() 
    {
        //version locale
        $servername = 'localhost';
        $username = 'root';
        $password = '';
        $db = 'le_sel_de_la_vie_site';

        try
        {
            self::$bdd = new PDO( "mysql:host=$servername;dbname=$db", $username, $password,
                            array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION) );
            return self::$bdd;
        }
        catch (PDOException $e)
        {
            echo "Connection failed: " . $e->getMessage();
        }
        
    }

    // Exécute une requête SQL éventuellement paramétrée
    protected static function requestExecute($sql, $params = null) 
    {
        if ($params == null) 
        {
            $result = self::getBdd()->query($sql);    // exécution directe
        }
        else 
        {
            $result = self::getBdd()->prepare($sql);  // requête préparée
            $result->execute($params);
        }
        return $result;
    }

    public static function getLastInsertedId()
    {
        $id = self::$bdd->lastInsertId();
        return $id;
    }

    protected static function requestExecute2($sql, $params = null) 
    {
        if ($params == null) 
        {
            $result = self::getBdd()->query($sql);    // exécution directe
        }
        else 
        {
            $result = self::getBdd()->prepare($sql);  // requête préparée
            $result->execute($params);
            $result2=$result->fetch(PDO::FETCH_ASSOC);
        }
        return $result2;
    }

    static public function checkEmail($email)
    {
        $sql = "SELECT * FROM `users` WHERE users.email=:email";
        $test=self::getBdd()->prepare($sql);
        $test->execute(array(':email'=>$email));
        $test2=$test->rowCount();
        if ( $test2 > 0) {
            echo json_encode('cette adresse mail est déjà liée à un compte');
        } else {
            echo json_encode('cette adresse mail est disponible');
        }
    }
    

}

if(isset($_GET['test'])){
if($_GET['test']==1)


Model::checkEmail($_POST['email']);

}

       