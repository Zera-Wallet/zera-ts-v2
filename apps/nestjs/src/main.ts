import { NestFactory } from "@nestjs/core";
import { ZodValidationPipe } from "nestjs-zod";
import { AppModule } from "./app.module";
import { ZodFilter } from "./zod-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ZodValidationPipe());
    app.setGlobalPrefix("api");
    await app.listen(3001);
}

bootstrap();
