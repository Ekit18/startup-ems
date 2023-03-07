import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { GoogleAuthService } from './googleAuth.service';
import { GoogleAuthController } from './googleAuth.controller';
import { AuthService } from '../auth.service';
import { AuthModule } from '../auth.module';


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
