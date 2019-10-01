# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: ec2-3-16-161-198.us-east-2.compute.amazonaws.com (MySQL 5.7.25-0ubuntu0.16.04.2)
# Database: x2
# Generation Time: 2019-10-01 02:50:51 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table medinsurancecompanies
# ------------------------------------------------------------

DROP TABLE IF EXISTS `medinsurancecompanies`;

CREATE TABLE `medinsurancecompanies` (
  `rId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(400) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `hqFullAddress` varchar(600) DEFAULT NULL,
  `alias` varchar(400) DEFAULT NULL,
  `notes` varchar(1000) DEFAULT NULL,
  `approved` varchar(20) DEFAULT 'false',
  PRIMARY KEY (`rId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `medinsurancecompanies` WRITE;
/*!40000 ALTER TABLE `medinsurancecompanies` DISABLE KEYS */;

INSERT INTO `medinsurancecompanies` (`rId`, `timestamp`, `name`, `country`, `hqFullAddress`, `alias`, `notes`, `approved`)
VALUES
	(2,'2019-10-01 02:44:48','AARP','US',NULL,NULL,NULL,'true'),
	(3,'2019-10-01 02:44:48','Aetna','US',NULL,NULL,NULL,'true'),
	(4,'2019-10-01 02:44:48','1-800 Medicare','US',NULL,NULL,NULL,'true'),
	(5,'2019-10-01 02:44:48','American National Insurance Company','US',NULL,NULL,NULL,'true'),
	(6,'2019-10-01 02:44:48','American Family Insurance','US',NULL,NULL,NULL,'true'),
	(7,'2019-10-01 02:44:48','Amerigroup','US',NULL,NULL,NULL,'true'),
	(8,'2019-10-01 02:44:48','Anthem','US',NULL,NULL,NULL,'true'),
	(9,'2019-10-01 02:44:48','Black Bear Life','US',NULL,NULL,NULL,'true'),
	(10,'2019-10-01 02:44:48','Aspen Dental','US',NULL,NULL,NULL,'true'),
	(11,'2019-10-01 02:44:48','Blue Cross and Blue Shield Association','US',NULL,NULL,NULL,'true'),
	(12,'2019-10-01 02:44:48','CareSource','US',NULL,NULL,NULL,'true'),
	(13,'2019-10-01 02:44:48','Cambia Health Solutions','US',NULL,NULL,NULL,'true'),
	(14,'2019-10-01 02:44:48','Centene Corporation','US',NULL,NULL,NULL,'true'),
	(15,'2019-10-01 02:44:48','Cigna','US',NULL,NULL,NULL,'true'),
	(16,'2019-10-01 02:44:48','Cigna Health Spring','US',NULL,NULL,NULL,'true'),
	(17,'2019-10-01 02:44:48','Coalition for Health Insurance Choices','US',NULL,NULL,NULL,'true'),
	(18,'2019-10-01 02:44:49','Coventry Health Care','US',NULL,NULL,NULL,'true'),
	(19,'2019-10-01 02:44:49','Delta Dental','US',NULL,NULL,NULL,'true'),
	(20,'2019-10-01 02:44:49','EmblemHealth','US',NULL,NULL,NULL,'true'),
	(21,'2019-10-01 02:44:49','Fortis','US',NULL,NULL,NULL,'true'),
	(22,'2019-10-01 02:44:49','Golden Rule Insurance Company','US',NULL,NULL,NULL,'true'),
	(23,'2019-10-01 02:44:49','Geisinger','US',NULL,NULL,NULL,'true'),
	(24,'2019-10-01 02:44:49','Group Health Cooperative','US',NULL,NULL,NULL,'true'),
	(25,'2019-10-01 02:44:49','Group Health Incorporated','US',NULL,NULL,NULL,'true'),
	(26,'2019-10-01 02:44:49','Health Net','US',NULL,NULL,NULL,'true'),
	(27,'2019-10-01 02:44:49','HealthPartners','US',NULL,NULL,NULL,'true'),
	(28,'2019-10-01 02:44:49','HealthSpring','US',NULL,NULL,NULL,'true'),
	(29,'2019-10-01 02:44:49','HealthMarkets','US',NULL,NULL,NULL,'true'),
	(30,'2019-10-01 02:44:49','Highmark','US',NULL,NULL,NULL,'true'),
	(31,'2019-10-01 02:44:49','Horace Mann Educators Corporation','US',NULL,NULL,NULL,'true'),
	(32,'2019-10-01 02:44:49','Humana','US',NULL,NULL,NULL,'true'),
	(33,'2019-10-01 02:44:49','Independence Blue Cross','US',NULL,NULL,NULL,'true'),
	(34,'2019-10-01 02:44:49','Kaiser Permanente','US',NULL,NULL,NULL,'true'),
	(35,'2019-10-01 02:44:49','Kaleida Health','US',NULL,NULL,NULL,'true'),
	(36,'2019-10-01 02:44:49','Liberty Medical','US',NULL,NULL,NULL,'true'),
	(37,'2019-10-01 02:44:50','Mass Health Insurance','US',NULL,NULL,NULL,'true'),
	(38,'2019-10-01 02:44:50','Med4Home','US',NULL,NULL,NULL,'true'),
	(39,'2019-10-01 02:44:50','Medica','US',NULL,NULL,NULL,'true'),
	(40,'2019-10-01 02:44:50','LifeWise Health Plan of Oregon','US',NULL,NULL,NULL,'true'),
	(41,'2019-10-01 02:44:50','Medical Mutual of Ohio','US',NULL,NULL,NULL,'true'),
	(42,'2019-10-01 02:44:50','MEGA Life and Health Insurance','US',NULL,NULL,NULL,'true'),
	(43,'2019-10-01 02:44:50','Molina Healthcare','US',NULL,NULL,NULL,'true'),
	(44,'2019-10-01 02:44:50','Oscar Health','US',NULL,NULL,NULL,'true'),
	(45,'2019-10-01 02:44:50','Oxford Health Plans','US',NULL,NULL,NULL,'true'),
	(46,'2019-10-01 02:44:50','Premera Blue Cross','US',NULL,NULL,NULL,'true'),
	(47,'2019-10-01 02:44:50','Principal Financial Group','US',NULL,NULL,NULL,'true'),
	(48,'2019-10-01 02:44:50','Shelter Insurance','US',NULL,NULL,NULL,'true'),
	(49,'2019-10-01 02:44:50','State Farm','US',NULL,NULL,NULL,'true'),
	(50,'2019-10-01 02:44:50','Thrivent Financial for Lutherans','US',NULL,NULL,NULL,'true'),
	(51,'2019-10-01 02:44:50','UnitedHealth Group','US',NULL,NULL,NULL,'true'),
	(52,'2019-10-01 02:44:50','Unitrin','US',NULL,NULL,NULL,'true'),
	(53,'2019-10-01 02:44:50','Universal American Corporation','US',NULL,NULL,NULL,'true'),
	(54,'2019-10-01 02:44:50','US Health Group','US',NULL,NULL,NULL,'true'),
	(55,'2019-10-01 02:44:51','Vantage Health Plan','US',NULL,NULL,NULL,'true'),
	(56,'2019-10-01 02:44:51','West Suburban Assurance LLC','US',NULL,NULL,NULL,'true'),
	(57,'2019-10-01 02:44:51','WellCare','US',NULL,NULL,NULL,'true'),
	(58,'2019-10-01 02:46:08','Bankers Life and Casualty','US',NULL,NULL,NULL,'true'),
	(59,'2019-10-01 02:46:42','Conseco','US',NULL,NULL,NULL,'true'),
	(60,'2019-10-01 02:46:55','Fidelis Care','US',NULL,NULL,NULL,'true'),
	(61,'2019-10-01 02:47:25','Mutual of Omaha','US',NULL,NULL,NULL,'true'),
	(62,'2019-10-01 02:48:02','United American Insurance Company','US',NULL,NULL,NULL,'true');

/*!40000 ALTER TABLE `medinsurancecompanies` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
