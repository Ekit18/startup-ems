import { Module } from '@nestjs/common';
import { CrashesController } from './crashes.controller';
import { CrashesService } from './crashes.service';
import { Crashes } from './crashes.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { forwardRef } from '@nestjs/common/utils';
import { UserCarsModule } from 'src/user-cars/user-cars.module';

@Module({
  controllers: [CrashesController],
  providers: [CrashesService],
  imports: [
    SequelizeModule.forFeature([Crashes]), UserCarsModule,
    forwardRef(() => AuthModule)
  ]
})
export class CrashesModule {}
