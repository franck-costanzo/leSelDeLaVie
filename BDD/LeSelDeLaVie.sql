CREATE SCHEMA IF NOT EXISTS `le_sel_de_la_vie_site` DEFAULT CHARACTER SET utf8mb4 ;

USE `le_sel_de_la_vie_site` ;

-- ------------------------------------
--          table Rights             --
-- ------------------------------------

CREATE TABLE IF NOT EXISTS rights (
    id_right INT AUTO_INCREMENT NOT NULL, 
    right_name VARCHAR(255), 
    PRIMARY KEY (id_right)) ENGINE=InnoDB;


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
    id_right INT NOT NULL,
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


-- ------------------------------------
--           table states        --
-- ------------------------------------ 
     
CREATE TABLE IF NOT EXISTS states (
    id_state INT AUTO_INCREMENT NOT NULL, 
    name_state VARCHAR(255), 
    PRIMARY KEY (id_state)) ENGINE=InnoDB;

-- ------------------------------------
--           table forms             --
-- ------------------------------------ 

CREATE TABLE IF NOT EXISTS forms (
    id_form INT AUTO_INCREMENT NOT NULL, 
    name_form VARCHAR(255), 
    PRIMARY KEY (id_form)) ENGINE=InnoDB;

-- ------------------------------------
--           table modules           --
-- ------------------------------------

CREATE TABLE IF NOT EXISTS modules (
    id_module INT AUTO_INCREMENT NOT NULL, 
    text_label VARCHAR(255),
    textarea_label VARCHAR(255),
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
    PRIMARY KEY (id_forms_modules)) ENGINE=InnoDB;


-- ------------------------------------
--           table articles          --
-- ------------------------------------ 
     
CREATE TABLE IF NOT EXISTS articles (
    id_article INT AUTO_INCREMENT NOT NULL, 
    name_state VARCHAR(255),
    image_url VARCHAR(255),
    description_article TEXT,
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