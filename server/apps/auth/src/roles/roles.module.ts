import { Module, forwardRef } from "@nestjs/common";
import { Role, User, UserRoles } from "inq-shared-lib";
import { AuthModule } from "../auth/auth.module";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    RolesService
  ],

})
export class RolesModule { }
