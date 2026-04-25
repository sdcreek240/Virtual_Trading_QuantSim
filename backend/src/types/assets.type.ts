import { Asset } from "@prisma/client";

export interface GetAssets {

    search?: string;
    type?: 'STOCK' | 'CRYPTO' | 'ETF';
    page?: number;
    limit?: number;
}//GetAssets

// export interface Asset {
//     symbol: string;
//     name: string;
//     type: 'STOCK' | 'CRYPTO' | 'ETF';
//     exchange: string;
//     // Optional extra fields
//     price?: number;
//     change24h?: number;
//     volume?: number;
//     marketCap?: number;
//     description?: string;
//     [key: string]: any; // Allow any other extra fields
// }

export interface GetAssetsSuccess {

    success: true;
    assets: Asset[];
    pagination: {
        page: number;
        limit: number;
        total: number;
    };
    extra?: Record<string, any>;
}//GetAssetsSuccess

export interface GetAssetsError {
    success: false;
    message: string
}//GetAssetsError

export type GetAssetResponse = GetAssetsSuccess | GetAssetsError;

export interface whereAsset {
    type: string;
    symbol: string;
    name: string;
}