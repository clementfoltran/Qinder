-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3307
-- Généré le :  mer. 12 juin 2019 à 07:55
-- Version du serveur :  5.7.25
-- Version de PHP :  7.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `qinder`
--

-- --------------------------------------------------------

--
-- Structure de la table `match`
--

CREATE TABLE `match` (
  `id_match` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_user_` int(11) DEFAULT NULL,
  `started` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `id_message` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `message` tinytext,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_conv` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `photo`
--

CREATE TABLE `photo` (
  `id_photo` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `photo` mediumtext,
  `active` tinyint(1) DEFAULT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `swipe`
--

CREATE TABLE `swipe` (
  `id_swipe` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_user_` int(11) DEFAULT NULL,
  `like` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `tag`
--

CREATE TABLE `tag` (
  `id_tag` int(11) NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `logo` mediumtext,
  `tag` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `tag`
--

INSERT INTO `tag` (`id_tag`, `label`, `logo`, `tag`) VALUES
(1, 'You are too mysterious, surprise', NULL, 'Surprise'),
(2, 'You\'re a little bit shy and you do not want to go too fast', NULL, 'Pingui'),
(3, 'You are looking for love', NULL, 'Maxi king'),
(4, 'You are looking for a night delight', NULL, 'Délice'),
(5, 'You are looking for a nature lover', NULL, 'Country'),
(6, 'You are looking for a small person', NULL, 'Maxi'),
(7, 'You are looking for a tall person', NULL, 'Maxi');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `hash` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `interest` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `distance` int(11) DEFAULT NULL,
  `minage` int(11) DEFAULT NULL,
  `maxage` int(11) DEFAULT NULL,
  `validation_key` varchar(255) DEFAULT NULL,
  `confirm` tinyint(1) DEFAULT NULL,
  `popularity` float DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id_user`, `firstname`, `lastname`, `email`, `hash`, `gender`, `birthdate`, `interest`, `bio`, `distance`, `minage`, `maxage`, `validation_key`, `confirm`, `popularity`, `position`) VALUES
(1, 'Gabriel', 'Drai', 'gdrai@student.42.fr', 'sha1$3454bdef$1$4ee1e2cec9f9b42ff3ca7fc63a6d9b2a8b8fdd78', 'Female', '2019-06-12', 'Male', 'TOP\n', 70, 18, 25, '232b10255d2189b73a8dc75c0048293155e2c398dbb241b0bda3d588c91d7bc2e354812036c85e6d', 1, NULL, NULL),
(2, 'clement', 'foltran', 'clfoltra@student.42.fr', 'sha1$b102e18a$1$e43c2bfe71dbff22f342a32dde27783541d83fd4', 'Male', '2019-06-12', 'Both', NULL, 10, 18, 25, '742c24baeefac817c055b7e971894d1925bed69c5839920a2de9f5472c2b089d5a14a12bb9ea1e84', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `usertag`
--

CREATE TABLE `usertag` (
  `id_utag` int(11) NOT NULL,
  `id_tag` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `match`
--
ALTER TABLE `match`
  ADD PRIMARY KEY (`id_match`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id_message`),
  ADD KEY `id_conv` (`id_conv`);

--
-- Index pour la table `photo`
--
ALTER TABLE `photo`
  ADD PRIMARY KEY (`id_photo`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `swipe`
--
ALTER TABLE `swipe`
  ADD PRIMARY KEY (`id_swipe`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id_tag`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `usertag`
--
ALTER TABLE `usertag`
  ADD PRIMARY KEY (`id_utag`),
  ADD KEY `id_tag` (`id_tag`),
  ADD KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `match`
--
ALTER TABLE `match`
  MODIFY `id_match` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `photo`
--
ALTER TABLE `photo`
  MODIFY `id_photo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `swipe`
--
ALTER TABLE `swipe`
  MODIFY `id_swipe` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `tag`
--
ALTER TABLE `tag`
  MODIFY `id_tag` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `usertag`
--
ALTER TABLE `usertag`
  MODIFY `id_utag` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `match`
--
ALTER TABLE `match`
  ADD CONSTRAINT `match_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`id_conv`) REFERENCES `match` (`id_match`);

--
-- Contraintes pour la table `photo`
--
ALTER TABLE `photo`
  ADD CONSTRAINT `photo_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Contraintes pour la table `swipe`
--
ALTER TABLE `swipe`
  ADD CONSTRAINT `swipe_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Contraintes pour la table `usertag`
--
ALTER TABLE `usertag`
  ADD CONSTRAINT `usertag_ibfk_1` FOREIGN KEY (`id_tag`) REFERENCES `tag` (`id_tag`),
  ADD CONSTRAINT `usertag_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
