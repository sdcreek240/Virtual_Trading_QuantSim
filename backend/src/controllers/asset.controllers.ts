import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { GetAssets }from "../types/assets.type";
import { AssetService } from "../services/asset.service";
import { Result } from "pg";

export class AssetController {

    private assetService: AssetService;

    constructor(fastify: FastifyInstance){
        this.assetService = new AssetService(fastify);
    }

    getAssets = async (request: FastifyRequest<{Querystring: GetAssets}>, reply: FastifyReply) => {

        try {

            const filter: GetAssets = {
                search: request.query.search ?? undefined,
                type: request.query.type ?? undefined,
                page: request.query.page ?? 0,
                limit: request.query.limit ?? 10
            };


            console.log(`Fetching assets: page=${filter.page}, limit=${filter.limit}`);

            const result = await this.assetService.getAssets(filter);

            if (result.success) return reply.send({ 
                data: result.assets, 
                pagination: result.pagination
            });

            return reply.status(400).send({
                error: result.message
            });

        } catch (error) {
            return reply.status(500).send({
                success: false,
                error: error instanceof Error ? error.message : "Unknown error"
            })
        }
    }//getAssets


}//AssetController