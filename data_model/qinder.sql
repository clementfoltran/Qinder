-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 13, 2019 at 02:26 AM
-- Server version: 5.6.43
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `qinder`
--

-- --------------------------------------------------------

--
-- Table structure for table `match`
--

CREATE TABLE `match` (
  `id_match` int(11) NOT NULL,
  `started` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `match`
--

INSERT INTO `match` (`id_match`, `started`) VALUES
(54, '2019-08-13 09:23:17');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id_message` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `message` tinytext,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_match` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id_notif` int(11) NOT NULL,
  `id_user_` int(11) DEFAULT NULL,
  `notif` int(11) DEFAULT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `photo`
--

CREATE TABLE `photo` (
  `id_photo` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `photo` mediumtext,
  `active` tinyint(1) DEFAULT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `photo`
--

INSERT INTO `photo` (`id_photo`, `id_user`, `photo`, `active`, `ts`) VALUES
(182, 2, 'data:image/jpeg;base64,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', 0, '0000-00-00 00:00:00'),
(214, 217, 'https://randomuser.me/api/portraits/men/86.jpg', 0, '2019-07-15 14:54:05'),
(215, 218, 'https://randomuser.me/api/portraits/men/53.jpg', 0, '2019-07-15 14:54:08'),
(216, 219, 'https://randomuser.me/api/portraits/men/51.jpg', 0, '2019-07-15 14:54:09'),
(217, 220, 'https://randomuser.me/api/portraits/men/21.jpg', 0, '2019-07-15 14:54:11'),
(218, 221, 'https://randomuser.me/api/portraits/men/42.jpg', 0, '2019-07-15 14:54:12'),
(219, 222, 'https://randomuser.me/api/portraits/women/48.jpg', 0, '2019-07-15 14:54:12'),
(220, 223, 'https://randomuser.me/api/portraits/women/81.jpg', 0, '2019-07-15 14:54:13'),
(221, 224, 'https://randomuser.me/api/portraits/women/64.jpg', 0, '2019-07-15 14:54:14'),
(222, 225, 'https://randomuser.me/api/portraits/men/38.jpg', 0, '2019-07-15 14:54:15'),
(223, 226, 'https://randomuser.me/api/portraits/women/89.jpg', 0, '2019-07-15 14:54:16'),
(224, 227, 'https://randomuser.me/api/portraits/women/57.jpg', 0, '2019-07-15 14:54:17'),
(225, 228, 'https://randomuser.me/api/portraits/women/60.jpg', 0, '2019-07-15 14:54:18');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `id_report` int(11) NOT NULL,
  `id_user_` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `swipe`
--

CREATE TABLE `swipe` (
  `id_swipe` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_user_matched` int(11) DEFAULT NULL,
  `like` tinyint(1) DEFAULT NULL,
  `id_match` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `swipe`
--

INSERT INTO `swipe` (`id_swipe`, `id_user`, `id_user_matched`, `like`, `id_match`) VALUES
(99, 217, 2, 1, 54),
(100, 2, 217, 1, 54);

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

CREATE TABLE `tag` (
  `id_tag` int(11) NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `logo` mediumtext,
  `tag` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tag`
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
-- Table structure for table `user`
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
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `firstname`, `lastname`, `email`, `hash`, `gender`, `birthdate`, `interest`, `bio`, `distance`, `minage`, `maxage`, `validation_key`, `confirm`, `popularity`, `position`) VALUES
(2, 'Clement', 'foltran', 'clfoltra@student.42.fr', 'sha1$b102e18a$1$e43c2bfe71dbff22f342a32dde27783541d83fd4', 'Male', '2000-02-14', 'Both', 'J\'aime la paëlla', 88, 0, 88, '742c24baeefac817c055b7e971894d1925bed69c5839920a2de9f5472c2b089d5a14a12bb9ea1e84', 1, NULL, '{\"latitude\":48.8966624,\"longitude\":2.3184826999999997}'),
(217, 'sebastian', 'larsen', 'sebastian.larsen@example.com', '2dc5290f841ed18ce506ef18e3e0414deb7ac229', 'Male', '1970-09-20', 'Female', NULL, NULL, NULL, NULL, NULL, 1, NULL, '{\"latitude\":48.43566571541879,\"longitude\":2.617797800461248}'),
(218, 'bote', 'brouwers', 'bote.brouwers@example.com', '7590fb6f2bb72a4a8d3b207851bb492623f6d623', 'Male', '1955-08-15', 'Female', NULL, NULL, NULL, NULL, NULL, 1, NULL, '{\"latitude\":48.65350647571518,\"longitude\":2.9166105073715443}'),
(219, 'edwin', 'fonnes', 'edwin.fonnes@example.com', 'f507552c0fcf2106f8234ac44befce35adca2283', 'Male', '1974-04-05', 'Female', NULL, NULL, NULL, NULL, NULL, 1, NULL, '{\"latitude\":48.38879664635868,\"longitude\":2.3141046165453147}'),
(220, 'carl', 'perkins', 'carl.perkins@example.com', 'f47ee6e57c4e665d37525f6ac8ddb9d9ffb9b065', 'Male', '1980-04-25', 'Female', NULL, NULL, NULL, NULL, NULL, 1, NULL, '{\"latitude\":49.28974694152096,\"longitude\":1.9724023362056011}'),
(221, 'russell', 'jackson', 'russell.jackson@example.com', '3c0a0183a664b960c526454a031bb9fa12115b4a', 'Male', '1945-03-15', 'Female', NULL, NULL, NULL, NULL, NULL, 1, NULL, '{\"latitude\":48.12304834615459,\"longitude\":2.416283044559223}'),
(222, 'rory', 'ter veen', 'rory.terveen@example.com', 'ca9139684154530105cde968d380c7b44e1bab79', 'Female', '1947-01-07', 'Male', NULL, NULL, NULL, NULL, NULL, 1, NULL, '{\"latitude\":49.52515985325608,\"longitude\":3.669246013958868}'),
(223, 'mandy', 'willis', 'mandy.willis@example.com', '16f6f9bb8d59381daddec0aed9886d8d1d570955', 'Female', '1981-08-28', 'Male', NULL, NULL, NULL, NULL, NULL, 1, NULL, '{\"latitude\":48.934691914511,\"longitude\":3.3439128228876855}'),
(224, 'isabella', 'madsen', 'isabella.madsen@example.com', '0717673e01d429c47d1766eb106efdb675a3bed2', 'Female', '1968-10-16', 'Male', NULL, NULL, NULL, NULL, NULL, 1, NULL, '{\"latitude\":49.41202687339579,\"longitude\":3.21152822783606}'),
(225, 'adnan', 'vincent', 'adnan.vincent@example.com', 'ca309c502b403918604abcbe29c92bf87736d357', 'Male', '1974-09-14', 'Female', NULL, NULL, NULL, NULL, NULL, 1, NULL, '{\"latitude\":48.098425796399205,\"longitude\":3.0787115982382507}'),
(226, 'jane', 'pierre', 'jane.pierre@example.com', '52e3aba4d8cc92406a260c614f959e43139d6f2c', 'Female', '1958-08-04', 'Male', NULL, NULL, NULL, NULL, NULL, 1, NULL, '{\"latitude\":48.36791588246525,\"longitude\":2.4081716810541884}'),
(227, 'samantha', 'freeman', 'samantha.freeman@example.com', 'e27f2aa8b38053fe6e02a1d9574575cc7d52fcc9', 'Female', '1988-06-11', 'Male', NULL, NULL, NULL, NULL, NULL, 1, NULL, '{\"latitude\":49.834960933096525,\"longitude\":3.2796441547372455}'),
(228, 'elvira', 'ernstsen', 'elvira.ernstsen@example.com', 'c0c04808a0e052c11bbdffda30785dfca89047e4', 'Female', '1966-01-16', 'Male', NULL, NULL, NULL, NULL, NULL, 1, NULL, '{\"latitude\":49.262550686108995,\"longitude\":2.9403243892861295}');

-- --------------------------------------------------------

--
-- Table structure for table `usertag`
--

CREATE TABLE `usertag` (
  `id_utag` int(11) NOT NULL,
  `id_tag` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usertag`
--

INSERT INTO `usertag` (`id_utag`, `id_tag`, `id_user`) VALUES
(242, 4, 217),
(243, 1, 218),
(244, 3, 218),
(245, 3, 218),
(246, 6, 218),
(247, 4, 218),
(248, 5, 219),
(249, 2, 219),
(250, 5, 219),
(251, 4, 219),
(252, 6, 219),
(253, 2, 220),
(254, 1, 220),
(255, 1, 221),
(256, 5, 221),
(257, 4, 221),
(258, 1, 221),
(259, 6, 221),
(260, 1, 222),
(261, 6, 222),
(262, 2, 222),
(263, 4, 222),
(264, 6, 222),
(265, 3, 223),
(266, 1, 223),
(267, 6, 224),
(268, 6, 224),
(269, 3, 224),
(270, 2, 225),
(271, 3, 226),
(272, 3, 226),
(273, 3, 226),
(274, 4, 227),
(275, 5, 227),
(276, 1, 227),
(277, 4, 227),
(278, 6, 227),
(279, 2, 227),
(280, 4, 228);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `match`
--
ALTER TABLE `match`
  ADD PRIMARY KEY (`id_match`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id_message`),
  ADD KEY `id_match` (`id_match`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id_notif`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `photo`
--
ALTER TABLE `photo`
  ADD PRIMARY KEY (`id_photo`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id_report`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `swipe`
--
ALTER TABLE `swipe`
  ADD PRIMARY KEY (`id_swipe`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_match` (`id_match`);

--
-- Indexes for table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id_tag`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `usertag`
--
ALTER TABLE `usertag`
  ADD PRIMARY KEY (`id_utag`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_tag` (`id_tag`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `match`
--
ALTER TABLE `match`
  MODIFY `id_match` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id_notif` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `photo`
--
ALTER TABLE `photo`
  MODIFY `id_photo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=226;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `id_report` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `swipe`
--
ALTER TABLE `swipe`
  MODIFY `id_swipe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `tag`
--
ALTER TABLE `tag`
  MODIFY `id_tag` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=229;

--
-- AUTO_INCREMENT for table `usertag`
--
ALTER TABLE `usertag`
  MODIFY `id_utag` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=281;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`id_match`) REFERENCES `match` (`id_match`);

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `photo`
--
ALTER TABLE `photo`
  ADD CONSTRAINT `photo_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `swipe`
--
ALTER TABLE `swipe`
  ADD CONSTRAINT `swipe_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `swipe_ibfk_2` FOREIGN KEY (`id_match`) REFERENCES `match` (`id_match`);

--
-- Constraints for table `usertag`
--
ALTER TABLE `usertag`
  ADD CONSTRAINT `usertag_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `usertag_ibfk_2` FOREIGN KEY (`id_tag`) REFERENCES `tag` (`id_tag`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
