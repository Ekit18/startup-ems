import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, BelongsToMany, ForeignKey } from "sequelize-typescript";
import { Car } from "src/car/car.model";
import { Part } from "./parts.model";



@Table({ tableName: 'cars_parts', createdAt: false, updatedAt: false })
export class CarsParts extends Model<CarsParts>{
    @ApiProperty({example: "10", description:"ID of connection between a car and a part"})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;


    @ApiProperty({example: "28", description:"Car ID to which part belongs to"})
    @ForeignKey(() => Car)
    @Column({ type: DataType.INTEGER })
    carId: number;

    @ApiProperty({example: "1", description:"Part ID which belongs to a car"})
    @ForeignKey(() => Part)
    @Column({ type: DataType.INTEGER })
    partId: number;
}