import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, BelongsToMany, HasMany } from "sequelize-typescript";
import { Car } from "src/car/car.model";


interface BrandCreationAttrs {
    brand: string;
}
@Table({ tableName: 'brand' })
export class Brand extends Model<Brand, BrandCreationAttrs>{
    @ApiProperty({example:'1', description:'Unique ID'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
    @ApiProperty({example:'Aston Martin', description:'Name of the brand'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    brand: string;
    @HasMany(()=> Car)
    cars:Car[];
}