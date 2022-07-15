CREATE SCHEMA IF NOT EXISTS `le_sel_de_la_vie_site` DEFAULT CHARACTER SET utf8mb4 ;

USE `le_sel_de_la_vie_site` ;

-- ------------------------------------
--          table Rights             --
-- ------------------------------------

CREATE TABLE IF NOT EXISTS rights (
    id_right INT AUTO_INCREMENT NOT NULL, 
    right_name VARCHAR(255), 
    PRIMARY KEY (id_right)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ------------------------------------
--           table categories        --
-- ------------------------------------ 
     
CREATE TABLE IF NOT EXISTS categories (
    id_category INT AUTO_INCREMENT NOT NULL, 
    name_category VARCHAR(255), 
    PRIMARY KEY (id_category)) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
    PRIMARY KEY (id_state)) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `states` (`id_state`, `name_state`) VALUES (1, 'en cours de validation');
INSERT INTO `states` (`id_state`, `name_state`) VALUES (2, 'valide');

-- ------------------------------------
--           table forms             --
-- ------------------------------------ 

CREATE TABLE IF NOT EXISTS forms (
    id_form INT AUTO_INCREMENT NOT NULL, 
    name_form VARCHAR(255), 
    PRIMARY KEY (id_form)) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `forms` (`id_form`, `name_form`) VALUES
(1, 'Soutien Scolaire'),
(2, 'Sortie AquaSplash'),
(3, 'Inscription cours');

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
    FOREIGN KEY (id_form) REFERENCES forms (id_form)
    ON DELETE CASCADE,
    PRIMARY KEY (id_module)) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `modules` (`id_module`, `module_type`, `module_order`, `module_label`, `option_count`, `option_names`, `id_form`) VALUES
(1, 'text', 0, 'Nom Prénom (parent 1) :', NULL, NULL, 1),
(2, 'text', 2, 'Nom Prénom (parent 2) :', NULL, NULL, 1),
(3, 'text', 4, 'Nom Prénom (enfant) :', NULL, NULL, 1),
(4, 'textarea', 6, 'Informations complémentaires à nous transmettre', NULL, NULL, 1),
(5, 'select', 5, 'En quelle classe est votre enfant ?', 5, 'CP||CE1||CE2||CM1||CM2', 1),
(6, 'checkbox', 7, 'Quel matériel avez-vous ?', 4, 'Stylos multicolores||Cahier gros carreaux||Règle||Colle', 1),
(7, 'radio', 8, "Voulez-vous que votre enfant soit seul avec l'encadrant", 2, 'Oui||Non', 1),
(8, 'file', 1, "Carte d'identité (parent 1)", NULL, NULL, 1),
(9, 'file', 3, "Carte d'identité (parent 2)", NULL, NULL, 1),
(10, 'file', 9, 'Livret de famille', NULL, NULL, 1),
(11, 'file', 10, 'Certificat de scolarité', NULL, NULL, 1),
(12, 'text', 0, 'Nom et Pr&eacute;nom (adulte 1) :', NULL, NULL, 2),
(13, 'text', 1, 'Nom et Pr&eacute;nom (adulte 2) :', NULL, NULL, 2),
(14, 'textarea', 3, 'Nom(s) enfant(s)', NULL, NULL, 2),
(15, 'select', 2, "Nombre d'enfants participants (le cas echeant)", 4, '0||1||2||3 et +', 2),
(16, 'checkbox', 4, 'Choisissez vos options pour la sortie', 6, 'Je viens et rentre par mes propres moyens||Bus aller-retour||J&#039;apporte ma nourriture||D&eacute;jeuner (5&euro; par personne)||Go&ucirc;ter (2&euro; par personne)||Boissons (3&euro; par personne)', 2),
(17, 'text', 0, 'Nom et pr&eacute;nom du participant', NULL, NULL, 3),
(18, 'textarea', 2, 'Remarque particuli&egrave;re :', NULL, NULL, 3),
(19, 'select', 1, "Niveau pour l'activite :", 4, 'Novice||D&eacute;butant||Interm&eacute;diaire||Avanc&eacute;', 3);

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
    PRIMARY KEY (id_article)) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `articles` (`id_article`, `name_article`, `image_url`, `description_article`, `date_created`, `id_category`, `id_state`, `id_form`) VALUES
(1, 'Bienvenue à tous !', 'View/ArticleImg/LSDLVLAPLAT.png', 
"Les étudiants de LaPlateforme_ en partenariat avec l'association Le Sel de la Vie sont heureux de vous présenter leur travail. 
Nous avons œuvré afin  de doter cette belle association d'un site mettant en avant ses actions ainsi que son histoire. 
Ce site-outil est mis à disposition de ses adhérents et des participants de l'association. 
Merci à vous pour cette belle opportunité de partenariat et d'apprentissage !", '2022-07-06 16:05:00', 3, 2, NULL),
(2, 'Sortie AquaSplash', 'View/ArticleImg/aquasplash.jpg', 'Aquasplash propose une vingtaine d’attractions aquatiques, dont une piscine à vagues et plus de 15 toboggans géants, pour un total de plus de 2000 mètres de glisse ! \r\nVoici les principales attractions : Turbolance (descente à deux dans une bouée sur un toboggan de 100 mètres de long, accès à partir de 1m20), Spaceboat (descente sur bouée de 3 boucles dans un tunnel plongé dans le noir avant d’atterrir dans un siphon de 14 mètres de diamètre, à partir de 1m20)', '2022-07-15 07:56:24', 2, 2, 2),
(3, 'Soutien Scolaire 2022 - 2023', 'View/ArticleImg/carousel1.jpg', 
'Le SelDeLaVie vous propose un soutien scolaire pour les primaires de Marseille. 
Une équipe de bénévole est à votre disposition pour encadrer vos enfants', '2022-07-15 08:09:43', 1, 2, 1),
(4, 'Cours du soir de français', 'View/ArticleImg/carousel3.jpg', 
'De plus en plus de recruteurs apprécient de voir une certification en langue française dans un CV, 
car la maîtrise du français est exigée dans le milieu professionnel de nombreux pays francophones 
et elle constitue une valeur ajoutée dans les autres. Le niveau B2, niveau intermédiaire, 
garantit une bonne maîtrise de la langue, tant à l’écrit qu’à l’oral, en compréhension comme en production. 
C’est pourquoi c’est le niveau minimum exigé pour intégrer une université francophone. Le niveau C1 prouve que vous avez un niveau avancé 
et que l’usage de la langue ne pose plus de difficultés. Aussi, nous vous proposons dans ce cours une préparation aux examens du 
Diplôme d’Etudes en Langue Française (DELF) niveau B2 et du Diplôme Approfondi en Langue Française (DALF) niveau C1.
Tous les sujets qui vous sont proposés sont très proches de ceux du CIEP, responsable de ces examens.', '2022-07-15 08:11:50', 5, 2, 3),
(5, "L'atelier créatif du mardi soir", 'View/ArticleImg/carousel5.jpg', 
'Il est temps pour vous de faire une activité manuelle, de profiter d’un moment de relaxation 
après une longue journée de labeur fatiguante ou en toute tranquillité le samedi ou le dimanche. 
Comme la majorité des personnes habitant à Marseille, vous éprouvez le besoin 
de vous affirmer avec le loisir créatif et le Do It Yourself. 
Il y a un nombre important d’activités de loisirs créatifs : 
la broderie, le cartonnage, l’origami ou encore la création de bijoux, le bricolage...', '2022-07-15 08:17:06', 5, 2, 3),
(6, 'Atelier Cuisine', 'View/ArticleImg/carousel4.jpg', 'Il est temps pour vous de faire une activité manuelle, 
de profiter d’un moment de relaxation après une longue journée de labeur 
fatiguante ou en toute tranquillité le samedi ou le dimanche. 
Comme la majorité des personnes habitant à Marseille, vous éprouvez le besoin de vous affirmer 
avec le loisir créatif et le Do It Yourself. Il y a un nombre important d’activités de loisirs créatifs : 
la broderie, le cartonnage, l’origami ou encore la création de bijoux, le bricolage', '2022-07-15 08:19:04', 5, 2, 3),
(7, 'Sortie Parc Borely', 'View/ArticleImg/carousel2.jpg', 
"Le parc Borély se situe dans le 8ème arrondissement de Marseille, à côté de l'hippodrome Marseille Borély. 
Il occupe une surface de 17 hectares, ponctués de sculptures et de jardins de styles différents : 
jardin traditionnel chinois, roseraie, jardin botanique... On y trouve aussi une parcelle de jardin anglais. 
Elle se distingue par des formes sinueuses. À côté, un jardin à la française fait le contraste : 
il est composé de manière plus symétrique et ordonnée. Le jardin traditionnel chinois, lui, 
a été offert à Marseille par la ville de Shanghai, en 2004. Cet espace est également un lieu de culture. 
On peut y admirer une célèbre oeuvre de l'artiste Jean-Michel Folon : l'homme aux oiseaux. 
En 2008, un musée des arts décoratifs a été créé dans le château de Borély. 
Il expose la culture provençale des XVIII et XIXème siècles, à travers différents objets de la vie quotidienne ou décoratifs : 
tapisseries, meubles, porcelaine...
Le parc Borély est un lieu de détente pour les Marseillais mais aussi les visiteurs de passage.", '2022-07-15 08:21:08', 2, 2, 2),
(8, 'Sortie Jardin des Automates', 'View/ArticleImg/jardinAutomates.jpg', 
'Entrez dans le monde magique des automates et découvrez-les dans des univers amusants, ludiques et féeriques. 
La maison du Mexique, la pagode des pandas, le palais des 1001 nuits, la maison de la jungle, le château du Père-Noël, 
la baleine de Pinocchio et bien d\'autres encore vous ouvriront leurs portes afin que vous puissiez 
écouter les histoires et les chansons de nos chers amis les automates. 
Baladez vous en famille de maison en maison dans un monde enfantin 
puis profitez des aires de jeux mises en place pour les petits: Parcours aventure des dragons, 
la ferme, les chenilles à toboggans, les jeux d\'eau et brumisateurs (en été uniquement), 
tourniquet et jeux à ressorts, labyrinthe et boîte à rires....
une multitude de petites attractions qui apporteront à vos bambins joie et bonne humeur.', '2022-07-15 08:27:41', 2, 2, 2),
(9, "Cours du soir d'Anglais", 'View/ArticleImg/Cours-danglais.png', 
"Les cours du soir sont proposés en petit groupe et se déroulent le lundi de 19h à 20h30 
(hors vacances scolaires) dans notre centre situé à Marseille 13006, au 27 rue Aldebert. 
Nous proposons également ce cours dans notre centre d'Aix-en-Provence. 
Vous êtes à la recherche d'une solution de cours d'anglais à Marseille ?
Contactez l'équipe du Sel de la Vie", '2022-07-15 08:31:07', 5, 2, 3);


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
    PRIMARY KEY (id_users_articles)) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ------------------------------------
--        table récupération         --
-- ------------------------------------
CREATE TABLE IF NOT EXISTS recuperation (
    id INT AUTO_INCREMENT NOT NULL,
    mail VARCHAR(255) NOT NULL,
    code int(11) NOT NULL,
    PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------------------------
--           table carousel          --
-- ------------------------------------

CREATE TABLE IF NOT EXISTS carousel_articles(
    id_carousel_article INT NOT NULL,
    id_article INT NOT NULL,
    CONSTRAINT FK_carousel_articles_id_article_articles
    FOREIGN KEY (id_article) REFERENCES articles (id_article),
    PRIMARY KEY (id_carousel_article)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `carousel_articles` (`id_carousel_article`, `id_article`) VALUES
(0, 2),
(1, 3),
(2, 4),
(3, 5);