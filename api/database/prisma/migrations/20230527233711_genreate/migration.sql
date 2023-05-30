/*
  Warnings:

  - You are about to drop the column `CEP` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `price_type` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `costumer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `day_of_week` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fairId,marketerId]` on the table `fair_marketers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnpj]` on the table `marketer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `marketer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[intent_payment_id]` on the table `order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cep` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityId` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `complemento` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhoodId` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uFId` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthday` to the `costumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genderId` to the `costumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthday` to the `deliveryman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genderId` to the `deliveryman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `fair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `fair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthday` to the `marketer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genderId` to the `marketer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `marketer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tent_name` to the `marketer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intent_payment_id` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_of_productId` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_of_productId` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `costumer_addresses` DROP FOREIGN KEY `costumer_addresses_addressId_fkey`;

-- DropForeignKey
ALTER TABLE `costumer_addresses` DROP FOREIGN KEY `costumer_addresses_costumerId_fkey`;

-- DropForeignKey
ALTER TABLE `fair_date_hour_of_work` DROP FOREIGN KEY `fair_date_hour_of_work_fairId_fkey`;

-- DropForeignKey
ALTER TABLE `fair_marketers` DROP FOREIGN KEY `fair_marketers_fairId_fkey`;

-- DropForeignKey
ALTER TABLE `fair_marketers` DROP FOREIGN KEY `fair_marketers_marketerId_fkey`;

-- DropForeignKey
ALTER TABLE `image_of_product` DROP FOREIGN KEY `image_of_product_imageId_fkey`;

-- DropForeignKey
ALTER TABLE `image_of_product` DROP FOREIGN KEY `image_of_product_productId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_costumer_addressesId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_deliverymanId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_shopping_listId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `payment_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_marketerId_fkey`;

-- DropForeignKey
ALTER TABLE `products_in_shopping_list` DROP FOREIGN KEY `products_in_shopping_list_shopping_listId_fkey`;

-- DropForeignKey
ALTER TABLE `shopping_list` DROP FOREIGN KEY `shopping_list_costumerId_fkey`;

-- AlterTable
ALTER TABLE `address` DROP COLUMN `CEP`,
    ADD COLUMN `cep` VARCHAR(191) NOT NULL,
    ADD COLUMN `cityId` INTEGER NOT NULL,
    ADD COLUMN `complemento` VARCHAR(191) NOT NULL,
    ADD COLUMN `default` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `locationId` INTEGER NOT NULL,
    ADD COLUMN `neighborhoodId` INTEGER NOT NULL,
    ADD COLUMN `uFId` INTEGER NOT NULL,
    MODIFY `logradouro` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `costumer` ADD COLUMN `birthday` VARCHAR(191) NOT NULL,
    ADD COLUMN `cpf` VARCHAR(13) NULL,
    ADD COLUMN `genderId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `day_of_week` ADD COLUMN `abbr` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `deliveryman` ADD COLUMN `avaliations` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `birthday` VARCHAR(191) NOT NULL,
    ADD COLUMN `genderId` INTEGER NOT NULL,
    ADD COLUMN `online` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `review` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `fair` ADD COLUMN `avaliations` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `locationId` INTEGER NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `image` ADD COLUMN `fairId` INTEGER NULL;

-- AlterTable
ALTER TABLE `marketer` ADD COLUMN `avaliations` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `birthday` VARCHAR(191) NOT NULL,
    ADD COLUMN `cnpj` VARCHAR(18) NULL,
    ADD COLUMN `cpf` VARCHAR(13) NULL,
    ADD COLUMN `genderId` INTEGER NOT NULL,
    ADD COLUMN `phone` VARCHAR(15) NOT NULL,
    ADD COLUMN `tent_name` VARCHAR(120) NOT NULL,
    MODIFY `review` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `intent_payment_id` VARCHAR(191) NOT NULL,
    MODIFY `deliverymanId` INTEGER NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `price_type`,
    ADD COLUMN `avaliations` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `category_of_productId` INTEGER NOT NULL,
    ADD COLUMN `description` VARCHAR(512) NOT NULL,
    ADD COLUMN `discount` DOUBLE NULL,
    ADD COLUMN `quantity` DOUBLE NULL,
    ADD COLUMN `review` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `type_of_productId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `products_in_shopping_list` ADD COLUMN `amount` INTEGER NULL;

-- CreateTable
CREATE TABLE `gender` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `gender_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `city` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `city_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `neighborhood` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `neighborhood_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `uf` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UF_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category_of_product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imageId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `category_of_product_name_key`(`name`),
    INDEX `category_of_product_imageId_fkey`(`imageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sale_off` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` DOUBLE NOT NULL,
    `productId` INTEGER NOT NULL,

    INDEX `sale_off_productId_fkey`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type_of_price` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `type_of_price_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `address_cityId_fkey` ON `address`(`cityId`);

-- CreateIndex
CREATE INDEX `address_neighborhoodId_fkey` ON `address`(`neighborhoodId`);

-- CreateIndex
CREATE INDEX `address_uFId_fkey` ON `address`(`uFId`);

-- CreateIndex
CREATE INDEX `address_locationId_fkey` ON `address`(`locationId`);

-- CreateIndex
CREATE UNIQUE INDEX `costumer_cpf_key` ON `costumer`(`cpf`);

-- CreateIndex
CREATE INDEX `costumer_genderId_fkey` ON `costumer`(`genderId`);

-- CreateIndex
CREATE UNIQUE INDEX `day_of_week_name_key` ON `day_of_week`(`name`);

-- CreateIndex
CREATE INDEX `deliveryman_genderId_fkey` ON `deliveryman`(`genderId`);

-- CreateIndex
CREATE INDEX `fair_locationId_fkey` ON `fair`(`locationId`);

-- CreateIndex
CREATE FULLTEXT INDEX `fair_name_idx` ON `fair`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `fair_marketers_fairId_marketerId_key` ON `fair_marketers`(`fairId`, `marketerId`);

-- CreateIndex
CREATE INDEX `image_fairId_fkey` ON `image`(`fairId`);

-- CreateIndex
CREATE UNIQUE INDEX `marketer_cnpj_key` ON `marketer`(`cnpj`);

-- CreateIndex
CREATE UNIQUE INDEX `marketer_cpf_key` ON `marketer`(`cpf`);

-- CreateIndex
CREATE INDEX `marketer_genderId_fkey` ON `marketer`(`genderId`);

-- CreateIndex
CREATE FULLTEXT INDEX `marketer_name_idx` ON `marketer`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `order_intent_payment_id_key` ON `order`(`intent_payment_id`);

-- CreateIndex
CREATE INDEX `product_category_of_productId_fkey` ON `product`(`category_of_productId`);

-- CreateIndex
CREATE INDEX `product_type_of_productId_fkey` ON `product`(`type_of_productId`);

-- CreateIndex
CREATE INDEX `product_name_description_idx` ON `product`(`name`, `description`);

-- CreateIndex
CREATE FULLTEXT INDEX `product_name_idx` ON `product`(`name`);

-- CreateIndex
CREATE FULLTEXT INDEX `product_description_idx` ON `product`(`description`);

-- CreateIndex
CREATE FULLTEXT INDEX `product_description_name_idx` ON `product`(`description`, `name`);

-- AddForeignKey
ALTER TABLE `costumer` ADD CONSTRAINT `costumer_genderId_fkey` FOREIGN KEY (`genderId`) REFERENCES `gender`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `deliveryman` ADD CONSTRAINT `deliveryman_genderId_fkey` FOREIGN KEY (`genderId`) REFERENCES `gender`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_costumer_addressesId_fkey` FOREIGN KEY (`costumer_addressesId`) REFERENCES `costumer_addresses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_deliverymanId_fkey` FOREIGN KEY (`deliverymanId`) REFERENCES `deliveryman`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_shopping_listId_fkey` FOREIGN KEY (`shopping_listId`) REFERENCES `shopping_list`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shopping_list` ADD CONSTRAINT `shopping_list_costumerId_fkey` FOREIGN KEY (`costumerId`) REFERENCES `costumer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products_in_shopping_list` ADD CONSTRAINT `products_in_shopping_list_shopping_listId_fkey` FOREIGN KEY (`shopping_listId`) REFERENCES `shopping_list`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_category_of_productId_fkey` FOREIGN KEY (`category_of_productId`) REFERENCES `category_of_product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_marketerId_fkey` FOREIGN KEY (`marketerId`) REFERENCES `marketer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_type_of_productId_fkey` FOREIGN KEY (`type_of_productId`) REFERENCES `type_of_price`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `marketer` ADD CONSTRAINT `marketer_genderId_fkey` FOREIGN KEY (`genderId`) REFERENCES `gender`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fair` ADD CONSTRAINT `fair_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fair_marketers` ADD CONSTRAINT `fair_marketers_fairId_fkey` FOREIGN KEY (`fairId`) REFERENCES `fair`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fair_marketers` ADD CONSTRAINT `fair_marketers_marketerId_fkey` FOREIGN KEY (`marketerId`) REFERENCES `marketer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `costumer_addresses` ADD CONSTRAINT `costumer_addresses_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `costumer_addresses` ADD CONSTRAINT `costumer_addresses_costumerId_fkey` FOREIGN KEY (`costumerId`) REFERENCES `costumer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `city`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_neighborhoodId_fkey` FOREIGN KEY (`neighborhoodId`) REFERENCES `neighborhood`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_uFId_fkey` FOREIGN KEY (`uFId`) REFERENCES `uf`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image_of_product` ADD CONSTRAINT `image_of_product_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `image`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image_of_product` ADD CONSTRAINT `image_of_product_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `image_fairId_fkey` FOREIGN KEY (`fairId`) REFERENCES `fair`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fair_date_hour_of_work` ADD CONSTRAINT `fair_date_hour_of_work_fairId_fkey` FOREIGN KEY (`fairId`) REFERENCES `fair`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `category_of_product` ADD CONSTRAINT `category_of_product_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `image`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sale_off` ADD CONSTRAINT `sale_off_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
