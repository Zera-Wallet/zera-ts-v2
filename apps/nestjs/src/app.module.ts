import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { Request, Response } from "express";
import { AppController } from "./app.controller";
import { FungibleBalancesModule } from "./fungible-balances/fungible-balances.module";

@Module({
    controllers: [AppController],
    imports: [FungibleBalancesModule],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply((req: Request, res: Response, next: () => void) => {
                console.log(`Query parameters: ${JSON.stringify(req.query)}`);
                console.log(`Body parameters: ${JSON.stringify(req.body)}`);

                next();
            })
            .forRoutes({ path: "*", method: RequestMethod.ALL });
    }
}
