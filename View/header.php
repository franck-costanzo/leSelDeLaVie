<a href=""><img src="View/Media/logo-sel-text-seul-blanc.svg" alt="Le sel de la vie logo"></a>
<nav>
    <a href="">Accueil</a>
    <a href="">Association</a>
    <a href="">Inscription</a>
    <a href="">Connexion</a>
</nav>


header {
        background-color: #18375F;
        height: 15%;
        width: 100%;      
    }    

    header > nav {
        display: none;
    }

    /* ------------- */
    /*     DESKTOP   */
    /* ------------- */

    @media screen and (min-width: 968px){

        header {
            display: flex;
            justify-content: space-between;
        }

        header > a:nth-child(1) > img {
            margin-left: 50px;
            width: 300px;
            height: 100px;
        }

        header > nav  {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            color:white;
        }

        header > nav > a {
            padding: 0 10px;
            background-color: var(--);
        }



    }