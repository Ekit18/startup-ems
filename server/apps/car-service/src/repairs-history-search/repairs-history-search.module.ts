import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "apps/auth/src/auth/auth.module";
import { RepairsHistory, JWTGuardRegisterModule, CAR_QUEUE, RmqModule } from "inq-shared-lib";
import { CarOperationModule } from "../car-operation/car-operation.module";
import { CarServiceModule } from "../car-service/car-service.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import RepairsHistorySearchService from "./repairs-history-search.service";

@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
       useFactory: (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
        auth: {
          username: configService.get('ELASTICSEARCH_USERNAME'),
          password: configService.get('ELASTICSEARCH_PASSWORD'),
        }
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [RepairsHistorySearchService],
  exports: [ElasticsearchModule, RepairsHistorySearchService]
})
export class RepairsHistorySearchModule {}
