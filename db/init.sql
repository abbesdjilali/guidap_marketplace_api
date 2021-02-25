-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Hôte : guidap_mysql: 3306
-- Généré le :  mer. 24 fév. 2021 à 07:12
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

-- --------------------------------------------------------

--
-- Structure de la table `leisurecentre_categories`
--

CREATE TABLE `leisurecentre_categories` (
  `leisurecentre_id` int(11) NOT NULL,
  `categories_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `leisurecentre`
--
ALTER TABLE `leisurecentre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `leisurecentre_categories`
--
ALTER TABLE `leisurecentre_categories`
  ADD CONSTRAINT `fk_leisurecentre_has_categories_categories1` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_leisurecentre_has_categories_leisurecentre` FOREIGN KEY (`leisurecentre_id`) REFERENCES `leisurecentre` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
