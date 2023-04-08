import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, HasMany, ForeignKey } from "sequelize-typescript";
import { Part } from "src/parts/parts.model";
import { RepairsHistory } from "src/repairs-history/repairs-history.model";


interface CarOperationCreationAttrs {
    name: string;
    symptom: string;
    repair: string;
    price: number
}
@Table({ tableName: 'car_operations', createdAt: false, updatedAt: false })
export class CarOperation extends Model<CarOperation, CarOperationCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Unique ID' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
    @ApiProperty({ example: "Changing engine", description: "Name of the operation" })
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    name: string;
    @ApiProperty({ example: "Strange noise in the engine", description: "Symptom of the malfunction" })
    @Column({ type: DataType.STRING, allowNull: false })
    symptom: string;
    @ApiProperty({ example: "Bought new engine", description: "Solution of the problem" })
    @Column({ type: DataType.STRING, allowNull: false })
    repair: string;
    @ApiProperty({ example: "15000", description: "Price of the operation" })
    @Column({ type: DataType.INTEGER, allowNull: false })
    price: number;
    @HasMany(() => RepairsHistory)
    repairsHistory:RepairsHistory[];

    @ApiProperty({ example: "1", description: "Existing part id" })
    @ForeignKey(() => Part)
    partId: number;
}
