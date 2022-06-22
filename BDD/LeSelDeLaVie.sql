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
    module_order INT,
    text_label VARCHAR(255),
    textarea_label VARCHAR(255),
    file_label VARCHAR(255),
    select_label VARCHAR(255),
    option_count INT,
    option_names VARCHAR(255),
    checkbox_label VARCHAR(255),
    checkbox_count INT,
    checkbox_names VARCHAR(255),
    radio_label VARCHAR(255),
    radio_count INT,
    radio_names VARCHAR(255),
    PRIMARY KEY (id_module)) ENGINE=InnoDB;

INSERT INTO `modules` (`id_module`, `module_order`, `text_label`, `textarea_label`, `file_label`, `select_label`, `option_count`, `option_names`, `checkbox_label`, `checkbox_count`, `checkbox_names`, `radio_label`, `radio_count`, `radio_names`) VALUES
(1, 0, 'Nom Prénom (parent 1) :', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 2, 'Nom Prénom (parent 2) :', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 4, 'Nom Prénom (enfant) :', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 6, NULL, 'Informations complémentaires à nous transmettre', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 5, NULL, NULL, NULL, 'En quelle classe est votre enfant ?', 5, 'CP||CE1||CE2||CM1||CM2', NULL, NULL, NULL, NULL, NULL, NULL),
(6, 7, NULL, NULL, NULL, NULL, NULL, NULL, 'Quel matériel avez-vous ?', 4, 'Quel matériel avez-vous ?||Stylos multicolores||Cahier gros carreaux||Règle||Colle', NULL, NULL, NULL),
(7, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, "Voulez-vous que votre enfant soit seul avec l'encadrant", 2, 'Oui||Non'),
(8, 1, NULL, NULL, "Carte d'identité (parent 1)", NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 3, NULL, NULL, "Carte d'identité (parent 2)", NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 9, NULL, NULL, 'Livret de famille', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 10, NULL, NULL, 'Certificat de scolarité', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- ------------------------------------
--        table forms_modules        --
-- ------------------------------------

CREATE TABLE IF NOT EXISTS forms_modules (
    id_forms_modules INT AUTO_INCREMENT NOT NULL, 
    forms_modules_type VARCHAR(255),
    id_form INT NOT NULL,
    id_module INT NOT NULL,
    CONSTRAINT FK_forms_modules_id_form_forms
    FOREIGN KEY (id_form) REFERENCES forms (id_form),
    CONSTRAINT FK_forms_modules_id_module_modules 
    FOREIGN KEY (id_module) REFERENCES modules (id_module),
    PRIMARY KEY (id_forms_modules)
    ) ENGINE=InnoDB;

INSERT INTO `forms_modules` (`id_forms_modules`, `forms_modules_type`, `id_form`, `id_module`) VALUES
(1, 'text', 1, 1),
(2, 'text', 1, 2),
(3, 'text', 1, 3),
(4, 'textArea', 1, 4),
(5, 'select', 1, 5),
(6, 'checkbox', 1, 6),
(7, 'radio', 1, 7),
(8, 'file', 1, 8),
(9, 'file', 1, 9),
(10, 'file', 1, 10),
(11, 'file', 1, 11);


-- ------------------------------------
--           table articles          --
-- ------------------------------------ 
     
CREATE TABLE IF NOT EXISTS articles (
    id_article INT AUTO_INCREMENT NOT NULL, 
    name_article VARCHAR(255),
    image_url VARCHAR(255),
    description_article TEXT,
    date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_category INT NOT NULL,
    id_state INT NOT NULL,
    id_form INT NOT NULL,    
    CONSTRAINT FK_articles_id_category_categories
    FOREIGN KEY (id_category) REFERENCES categories (id_category),
    CONSTRAINT FK_articles_id_state_states 
    FOREIGN KEY (id_state) REFERENCES states (id_state),
    CONSTRAINT FK_articles_id_form_forms 
    FOREIGN KEY (id_form) REFERENCES forms (id_form),
    PRIMARY KEY (id_article)) ENGINE=InnoDB;

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