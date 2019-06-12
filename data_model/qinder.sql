CREATE TABLE `user`
(
  `id_user` int PRIMARY KEY AUTO_INCREMENT,
  `firstname` varchar(255),
  `lastname` varchar(255),
  `email` varchar(255) UNIQUE,
  `passwd` varchar(255),
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

CREATE TABLE `tags`
(
  `id_tag` int PRIMARY KEY AUTO_INCREMENT,
  `tag` varchar(255)
);

CREATE TABLE `userTags`
(
  `id_utag` int PRIMARY KEY AUTO_INCREMENT,
  `id_tag` int,
  `id_user` int
);

ALTER TABLE `photo` ADD FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

ALTER TABLE `swipe` ADD FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

ALTER TABLE `match` ADD FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

ALTER TABLE `message` ADD FOREIGN KEY (`id_conv`) REFERENCES `match` (`id_match`);

ALTER TABLE `userTags` ADD FOREIGN KEY (`id_tag`) REFERENCES `tags` (`id_tag`);

ALTER TABLE `userTags` ADD FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);
