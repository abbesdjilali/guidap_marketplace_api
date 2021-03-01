-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Hôte : db:3306
-- Généré le :  lun. 01 mars 2021 à 15:25
-- Version du serveur :  5.7.33
-- Version de PHP :  7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `guidap_marketplace_db`
--

DELIMITER $$
--
-- Procédures
--
CREATE DEFINER=`guidap_user`@`%` PROCEDURE `deleteLeisureCentre` (IN `id_leisurecentre` INT)  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN

	DELETE FROM leisurecentre_categories WHERE leisurecentre_id = id_leisurecentre;
    
	DELETE FROM weather WHERE weather.leisurecentre_id = id_leisurecentre;
    
	DELETE FROM leisurecentre WHERE id = id_leisurecentre;
    
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(6, 'accrobranche'),
(7, 'canoë'),
(4, 'escalade'),
(1, 'kitesurf'),
(2, 'paddle'),
(3, 'tennis'),
(5, 'wakeboard');

-- --------------------------------------------------------

--
-- Structure de la table `leisurecentre`
--

CREATE TABLE `leisurecentre` (
  `id` int(11) NOT NULL,
  `centreName` varchar(255) NOT NULL,
  `description` text,
  `website` varchar(255) DEFAULT NULL,
  `addressName` varchar(255) NOT NULL,
  `cite` varchar(255) NOT NULL,
  `zipCode` int(11) NOT NULL,
  `country` varchar(255) NOT NULL,
  `lat` decimal(9,6) NOT NULL,
  `lon` decimal(9,6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `leisurecentre`
--

INSERT INTO `leisurecentre` (`id`, `centreName`, `description`, `website`, `addressName`, `cite`, `zipCode`, `country`, `lat`, `lon`) VALUES
(1, 'base de loisirs Bruguières', 'La base de loisirs de Bruguières est le poumon vert de la ville. Jeux pour enfants sur place. Des tables avec bancs sont mis a disposition pour un pique-nique. un port miniature les ti - pirates , balade en bateaux électriques sur le lac de la base de loisirs, est en activité sur le site d\'avril à septembre, vente de glaces, paninis et boissons a emporter durant cette période également (plus d\'infos sur www.lesti-pirates.com)', NULL, 'rue louis plana', 'Toulouse', 31500, 'France', '43.613282', '1.476637'),
(2, 'Base de loisirs de Sesquieres', 'Dans le Wam Park Toulouse : piste d\'athlétisme, téléski nautique, badminton. Cynodrome....Favorite.Base de loisirs, Boulodrome, Lac et plan d \'eau, Tennis ...', NULL, '4 Allée des Foulques', 'Toulouse', 31200, 'France', '43.653701', '1.412745'),
(3, 'Base de loisirs de Bouconne', 'Au coeur de la Forêt de Bouconne, se trouve la base de loisirs. Dotée d\'équipements sportifs et culturels, elle accueille les visiteurs dans un cadre naturel. Tennis, mini golf, location de VTT de mars à octobre, piscine, chemins de randonnées, tour du Télégraphe Chappe, sentier d\'écologie, course d\'orientation, visités guidées nature, location de salle, restauration de groupe.', 'http://www.bouconne.fr', '2562 Chemin du Ratelier', 'Montaigut-sur-Save', 31530, 'France', '43.665975', '1.225914'),
(4, 'La base de sports et loisirs des Quinze Sols', 'La base de sports et loisirs des Quinze Sols accueille plusieurs équipements, lieux d \'activité de différents clubs : fosses de ball-trap, Piste de 4X4, Piste', NULL, 'Zone de Loisirs des Quinze Sols', 'Blagnac', 31700, 'France', '48.758553', '6.954724'),
(5, 'Base de loisirs Ludolac', 'Très convivial et agréable. Soirée jeux de société testé c\'était très bien,  on a prévu d\'y retourner ! De bons produits à déguster,  qualité prix au rendez vous !', NULL, 'Saint-Martin', 'Saint-Lieux-lès-Lavaur', 81500, 'France', '43.833188', '1.751606'),
(6, 'Base de loisirs de La Ramée', 'La Zone de loisirs de la Ramée est une zone de loisirs de 248 hectares située en France dans le département de la Haute-Garonne en région Occitanie, sur la commune de Tournefeuille, dans la banlieue sud-ouest de Toulouse entre l’Ousseau et le canal de Saint-Martory', 'http://toulouse.fr', '21 Chemin de Larramet', 'Tournefeuille', 31170, 'France', '43.566674', '1.339882'),
(7, 'Base de Loisirs des 3 Lacs', 'Les 3 lacs. Le Park Waterfun. Le parc aquatique. L\'hébergement et le camping ...', NULL, 'Route de la Gresigne', 'Monclar-de-Quercy', 82230, 'France', '43.981178', '1.612227'),
(8, 'base de loisirs Bruguières', 'La base de loisirs de Bruguières est le poumon vert de la ville. Jeux pour enfants sur place. Des tables avec bancs sont mis a disposition pour un pique-nique. un port miniature les ti - pirates , balade en bateaux électriques sur le lac de la base de loisirs, est en activité sur le site d\'avril à septembre, vente de glaces, paninis et boissons a emporter durant cette période également (plus d\'infos sur www.lesti-pirates.com)', NULL, 'avenue des chalets', 'Castelnau-de-Montmiral', 81140, 'France', '43.901202', '1.907939');

-- --------------------------------------------------------

--
-- Structure de la table `leisurecentre_categories`
--

CREATE TABLE `leisurecentre_categories` (
  `leisurecentre_id` int(11) NOT NULL,
  `categories_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `leisurecentre_categories`
--

INSERT INTO `leisurecentre_categories` (`leisurecentre_id`, `categories_id`) VALUES
(3, 1),
(8, 1),
(1, 2),
(5, 2),
(7, 2),
(4, 3),
(5, 4),
(6, 4),
(1, 6),
(6, 6),
(3, 7);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `userName` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `userName`, `email`, `password`) VALUES
(1, 'djilal', 'djila@guidap.co', '$2b$10$QBXyZ3QueHcwvaxrxhzGguptXIZe1qkrTqHKvC7A7nCwzxgMaWj3e');

-- --------------------------------------------------------

--
-- Structure de la table `weather`
--

CREATE TABLE `weather` (
  `id` int(11) NOT NULL,
  `leisurecentre_id` int(11) NOT NULL,
  `weatherData` json NOT NULL,
  `dt_timestamp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `weather`
--

INSERT INTO `weather` (`id`, `leisurecentre_id`, `weatherData`, `dt_timestamp`) VALUES
(1, 1, '{\"dt\": 1614600000, \"pop\": 0, \"uvi\": 3.34, \"temp\": {\"day\": 288, \"eve\": 284.25, \"max\": 288.93, \"min\": 281.04, \"morn\": 281.23, \"night\": 282.68}, \"clouds\": 2, \"sunset\": 1614620544, \"sunrise\": 1614580247, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 63, \"pressure\": 1025, \"wind_deg\": 121, \"dew_point\": 281.19, \"feels_like\": {\"day\": 281.68, \"eve\": 278.74, \"morn\": 276.8, \"night\": 277.57}, \"wind_speed\": 8.32}', 1614600000),
(2, 1, '{\"dt\": 1614686400, \"pop\": 0, \"uvi\": 3.23, \"temp\": {\"day\": 288.63, \"eve\": 284.48, \"max\": 289.05, \"min\": 282.46, \"morn\": 282.73, \"night\": 283.02}, \"clouds\": 54, \"sunset\": 1614707020, \"sunrise\": 1614666546, \"weather\": [{\"id\": 803, \"icon\": \"04d\", \"main\": \"Clouds\", \"description\": \"broken clouds\"}], \"humidity\": 57, \"pressure\": 1027, \"wind_deg\": 125, \"dew_point\": 280.36, \"feels_like\": {\"day\": 281.75, \"eve\": 279.35, \"morn\": 276.76, \"night\": 278.15}, \"wind_speed\": 8.83}', 1614686400),
(3, 1, '{\"dt\": 1614772800, \"pop\": 0.07, \"uvi\": 3.33, \"temp\": {\"day\": 288.44, \"eve\": 284.57, \"max\": 289.42, \"min\": 280.99, \"morn\": 280.99, \"night\": 282.49}, \"clouds\": 1, \"sunset\": 1614793497, \"sunrise\": 1614752845, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 64, \"pressure\": 1028, \"wind_deg\": 124, \"dew_point\": 281.7, \"feels_like\": {\"day\": 284.21, \"eve\": 280.37, \"morn\": 277.07, \"night\": 278.77}, \"wind_speed\": 5.56}', 1614772800),
(4, 1, '{\"dt\": 1614859200, \"pop\": 0.2, \"uvi\": 3.39, \"temp\": {\"day\": 289.07, \"eve\": 285.19, \"max\": 290.07, \"min\": 280.8, \"morn\": 280.8, \"night\": 283.1}, \"clouds\": 4, \"sunset\": 1614879972, \"sunrise\": 1614839142, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 63, \"pressure\": 1020, \"wind_deg\": 125, \"dew_point\": 282.22, \"feels_like\": {\"day\": 286.09, \"eve\": 282.67, \"morn\": 277.7, \"night\": 280.21}, \"wind_speed\": 3.9}', 1614859200),
(5, 1, '{\"dt\": 1614945600, \"pop\": 0.59, \"uvi\": 3.01, \"rain\": 1.89, \"temp\": {\"day\": 288.24, \"eve\": 285.16, \"max\": 288.24, \"min\": 280.68, \"morn\": 280.68, \"night\": 283.03}, \"clouds\": 37, \"sunset\": 1614966448, \"sunrise\": 1614925439, \"weather\": [{\"id\": 500, \"icon\": \"10d\", \"main\": \"Rain\", \"description\": \"light rain\"}], \"humidity\": 65, \"pressure\": 1015, \"wind_deg\": 351, \"dew_point\": 281.92, \"feels_like\": {\"day\": 286.83, \"eve\": 282.62, \"morn\": 278.9, \"night\": 280.15}, \"wind_speed\": 1.54}', 1614945600),
(6, 1, '{\"dt\": 1615032000, \"pop\": 0.31, \"uvi\": 4, \"temp\": {\"day\": 284.02, \"eve\": 282.89, \"max\": 285.13, \"min\": 277.39, \"morn\": 277.39, \"night\": 281.5}, \"clouds\": 9, \"sunset\": 1615052923, \"sunrise\": 1615011735, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 63, \"pressure\": 1021, \"wind_deg\": 298, \"dew_point\": 277.47, \"feels_like\": {\"day\": 280.17, \"eve\": 279.85, \"morn\": 273.21, \"night\": 277.82}, \"wind_speed\": 3.65}', 1615032000),
(7, 1, '{\"dt\": 1615118400, \"pop\": 0.19, \"uvi\": 4, \"temp\": {\"day\": 283.34, \"eve\": 282.08, \"max\": 283.39, \"min\": 277.75, \"morn\": 277.75, \"night\": 281.22}, \"clouds\": 99, \"sunset\": 1615139398, \"sunrise\": 1615098030, \"weather\": [{\"id\": 804, \"icon\": \"04d\", \"main\": \"Clouds\", \"description\": \"overcast clouds\"}], \"humidity\": 60, \"pressure\": 1024, \"wind_deg\": 278, \"dew_point\": 275.93, \"feels_like\": {\"day\": 280.9, \"eve\": 279.04, \"morn\": 274.43, \"night\": 277.12}, \"wind_speed\": 1.29}', 1615118400),
(8, 1, '{\"dt\": 1615204800, \"pop\": 0.15, \"uvi\": 4, \"temp\": {\"day\": 282.03, \"eve\": 279.5, \"max\": 282.48, \"min\": 274.93, \"morn\": 274.93, \"night\": 278.56}, \"clouds\": 22, \"sunset\": 1615225873, \"sunrise\": 1615184325, \"weather\": [{\"id\": 801, \"icon\": \"02d\", \"main\": \"Clouds\", \"description\": \"few clouds\"}], \"humidity\": 52, \"pressure\": 1022, \"wind_deg\": 286, \"dew_point\": 271.94, \"feels_like\": {\"day\": 276.44, \"eve\": 274.54, \"morn\": 270.45, \"night\": 272.36}, \"wind_speed\": 5.06}', 1615204800),
(9, 2, '{\"dt\": 1614600000, \"pop\": 0, \"uvi\": 3.34, \"temp\": {\"day\": 288.17, \"eve\": 284.33, \"max\": 288.98, \"min\": 280.86, \"morn\": 281.09, \"night\": 282.59}, \"clouds\": 1, \"sunset\": 1614620557, \"sunrise\": 1614580265, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 63, \"pressure\": 1025, \"wind_deg\": 122, \"dew_point\": 281.22, \"feels_like\": {\"day\": 282.04, \"eve\": 279.3, \"morn\": 276.88, \"night\": 277.97}, \"wind_speed\": 8.1}', 1614600000),
(10, 2, '{\"dt\": 1614686400, \"pop\": 0, \"uvi\": 3.23, \"temp\": {\"day\": 288.81, \"eve\": 284.58, \"max\": 289.35, \"min\": 282.55, \"morn\": 282.89, \"night\": 283.05}, \"clouds\": 55, \"sunset\": 1614707034, \"sunrise\": 1614666564, \"weather\": [{\"id\": 803, \"icon\": \"04d\", \"main\": \"Clouds\", \"description\": \"broken clouds\"}], \"humidity\": 57, \"pressure\": 1027, \"wind_deg\": 126, \"dew_point\": 280.46, \"feels_like\": {\"day\": 282.12, \"eve\": 279.87, \"morn\": 277.18, \"night\": 278.6}, \"wind_speed\": 8.62}', 1614686400),
(11, 2, '{\"dt\": 1614772800, \"pop\": 0.05, \"uvi\": 3.33, \"temp\": {\"day\": 288.75, \"eve\": 284.7, \"max\": 289.76, \"min\": 280.97, \"morn\": 280.97, \"night\": 282.52}, \"clouds\": 1, \"sunset\": 1614793510, \"sunrise\": 1614752862, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 63, \"pressure\": 1028, \"wind_deg\": 125, \"dew_point\": 281.85, \"feels_like\": {\"day\": 284.7, \"eve\": 280.79, \"morn\": 277.31, \"night\": 279.09}, \"wind_speed\": 5.32}', 1614772800),
(12, 2, '{\"dt\": 1614859200, \"pop\": 0.21, \"uvi\": 3.39, \"temp\": {\"day\": 289.31, \"eve\": 285.43, \"max\": 290.33, \"min\": 280.71, \"morn\": 280.71, \"night\": 283.17}, \"clouds\": 3, \"sunset\": 1614879986, \"sunrise\": 1614839159, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 62, \"pressure\": 1020, \"wind_deg\": 126, \"dew_point\": 282.24, \"feels_like\": {\"day\": 286.5, \"eve\": 283.24, \"morn\": 277.75, \"night\": 280.52}, \"wind_speed\": 3.66}', 1614859200),
(13, 2, '{\"dt\": 1614945600, \"pop\": 0.57, \"uvi\": 3.01, \"rain\": 1.73, \"temp\": {\"day\": 288.06, \"eve\": 284.99, \"max\": 288.24, \"min\": 280.69, \"morn\": 280.69, \"night\": 282.79}, \"clouds\": 37, \"sunset\": 1614966462, \"sunrise\": 1614925456, \"weather\": [{\"id\": 500, \"icon\": \"10d\", \"main\": \"Rain\", \"description\": \"light rain\"}], \"humidity\": 67, \"pressure\": 1015, \"wind_deg\": 353, \"dew_point\": 282.04, \"feels_like\": {\"day\": 286.64, \"eve\": 282.41, \"morn\": 279.02, \"night\": 279.86}, \"wind_speed\": 1.66}', 1614945600),
(14, 2, '{\"dt\": 1615032000, \"pop\": 0.26, \"uvi\": 4, \"temp\": {\"day\": 284.05, \"eve\": 282.75, \"max\": 285.04, \"min\": 277.14, \"morn\": 277.14, \"night\": 281.28}, \"clouds\": 10, \"sunset\": 1615052937, \"sunrise\": 1615011752, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 64, \"pressure\": 1021, \"wind_deg\": 298, \"dew_point\": 277.61, \"feels_like\": {\"day\": 280.23, \"eve\": 279.79, \"morn\": 272.9, \"night\": 277.6}, \"wind_speed\": 3.67}', 1615032000),
(15, 2, '{\"dt\": 1615118400, \"pop\": 0.15, \"uvi\": 4, \"temp\": {\"day\": 283.19, \"eve\": 282.01, \"max\": 283.64, \"min\": 277.59, \"morn\": 277.59, \"night\": 281.14}, \"clouds\": 99, \"sunset\": 1615139412, \"sunrise\": 1615098047, \"weather\": [{\"id\": 804, \"icon\": \"04d\", \"main\": \"Clouds\", \"description\": \"overcast clouds\"}], \"humidity\": 59, \"pressure\": 1024, \"wind_deg\": 287, \"dew_point\": 275.72, \"feels_like\": {\"day\": 280.45, \"eve\": 278.94, \"morn\": 274.25, \"night\": 277.04}, \"wind_speed\": 1.62}', 1615118400),
(16, 2, '{\"dt\": 1615204800, \"pop\": 0.11, \"uvi\": 4, \"temp\": {\"day\": 282, \"eve\": 279.42, \"max\": 282.44, \"min\": 274.65, \"morn\": 274.65, \"night\": 278.35}, \"clouds\": 14, \"sunset\": 1615225887, \"sunrise\": 1615184342, \"weather\": [{\"id\": 801, \"icon\": \"02d\", \"main\": \"Clouds\", \"description\": \"few clouds\"}], \"humidity\": 52, \"pressure\": 1022, \"wind_deg\": 285, \"dew_point\": 272.19, \"feels_like\": {\"day\": 276.41, \"eve\": 274.48, \"morn\": 270.1, \"night\": 272.14}, \"wind_speed\": 5.05}', 1615204800),
(17, 3, '{\"dt\": 1614600000, \"pop\": 0, \"uvi\": 3.34, \"temp\": {\"day\": 287.83, \"eve\": 284.16, \"max\": 288.86, \"min\": 280.61, \"morn\": 280.66, \"night\": 282.43}, \"clouds\": 2, \"sunset\": 1614620601, \"sunrise\": 1614580311, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 64, \"pressure\": 1025, \"wind_deg\": 119, \"dew_point\": 281.32, \"feels_like\": {\"day\": 281.63, \"eve\": 278.95, \"morn\": 276.37, \"night\": 277.84}, \"wind_speed\": 8.17}', 1614600000),
(18, 3, '{\"dt\": 1614686400, \"pop\": 0, \"uvi\": 3.23, \"temp\": {\"day\": 288.46, \"eve\": 284.32, \"max\": 289.15, \"min\": 282.51, \"morn\": 282.83, \"night\": 283.11}, \"clouds\": 75, \"sunset\": 1614707078, \"sunrise\": 1614666609, \"weather\": [{\"id\": 803, \"icon\": \"04d\", \"main\": \"Clouds\", \"description\": \"broken clouds\"}], \"humidity\": 59, \"pressure\": 1027, \"wind_deg\": 124, \"dew_point\": 280.56, \"feels_like\": {\"day\": 281.88, \"eve\": 279.31, \"morn\": 276.72, \"night\": 278.58}, \"wind_speed\": 8.52}', 1614686400),
(19, 3, '{\"dt\": 1614772800, \"pop\": 0.06, \"uvi\": 3.33, \"temp\": {\"day\": 288.51, \"eve\": 284.49, \"max\": 289.4, \"min\": 280.65, \"morn\": 280.65, \"night\": 282.33}, \"clouds\": 0, \"sunset\": 1614793554, \"sunrise\": 1614752907, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 65, \"pressure\": 1028, \"wind_deg\": 123, \"dew_point\": 282.08, \"feels_like\": {\"day\": 284.54, \"eve\": 280.7, \"morn\": 277.04, \"night\": 278.71}, \"wind_speed\": 5.3}', 1614772800),
(20, 3, '{\"dt\": 1614859200, \"pop\": 0.31, \"uvi\": 3.39, \"rain\": 0.11, \"temp\": {\"day\": 289.32, \"eve\": 285.05, \"max\": 290.15, \"min\": 280.58, \"morn\": 280.58, \"night\": 282.8}, \"clouds\": 2, \"sunset\": 1614880030, \"sunrise\": 1614839205, \"weather\": [{\"id\": 500, \"icon\": \"10d\", \"main\": \"Rain\", \"description\": \"light rain\"}], \"humidity\": 63, \"pressure\": 1020, \"wind_deg\": 128, \"dew_point\": 282.28, \"feels_like\": {\"day\": 286.49, \"eve\": 283.02, \"morn\": 277.38, \"night\": 280.23}, \"wind_speed\": 3.78}', 1614859200),
(21, 3, '{\"dt\": 1614945600, \"pop\": 0.59, \"uvi\": 3.01, \"rain\": 2.04, \"temp\": {\"day\": 287.44, \"eve\": 284.13, \"max\": 287.73, \"min\": 280.31, \"morn\": 280.31, \"night\": 281.9}, \"clouds\": 31, \"sunset\": 1614966506, \"sunrise\": 1614925501, \"weather\": [{\"id\": 500, \"icon\": \"10d\", \"main\": \"Rain\", \"description\": \"light rain\"}], \"humidity\": 70, \"pressure\": 1015, \"wind_deg\": 13, \"dew_point\": 282.11, \"feels_like\": {\"day\": 285.89, \"eve\": 281.39, \"morn\": 278.65, \"night\": 278.74}, \"wind_speed\": 1.86}', 1614945600),
(22, 3, '{\"dt\": 1615032000, \"pop\": 0.22, \"uvi\": 4, \"temp\": {\"day\": 283.6, \"eve\": 282.45, \"max\": 284.68, \"min\": 276.15, \"morn\": 276.15, \"night\": 280.51}, \"clouds\": 3, \"sunset\": 1615052981, \"sunrise\": 1615011797, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 66, \"pressure\": 1021, \"wind_deg\": 298, \"dew_point\": 277.68, \"feels_like\": {\"day\": 279.59, \"eve\": 279.26, \"morn\": 271.64, \"night\": 276.67}, \"wind_speed\": 3.95}', 1615032000),
(23, 3, '{\"dt\": 1615118400, \"pop\": 0.13, \"uvi\": 4, \"temp\": {\"day\": 282.36, \"eve\": 281.11, \"max\": 283.16, \"min\": 276.82, \"morn\": 276.82, \"night\": 280.12}, \"clouds\": 98, \"sunset\": 1615139456, \"sunrise\": 1615098093, \"weather\": [{\"id\": 804, \"icon\": \"04d\", \"main\": \"Clouds\", \"description\": \"overcast clouds\"}], \"humidity\": 61, \"pressure\": 1024, \"wind_deg\": 299, \"dew_point\": 275.43, \"feels_like\": {\"day\": 279.22, \"eve\": 277.88, \"morn\": 273.35, \"night\": 275.53}, \"wind_speed\": 2.11}', 1615118400),
(24, 3, '{\"dt\": 1615204800, \"pop\": 0.09, \"uvi\": 4, \"temp\": {\"day\": 281.42, \"eve\": 278.62, \"max\": 281.86, \"min\": 273.91, \"morn\": 273.91, \"night\": 277.39}, \"clouds\": 7, \"sunset\": 1615225931, \"sunrise\": 1615184387, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 55, \"pressure\": 1022, \"wind_deg\": 284, \"dew_point\": 272.54, \"feels_like\": {\"day\": 275.77, \"eve\": 273.77, \"morn\": 268.98, \"night\": 271.16}, \"wind_speed\": 5.19}', 1615204800),
(25, 4, '{\"dt\": 1614596400, \"pop\": 0, \"uvi\": 1.96, \"temp\": {\"day\": 281.15, \"eve\": 281.82, \"max\": 286.81, \"min\": 273.6, \"morn\": 274.07, \"night\": 277.2}, \"clouds\": 0, \"sunset\": 1614618912, \"sunrise\": 1614579250, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 59, \"pressure\": 1031, \"wind_deg\": 83, \"dew_point\": 273.77, \"feels_like\": {\"day\": 275.48, \"eve\": 277.17, \"morn\": 269.03, \"night\": 273.17}, \"wind_speed\": 5.37}', 1614596400),
(26, 4, '{\"dt\": 1614682800, \"pop\": 0, \"uvi\": 2.07, \"temp\": {\"day\": 285.21, \"eve\": 282.25, \"max\": 287.34, \"min\": 275.6, \"morn\": 275.84, \"night\": 279.17}, \"clouds\": 0, \"sunset\": 1614705407, \"sunrise\": 1614665531, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 55, \"pressure\": 1031, \"wind_deg\": 69, \"dew_point\": 276.62, \"feels_like\": {\"day\": 282.73, \"eve\": 278.6, \"morn\": 272.59, \"night\": 275.97}, \"wind_speed\": 1.48}', 1614682800),
(27, 4, '{\"dt\": 1614769200, \"pop\": 0, \"uvi\": 2.23, \"temp\": {\"day\": 286.11, \"eve\": 283.5, \"max\": 287.58, \"min\": 277.78, \"morn\": 277.92, \"night\": 280.01}, \"clouds\": 11, \"sunset\": 1614791901, \"sunrise\": 1614751811, \"weather\": [{\"id\": 801, \"icon\": \"02d\", \"main\": \"Clouds\", \"description\": \"few clouds\"}], \"humidity\": 56, \"pressure\": 1029, \"wind_deg\": 231, \"dew_point\": 277.64, \"feels_like\": {\"day\": 281.87, \"eve\": 280.77, \"morn\": 275.33, \"night\": 276.53}, \"wind_speed\": 4.28}', 1614769200),
(28, 4, '{\"dt\": 1614855600, \"pop\": 1, \"uvi\": 2.13, \"rain\": 2.84, \"temp\": {\"day\": 283.42, \"eve\": 280.12, \"max\": 284.3, \"min\": 279.17, \"morn\": 279.93, \"night\": 279.6}, \"clouds\": 67, \"sunset\": 1614878394, \"sunrise\": 1614838091, \"weather\": [{\"id\": 500, \"icon\": \"10d\", \"main\": \"Rain\", \"description\": \"light rain\"}], \"humidity\": 80, \"pressure\": 1018, \"wind_deg\": 233, \"dew_point\": 280.2, \"feels_like\": {\"day\": 278.59, \"eve\": 276.69, \"morn\": 276.26, \"night\": 276.99}, \"wind_speed\": 5.89}', 1614855600),
(29, 4, '{\"dt\": 1614942000, \"pop\": 0.19, \"uvi\": 1.58, \"temp\": {\"day\": 277.41, \"eve\": 274.35, \"max\": 278.8, \"min\": 272.33, \"morn\": 274.69, \"night\": 272.33}, \"clouds\": 91, \"sunset\": 1614964888, \"sunrise\": 1614924370, \"weather\": [{\"id\": 804, \"icon\": \"04d\", \"main\": \"Clouds\", \"description\": \"overcast clouds\"}], \"humidity\": 71, \"pressure\": 1022, \"wind_deg\": 26, \"dew_point\": 271.39, \"feels_like\": {\"day\": 272.37, \"eve\": 269.12, \"morn\": 270.09, \"night\": 267.69}, \"wind_speed\": 4.26}', 1614942000),
(30, 4, '{\"dt\": 1615028400, \"pop\": 0, \"uvi\": 2, \"temp\": {\"day\": 277.79, \"eve\": 273.63, \"max\": 277.85, \"min\": 271.32, \"morn\": 271.32, \"night\": 272.64}, \"clouds\": 0, \"sunset\": 1615051381, \"sunrise\": 1615010648, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 61, \"pressure\": 1031, \"wind_deg\": 71, \"dew_point\": 265.04, \"feels_like\": {\"day\": 270.5, \"eve\": 267.76, \"morn\": 265.83, \"night\": 266.7}, \"wind_speed\": 7.15}', 1615028400),
(31, 4, '{\"dt\": 1615114800, \"pop\": 0, \"uvi\": 2, \"temp\": {\"day\": 278.29, \"eve\": 273, \"max\": 278.49, \"min\": 270.67, \"morn\": 270.67, \"night\": 271.25}, \"clouds\": 0, \"sunset\": 1615137874, \"sunrise\": 1615096926, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 58, \"pressure\": 1030, \"wind_deg\": 66, \"dew_point\": 264.68, \"feels_like\": {\"day\": 271.47, \"eve\": 268.52, \"morn\": 264.96, \"night\": 266.78}, \"wind_speed\": 6.43}', 1615114800),
(32, 4, '{\"dt\": 1615201200, \"pop\": 0, \"uvi\": 2, \"temp\": {\"day\": 280.52, \"eve\": 275.21, \"max\": 281.17, \"min\": 270.66, \"morn\": 270.66, \"night\": 273.76}, \"clouds\": 0, \"sunset\": 1615224366, \"sunrise\": 1615183203, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 53, \"pressure\": 1026, \"wind_deg\": 43, \"dew_point\": 267.03, \"feels_like\": {\"day\": 275.79, \"eve\": 270.84, \"morn\": 266.7, \"night\": 269.65}, \"wind_speed\": 3.61}', 1615201200),
(33, 5, '{\"dt\": 1614600000, \"pop\": 0, \"uvi\": 3.35, \"temp\": {\"day\": 288.76, \"eve\": 284.13, \"max\": 289.25, \"min\": 280, \"morn\": 280, \"night\": 281.61}, \"clouds\": 0, \"sunset\": 1614620465, \"sunrise\": 1614580194, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 57, \"pressure\": 1025, \"wind_deg\": 121, \"dew_point\": 280.45, \"feels_like\": {\"day\": 284.27, \"eve\": 279.88, \"morn\": 276.57, \"night\": 278.04}, \"wind_speed\": 5.45}', 1614600000),
(34, 5, '{\"dt\": 1614686400, \"pop\": 0, \"uvi\": 3.21, \"temp\": {\"day\": 289.3, \"eve\": 284.04, \"max\": 289.74, \"min\": 281.06, \"morn\": 281.37, \"night\": 281.72}, \"clouds\": 39, \"sunset\": 1614706943, \"sunrise\": 1614666492, \"weather\": [{\"id\": 802, \"icon\": \"03d\", \"main\": \"Clouds\", \"description\": \"scattered clouds\"}], \"humidity\": 52, \"pressure\": 1028, \"wind_deg\": 123, \"dew_point\": 279.71, \"feels_like\": {\"day\": 284.62, \"eve\": 280.63, \"morn\": 277.67, \"night\": 278.85}, \"wind_speed\": 5.46}', 1614686400),
(35, 5, '{\"dt\": 1614772800, \"pop\": 0, \"uvi\": 3.31, \"temp\": {\"day\": 288.97, \"eve\": 284.88, \"max\": 290.69, \"min\": 279.42, \"morn\": 279.42, \"night\": 281.43}, \"clouds\": 0, \"sunset\": 1614793420, \"sunrise\": 1614752790, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 60, \"pressure\": 1028, \"wind_deg\": 115, \"dew_point\": 281.3, \"feels_like\": {\"day\": 286.72, \"eve\": 282.97, \"morn\": 276.83, \"night\": 279.5}, \"wind_speed\": 2.58}', 1614772800),
(36, 5, '{\"dt\": 1614859200, \"pop\": 0.24, \"uvi\": 3.18, \"rain\": 0.23, \"temp\": {\"day\": 289.4, \"eve\": 285.78, \"max\": 291.09, \"min\": 279.42, \"morn\": 279.42, \"night\": 282.94}, \"clouds\": 2, \"sunset\": 1614879896, \"sunrise\": 1614839086, \"weather\": [{\"id\": 500, \"icon\": \"10d\", \"main\": \"Rain\", \"description\": \"light rain\"}], \"humidity\": 62, \"pressure\": 1020, \"wind_deg\": 91, \"dew_point\": 282.13, \"feels_like\": {\"day\": 288.37, \"eve\": 284.68, \"morn\": 277.15, \"night\": 281.82}, \"wind_speed\": 1.15}', 1614859200),
(37, 5, '{\"dt\": 1614945600, \"pop\": 0.45, \"uvi\": 2.55, \"rain\": 0.44, \"temp\": {\"day\": 287.65, \"eve\": 284.71, \"max\": 288.09, \"min\": 280.11, \"morn\": 280.11, \"night\": 282.45}, \"clouds\": 61, \"sunset\": 1614966372, \"sunrise\": 1614925382, \"weather\": [{\"id\": 500, \"icon\": \"10d\", \"main\": \"Rain\", \"description\": \"light rain\"}], \"humidity\": 70, \"pressure\": 1015, \"wind_deg\": 310, \"dew_point\": 282.43, \"feels_like\": {\"day\": 285.99, \"eve\": 282.75, \"morn\": 278.58, \"night\": 280.51}, \"wind_speed\": 2.09}', 1614945600),
(38, 5, '{\"dt\": 1615032000, \"pop\": 0.11, \"uvi\": 3, \"temp\": {\"day\": 283.36, \"eve\": 280.91, \"max\": 284.52, \"min\": 277.07, \"morn\": 277.07, \"night\": 279.97}, \"clouds\": 55, \"sunset\": 1615052848, \"sunrise\": 1615011678, \"weather\": [{\"id\": 803, \"icon\": \"04d\", \"main\": \"Clouds\", \"description\": \"broken clouds\"}], \"humidity\": 69, \"pressure\": 1021, \"wind_deg\": 296, \"dew_point\": 278.06, \"feels_like\": {\"day\": 280.66, \"eve\": 278.24, \"morn\": 274.04, \"night\": 277.58}, \"wind_speed\": 2.19}', 1615032000),
(39, 5, '{\"dt\": 1615118400, \"pop\": 0.05, \"uvi\": 3, \"temp\": {\"day\": 283.82, \"eve\": 281.82, \"max\": 283.89, \"min\": 277.35, \"morn\": 277.35, \"night\": 280.8}, \"clouds\": 100, \"sunset\": 1615139324, \"sunrise\": 1615097973, \"weather\": [{\"id\": 804, \"icon\": \"04d\", \"main\": \"Clouds\", \"description\": \"overcast clouds\"}], \"humidity\": 60, \"pressure\": 1024, \"wind_deg\": 243, \"dew_point\": 276.38, \"feels_like\": {\"day\": 281.29, \"eve\": 279.53, \"morn\": 274.43, \"night\": 277.92}, \"wind_speed\": 1.52}', 1615118400),
(40, 5, '{\"dt\": 1615204800, \"pop\": 0.03, \"uvi\": 3, \"temp\": {\"day\": 281.88, \"eve\": 279.19, \"max\": 282.56, \"min\": 273.7, \"morn\": 273.7, \"night\": 277.57}, \"clouds\": 0, \"sunset\": 1615225799, \"sunrise\": 1615184267, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 53, \"pressure\": 1022, \"wind_deg\": 282, \"dew_point\": 272.74, \"feels_like\": {\"day\": 276.73, \"eve\": 274.46, \"morn\": 270.03, \"night\": 272.21}, \"wind_speed\": 4.46}', 1615204800),
(41, 6, '{\"dt\": 1614600000, \"pop\": 0, \"uvi\": 3.34, \"temp\": {\"day\": 288.03, \"eve\": 284.27, \"max\": 288.97, \"min\": 280.99, \"morn\": 281.04, \"night\": 282.78}, \"clouds\": 1, \"sunset\": 1614620579, \"sunrise\": 1614580278, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 64, \"pressure\": 1025, \"wind_deg\": 117, \"dew_point\": 281.39, \"feels_like\": {\"day\": 281.81, \"eve\": 278.5, \"morn\": 276.61, \"night\": 277.66}, \"wind_speed\": 8.26}', 1614600000),
(42, 6, '{\"dt\": 1614686400, \"pop\": 0, \"uvi\": 3.23, \"temp\": {\"day\": 288.67, \"eve\": 284.38, \"max\": 289.18, \"min\": 282.59, \"morn\": 282.73, \"night\": 283.25}, \"clouds\": 71, \"sunset\": 1614707056, \"sunrise\": 1614666577, \"weather\": [{\"id\": 803, \"icon\": \"04d\", \"main\": \"Clouds\", \"description\": \"broken clouds\"}], \"humidity\": 58, \"pressure\": 1027, \"wind_deg\": 122, \"dew_point\": 280.49, \"feels_like\": {\"day\": 282, \"eve\": 279.07, \"morn\": 276.47, \"night\": 278.46}, \"wind_speed\": 8.62}', 1614686400),
(43, 6, '{\"dt\": 1614772800, \"pop\": 0.11, \"uvi\": 3.33, \"temp\": {\"day\": 288.46, \"eve\": 284.51, \"max\": 289.19, \"min\": 280.89, \"morn\": 280.89, \"night\": 282.42}, \"clouds\": 1, \"sunset\": 1614793532, \"sunrise\": 1614752875, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 65, \"pressure\": 1028, \"wind_deg\": 119, \"dew_point\": 282.01, \"feels_like\": {\"day\": 284.24, \"eve\": 280.21, \"morn\": 277, \"night\": 278.57}, \"wind_speed\": 5.64}', 1614772800),
(44, 6, '{\"dt\": 1614859200, \"pop\": 0.18, \"uvi\": 3.39, \"temp\": {\"day\": 289.34, \"eve\": 284.81, \"max\": 289.86, \"min\": 280.81, \"morn\": 280.81, \"night\": 282.74}, \"clouds\": 3, \"sunset\": 1614880007, \"sunrise\": 1614839173, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 63, \"pressure\": 1020, \"wind_deg\": 122, \"dew_point\": 282.31, \"feels_like\": {\"day\": 286.45, \"eve\": 282.24, \"morn\": 277.59, \"night\": 279.82}, \"wind_speed\": 3.87}', 1614859200),
(45, 6, '{\"dt\": 1614945600, \"pop\": 0.65, \"uvi\": 3.01, \"rain\": 2.55, \"temp\": {\"day\": 288.1, \"eve\": 284.62, \"max\": 288.1, \"min\": 280.53, \"morn\": 280.53, \"night\": 282.48}, \"clouds\": 32, \"sunset\": 1614966483, \"sunrise\": 1614925470, \"weather\": [{\"id\": 500, \"icon\": \"10d\", \"main\": \"Rain\", \"description\": \"light rain\"}], \"humidity\": 66, \"pressure\": 1015, \"wind_deg\": 13, \"dew_point\": 281.9, \"feels_like\": {\"day\": 286.6, \"eve\": 282.01, \"morn\": 278.72, \"night\": 279.52}, \"wind_speed\": 1.7}', 1614945600),
(46, 6, '{\"dt\": 1615032000, \"pop\": 0.32, \"uvi\": 4, \"temp\": {\"day\": 283.89, \"eve\": 282.84, \"max\": 285.08, \"min\": 276.83, \"morn\": 276.83, \"night\": 281.42}, \"clouds\": 5, \"sunset\": 1615052958, \"sunrise\": 1615011766, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 65, \"pressure\": 1021, \"wind_deg\": 299, \"dew_point\": 277.68, \"feels_like\": {\"day\": 279.86, \"eve\": 279.53, \"morn\": 272.43, \"night\": 277.66}, \"wind_speed\": 3.99}', 1615032000),
(47, 6, '{\"dt\": 1615118400, \"pop\": 0.21, \"uvi\": 4, \"temp\": {\"day\": 282.89, \"eve\": 281.45, \"max\": 282.89, \"min\": 277.3, \"morn\": 277.3, \"night\": 280.44}, \"clouds\": 98, \"sunset\": 1615139433, \"sunrise\": 1615098062, \"weather\": [{\"id\": 804, \"icon\": \"04d\", \"main\": \"Clouds\", \"description\": \"overcast clouds\"}], \"humidity\": 63, \"pressure\": 1024, \"wind_deg\": 297, \"dew_point\": 276.2, \"feels_like\": {\"day\": 280.25, \"eve\": 278.11, \"morn\": 273.98, \"night\": 275.83}, \"wind_speed\": 1.64}', 1615118400),
(48, 6, '{\"dt\": 1615204800, \"pop\": 0.17, \"uvi\": 4, \"temp\": {\"day\": 281.82, \"eve\": 278.88, \"max\": 282.21, \"min\": 274.78, \"morn\": 274.78, \"night\": 278.02}, \"clouds\": 22, \"sunset\": 1615225907, \"sunrise\": 1615184357, \"weather\": [{\"id\": 801, \"icon\": \"02d\", \"main\": \"Clouds\", \"description\": \"few clouds\"}], \"humidity\": 53, \"pressure\": 1022, \"wind_deg\": 287, \"dew_point\": 272.3, \"feels_like\": {\"day\": 276.06, \"eve\": 274.03, \"morn\": 269.93, \"night\": 271.7}, \"wind_speed\": 5.32}', 1615204800),
(49, 7, '{\"dt\": 1614600000, \"pop\": 0, \"uvi\": 3.35, \"temp\": {\"day\": 288.25, \"eve\": 283.89, \"max\": 288.92, \"min\": 279.42, \"morn\": 279.42, \"night\": 281.23}, \"clouds\": 0, \"sunset\": 1614620490, \"sunrise\": 1614580236, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 59, \"pressure\": 1025, \"wind_deg\": 127, \"dew_point\": 280.44, \"feels_like\": {\"day\": 283.49, \"eve\": 279.58, \"morn\": 275.38, \"night\": 277.21}, \"wind_speed\": 5.85}', 1614600000),
(50, 7, '{\"dt\": 1614686400, \"pop\": 0, \"uvi\": 3.21, \"temp\": {\"day\": 288.71, \"eve\": 284.06, \"max\": 289.04, \"min\": 280.58, \"morn\": 281.16, \"night\": 281.65}, \"clouds\": 33, \"sunset\": 1614706968, \"sunrise\": 1614666533, \"weather\": [{\"id\": 802, \"icon\": \"03d\", \"main\": \"Clouds\", \"description\": \"scattered clouds\"}], \"humidity\": 54, \"pressure\": 1027, \"wind_deg\": 129, \"dew_point\": 279.47, \"feels_like\": {\"day\": 283.48, \"eve\": 279.74, \"morn\": 276.43, \"night\": 277.85}, \"wind_speed\": 6.25}', 1614686400),
(51, 7, '{\"dt\": 1614772800, \"pop\": 0, \"uvi\": 3.31, \"temp\": {\"day\": 288.38, \"eve\": 284.49, \"max\": 290.07, \"min\": 278.86, \"morn\": 278.86, \"night\": 280.98}, \"clouds\": 0, \"sunset\": 1614793446, \"sunrise\": 1614752830, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 62, \"pressure\": 1028, \"wind_deg\": 125, \"dew_point\": 281.23, \"feels_like\": {\"day\": 285.86, \"eve\": 282.36, \"morn\": 275.49, \"night\": 278.65}, \"wind_speed\": 2.93}', 1614772800),
(52, 7, '{\"dt\": 1614859200, \"pop\": 0.33, \"uvi\": 3.18, \"rain\": 0.2, \"temp\": {\"day\": 288.46, \"eve\": 285.13, \"max\": 290.25, \"min\": 278.75, \"morn\": 278.75, \"night\": 282.6}, \"clouds\": 1, \"sunset\": 1614879923, \"sunrise\": 1614839127, \"weather\": [{\"id\": 500, \"icon\": \"10d\", \"main\": \"Rain\", \"description\": \"light rain\"}], \"humidity\": 64, \"pressure\": 1020, \"wind_deg\": 129, \"dew_point\": 281.74, \"feels_like\": {\"day\": 286.85, \"eve\": 283.98, \"morn\": 276.03, \"night\": 281.23}, \"wind_speed\": 1.82}', 1614859200),
(53, 7, '{\"dt\": 1614945600, \"pop\": 0.4, \"uvi\": 2.55, \"rain\": 0.45, \"temp\": {\"day\": 286.67, \"eve\": 284.11, \"max\": 287.45, \"min\": 279.65, \"morn\": 279.65, \"night\": 281.3}, \"clouds\": 77, \"sunset\": 1614966399, \"sunrise\": 1614925422, \"weather\": [{\"id\": 500, \"icon\": \"10d\", \"main\": \"Rain\", \"description\": \"light rain\"}], \"humidity\": 75, \"pressure\": 1015, \"wind_deg\": 309, \"dew_point\": 282.53, \"feels_like\": {\"day\": 285.06, \"eve\": 281.97, \"morn\": 278.05, \"night\": 278.89}, \"wind_speed\": 2.05}', 1614945600),
(54, 7, '{\"dt\": 1615032000, \"pop\": 0.01, \"uvi\": 3, \"temp\": {\"day\": 282.37, \"eve\": 280.49, \"max\": 284.27, \"min\": 276.28, \"morn\": 276.28, \"night\": 279.01}, \"clouds\": 61, \"sunset\": 1615052876, \"sunrise\": 1615011717, \"weather\": [{\"id\": 803, \"icon\": \"04d\", \"main\": \"Clouds\", \"description\": \"broken clouds\"}], \"humidity\": 74, \"pressure\": 1021, \"wind_deg\": 303, \"dew_point\": 278.11, \"feels_like\": {\"day\": 280.31, \"eve\": 277.9, \"morn\": 273.53, \"night\": 276.57}, \"wind_speed\": 1.29}', 1615032000),
(55, 7, '{\"dt\": 1615118400, \"pop\": 0.01, \"uvi\": 3, \"temp\": {\"day\": 282.83, \"eve\": 280.32, \"max\": 283.78, \"min\": 276.35, \"morn\": 276.35, \"night\": 279.1}, \"clouds\": 99, \"sunset\": 1615139352, \"sunrise\": 1615098012, \"weather\": [{\"id\": 804, \"icon\": \"04d\", \"main\": \"Clouds\", \"description\": \"overcast clouds\"}], \"humidity\": 58, \"pressure\": 1024, \"wind_deg\": 243, \"dew_point\": 275.13, \"feels_like\": {\"day\": 279.85, \"eve\": 277.47, \"morn\": 273.36, \"night\": 275.96}, \"wind_speed\": 1.83}', 1615118400),
(56, 7, '{\"dt\": 1615204800, \"pop\": 0, \"uvi\": 3, \"temp\": {\"day\": 280.78, \"eve\": 278.75, \"max\": 282.11, \"min\": 272.65, \"morn\": 272.65, \"night\": 275.82}, \"clouds\": 0, \"sunset\": 1615225828, \"sunrise\": 1615184306, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 57, \"pressure\": 1022, \"wind_deg\": 279, \"dew_point\": 272.36, \"feels_like\": {\"day\": 276.11, \"eve\": 273.98, \"morn\": 269.07, \"night\": 271.81}, \"wind_speed\": 3.77}', 1615204800),
(57, 8, '{\"dt\": 1614600000, \"pop\": 0, \"uvi\": 3.35, \"temp\": {\"day\": 288.7, \"eve\": 283.69, \"max\": 288.95, \"min\": 279.88, \"morn\": 279.88, \"night\": 281.46}, \"clouds\": 3, \"sunset\": 1614620424, \"sunrise\": 1614580160, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 57, \"pressure\": 1025, \"wind_deg\": 124, \"dew_point\": 280.4, \"feels_like\": {\"day\": 283.94, \"eve\": 279.39, \"morn\": 276.07, \"night\": 277.46}, \"wind_speed\": 5.82}', 1614600000),
(58, 8, '{\"dt\": 1614686400, \"pop\": 0, \"uvi\": 3.21, \"temp\": {\"day\": 289.26, \"eve\": 283.81, \"max\": 289.63, \"min\": 280.84, \"morn\": 280.99, \"night\": 281.57}, \"clouds\": 32, \"sunset\": 1614706901, \"sunrise\": 1614666458, \"weather\": [{\"id\": 802, \"icon\": \"03d\", \"main\": \"Clouds\", \"description\": \"scattered clouds\"}], \"humidity\": 51, \"pressure\": 1028, \"wind_deg\": 128, \"dew_point\": 279.35, \"feels_like\": {\"day\": 284.28, \"eve\": 280.02, \"morn\": 276.73, \"night\": 278.17}, \"wind_speed\": 5.79}', 1614686400),
(59, 8, '{\"dt\": 1614772800, \"pop\": 0, \"uvi\": 3.31, \"temp\": {\"day\": 289.01, \"eve\": 284.37, \"max\": 290.42, \"min\": 279.33, \"morn\": 279.33, \"night\": 281.13}, \"clouds\": 0, \"sunset\": 1614793379, \"sunrise\": 1614752756, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 59, \"pressure\": 1028, \"wind_deg\": 121, \"dew_point\": 281.18, \"feels_like\": {\"day\": 286.67, \"eve\": 282.12, \"morn\": 276.05, \"night\": 278.89}, \"wind_speed\": 2.63}', 1614772800),
(60, 8, '{\"dt\": 1614859200, \"pop\": 0.39, \"uvi\": 3.18, \"rain\": 0.36, \"temp\": {\"day\": 289.29, \"eve\": 285.37, \"max\": 290.72, \"min\": 279.25, \"morn\": 279.25, \"night\": 282.51}, \"clouds\": 3, \"sunset\": 1614879855, \"sunrise\": 1614839052, \"weather\": [{\"id\": 500, \"icon\": \"10d\", \"main\": \"Rain\", \"description\": \"light rain\"}], \"humidity\": 61, \"pressure\": 1020, \"wind_deg\": 115, \"dew_point\": 281.93, \"feels_like\": {\"day\": 287.97, \"eve\": 284.59, \"morn\": 276.61, \"night\": 281.1}, \"wind_speed\": 1.44}', 1614859200),
(61, 8, '{\"dt\": 1614945600, \"pop\": 0.42, \"uvi\": 2.55, \"rain\": 0.29, \"temp\": {\"day\": 287.7, \"eve\": 284.52, \"max\": 288.05, \"min\": 279.77, \"morn\": 279.77, \"night\": 282.15}, \"clouds\": 75, \"sunset\": 1614966332, \"sunrise\": 1614925348, \"weather\": [{\"id\": 500, \"icon\": \"10d\", \"main\": \"Rain\", \"description\": \"light rain\"}], \"humidity\": 70, \"pressure\": 1015, \"wind_deg\": 299, \"dew_point\": 282.33, \"feels_like\": {\"day\": 286.22, \"eve\": 282.48, \"morn\": 278.01, \"night\": 280.58}, \"wind_speed\": 1.85}', 1614945600),
(62, 8, '{\"dt\": 1615032000, \"pop\": 0.06, \"uvi\": 3, \"temp\": {\"day\": 282.66, \"eve\": 280.7, \"max\": 284.36, \"min\": 277.34, \"morn\": 277.34, \"night\": 279.13}, \"clouds\": 76, \"sunset\": 1615052808, \"sunrise\": 1615011643, \"weather\": [{\"id\": 803, \"icon\": \"04d\", \"main\": \"Clouds\", \"description\": \"broken clouds\"}], \"humidity\": 72, \"pressure\": 1021, \"wind_deg\": 280, \"dew_point\": 278.03, \"feels_like\": {\"day\": 280.6, \"eve\": 278.04, \"morn\": 274.76, \"night\": 277.36}, \"wind_speed\": 1.25}', 1615032000),
(63, 8, '{\"dt\": 1615118400, \"pop\": 0.1, \"uvi\": 3, \"temp\": {\"day\": 283.61, \"eve\": 281.29, \"max\": 283.61, \"min\": 277.11, \"morn\": 277.11, \"night\": 280.07}, \"clouds\": 100, \"sunset\": 1615139284, \"sunrise\": 1615097938, \"weather\": [{\"id\": 804, \"icon\": \"04d\", \"main\": \"Clouds\", \"description\": \"overcast clouds\"}], \"humidity\": 62, \"pressure\": 1024, \"wind_deg\": 222, \"dew_point\": 276.82, \"feels_like\": {\"day\": 280.88, \"eve\": 279.33, \"morn\": 274.68, \"night\": 277.58}, \"wind_speed\": 1.88}', 1615118400),
(64, 8, '{\"dt\": 1615204800, \"pop\": 0.02, \"uvi\": 3, \"temp\": {\"day\": 281.84, \"eve\": 278.82, \"max\": 282.6, \"min\": 273.73, \"morn\": 273.73, \"night\": 276.54}, \"clouds\": 6, \"sunset\": 1615225759, \"sunrise\": 1615184232, \"weather\": [{\"id\": 800, \"icon\": \"01d\", \"main\": \"Clear\", \"description\": \"clear sky\"}], \"humidity\": 54, \"pressure\": 1022, \"wind_deg\": 278, \"dew_point\": 272.8, \"feels_like\": {\"day\": 276.82, \"eve\": 274.22, \"morn\": 270.55, \"night\": 272.55}, \"wind_speed\": 4.31}', 1615204800);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_categorie_name` (`name`);

--
-- Index pour la table `leisurecentre`
--
ALTER TABLE `leisurecentre`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `leisurecentre_categories`
--
ALTER TABLE `leisurecentre_categories`
  ADD PRIMARY KEY (`leisurecentre_id`,`categories_id`),
  ADD KEY `fk_leisurecentre_has_categories_categories1_idx` (`categories_id`),
  ADD KEY `fk_leisurecentre_has_categories_leisurecentre_idx` (`leisurecentre_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `weather`
--
ALTER TABLE `weather`
  ADD PRIMARY KEY (`id`),
  ADD KEY `leisurecentre_id` (`leisurecentre_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `leisurecentre`
--
ALTER TABLE `leisurecentre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `weather`
--
ALTER TABLE `weather`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `leisurecentre_categories`
--
ALTER TABLE `leisurecentre_categories`
  ADD CONSTRAINT `fk_leisurecentre_has_categories_categories1` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_leisurecentre_has_categories_leisurecentre` FOREIGN KEY (`leisurecentre_id`) REFERENCES `leisurecentre` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `weather`
--
ALTER TABLE `weather`
  ADD CONSTRAINT `leisurecentre_id` FOREIGN KEY (`leisurecentre_id`) REFERENCES `leisurecentre` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
