/*
  Warnings:

  - You are about to alter the column `price` on the `MarketData` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,4)`.
  - You are about to alter the column `volume` on the `MarketData` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(30,2)`.
  - You are about to alter the column `high24h` on the `MarketData` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,4)`.
  - You are about to alter the column `low24h` on the `MarketData` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,4)`.
  - You are about to alter the column `changePercent` on the `MarketData` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(8,2)`.
  - You are about to alter the column `quantity` on the `Portfolio` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(24,8)`.
  - You are about to alter the column `avgPrice` on the `Portfolio` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,4)`.
  - You are about to alter the column `quantity` on the `Trade` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(24,8)`.
  - You are about to alter the column `price` on the `Trade` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,4)`.
  - You are about to alter the column `total` on the `Trade` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,2)`.
  - You are about to alter the column `balance` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,2)`.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "MarketData" DROP CONSTRAINT "MarketData_symbol_fkey";

-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "description" TEXT,
ADD COLUMN     "industry" TEXT,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "sector" TEXT;

-- AlterTable
ALTER TABLE "MarketData" ALTER COLUMN "price" SET DATA TYPE DECIMAL(20,4),
ALTER COLUMN "volume" SET DATA TYPE DECIMAL(30,2),
ALTER COLUMN "high24h" SET DATA TYPE DECIMAL(20,4),
ALTER COLUMN "low24h" SET DATA TYPE DECIMAL(20,4),
ALTER COLUMN "changePercent" SET DATA TYPE DECIMAL(8,2);

-- AlterTable
ALTER TABLE "Portfolio" ALTER COLUMN "quantity" SET DATA TYPE DECIMAL(24,8),
ALTER COLUMN "avgPrice" SET DATA TYPE DECIMAL(20,4);

-- AlterTable
ALTER TABLE "Trade" ALTER COLUMN "quantity" SET DATA TYPE DECIMAL(24,8),
ALTER COLUMN "price" SET DATA TYPE DECIMAL(20,4),
ALTER COLUMN "total" SET DATA TYPE DECIMAL(20,2);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastLoginAt" TIMESTAMP(3),
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER',
ALTER COLUMN "balance" SET DATA TYPE DECIMAL(20,2);

-- CreateTable
CREATE TABLE "PriceHistory" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "open" DECIMAL(20,4) NOT NULL,
    "high" DECIMAL(20,4) NOT NULL,
    "low" DECIMAL(20,4) NOT NULL,
    "close" DECIMAL(20,4) NOT NULL,
    "volume" DECIMAL(30,2),
    "timestamp" TIMESTAMP(3) NOT NULL,
    "interval" TEXT NOT NULL DEFAULT '1d',

    CONSTRAINT "PriceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Watchlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Watchlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PriceHistory_symbol_timestamp_idx" ON "PriceHistory"("symbol", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "PriceHistory_symbol_timestamp_interval_key" ON "PriceHistory"("symbol", "timestamp", "interval");

-- CreateIndex
CREATE UNIQUE INDEX "Watchlist_userId_symbol_key" ON "Watchlist"("userId", "symbol");

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_symbol_fkey" FOREIGN KEY ("symbol") REFERENCES "Asset"("symbol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_symbol_fkey" FOREIGN KEY ("symbol") REFERENCES "Asset"("symbol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketData" ADD CONSTRAINT "MarketData_symbol_fkey" FOREIGN KEY ("symbol") REFERENCES "Asset"("symbol") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_symbol_fkey" FOREIGN KEY ("symbol") REFERENCES "Asset"("symbol") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Watchlist" ADD CONSTRAINT "Watchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Watchlist" ADD CONSTRAINT "Watchlist_symbol_fkey" FOREIGN KEY ("symbol") REFERENCES "Asset"("symbol") ON DELETE CASCADE ON UPDATE CASCADE;
