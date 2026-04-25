import { FastifyInstance } from "fastify";
import { authenticate } from "../middleware/auth";
import { AssetController } from "../controllers/asset.controllers";

/**
 * Retrieve Asset infromation
 * 
 * @param app - Fastify instance to register routes on
 */

export async function assetRoutes(app: FastifyInstance) {

    const assetController = new AssetController(app);

    app.get("/", assetController.getAssets);

    
}//END_assetRoutes