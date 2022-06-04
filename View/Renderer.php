<?php 

class Renderer 
{
    private $file;
    private $title;
    private $content;

    public function __construct($action) 
    {

        $this->file = "View/".$action . ".php";
        $this->title = $action;
        $this->content = $this->createFile();

    }

    private function createFile() 
    {
        
        if (file_exists($this->file)) 
        {        
            ob_start();

            session_start();            

            require $this->file;
            
            return ob_get_clean();
        }
        else 
        {
            ob_start();
            echo "<h4>Erreur 404</h4>";
            return ob_get_clean();
        }

    }

    public function display() 
    {
       $title = $this->title; 
       $content = $this->content; 
       require ('layout.php');
    }

}
