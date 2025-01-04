import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
    @Get()
    init(): string {
        return "Our amazing journey with Nest starts now!";
    }
}
