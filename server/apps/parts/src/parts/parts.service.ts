import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CarService } from "apps/car/src/car/car.service";
import { Part, CarsParts, GetPartsDTO, CreatePartDTO, UpdatePartDTO } from "inq-shared-lib";

@Injectable()
export class PartsService {
    constructor(@InjectModel(Part) private partRepository: typeof Part,
        private carService: CarService,
        @InjectModel(CarsParts) private carsParts: typeof CarsParts) { }

    async getAllPartsByCarID(getPartsDTO: GetPartsDTO) {
        const candidateCar = await this.carService.getCarById(getPartsDTO.carId);
        if (!candidateCar) {
            throw new HttpException({ message: 'Car with such parts does not exist in the system' }, HttpStatus.BAD_REQUEST);
        }
        return (await this.carService.getCarById(getPartsDTO.carId)).parts;
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
        const car = await this.carService.getCarById(createPartDTO.carId);
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
