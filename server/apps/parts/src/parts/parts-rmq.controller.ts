import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { PartsService } from "./parts.service";
import { Part, RmqService } from "inq-shared-lib";

export interface getTypeByIdAndBrandPayload {
    partId: number,
    brand: string
}
export interface getPartsByIdByBrandAndTypePayload extends getTypeByIdAndBrandPayload{
    type: string,
}
@Controller()
export class PartsRMQController {
    constructor(private partService: PartsService, private readonly rmqService: RmqService) { }

    @MessagePattern({ role: "parts", cmd: "findOneById" })
    findOneById(@Payload() partId: number, @Ctx() context: RmqContext): Promise<Part> {
        console.log("RABBIT!!!");
        this.rmqService.ack(context);
        console.log("TESTSTTTS");
        return this.partService.getPartById(partId);
    }
    @MessagePattern({ role: "parts", cmd: "getTypeByIdAndBrand" })
    getTypeByIdAndBrand(@Payload() data: getTypeByIdAndBrandPayload, @Ctx() context: RmqContext): Promise<Part> {
        console.log("RABBIT!!!");
        // At first we filter from all parts only those who have static files, then from them only those who are of such brand, and from those ones we get their types
        this.rmqService.ack(context);
        return this.partService.getTypeByIdAndBrand(data);
    }
    @MessagePattern({ role: "parts", cmd: "findOneWithSuchBrandAndType" })
    getPartByIdByBrandAndType(@Payload() data: getPartsByIdByBrandAndTypePayload, @Ctx() context: RmqContext): Promise<Part> {
        console.log("RABBIT!!!");
        this.rmqService.ack(context);
        return this.partService.getPartByIdByBrandAndType(data);
    }
}
