-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 15, 2020 at 07:43 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medhack_dev`
--

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `recorded` double DEFAULT NULL,
  `missed` double DEFAULT NULL,
  `processedBy` varchar(255) DEFAULT NULL,
  `procedureKey` varchar(255) DEFAULT NULL,
  `priceKey` varchar(255) DEFAULT NULL,
  `hospitalName` varchar(255) DEFAULT NULL,
  `rId` double DEFAULT NULL,
  `totalItems` double DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`id`, `filename`, `recorded`, `missed`, `processedBy`, `procedureKey`, `priceKey`, `hospitalName`, `rId`, `totalItems`, `comment`, `createdAt`, `updatedAt`) VALUES
(1, '106540816_CDM_2018.csv', 13351, 41, 'ByKeyName', NULL, NULL, NULL, NULL, 21178, 'No comment for now!!', '2020-01-15 05:51:23', '2020-01-15 05:51:23'),
(2, 'AlaskaNativeMedicalCenter_Masterchargesheet.csv', 42599, 0, 'ByHuman', 'Billing Description', 'CDM Price', 'Alaska Native Medical Center', 300, 42599, 'No comment for now!!', '2020-01-15 05:52:05', '2020-01-15 05:52:05'),
(3, 'AndalusiaRegionalHospital_ChargeList_AL.csv', 250, 0, 'ByHuman', 'DRG', 'Total', 'Andalusia Regional Hospital', 323, 250, 'No comment for now!!', '2020-01-15 05:52:09', '2020-01-15 05:52:09'),
(4, 'AtmoreCommunityHospital_AverageChargeDRG_AL.csv', 193, 0, 'ByHuman', 'Atmore MS DRG DESC2', 'Average of TOTAL CHARGES2', 'Atmore Community Hospital', 324, 193, 'No comment for now!!', '2020-01-15 05:52:16', '2020-01-15 05:52:16'),
(5, 'AtmoreCommunityHospital_ChargeMaster_AL.csv', 42639, 0, 'ByKeyName', 'Description', 'Price', NULL, NULL, 42640, 'No comment for now!!', '2020-01-15 05:52:22', '2020-01-15 05:52:22'),
(6, 'BaptistMedicalCenterEast_OtherCharges_AL.csv', 1426, 0, 'ByKeyName', 'Standard Charge Description', 'Charge as of 1', NULL, NULL, 1426, 'No comment for now!!', '2020-01-15 05:52:33', '2020-01-15 05:52:33'),
(7, 'BaptistMedicalCenterEast_Pharmacy_AL.csv', 646, 0, 'ByKeyName', 'Standard Charge Description', 'Charge as of 1', NULL, NULL, 646, 'No comment for now!!', '2020-01-15 05:52:36', '2020-01-15 05:52:36'),
(8, 'BaptistMedicalCenterEast_Radiology_AL.csv', 450, 0, 'ByKeyName', 'Standard Charge Description', 'Charge as of 1', NULL, NULL, 450, 'No comment for now!!', '2020-01-15 05:52:40', '2020-01-15 05:52:40'),
(9, 'BartlettRegionalHospital_DRGChargesheet.csv', 292, 1, 'ByKeyName', 'Diagnosis Related Group (DRG)', NULL, NULL, NULL, 295, 'No comment for now!!', '2020-01-15 05:52:44', '2020-01-15 05:52:44'),
(10, 'BartlettRegionalHospital_Masterchargesheet.csv', 8019, 3, 'ByKeyName', NULL, NULL, NULL, NULL, 8022, 'No comment for now!!', '2020-01-15 05:52:48', '2020-01-15 05:52:48'),
(11, 'BearLakeMemorialHospital_ChargeMaster_ID.csv', 7235, 0, 'ByHuman', 'IVDESC', 'IVPRICE1', 'Bear Lake Memorial Hospital', 322, 7236, 'No comment for now!!', '2020-01-15 05:53:06', '2020-01-15 05:53:06'),
(12, 'BeebeHealthcare_InPatientMasterchargesheet..csv', 398, 0, 'ByKeyName', 'DRG Description', 'Average Charge for each Inpatient  Admission', NULL, NULL, 398, 'No comment for now!!', '2020-01-15 05:53:09', '2020-01-15 05:53:09'),
(13, 'BinghamHospital_ChargeMaster_ID.csv', 6260, 0, 'ByKeyName', 'Description', 'Price', NULL, NULL, 6260, 'No comment for now!!', '2020-01-15 05:53:24', '2020-01-15 05:53:24'),
(14, 'BoundaryHospital_ChargeMaster_ID.csv', 2750, 0, 'ByHuman', 'DESCRIPTION', 'CHARGE', 'Boundary Community Hospital', 276, 2750, 'No comment for now!!', '2020-01-15 05:53:31', '2020-01-15 05:53:31'),
(15, 'BrookwoodBaptistMedicalCenter_ChargePart1_AL.csv', 4105, 0, 'ByHuman', 'TECHNICAL DESCRIPTION', 'TOTAL CHARGE', 'Brookwood Medical Center', 327, 4105, 'No comment for now!!', '2020-01-15 05:53:38', '2020-01-15 05:53:38'),
(16, 'BrookwoodBaptistMedicalCenter_ChargePart2_AL.csv', 4105, 0, 'ByKeyName', 'TECHNICAL DESCRIPTION', 'TOTAL CHARGE', NULL, NULL, 4105, 'No comment for now!!', '2020-01-15 05:53:41', '2020-01-15 05:53:41'),
(17, 'Citizens-baptist-medical-center-AverageChargepart1_AL.csv', 4998, 0, 'ByHuman', 'Description', 'Price', 'Citizens Baptist Medical Center', 332, 4998, 'No comment for now!!', '2020-01-15 05:54:13', '2020-01-15 05:54:13'),
(18, 'ClearwaterHospital _ChargeMaster_ID.csv', 4269, 3, 'ByHuman', 'Description', 'Charge $', 'Clearwater Valley Hospital ', 279, 4274, 'No comment for now!!', '2020-01-15 05:54:21', '2020-01-15 05:54:21'),
(19, 'coosa valley medical center_InpatientAverageofChargesbyDRG_AL.csv', 307, 0, 'ByHuman', 'DRG_DESCRIPTION', 'AVERAGE CHARGE', 'Coosa Valley Medical center', 349, 307, 'No comment for now!!', '2020-01-15 05:54:24', '2020-01-15 05:54:24'),
(20, 'Copy of Keefe Memorial Hospital_Chargemaster_CO.csv', 2902, 0, 'ByHuman', 'IVDESC', 'IVPRICE1', 'Keefe Memorial Hospital', 396, 2902, 'No comment for now!!', '2020-01-15 05:54:30', '2020-01-15 05:54:30'),
(21, 'Crenshaw Community Hospital_ChargeMasterList2018_AL.csv', 3104, 0, 'ByHuman', 'ITEM DESCRIPTION', 'PRICE', 'Crenshaw Community Hospital', 352, 3104, 'No comment for now!!', '2020-01-15 05:54:40', '2020-01-15 05:54:40'),
(22, 'Dale Medical Center_Chargemaster_AL.csv', 8978, 0, 'ByKeyName', 'ITEM DESCRIPTION', 'ITEM PRICE', NULL, NULL, 8978, 'No comment for now!!', '2020-01-15 05:54:55', '2020-01-15 05:54:55'),
(23, 'Decatur Morgan Hospital_ChargeMaster_AL.csv', 10637, 3, 'ByHuman', NULL, NULL, NULL, NULL, 10640, 'No comment for now!!', '2020-01-15 05:55:07', '2020-01-15 05:55:07'),
(24, 'DeKalb Regional Medical Center_ChargeMaster_AL.csv', 3342, 0, 'ByKeyName', 'Chargemaster Description', 'Chargemaster Description', NULL, NULL, 3342, 'No comment for now!!', '2020-01-15 05:55:15', '2020-01-15 05:55:15'),
(25, 'DW McMillan Memorial Hospital_DRGAvgCharge2_AL.csv', 214, 0, 'ByKeyName', 'DRG Description', 'Average Charge', NULL, NULL, 214, 'No comment for now!!', '2020-01-15 05:55:22', '2020-01-15 05:55:22'),
(26, 'DW McMillan Memorial Hospital_Pharmacy_AL.csv', 2074, 0, 'ByKeyName', 'SVC Description', 'Charge AMT', NULL, NULL, 2074, 'No comment for now!!', '2020-01-15 05:55:25', '2020-01-15 05:55:25'),
(27, 'East Alabama Medical Center_DRGAverageCharge_AL.csv', 30, 0, 'ByHuman', 'DRG_DESC', 'Average of TOTAL_CHARGES', 'East Alabama Medical center', 351, 30, 'No comment for now!!', '2020-01-15 05:55:29', '2020-01-15 05:55:29'),
(28, 'East Morgan County Hospital_ChargeMaster_CO.csv', 11550, 0, 'ByHuman', 'Charge Description', 'Price', 'East Morgan County Hospital', 393, 11550, 'No comment for now!!', '2020-01-15 05:55:46', '2020-01-15 05:55:46'),
(29, 'FairbanksMemorialHospital_Chargemaster.csv', 8211, 0, 'ByKeyName', 'DESCRIPTION', 'CHARGE #', NULL, NULL, 8211, 'No comment for now!!', '2020-01-15 05:55:50', '2020-01-15 05:55:50'),
(30, 'Gadsden Regional Medical Center_ChargeMaster_AL.csv', 3388, 0, 'ByHuman', 'Description', 'PRICE1', 'Gadsden Regional Medical Center', 368, 3388, 'No comment for now!!', '2020-01-15 05:56:04', '2020-01-15 05:56:04'),
(31, 'Good Samaritan Medical Center_Chargemaster_CO.csv', 15969, 0, 'ByHuman', 'Procedure Description', 'Price', 'Good Samaritan Medical Center', 395, 15969, 'No comment for now!!', '2020-01-15 05:56:23', '2020-01-15 05:56:23'),
(32, 'GroveHill_Pricing2019_AL.csv', 2007, 0, 'ByHuman', 'DESC', '2019', 'Grove Hill Memorial Hospital', 366, 2007, 'No comment for now!!', '2020-01-15 05:56:32', '2020-01-15 05:56:32'),
(33, 'Hale County Hospital_chargemaster_AL.csv', 2167, 0, 'ByHuman', 'Description', 'Price', 'Hale County Hospital', 372, 2167, 'No comment for now!!', '2020-01-15 05:56:41', '2020-01-15 05:56:41'),
(34, 'Highlands Medical Center_ChargeMaster_AL.csv', 5202, 0, 'ByHuman', 'DESCRIPTION', 'CHARGE AMOUNT', 'Highlands Medical Center', 370, 5202, 'No comment for now!!', '2020-01-15 05:56:52', '2020-01-15 05:56:52'),
(35, 'hospital_ Boston Medical Center.csv', 15166, 2, 'ByKeyName', 'Charge Description', NULL, NULL, NULL, 15271, 'No comment for now!!', '2020-01-15 05:57:00', '2020-01-15 05:57:00'),
(36, 'hospital_ Johns Hopkins Medicine.csv', 40452, 0, 'ByKeyName', 'Description', 'Fee', NULL, NULL, 40452, 'No comment for now!!', '2020-01-15 05:57:11', '2020-01-15 05:57:11'),
(37, 'hospital_ Kindred Hospital Las Vegas.csv', 943, 0, 'ByKeyName', 'DESCRIPTION', 'STD AMOUNT', NULL, NULL, 943, 'No comment for now!!', '2020-01-15 05:57:14', '2020-01-15 05:57:14'),
(38, 'hospital_AH_Pricing_Bakersfield.csv', 11749, 0, 'ByHuman', 'Charge Code Description', 'June 2019 Prices', 'Adventist Health Bakersfield', 84, 11749, 'No comment for now!!', '2020-01-15 05:57:32', '2020-01-15 05:57:32'),
(39, 'hospital_AlaskaNativeCDM.csv', 42599, 0, 'ByHuman', 'Billing Description', 'CDM Price', 'Alaska Native Medical Center', 170, 42599, 'No comment for now!!', '2020-01-15 05:58:09', '2020-01-15 05:58:09'),
(40, 'hospital_Alta-Bates-Summit-Medical-Center.csv', 6133, 0, 'ByHuman', 'Billing Desc', 'Current Inpatient Price', 'Alta Bates Summit Medical Center', 86, 6144, 'No comment for now!!', '2020-01-15 05:58:17', '2020-01-15 05:58:17'),
(41, 'hospital_Alvarado-Hospital.csv', 1036, 0, 'ByHuman', 'Procedure Name', 'Price', 'Alvarado Hospital', 87, 1036, 'No comment for now!!', '2020-01-15 05:58:22', '2020-01-15 05:58:22'),
(42, 'hospital_arkansaschildren_shospital_Mastercharge_AR.csv', 7881, 3, 'ByKeyName', 'Procedure Description', 'Unit Price', NULL, NULL, 7898, 'No comment for now!!', '2020-01-15 05:58:29', '2020-01-15 05:58:29'),
(43, 'hospital_Banner-Lassen-Medical-Center.csv', 9639, 0, 'ByHuman', 'Charge Description', 'Price', 'Banner Lassen Medical Center', 95, 9639, 'No comment for now!!', '2020-01-15 05:58:56', '2020-01-15 05:58:56'),
(44, 'hospital_Barstow-Community-Hospital.csv', 3335, 0, 'ByHuman', 'Description', 'Price', 'Barstow Community Hospital', 96, 3335, 'No comment for now!!', '2020-01-15 05:59:05', '2020-01-15 05:59:05'),
(45, 'hospital_Bartlett Regional Hospital.csv', 8019, 3, 'ByHuman', NULL, NULL, NULL, NULL, 8022, 'No comment for now!!', '2020-01-15 05:59:15', '2020-01-15 05:59:15'),
(46, 'hospital_BeverlyHospital.csv', 63837, 0, 'ByHuman', 'Charge Description', 'Charge', 'Beverly Hospital', 114, 63837, 'No comment for now!!', '2020-01-15 06:00:18', '2020-01-15 06:00:18'),
(47, 'hospital_BVCH.csv', 1891, 0, 'ByHuman', 'ITEMDESC', 'ITEMPRICE', 'Bear Valley Community Hospital', 108, 1891, 'No comment for now!!', '2020-01-15 06:00:23', '2020-01-15 06:00:23'),
(48, 'hospital_cardondelet-st-josephs-hospital.csv', 2998, 3999, 'ByHuman', NULL, NULL, NULL, NULL, 6997, 'No comment for now!!', '2020-01-15 06:00:33', '2020-01-15 06:00:33'),
(49, 'hospital_choaEgleston_Mastercharge_GA.csv', 37191, 662, 'ByKeyName', NULL, NULL, NULL, NULL, 37853, 'No comment for now!!', '2020-01-15 06:00:51', '2020-01-15 06:00:51'),
(50, 'hospital_choaHughesSpalding_Mastercharge_GA.csv', 37191, 662, 'ByHuman', NULL, NULL, NULL, NULL, 37853, 'No comment for now!!', '2020-01-15 06:01:26', '2020-01-15 06:01:26'),
(51, 'hospital_choaScottishRite_Mastercharge_GA.csv', 37191, 662, 'ByHuman', NULL, NULL, NULL, NULL, 37853, 'No comment for now!!', '2020-01-15 06:01:59', '2020-01-15 06:01:59'),
(52, 'hospital_Cooper University.csv', 8809, 0, 'ByKeyName', 'Description', 'Unit Price', NULL, NULL, 8815, 'No comment for now!!', '2020-01-15 06:02:07', '2020-01-15 06:02:07'),
(53, 'hospital_Cooper-CM-list.csv', 8809, 0, 'ByHuman', 'Description', 'Unit Price', 'Cooper University Hospital', 18, 8815, 'No comment for now!!', '2020-01-15 06:02:17', '2020-01-15 06:02:17'),
(54, 'hospital_Doctors Hospital of Manteca.csv', 4998, 0, 'ByHuman', 'BILLING DESCRIPTION', 'HOSPITAL CHARGE', 'Doctors Hospital - Manteca', 77, 4998, 'No comment for now!!', '2020-01-15 06:02:29', '2020-01-15 06:02:29'),
(55, 'hospital_Dominican Hospital.csv', 9924, 0, 'ByHuman', 'CDMDSC', 'NEWPRICE', 'Dominican Santa Cruz Hospital', 80, 9924, 'No comment for now!!', '2020-01-15 06:02:44', '2020-01-15 06:02:44'),
(56, 'hospital_DRMC.csv', 6690, 0, 'ByHuman', 'CHARGE', 'Price', 'Delano Regional Medical Center', 131, 6690, 'No comment for now!!', '2020-01-15 06:02:53', '2020-01-15 06:02:53'),
(57, 'hospital_Duke University Hospital.csv', 105026, 0, 'ByHuman', 'Description', 'Uninsured', 'Duke University Hospital', 22, 105026, 'No comment for now!!', '2020-01-15 06:04:25', '2020-01-15 06:04:25'),
(58, 'hospital_Emanuel Medical Center.csv', 6268, 0, 'ByHuman', 'BILLING DESCRIPTION', 'CHARGE', 'Emanuel Medical Center', 104, 6268, 'No comment for now!!', '2020-01-15 06:04:55', '2020-01-15 06:04:55'),
(59, 'hospital_Firelands-Regional-Medical-Center.csv', 9188, 0, 'ByHuman', 'Name', 'Std Price', 'Firelands Regional Medical Center', 138, 9188, 'No comment for now!!', '2020-01-15 06:05:10', '2020-01-15 06:05:10'),
(60, 'hospital_Fountain Valley Regional.csv', 9624, 0, 'ByHuman', 'BILLING DESCRIPTION', 'HOSPITAL CHARGE', 'Fountain Valley Regional Hospital	', 126, 9624, 'No comment for now!!', '2020-01-15 06:05:29', '2020-01-15 06:05:29'),
(61, 'hospital_HCMC.csv', 53415, 0, 'ByHuman', 'Item Description', 'Price', 'Providence Holy Cross Medical Center', 83, 53415, 'No comment for now!!', '2020-01-15 06:06:59', '2020-01-15 06:06:59'),
(62, 'hospital_Henry Mayo Newhall.csv', 16953, 0, 'ByHuman', 'Procedure Desc', 'Charges', 'Henry Mayo Newhall Memorial Hospital', 155, 16953, 'No comment for now!!', '2020-01-15 06:07:22', '2020-01-15 06:07:22'),
(63, 'hospital_Henry-Ford- hospital.csv', 8090, 0, 'ByHuman', 'Description', 'Total Price', 'Henry Ford Hospital', 30, 8090, 'No comment for now!!', '2020-01-15 06:07:32', '2020-01-15 06:07:32'),
(64, 'hospital_Huntsville.csv', 11980, 0, 'ByHuman', 'Charge', 'Unit Price', 'Huntsville Hospital', 46, 11980, 'No comment for now!!', '2020-01-15 06:08:15', '2020-01-15 06:08:15'),
(65, 'hospital_Jackson Memorial.csv', 12631, 12722, 'ByHuman', NULL, NULL, NULL, NULL, 25353, 'No comment for now!!', '2020-01-15 06:08:37', '2020-01-15 06:08:37'),
(66, 'hospital_Jerold Phelps Community.csv', 1943, 0, 'ByHuman', 'Description', NULL, NULL, NULL, 1955, 'No comment for now!!', '2020-01-15 06:08:43', '2020-01-15 06:08:43'),
(67, 'hospital_John F Kennedy Memorial Hospital.csv', 5540, 0, 'ByHuman', 'BILLING DESCRIPTION', 'HOSPITAL CHARGE', 'John F Kennedy Memorial Hospital', 180, 5540, 'No comment for now!!', '2020-01-15 06:08:55', '2020-01-15 06:08:55'),
(68, 'hospital_John Muir Behavioral Health.csv', 4129, 3314, 'ByHuman', NULL, NULL, NULL, NULL, 7622, 'No comment for now!!', '2020-01-15 06:09:03', '2020-01-15 06:09:03'),
(69, 'hospital_Keokuk Health Systems.csv', 2277, 0, 'ByKeyName', 'Procedure Description', 'Charge Amount', NULL, NULL, 2277, 'No comment for now!!', '2020-01-15 06:09:18', '2020-01-15 06:09:18'),
(70, 'hospital_Kindred Hospital.csv', 17345, 1, 'ByHuman', NULL, NULL, NULL, NULL, 17346, 'No comment for now!!', '2020-01-15 06:09:43', '2020-01-15 06:09:43'),
(71, 'hospital_Lake Huron Medical Center.csv', 1342, 0, 'ByKeyName', 'Procedure Name', 'Procedure Price', NULL, NULL, 1342, 'No comment for now!!', '2020-01-15 06:09:54', '2020-01-15 06:09:54'),
(72, 'hospital_Lakewood Regional Medical.csv', 6368, 0, 'ByHuman', 'BILLING DESCRIPTION', 'HOSPITAL CHARGE', 'Lakewood Regional Medical Center', 191, 6368, 'No comment for now!!', '2020-01-15 06:10:04', '2020-01-15 06:10:04'),
(73, 'hospital_LittletonAdventistHospital.csv', 3637, 0, 'ByHuman', 'Description', 'Standard Charge', 'Littleton Adventist Hospital', 246, 3637, 'No comment for now!!', '2020-01-15 06:10:10', '2020-01-15 06:10:10'),
(74, 'hospital_LongmontUnitedHospital_Chargemaster.csv', 3199, 0, 'ByHuman', 'Description', 'Standard Charge', 'Longmont United Hospital', 247, 3199, 'No comment for now!!', '2020-01-15 06:10:23', '2020-01-15 06:10:23'),
(75, 'hospital_losrobleshospital__medicalcenter.csv', 37553, 66, 'ByKeyName', 'Description', 'Amount', NULL, NULL, 37619, 'No comment for now!!', '2020-01-15 06:10:29', '2020-01-15 06:10:29'),
(76, 'hospital_michiganmedicine.csv', 5756, 0, 'ByHuman', 'Standard Hospital Charge', 'Unit Price', 'Michigan Medicine', 69, 5799, 'No comment for now!!', '2020-01-15 06:10:41', '2020-01-15 06:10:41'),
(77, 'hospital_Montefiore-Medical-Center.csv', 40800, 0, 'ByKeyName', 'Procedure', 'Charge', NULL, NULL, 40800, 'No comment for now!!', '2020-01-15 06:10:51', '2020-01-15 06:10:51'),
(78, 'hospital_Nell J. Redfield Memorial Hospital.csv', 4702, 1, 'ByHuman', 'CHARGE DESCRIPTION', 'PRICE', 'Oneida County Hospital Id', 206, 4703, 'No comment for now!!', '2020-01-15 06:11:28', '2020-01-15 06:11:28'),
(79, 'hospital_northwestern-medicine-central-dupage-hospital.csv', 5224, 0, 'ByHuman', 'Service', 'Price', 'Central DuPage Hospital', 17, 5224, 'No comment for now!!', '2020-01-15 06:11:36', '2020-01-15 06:11:36'),
(80, 'hospital_nyu_langone.csv', 16410, 10, 'ByHuman', NULL, NULL, NULL, NULL, 16420, 'No comment for now!!', '2020-01-15 06:11:53', '2020-01-15 06:11:53'),
(81, 'hospital_oumedicine.csv', 57914, 0, 'ByHuman', 'Charge Description', 'Charge Amount', 'OU Medicine', 66, 57914, 'No comment for now!!', '2020-01-15 06:12:44', '2020-01-15 06:12:44'),
(82, 'hospital_Our-Lady-of-the-Lake-Regional-Medical-Center.csv', 690, 0, 'ByHuman', 'DRG_NAME', 'AVG_CHGS', 'Our Lady of the Lake Regional Medical Center', 238, 690, 'No comment for now!!', '2020-01-15 06:12:48', '2020-01-15 06:12:48'),
(83, 'hospital_ozarkscommunityhospital_Mastercharge_AR.csv', 373, 0, 'ByHuman', 'DESCRIPTION', 'AMOUNT', 'Ozarks Community Hospital', 298, 373, 'No comment for now!!', '2020-01-15 06:12:52', '2020-01-15 06:12:52'),
(84, 'hospital_ParkerAdventistHospital_Chargemaster.csv', 3621, 0, 'ByHuman', 'Description', 'Standard Charge', 'Parker Adventist Hospital', 248, 3621, 'No comment for now!!', '2020-01-15 06:12:58', '2020-01-15 06:12:58'),
(85, 'hospital_Pershing General Hospital.csv', 17, 0, 'ByKeyName', 'DESCRIPTION', 'CHARGE AMOUNT', NULL, NULL, 17, 'No comment for now!!', '2020-01-15 06:13:06', '2020-01-15 06:13:06'),
(86, 'hospital_phoebeputneymemorialhospital_mastercharge_GA.csv', 3780, 0, 'ByHuman', 'Name', 'Std Price', 'Phoebe Putney Memorial Hospital', 450, 3780, 'No comment for now!!', '2020-01-15 06:13:12', '2020-01-15 06:13:12'),
(87, 'hospital_PiedmontHealthcare_Mastercharge_GA.csv', 60861, 0, 'ByHuman', 'Description', 'Price', 'Piedmont Athens Regional', 355, 60861, 'No comment for now!!', '2020-01-15 06:14:06', '2020-01-15 06:14:06'),
(88, 'hospital_St.Mary_s-Medical-Center(Huntington).csv', 8967, 0, 'ByKeyName', 'Description', 'Department - Charge Category', NULL, NULL, 8967, 'No comment for now!!', '2020-01-15 06:15:04', '2020-01-15 06:15:04'),
(89, 'hospital_StJosephsCandler _Mastercharge_GA.csv', 12962, 1, 'ByHuman', NULL, NULL, NULL, NULL, 12963, 'No comment for now!!', '2020-01-15 06:15:24', '2020-01-15 06:15:24'),
(90, 'hospital_Temecula Valley.csv', 35143, 0, 'ByKeyName', 'DISPENSED DESCRIPTION', 'PRICE', NULL, NULL, 35301, 'No comment for now!!', '2020-01-15 06:15:52', '2020-01-15 06:15:52'),
(91, 'hospital_Torrance Memorial Medical Center.csv', 26450, 0, 'ByHuman', 'LONG DESCRIPTION', 'TMMC Standard Price Schedule', 'Torrance Memorial Medical Center', 202, 26454, 'No comment for now!!', '2020-01-15 06:16:18', '2020-01-15 06:16:18'),
(92, 'hospital_Tulare Regional Medical Center.csv', 21144, 34, 'ByHuman', NULL, NULL, NULL, NULL, 21178, 'No comment for now!!', '2020-01-15 06:16:48', '2020-01-15 06:16:48'),
(93, 'hospital_Twin Cities Community.csv', 5660, 0, 'ByKeyName', 'BILLING DESCRIPTION', 'HOSPITAL CHARGE', NULL, NULL, 5660, 'No comment for now!!', '2020-01-15 06:16:53', '2020-01-15 06:16:53'),
(94, 'hospital_UAMSMedicalCenter_Mastercharge_AR.csv', 38495, 0, 'ByHuman', 'Procedure Name', 'Charge', 'UAMS Medical Center', 333, 38495, 'No comment for now!!', '2020-01-15 06:17:26', '2020-01-15 06:17:26'),
(95, 'hospital_UCSF Medical Center.csv', 7969, 0, 'ByHuman', 'General Description', 'Charge', 'UCSF Medical Center', 198, 7969, 'No comment for now!!', '2020-01-15 06:17:36', '2020-01-15 06:17:36'),
(96, 'hospital_UMassMemorialHealthCare.csv', 33745, 0, 'ByHuman', 'Description', 'Fee', 'UMass Memorial Health Care', 70, 33745, 'No comment for now!!', '2020-01-15 06:18:08', '2020-01-15 06:18:08'),
(97, 'hospital_University of California Davis Medical Center.csv', 2836, 0, 'ByKeyName', 'Charge Description', ' Inpatient \nPrice ', 'University of California Davis Medical Center', 197, 2836, 'No comment for now!!', '2020-01-15 06:18:23', '2020-01-15 06:18:23'),
(98, 'hospital_universityofminnesota_medicalcenter.csv', 59910, 0, 'ByHuman', 'Description', '2019 Price', 'University of Minnesota Medical Center', 68, 59910, 'No comment for now!!', '2020-01-15 06:19:19', '2020-01-15 06:19:19'),
(99, 'hospital_universityofPittsburgh_medicalcenter.csv', 9322, 1333, 'ByHuman', NULL, NULL, NULL, NULL, 10655, 'No comment for now!!', '2020-01-15 06:19:30', '2020-01-15 06:19:30'),
(100, 'hospital_university_ofvirginiamedicalcenter.csv', 667, 0, 'ByHuman', 'Description', 'Median Price', 'University of Virginia Medical Center', 62, 667, 'No comment for now!!', '2020-01-15 06:19:38', '2020-01-15 06:19:38'),
(101, 'hospital_vanderbilt_universitymedicalcenter.csv', 4205, 0, 'ByHuman', 'Description', 'Price', 'Vanderbilt University Medical Center', 60, 4205, 'No comment for now!!', '2020-01-15 06:20:03', '2020-01-15 06:20:03'),
(102, 'hospital_VCU_medicalcenter.csv', 24929, 10443, 'ByHuman', NULL, NULL, NULL, NULL, 35373, 'No comment for now!!', '2020-01-15 06:20:31', '2020-01-15 06:20:31'),
(103, 'hospital_Wake-Forest-Baptist-Medical-Center.csv', 17637, 0, 'ByHuman', 'Description', 'Charge Patient Pay', 'Wake Forest Baptist Medical Center', 50, 17637, 'No comment for now!!', '2020-01-15 06:21:03', '2020-01-15 06:21:03'),
(104, 'hospital_westchester_medicalcenter.csv', 11424, 1, 'ByHuman', 'Hospital Service', 'Price', 'Westchester Medical Center', 12, 11425, 'No comment for now!!', '2020-01-15 06:21:32', '2020-01-15 06:21:32'),
(105, 'hospital_Zuckerberg San Francisco General Hospital and Trauma Center.csv', 45039, 0, 'ByHuman', 'Service Description', 'Hospital Charge', 'Zuckerberg San Francisco General Hospital and Trauma Center', 117, 45609, 'No comment for now!!', '2020-01-15 06:22:23', '2020-01-15 06:22:23'),
(106, 'Jackson hospital_chargemasterdetail_AL.csv', 11689, 0, 'ByHuman', 'Charge Desc', 'Charge Amt', 'Jackson Hospital', 369, 11689, 'No comment for now!!', '2020-01-15 06:22:36', '2020-01-15 06:22:36'),
(107, 'Jackson Hospital_Drgfile_AL.csv', 673, 0, 'ByKeyName', 'DRGDESC', 'AVERAGECHARGE', NULL, NULL, 673, 'No comment for now!!', '2020-01-15 06:22:40', '2020-01-15 06:22:40'),
(108, 'JohnDempseyHospital_ChargeMaster_CT.csv', 3901, 0, 'ByHuman', 'Procedure Description', 'Unit Price', 'UConn John Dempsey Hospital', 320, 3901, 'No comment for now!!', '2020-01-15 06:22:47', '2020-01-15 06:22:47'),
(109, 'Kindred Hospital Denver_StandardCharges_CO.csv', 868, 0, 'ByHuman', 'DESCRIPTION', 'STD AMOUNT', 'Kindred Hospital Denver', 394, 868, 'No comment for now!!', '2020-01-15 06:22:58', '2020-01-15 06:22:58'),
(110, 'Madison Hospital_ChargeLevelPriceList_AL.csv', 11980, 0, 'ByHuman', 'Charge', 'Unit Price', 'Madison Hospital', 365, 11980, 'No comment for now!!', '2020-01-15 06:23:15', '2020-01-15 06:23:15'),
(111, 'Marshall Medical Center_ChargeDescriptionMaster_AL.csv', 8653, 0, 'ByHuman', 'Description', 'Charge', 'Marshall Medical Center North', 364, 8653, 'No comment for now!!', '2020-01-15 06:23:29', '2020-01-15 06:23:29'),
(112, 'Massachusetts_Eye_and_Ear_hospital charge listing2.csv', 79, 0, 'ByKeyName', 'DRG Description', 'Avg Chg', NULL, NULL, 79, 'No comment for now!!', '2020-01-15 06:23:32', '2020-01-15 06:23:32'),
(113, 'McLean_Hospital2.csv', 23, 0, 'ByKeyName', 'MCLEAN HOSPITAL DRG CHARGES', 'MCLEAN HOSPITAL DRG CHARGES', NULL, NULL, 23, 'No comment for now!!', '2020-01-15 06:23:40', '2020-01-15 06:23:40'),
(114, 'Medical Center Enterprise_ChargeMaster_AL.csv', 1822, 0, 'ByHuman', 'Description', 'PRICE1', 'Medical Center Enterprise', 371, 1822, 'No comment for now!!', '2020-01-15 06:23:45', '2020-01-15 06:23:45'),
(115, 'Medical_city_Dallas.csv', 711, 0, 'ByHuman', 'DRG_Long_Desc', 'Average_Charge_Per_Case', 'Medical City Dallas Hospital', 43, 711, 'No comment for now!!', '2020-01-15 06:23:49', '2020-01-15 06:23:49'),
(116, 'Mizell Memorial Hospital_StandardCharge_AL.csv', 192, 0, 'ByKeyName', 'DRG,Description,# Cases, Total Charges , Avg Charge/Case', 'DRG,Description,# Cases, Total Charges , Avg Charge/Case', NULL, NULL, 192, 'No comment for now!!', '2020-01-15 06:24:00', '2020-01-15 06:24:00'),
(117, 'Monroe County Hospital_Full-Chargemaster_AL.csv', 5502, 0, 'ByHuman', 'Description', 'Base Price', 'Monroe County Hospital', 361, 5502, 'No comment for now!!', '2020-01-15 06:24:09', '2020-01-15 06:24:09'),
(118, 'Nantucket_Cottage_Hospital2.csv', 104, 0, 'ByKeyName', 'NANTUCKET COTTAGE HOSPITAL DRG CHARGES', 'NANTUCKET COTTAGE HOSPITAL DRG CHARGES', NULL, NULL, 104, 'No comment for now!!', '2020-01-15 06:24:19', '2020-01-15 06:24:19'),
(119, 'Newton_Wellesley_Hospital2.csv', 489, 0, 'ByKeyName', 'NEWTON-WELLESLEY HOSPITAL DRG CHARGES', 'NEWTON-WELLESLEY HOSPITAL DRG CHARGES', NULL, NULL, 489, 'No comment for now!!', '2020-01-15 06:24:27', '2020-01-15 06:24:27'),
(120, 'North Baldwin Infirmary_ChargeMaster_AL.csv', 42637, 0, 'ByHuman', 'Description                             ', 'Price     ', 'North Baldwin Infirmary', 390, 42638, 'No comment for now!!', '2020-01-15 06:25:13', '2020-01-15 06:25:13'),
(121, 'North Baldwin Infirmary_ChargePerDRG_AL.csv', 285, 0, 'ByKeyName', 'North Baldwin MS DRG DESC2', 'Average of TOTAL CHARGES2', NULL, NULL, 285, 'No comment for now!!', '2020-01-15 06:25:16', '2020-01-15 06:25:16'),
(122, 'Northport Medical Center_Charges_AL.csv', 41238, 0, 'ByHuman', 'Item Description', 'Item Charge', 'Northport Medical Center', 388, 41238, 'No comment for now!!', '2020-01-15 06:26:06', '2020-01-15 06:26:06'),
(123, 'Northport Medical Center_Pharmacy.CDM_AL.csv', 7084, 0, 'ByKeyName', 'Item Description', 'Item Charge', NULL, NULL, 7084, 'No comment for now!!', '2020-01-15 06:26:10', '2020-01-15 06:26:10'),
(124, 'North_Shore_Medical_Center2.csv', 512, 0, 'ByKeyName', 'NORTH SHORE MEDICAL CENTER DRG CHARGES', 'NORTH SHORE MEDICAL CENTER DRG CHARGES', NULL, NULL, 512, 'No comment for now!!', '2020-01-15 06:26:21', '2020-01-15 06:26:21'),
(125, 'nortonsoundregionalhospital_Masterchargesheet.csv', 13562, 0, 'ByKeyName', 'Description', 'Department - Charge Category', NULL, NULL, 13566, 'No comment for now!!', '2020-01-15 06:26:29', '2020-01-15 06:26:29'),
(126, 'princeton baptist medical center_ChargesPart2_AL.csv', 5500, 0, 'ByKeyName', 'Description', 'Price', NULL, NULL, 5500, 'No comment for now!!', '2020-01-15 06:26:50', '2020-01-15 06:26:50'),
(127, 'princeton baptist medical center_ChargesPart3_AL.csv', 2500, 0, 'ByKeyName', 'Description', 'Price', NULL, NULL, 2500, 'No comment for now!!', '2020-01-15 06:26:54', '2020-01-15 06:26:54'),
(128, 'princeton baptist medical_ChargesPart1_AL.csv', 4498, 0, 'ByHuman', 'Description', 'Price', 'Princeton Baptist Medical Center', 379, 4498, 'No comment for now!!', '2020-01-15 06:27:01', '2020-01-15 06:27:01'),
(129, 'Riverview Regional Medical Center_AverageDRG_AL.csv', 367, 0, 'ByKeyName', 'MS-DRG Title', 'Average Charges', NULL, NULL, 367, 'No comment for now!!', '2020-01-15 06:27:13', '2020-01-15 06:27:13'),
(130, 'Riverview Regional Medical Center_StandardCharges_AL.csv', 1133, 0, 'ByHuman', 'Procedure Name', 'Procedure Price', 'Riverview Regional Medical Center', 387, 1133, 'No comment for now!!', '2020-01-15 06:27:17', '2020-01-15 06:27:17'),
(131, 'Robert_Wood_Johnson_University_Hospital.csv', 7494, 0, 'ByHuman', 'Description/FIM Description', 'Primary Price', 'Robert Wood Johnson University Hospital', 109, 7494, 'No comment for now!!', '2020-01-15 06:27:27', '2020-01-15 06:27:27'),
(132, 'Ronald_Reagan_UCLA_Medical_Center.csv', 7625, 0, 'ByHuman', 'Description', 'Standard Charge', 'Ronald Reagan UCLA Medical Center', 110, 7746, 'No comment for now!!', '2020-01-15 06:27:40', '2020-01-15 06:27:40'),
(133, 'Rush_University_Medical_Center.csv', 598, 0, 'ByHuman', NULL, 'Avg Charges', NULL, NULL, 599, 'No comment for now!!', '2020-01-15 06:27:52', '2020-01-15 06:27:52'),
(134, 'SaintFrancisHospital_ChargeMaster_CT.csv', 4414, 0, 'ByHuman', 'TECHNICAL DESCRIPTION', 'TOTAL CHARGE', 'Saint Francis Hospital', 317, 4414, 'No comment for now!!', '2020-01-15 06:28:07', '2020-01-15 06:28:07'),
(135, 'SamuelSimmondsMemorialHospital_MasterChargesheet.csv', 4746, 0, 'ByKeyName', 'Billing Description', 'CDM Price', NULL, NULL, 4746, 'No comment for now!!', '2020-01-15 06:28:11', '2020-01-15 06:28:11'),
(136, 'South Baldwin Regional Medical Center_ChargeMaster_AL.csv', 2634, 0, 'ByHuman', 'Description', 'PRICE1', 'South Baldwin Regional Medical Center', 385, 2634, 'No comment for now!!', '2020-01-15 06:28:32', '2020-01-15 06:28:32'),
(137, 'Southeast Alabama Medical Center_DRGpricing12.30.18_AL.csv', 642, 0, 'ByHuman', NULL, '2019 avg', NULL, NULL, 643, 'No comment for now!!', '2020-01-15 06:28:36', '2020-01-15 06:28:36'),
(138, 'SouthPeninsulaHospital_Masterchargesheet.csv', 12603, 0, 'ByHuman', 'IVDESC', 'Price', 'South Peninsula Hospital, Homer', 345, 12603, 'No comment for now!!', '2020-01-15 06:28:50', '2020-01-15 06:28:50'),
(139, 'StamfordHospital_ChargeMaster_CT.csv', 41890, 0, 'ByHuman', 'DESC.', 'CUR PRICE 12/2018', 'Stamford Hospital', 319, 41890, 'No comment for now!!', '2020-01-15 06:29:33', '2020-01-15 06:29:33'),
(140, 'The_Ohio_State_University_Wexner_Medical_Center.csv', 4015, 7, 'ByKeyName', NULL, NULL, NULL, NULL, 4022, 'No comment for now!!', '2020-01-15 06:29:44', '2020-01-15 06:29:44'),
(141, 'Thomas Hospital_AverageChargePerDRG_AL.csv', 531, 0, 'ByKeyName', 'Thomas MS DRG DESC2', 'Average of TOTAL CHARGES2', NULL, NULL, 531, 'No comment for now!!', '2020-01-15 06:29:48', '2020-01-15 06:29:48'),
(142, 'Thomas Hospital_ChargeMaster_AL.csv', 27666, 0, 'ByHuman', 'Description                             ', 'Price     ', 'Thomas Hospital', 383, 27667, 'No comment for now!!', '2020-01-15 06:30:20', '2020-01-15 06:30:20'),
(143, 'Wake_Forest_Baptist_Health.csv', 17637, 0, 'ByHuman', 'Description', 'Charge Patient Pay', 'North Carolina Baptist Hospital', 57, 17637, 'No comment for now!!', '2020-01-15 06:30:57', '2020-01-15 06:30:57'),
(144, 'walker baptist medical center_ChargePart1_AL.csv', 4498, 0, 'ByKeyName', 'Description', 'Price', NULL, NULL, 4498, 'No comment for now!!', '2020-01-15 06:31:01', '2020-01-15 06:31:01'),
(145, 'walker baptist medical center_ChargePart2_AL.csv', 4733, 0, 'ByHuman', 'Description', 'Price', 'Walker Baptist Medical Center', 381, 4733, 'No comment for now!!', '2020-01-15 06:31:09', '2020-01-15 06:31:09'),
(146, 'West-Jefferson-List-of-Charges.csv', 4830, 816, 'ByHuman', NULL, NULL, NULL, NULL, 5646, 'No comment for now!!', '2020-01-15 06:31:23', '2020-01-15 06:31:23'),
(147, 'YKHC_MasterChargesheet.csv', 3780, 0, 'ByHuman', 'Billing Description', 'CDM Price', 'Yukon-Kuskokwim Delta Regional Hospital', 346, 3780, 'No comment for now!!', '2020-01-15 06:31:30', '2020-01-15 06:31:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
