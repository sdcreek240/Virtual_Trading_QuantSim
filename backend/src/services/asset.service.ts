import { prisma } from "../lib/prisma";
import {Asset} from "@prisma/client";
import {FastifyInstance} from 'fastify';
import {GetAssets, GetAssetResponse} from "../types/assets.type";

export class AssetService {

    private fastify: FastifyInstance;

    constructor(fastify: FastifyInstance) { this.fastify = fastify;}

    /**
     * Get all assets, or filter by asset symbol/name
     * @param fastify - Fastify application instance
     */
    async getAssets(filter: GetAssets): Promise<GetAssetResponse> {

        const { search, type, page=0, limit=10 } = filter;
        const offset = page*limit;

        let assets: Asset[];
        assets = await prisma.asset.findMany({
            take: limit, skip: offset,
            where: {
                type: type
            },
            orderBy: { exchange: "asc" }
        });

        if (assets) {


            return {
                success: true,
                assets: assets,
                pagination: {
                    page: page,
                    limit: limit,
                    total: assets.length
                }
            }
        }
        //END

        return {
            success: false,
            message: "Ask me why: getAssets default error"
        }

    }//getAssets
}//AssetService