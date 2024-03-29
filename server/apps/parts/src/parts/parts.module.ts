import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "apps/auth/src/auth/auth.module";
import { CarModule } from "apps/car/src/car/car.module";
import { Part, CarsParts, ShopStockList, PartsShop, RmqService, RmqModule, CAR_QUEUE, JWTGuardRegisterModule } from "inq-shared-lib";
import { PartsController } from "./parts.controller";
import { PartsService } from "./parts.service";
import { PartsRMQController } from "./parts-rmq.controller";

@Module({
  controllers: [PartsController],
  providers: [
    // {
    //   // provide: PartsService,
    //   // useFactory(partRepository: typeof Part, carService: CarService, carsParts: typeof CarsParts) {
    //   //   return new PartsService(partRepository, carService, carsParts);
    //   // },
    //   // inject:[Part,]
    // }
    PartsService],

  imports: [SequelizeModule.forFeature([Part, CarsParts, ShopStockList, PartsShop]),
  CarModule,
  RmqModule.register({ name: CAR_QUEUE }),
  JWTGuardRegisterModule.register()
  ],
  exports: [PartsService]
})
export class PartsModule { }
