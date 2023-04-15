import { ApiProperty } from "@nestjs/swagger";
import { Matches } from "class-validator";
import { Model, Column, DataType, Table, HasMany } from "sequelize-typescript";
import { RepairsHistory } from "src/repairs-history/repairs-history.model";

interface CarServiceCreationAttributes {
    name: string;
    location: string;
    rating: number;
}

@Table({ tableName: 'car_service', createdAt: false, updatedAt: false })
export class CarServices extends Model<CarServices, CarServiceCreationAttributes> {
    @ApiProperty({ example: '1', description: 'Unique ID' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: "The best car service", description: "Name of the car service" })
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    name: string;

    @ApiProperty({ example: "49.6721819, 14.2466009", description: "Coordinates of the car service" })
    @Matches(/^[-+]?([1-8]?\d(.\d+)?|90(.0+)?), \s[-+]?(180(.0+)?|((1[0-7]\d)|([1-9]?\d))(.\d+)?)$/)
    @Column({ type: DataType.STRING, allowNull: false })
    location: string;

    @ApiProperty({ example: "5", description: "Rating of the car service" })
    @Column({ type: DataType.INTEGER, allowNull: false })
    rating: number;

    @HasMany(() => RepairsHistory)
    repairsHistory:RepairsHistory[];
}
