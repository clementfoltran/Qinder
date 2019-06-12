CREATE TABLE `user`
(
  `id_user` int PRIMARY KEY AUTO_INCREMENT,
  `firstname` varchar(255),
  `lastname` varchar(255),
  `email` varchar(255) UNIQUE,
  `hash` varchar(255),
  `gender` varchar(255),
  `birthdate` date,
  `interest` varchar(255),
  `bio` varchar(255),
  `distance` int,
  `minage` int,
  `maxage` int,
  `validation_key` varchar(255),
  `confirm` boolean,
  `popularity` float,
  `position` varchar(255)
);

CREATE TABLE `photo`
(
  `id_photo` int PRIMARY KEY AUTO_INCREMENT,
  `id_user` int,
  `photo` mediumtext,
  `active` boolean,
  `ts` timestamp
);

CREATE TABLE `swipe`
(
  `id_swipe` int PRIMARY KEY AUTO_INCREMENT,
  `id_user` int,
  `id_user_` int,
  `like` boolean
);

CREATE TABLE `match`
(
  `id_match` int PRIMARY KEY AUTO_INCREMENT,
  `id_user` int,
  `id_user_` int,
  `started` timestamp
);

CREATE TABLE `message`
(
  `id_message` int PRIMARY KEY AUTO_INCREMENT,
  `id_user` int,
  `message` tinytext,
  `ts` timestamp,
  `id_conv` int
);

CREATE TABLE `tag`
(
  `id_tag` int PRIMARY KEY AUTO_INCREMENT,
  `label` varchar(255),
  `logo` mediumtext,
  `tag` varchar(255)
);

CREATE TABLE `userTag`
(
  `id_utag` int PRIMARY KEY AUTO_INCREMENT,
  `id_tag` int,
  `id_user` int
);

ALTER TABLE `photo` ADD FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

ALTER TABLE `swipe` ADD FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

ALTER TABLE `match` ADD FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

ALTER TABLE `message` ADD FOREIGN KEY (`id_conv`) REFERENCES `match` (`id_match`);

ALTER TABLE `userTag` ADD FOREIGN KEY (`id_tag`) REFERENCES `tag` (`id_tag`);

ALTER TABLE `userTag` ADD FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

INSERT INTO `tag` (`id_tag`, `tag`, `label`, `logo`) VALUES
(1, 'Surprise', 'You are too mysterious, surprise', NULL),
(2, 'Pingui', 'You\'re a little bit shy and you do not want to go too fast', NULL),
(3, 'Maxi king', 'You are looking for love', NULL),
(4, 'Délice', 'You are looking for a night delight', NULL),
(5, 'Country', 'You are looking for a nature lover', NULL),
(6, 'Maxi', 'You are looking for a small person', NULL),
(7, 'Maxi', 'You are looking for a tall person', NULL);