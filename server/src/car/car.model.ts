import { Model, Table, Column, DataType, BelongsToMany, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { Brand } from "src/brand/brand.model";
import { Part } from "src/parts/parts.model";


interface CarCreationAttrs {
    brandId:number;
    model: string;
    fuelType: string;
    bodyType: string;
    year: number;
}

@Table({ tableName: 'car' })
export class Car extends Model<Car, CarCreationAttrs>{
    
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

 
    @ForeignKey(() => Brand)
    brandId:number;
    
    @Column({ type: DataType.STRING, allowNull: false})
    model: string;

    @Column({ type: DataType.STRING, allowNull: false})
    fuelType: string;
    @Column({ type: DataType.STRING, allowNull: false})
    bodyType: string;
    @Column({ type: DataType.INTEGER, allowNull: false})
    year: number;

    
}