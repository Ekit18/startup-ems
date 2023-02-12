import { Model, Table, Column, DataType, BelongsToMany, ForeignKey } from "sequelize-typescript";
import { Car } from "src/car/car.model";
import { Part } from "./parts.model";



@Table({ tableName: 'cars_parts', createdAt: false, updatedAt: false })
export class CarsParts extends Model<CarsParts>{
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;


    @ForeignKey(() => Car)
    @Column({ type: DataType.INTEGER })
    carId: number;


    @ForeignKey(() => Part)
    @Column({ type: DataType.INTEGER })
    partId: number;
}