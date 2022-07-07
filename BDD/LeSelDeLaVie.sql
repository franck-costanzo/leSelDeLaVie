CREATE SCHEMA IF NOT EXISTS `le_sel_de_la_vie_site` DEFAULT CHARACTER SET utf8mb4 ;

USE `le_sel_de_la_vie_site` ;

-- ------------------------------------
--          table Rights             --
-- ------------------------------------

CREATE TABLE IF NOT EXISTS rights (
    id_right INT AUTO_INCREMENT NOT NULL, 
    right_name VARCHAR(255), 
    PRIMARY KEY (id_right)
    ) ENGINE=InnoDB;

INSERT INTO `rights` (`id_right`, `right_name`) VALUES (1, 'utilisateur');
INSERT INTO `rights` (`id_right`, `right_name`) VALUES (2, 'moderateur');
INSERT INTO `rights` (`id_right`, `right_name`) VALUES (1337, 'admin');

-- ------------------------------------
--        table users         --
-- ------------------------------------

CREATE TABLE IF NOT EXISTS users (
    id_user INT AUTO_INCREMENT NOT NULL, 
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(60),
    adress VARCHAR(255),
    zip_code INT(5),
    id_right INT NOT NULL DEFAULT 1,
    CONSTRAINT FK_users_id_droit_droits 
    FOREIGN KEY (id_right) REFERENCES rights (id_right),
    PRIMARY KEY (id_user)
    ) ENGINE=InnoDB;

-- ------------------------------------
--          table files             --
-- ------------------------------------

CREATE TABLE IF NOT EXISTS files (
    id_file INT AUTO_INCREMENT NOT NULL,
    name_file VARCHAR(255),
    file_url VARCHAR(255),
    id_user INT NOT NULL,
    CONSTRAINT FK_files_id_user_users
    FOREIGN KEY (id_user) REFERENCES users (id_user),
    PRIMARY KEY (id_file)) ENGINE=InnoDB;


-- ------------------------------------
--           table categories        --
-- ------------------------------------ 
     
CREATE TABLE IF NOT EXISTS categories (
    id_category INT AUTO_INCREMENT NOT NULL, 
    name_category VARCHAR(255), 
    PRIMARY KEY (id_category)) ENGINE=InnoDB;

INSERT INTO `categories` (`id_category`, `name_category`) VALUES (1, 'scolaire');
INSERT INTO `categories` (`id_category`, `name_category`) VALUES (2, 'sortie');
INSERT INTO `categories` (`id_category`, `name_category`) VALUES (3, 'evenement');
INSERT INTO `categories` (`id_category`, `name_category`) VALUES (4, 'conference');
INSERT INTO `categories` (`id_category`, `name_category`) VALUES (5, 'atelier');
INSERT INTO `categories` (`id_category`, `name_category`) VALUES (6, 'divertissement');


-- ------------------------------------
--           table states        --
-- ------------------------------------ 
     
CREATE TABLE IF NOT EXISTS states (
    id_state INT AUTO_INCREMENT NOT NULL, 
    name_state VARCHAR(255), 
    PRIMARY KEY (id_state)) ENGINE=InnoDB;

INSERT INTO `states` (`id_state`, `name_state`) VALUES (1, 'en cours de validation');
INSERT INTO `states` (`id_state`, `name_state`) VALUES (2, 'valide');

-- ------------------------------------
--           table forms             --
-- ------------------------------------ 

CREATE TABLE IF NOT EXISTS forms (
    id_form INT AUTO_INCREMENT NOT NULL, 
    name_form VARCHAR(255), 
    PRIMARY KEY (id_form)) ENGINE=InnoDB;

INSERT INTO `forms` (`id_form`, `name_form`) VALUES (1, 'Soutien Scolaire');

-- ------------------------------------
--           table modules           --
-- ------------------------------------

CREATE TABLE IF NOT EXISTS modules (
    id_module INT AUTO_INCREMENT NOT NULL,
    module_type VARCHAR(255) NOT NULL, 
    module_order INT NOT NULL,
    module_label VARCHAR(255) NOT NULL,
    option_count INT,
    option_names VARCHAR(255),
    id_form INT NOT NULL,
    CONSTRAINT FK_forms_id_form_modules 
    FOREIGN KEY (id_form) REFERENCES forms (id_form),
    PRIMARY KEY (id_module)) ENGINE=InnoDB;

INSERT INTO `modules` (`id_module`, `module_type`,`module_order`, `module_label`, 
                         `option_count`, `option_names`,  `id_form`) VALUES
(1, 'text', 0, 'Nom Prénom (parent 1) :', NULL, NULL, 1),
(2, 'text', 2, 'Nom Prénom (parent 2) :', NULL, NULL,  1),
(3, 'text', 4, 'Nom Prénom (enfant) :', NULL, NULL,  1),
(4, 'textArea', 6, 'Informations complémentaires à nous transmettre', NULL, NULL,  1),
(5, 'select', 5, 'En quelle classe est votre enfant ?', 5, 'CP||CE1||CE2||CM1||CM2', 1),
(6, 'checkbox', 7, 'Quel matériel avez-vous ?', 4, 'Quel matériel avez-vous ?||Stylos multicolores||Cahier gros carreaux||Règle||Colle',  1),
(7, 'radio', 8, "Voulez-vous que votre enfant soit seul avec l'encadrant", 2, 'Oui||Non', 1),
(8, 'file', 1, "Carte d'identité (parent 1)", NULL, NULL, 1),
(9, 'file', 3, "Carte d'identité (parent 2)", NULL, NULL, 1),
(10, 'file', 9, 'Livret de famille', NULL, NULL, 1),
(11, 'file', 10, 'Certificat de scolarité', NULL, NULL, 1);

-- ------------------------------------
--           table articles          --
-- ------------------------------------ 
     
CREATE TABLE IF NOT EXISTS articles (
    id_article INT AUTO_INCREMENT NOT NULL, 
    name_article VARCHAR(255),
    image_url VARCHAR(255) DEFAULT 'View/ArticleImg/Bienvenue.jpg',
    description_article TEXT,
    date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_category INT NOT NULL,
    id_state INT NOT NULL,
    id_form INT,    
    CONSTRAINT FK_articles_id_category_categories
    FOREIGN KEY (id_category) REFERENCES categories (id_category),
    CONSTRAINT FK_articles_id_state_states 
    FOREIGN KEY (id_state) REFERENCES states (id_state),
    CONSTRAINT FK_articles_id_form_forms 
    FOREIGN KEY (id_form) REFERENCES forms (id_form),
    PRIMARY KEY (id_article)) ENGINE=InnoDB;

INSERT INTO `articles` (`id_article`, `name_article`, `image_url`, `description_article`, `date_created`, `id_category`, `id_state`, `id_form`) VALUES
(1, 'Bienvenue à tous !', 'View/ArticleImg/Bienvenue.jpg', 
"Les étudiants de LaPlateforme_ en partenariat avec l'association Le Sel de la Vie sont heureux de vous présenter leur travail. 
Nous avons œuvré afin  de doter cette belle association d'un site mettant en avant ces actions ainsi que son histoire. 
Ce site-outil est mis à disposition de ses adhérents et des participants de l\'association. 
Merci à vous pour cette belle opportunité de partenariat et d'apprentissage !", '2022-07-06 16:05:00', 3, 2, NULL);
-- ------------------------------------
--        table users_articles        --
-- ------------------------------------

CREATE TABLE IF NOT EXISTS users_articles (
    id_users_articles INT AUTO_INCREMENT NOT NULL,
    id_user INT NOT NULL,
    id_article INT NOT NULL,
    CONSTRAINT FK_users_articles_id_user_users
    FOREIGN KEY (id_user) REFERENCES users (id_user),
    CONSTRAINT FK_users_articles_id_article_articles 
    FOREIGN KEY (id_article) REFERENCES articles (id_article),
    PRIMARY KEY (id_users_articles)) ENGINE=InnoDB;


-- ------------------------------------
--        table récupération         --
-- ------------------------------------
CREATE TABLE IF NOT EXISTS recuperation (
    id INT AUTO_INCREMENT NOT NULL,
    mail VARCHAR(255) NOT NULL,
    code int(11) NOT NULL,
    PRIMARY KEY (id)) ENGINE=InnoDB;

-- ------------------------------------
--           table carousel          --
-- ------------------------------------

CREATE TABLE IF NOT EXISTS carousel_articles(
    id_carousel_article INT NOT NULL,
    id_article INT NOT NULL,
    CONSTRAINT FK_carousel_articles_id_article_articles
    FOREIGN KEY (id_article) REFERENCES articles (id_article),
    PRIMARY KEY (id_carousel_article)
    ) ENGINE=InnoDB;