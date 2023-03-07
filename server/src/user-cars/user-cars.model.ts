import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { Car } from "src/car/car.model";
import { User } from "src/users/users.model";


interface UserCarsCreationAttrs {
    userId: number;
    carId: number;
    carMileage: number;
}
@Table({ tableName: 'user_cars', createdAt: false, updatedAt: false })
export class UserCars extends Model<UserCars, UserCarsCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Unique ID' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
    @ApiProperty({ example: "28", description: "Car ID to which part belongs to" })
    @ForeignKey(() => Car)
    @Column({ type: DataType.INTEGER })
    carId: number;
    @ApiProperty({ example: '1', description: 'Unique user ID' })
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;
    @ApiProperty({ example: "15000", description: "Mileage of the car" })
    @Column({ type: DataType.INTEGER, allowNull: false })
    carMileage: number;
}
