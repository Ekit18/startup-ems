import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, BelongsToMany, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { Brand } from "src/brand/brand.model";
import { CarsParts } from "src/parts/cars-parts.model";
import { CreatePartDTO } from "src/parts/dto/create-part.dto";
import { Part } from "src/parts/parts.model";
import { UserCars } from "src/user-cars/user-cars.model";
import { User } from "src/users/users.model";


interface CarCreationAttrs {
    brandId: number;
    model: string;
    fuelType: string;
    bodyType: string;
    year: number;
}

@Table({ tableName: 'car' })
export class Car extends Model<Car, CarCreationAttrs>{
    @ApiProperty({ example: "1", description: "Unique id" })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: "1", description: "Existing brand id" })
    @ForeignKey(() => Brand)
    brandId: number;

    @ApiProperty({ example: "Octavia", description: "Car model" })
    @Column({ type: DataType.STRING, allowNull: false })
    model: string;
    @ApiProperty({ example: "Petrol", description: "Car fuel type" })
    @Column({ type: DataType.STRING, allowNull: false })
    fuelType: string;
    @ApiProperty({ example: "Sedan", description: "Car body type" })
    @Column({ type: DataType.STRING, allowNull: false })
    bodyType: string;
    @ApiProperty({ example: "2023", description: "Car manufacturing year" })
    @Column({ type: DataType.INTEGER, allowNull: false })
    year: number;
    @ApiProperty({ description: "Array of parts", type: [CreatePartDTO] })
    @BelongsToMany(() => Part, () => CarsParts)
    parts: Part[];
    @BelongsToMany(() => User, () => UserCars)
    users: User[];
}