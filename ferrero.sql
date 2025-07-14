-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: ferrero
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `anno` year DEFAULT NULL,
  `filename` varchar(255) NOT NULL,
  `produzione_totale` int DEFAULT NULL,
  `fatturato_netto` int DEFAULT NULL,
  `dipendenti` int DEFAULT NULL,
  `emissioni_co2` int DEFAULT NULL,
  `consumo_acqua_totale` int DEFAULT NULL,
  `titolo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,2009,'2009.pdf',950000,6204000,21372,509902,4300000,'Le origini responsabili'),(2,2010,'2010.pdf',970000,6606000,22400,439616,4500000,'Qualità e comunità'),(3,2011,'2011.pdf',990000,7218,22850,406680,4650000,'Sostenibilità globale'),(4,2012,'2012.pdf',1010000,7800,22850,392023,4800000,'Crescita consapevole'),(5,2013,'2013.pdf',1050000,8100,24797,392023,4950000,'Grandi marchi, grandi valori'),(6,2014,'2014.pdf',1100000,8400,26000,389400,5050000,'Tradizione e futuro'),(7,2015,'2015.pdf',1207800,9542,25784,396185,4460000,'Sostenibilità misurata'),(8,2016,'2016.pdf',1290000,10200,30132,555702,4700000,'Filiera responsabile'),(9,2017,'2017.pdf',1350000,10500,32000,540481,4850000,'Persone e pianeta'),(10,2018,'2018.pdf',1450000,11000,34145,520000,5050000,'I 4 pilastri Ferrero'),(11,2019,'2019.pdf',1550000,11500,35500,500000,5250000,'Impatto positivo'),(12,2020,'2020.pdf',2042494,12300,36240,505902,5450191,'Azione e resilienza'),(13,2021,'2021.pdf',2150000,12700,38767,480000,5293591,'Crescita sostenibile'),(14,2022,'2022.pdf',2200000,14000,41441,478356,5396500,'Accelerare il cambiamento'),(15,2023,'2023.pdf',2300000,17000,47212,460000,5550000,'Espansione consapevole');
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-14 17:43:10
