/* eslint-disable @typescript-eslint/ban-types */
import { Injectable, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CarOperation, RepairsHistory, CreateRepairsHistory, CAR_QUEUE, DeleteRepairsHistoryDto } from "inq-shared-lib";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { CarServicesServices } from "../car-service/car-service.service";
import { CarOperationService } from "../car-operation/car-operation.service";
import { ElasticsearchService } from '@nestjs/elasticsearch';


interface RepairsHistorySearchBody {
  id: number,
  carOperationId: number,
  carServiceId: number,
  userCarId: number,
  isSigned: Boolean
}


interface RepairsHistorySearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: RepairsHistorySearchBody;
    }>;
  };
}

@Injectable()
export default class RepairsHistorySearchService {
  index = 'repair-history';

  constructor(
    private readonly elasticsearchService: ElasticsearchService) { }


  indexRepairHistory(repairsHistory: RepairsHistory) {
    return this.elasticsearchService.index<RepairsHistorySearchBody>({
      index: this.index,
      document: {
        id: repairsHistory.id,
        carOperationId: repairsHistory.carOperationId,
        carServiceId: repairsHistory.carServiceId,
        userCarId: repairsHistory.userCarId,
        isSigned: repairsHistory.isSigned
      }
    });
  }

  async search(carServiceId: number, carOperationId: number, scrollId?: string) {
    let response;
    if (scrollId) {
      response = await this.elasticsearchService.scroll({
        scroll: '5m',
        // eslint-disable-next-line camelcase
        scroll_id: scrollId
      });
    } else {
      response = await this.elasticsearchService.search<RepairsHistorySearchBody>({
        index: this.index,
        size: 5000,
        scroll: '5m',
        query: {
          bool: {
            filter: [
              {
                term: {
                  carServiceId
                }
              },
              {
                term: {
                  carOperationId
                }
              }
            ]
          }
        }
      });
    }

    const hits = response.hits.hits;
    return { result: hits.map((item) => item._source), scrollId: response._scroll_id };
  }

  remove(repairHistoryId: DeleteRepairsHistoryDto) {
    this.elasticsearchService.deleteByQuery({
      index: this.index,
      query: {
        match: {
          id: repairHistoryId.id
        },
      },
    });
  }

  update(repairHistory: RepairsHistory) {
    const newBody: RepairsHistorySearchBody = {
      id: repairHistory.id,
      carOperationId: repairHistory.carOperationId,
      carServiceId: repairHistory.carServiceId,
      userCarId: repairHistory.userCarId,
      isSigned: repairHistory.isSigned
    };

    const script = Object.entries(newBody).reduce((result, [key, value]) => `${result} ctx._source.${key}='${value}';`, '');

    return this.elasticsearchService.updateByQuery({
      index: this.index,
      query: {
        match: {
          id: repairHistory.id,
        }
      },
      script: {
        source: script
      }
    });
  }
}
