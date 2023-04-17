-- CreateTable
CREATE TABLE `costumer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `picture_uri` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `costumer_id_key`(`id`),
    UNIQUE INDEX `costumer_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `deliveryman` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `picture_uri` VARCHAR(255) NOT NULL,
    `locationId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `deliveryman_id_key`(`id`),
    UNIQUE INDEX `deliveryman_email_key`(`email`),
    UNIQUE INDEX `deliveryman_locationId_key`(`locationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `veicule_deliveryman` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `veiculeId` INTEGER NOT NULL,
    `deliverymanId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `veicule_deliveryman_id_key`(`id`),
    INDEX `veicule_deliveryman_deliverymanId_fkey`(`deliverymanId`),
    INDEX `veicule_deliveryman_veiculeId_fkey`(`veiculeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `details` VARCHAR(191) NOT NULL,
    `payment_methodId` INTEGER NOT NULL,
    `orderId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `payment_id_key`(`id`),
    UNIQUE INDEX `payment_orderId_key`(`orderId`),
    INDEX `payment_payment_methodId_fkey`(`payment_methodId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accepted_status` BOOLEAN NOT NULL DEFAULT false,
    `delivered_status_for_client` BOOLEAN NOT NULL DEFAULT false,
    `retreat_products_status` BOOLEAN NOT NULL DEFAULT false,
    `deliverymanId` INTEGER NOT NULL,
    `shopping_listId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `costumer_addressesId` INTEGER NOT NULL,

    UNIQUE INDEX `order_id_key`(`id`),
    UNIQUE INDEX `order_shopping_listId_key`(`shopping_listId`),
    INDEX `order_costumer_addressesId_fkey`(`costumer_addressesId`),
    INDEX `order_deliverymanId_fkey`(`deliverymanId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shopping_list` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `freight` DOUBLE NULL,
    `total` DOUBLE NOT NULL,
    `costumerId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `shopping_list_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products_in_shopping_list` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shopping_listId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `products_in_shopping_list_id_key`(`id`),
    INDEX `products_in_shopping_list_productId_fkey`(`productId`),
    INDEX `products_in_shopping_list_shopping_listId_fkey`(`shopping_listId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    `price_type` BOOLEAN NOT NULL DEFAULT false,
    `price` DOUBLE NOT NULL,
    `active_for_selling` BOOLEAN NOT NULL DEFAULT true,
    `available_quantity` INTEGER NOT NULL,
    `marketerId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `product_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `marketer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `picture_uri` VARCHAR(191) NULL,
    `review` DOUBLE NOT NULL,
    `online` BOOLEAN NOT NULL DEFAULT false,
    `locationId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `marketer_id_key`(`id`),
    UNIQUE INDEX `marketer_email_key`(`email`),
    UNIQUE INDEX `marketer_locationId_key`(`locationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fair` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `review` DOUBLE NOT NULL DEFAULT 0,
    `addressId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `fair_id_key`(`id`),
    UNIQUE INDEX `fair_addressId_key`(`addressId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fair_marketers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fairId` INTEGER NOT NULL,
    `marketerId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `fair_marketers_id_key`(`id`),
    INDEX `fair_marketers_fairId_fkey`(`fairId`),
    INDEX `fair_marketers_marketerId_fkey`(`marketerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `costumer_addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `addressId` INTEGER NOT NULL,
    `costumerId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `costumer_addresses_id_key`(`id`),
    INDEX `costumer_addresses_costumerId_fkey`(`costumerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `longitude` DOUBLE NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `location_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `CEP` INTEGER NOT NULL,
    `logradouro` VARCHAR(120) NOT NULL,
    `number` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `address_typeId` INTEGER NOT NULL,

    UNIQUE INDEX `address_id_key`(`id`),
    INDEX `address_address_typeId_fkey`(`address_typeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `address_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(90) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `address_type_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `veicule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `veicule_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `image_of_product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imageId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `image_of_product_id_key`(`id`),
    INDEX `image_of_product_imageId_fkey`(`imageId`),
    INDEX `image_of_product_productId_fkey`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uri` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `image_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_method` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `payment_method_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fair_date_hour_of_work` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fairId` INTEGER NOT NULL,
    `date_and_hour_of_workId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `fair_date_hour_of_work_id_key`(`id`),
    INDEX `fair_date_hour_of_work_date_and_hour_of_workId_fkey`(`date_and_hour_of_workId`),
    INDEX `fair_date_hour_of_work_fairId_fkey`(`fairId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `date_and_hour_of_work` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `open_datetime` DATETIME(3) NOT NULL,
    `close_datetime` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `day_of_weekId` INTEGER NOT NULL,

    UNIQUE INDEX `date_and_hour_of_work_id_key`(`id`),
    INDEX `date_and_hour_of_work_day_of_weekId_fkey`(`day_of_weekId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `day_of_week` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `day_of_week_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `deliveryman` ADD CONSTRAINT `deliveryman_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `veicule_deliveryman` ADD CONSTRAINT `veicule_deliveryman_deliverymanId_fkey` FOREIGN KEY (`deliverymanId`) REFERENCES `deliveryman`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `veicule_deliveryman` ADD CONSTRAINT `veicule_deliveryman_veiculeId_fkey` FOREIGN KEY (`veiculeId`) REFERENCES `veicule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_payment_methodId_fkey` FOREIGN KEY (`payment_methodId`) REFERENCES `payment_method`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_costumer_addressesId_fkey` FOREIGN KEY (`costumer_addressesId`) REFERENCES `costumer_addresses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_deliverymanId_fkey` FOREIGN KEY (`deliverymanId`) REFERENCES `deliveryman`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_shopping_listId_fkey` FOREIGN KEY (`shopping_listId`) REFERENCES `shopping_list`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shopping_list` ADD CONSTRAINT `shopping_list_costumerId_fkey` FOREIGN KEY (`costumerId`) REFERENCES `costumer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products_in_shopping_list` ADD CONSTRAINT `products_in_shopping_list_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products_in_shopping_list` ADD CONSTRAINT `products_in_shopping_list_shopping_listId_fkey` FOREIGN KEY (`shopping_listId`) REFERENCES `shopping_list`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_marketerId_fkey` FOREIGN KEY (`marketerId`) REFERENCES `marketer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `marketer` ADD CONSTRAINT `marketer_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fair` ADD CONSTRAINT `fair_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fair_marketers` ADD CONSTRAINT `fair_marketers_fairId_fkey` FOREIGN KEY (`fairId`) REFERENCES `fair`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fair_marketers` ADD CONSTRAINT `fair_marketers_marketerId_fkey` FOREIGN KEY (`marketerId`) REFERENCES `marketer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `costumer_addresses` ADD CONSTRAINT `costumer_addresses_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `costumer_addresses` ADD CONSTRAINT `costumer_addresses_costumerId_fkey` FOREIGN KEY (`costumerId`) REFERENCES `costumer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_address_typeId_fkey` FOREIGN KEY (`address_typeId`) REFERENCES `address_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image_of_product` ADD CONSTRAINT `image_of_product_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `image`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image_of_product` ADD CONSTRAINT `image_of_product_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fair_date_hour_of_work` ADD CONSTRAINT `fair_date_hour_of_work_date_and_hour_of_workId_fkey` FOREIGN KEY (`date_and_hour_of_workId`) REFERENCES `date_and_hour_of_work`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fair_date_hour_of_work` ADD CONSTRAINT `fair_date_hour_of_work_fairId_fkey` FOREIGN KEY (`fairId`) REFERENCES `fair`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `date_and_hour_of_work` ADD CONSTRAINT `date_and_hour_of_work_day_of_weekId_fkey` FOREIGN KEY (`day_of_weekId`) REFERENCES `day_of_week`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
