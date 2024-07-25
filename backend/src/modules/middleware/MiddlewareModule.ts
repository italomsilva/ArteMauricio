import { Global, MiddlewareConsumer } from "@nestjs/common";
import { CheckApiKeyMiddleware } from "./CheckApiKeyMiddleware";
import { CheckLoggedMiddleware } from "./CheckLogged";

@Global()
export class MiddlewareModule{
    configure(consumer:MiddlewareConsumer){
        consumer
        .apply(CheckApiKeyMiddleware)
        .forRoutes('*')
        .apply(CheckLoggedMiddleware)
        .forRoutes('products/2')
    }
}