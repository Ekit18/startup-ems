import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { CarOperation } from "src/car-operation/car-operation.model";
import { CarServices } from "src/car-service/car-service.model";
import { UserCars } from "src/user-cars/user-cars.model";


interface RepairsHistoryCreationAttrs {
    userCarId: number;
    carServiceId: number;
    carOperationId: number;
}
@Table({ tableName: 'repairs_history', createdAt: false, updatedAt: false })
export class RepairsHistory extends Model<RepairsHistory, RepairsHistoryCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Unique ID' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
    @ApiProperty({ example: "28", description: "User car ID to which part belongs to" })
    @ForeignKey(() => UserCars)
    @Column({ type: DataType.INTEGER })
    userCarId: number;
    @ApiProperty({ example: '1', description: 'Car service ID' })
    @ForeignKey(() => CarServices)
    @Column({ type: DataType.INTEGER })
    carServiceId: number;
    @ApiProperty({ example: "28", description: "Car operation ID" })
    @ForeignKey(() => CarOperation)
    @Column({ type: DataType.INTEGER })
    carOperationId: number;
}
