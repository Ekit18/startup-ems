import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JWTGuardRegisterModule } from "inq-shared-lib";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
    JWTGuardRegisterModule.register(),
  ],
  exports: [
    AuthService
  ]
})
export class AuthModule { }
