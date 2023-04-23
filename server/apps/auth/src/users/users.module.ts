import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User, Role, UserRoles, UserCars, JWTGuardRegisterModule } from "inq-shared-lib";
import { AuthModule } from "../auth/auth.module";
import { RolesModule } from "../roles/roles.module";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, UserCars]),
    RolesModule,
    JWTGuardRegisterModule.register()
  ],
  exports: [UsersService]
})
export class UsersModule { }
