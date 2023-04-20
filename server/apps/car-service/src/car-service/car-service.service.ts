import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CarServices, CreateCarServiceDto, UpdateCarServiceDto } from "inq-shared-lib";

@Injectable()
export class CarServicesServices {
    constructor(@InjectModel(CarServices) private carServiceRepository: typeof CarServices) { }

    async createCarService(dto: CreateCarServiceDto) {
        const carService = await this.carServiceRepository.create(dto);
        return carService;
    }

    async getCarServiceById(id: number) {
        const carService = await this.carServiceRepository.findOne({ where: { id } });
        if (!carService) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return carService;
    }

    // async getCarServices(){
    //     const carServices = await this.carServiceRepository.findAll({ include: { id } });
    // }

    updateCarService(id: number, dto: UpdateCarServiceDto) {
        return this.carServiceRepository.update({ ...dto }, { where: { id } });
    }

    remove(id: number) {
        return this.carServiceRepository.destroy({ where: { id } });
    }
}
