import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/filters/all-exceptions.filter';
import { GoogleAuthService } from './googleAuth.service';
import { GoogleAuthController } from './googleAuth.controller';
import { AuthService } from '../auth.service';
import { AuthModule } from '../auth.module';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [GoogleAuthService, AuthService],
  controllers: [GoogleAuthController],
  exports: [
    GoogleAuthService,
  ],
  imports: [
    forwardRef(() => UsersModule),
    AuthModule,
  ],
})
export class GoogleAuthModule { }
