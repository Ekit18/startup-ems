import { Injectable, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/sequelize";
import { CarService } from "apps/car/src/car/car.service";
import { Part, CarsParts, GetPartsDTO, CreatePartDTO, UpdatePartDTO, CAR_QUEUE } from "inq-shared-lib";
import { lastValueFrom } from "rxjs";
import { getPartsByIdByBrandAndTypePayload, getTypeByIdAndBrandPayload } from "./parts-rmq.controller";

@Injectable()
export class PartsService {
    constructor(@InjectModel(Part) private partRepository: typeof Part,
        @Inject(CAR_QUEUE) private CarClient: ClientProxy,
        @InjectModel(CarsParts) private carsParts: typeof CarsParts) { }

    async getAllPartDetails(): Promise<Part[]> {
        const parts = await this.partRepository.findAll({});
        console.log(parts);
        return parts;
    }
    // Next 2 methods are needed because partId is got from aws partIds pool, whereas brand and type is got from a client's pick, so only those ids are needed, whose brand and type is such
    async getTypeByIdAndBrand(data: getTypeByIdAndBrandPayload) {
        const types = await this.partRepository.findOne({ where: { partId: data.partId, brand: data.brand }, attributes: ['type'] });
        return types;
    }
    async getPartByIdByBrandAndType(data: getPartsByIdByBrandAndTypePayload) {
        const parts = await this.partRepository.findOne({ where: { partId: data.partId, brand: data.brand, type: data.type } });
        return parts;
    }
    async getAllPartsByCarID(getPartsDTO: GetPartsDTO) {
        const candidateCar = await lastValueFrom(this.CarClient.send({ role: "car", cmd: 'getCarById' }, getPartsDTO.carId));
        if (!candidateCar) {
            throw new HttpException({ message: 'Car with such parts does not exist in the system' }, HttpStatus.BAD_REQUEST);
        }
        return candidateCar.parts;
    }
    getPartById(partId: number) {
        return this.partRepository.findOne({ where: { partId }, include: { all: true } });
    }
    async createPart(createPartDTO: CreatePartDTO) {
        const candidate = await this.partRepository.findOne({ where: { name: createPartDTO.name, brand: createPartDTO.brand } });
        if (candidate) {
            throw new HttpException({ message: 'Part with such name already exists' }, HttpStatus.BAD_REQUEST);
        }
        const part = await this.partRepository.create({ brand: createPartDTO.brand, name: createPartDTO.name, type: createPartDTO.type });
        const car = await lastValueFrom(this.CarClient.send({ role: "car", cmd: 'getCarById' }, createPartDTO.carId));
        await part.$set('cars', [car.id]);
        part.cars = [car];
        return part;
    }
    async updatePart(partId: number, updatePartDTO: UpdatePartDTO) {
        if (!Object.keys(updatePartDTO).length) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        const updateResult = await Part.update({ ...updatePartDTO }, { where: { partId } });
        if (updateResult[0] === 0) {
            throw new HttpException({ message: "No rows were updated!" }, HttpStatus.BAD_REQUEST);
        }
        return updateResult;
    }
    async remove(partId: number) {
        const destroyResult = await Part.destroy({ where: { partId } });
        if (!destroyResult) {
            throw new HttpException({ message: "No rows were deleted!" }, HttpStatus.BAD_REQUEST);
        }
        return destroyResult;
    }
}
