import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, BelongsToMany, ForeignKey } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";
import { Car } from "src/car/car.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";
import { CarsParts } from "./cars-parts.model";


interface PartCreationAttrs {
    email: string;
    password: string;

}
@Table({ tableName: 'parts' })
export class Part extends Model<Part, PartCreationAttrs>{
    @ApiProperty({example: "1", description:"Unique part ID"})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    partId: number;

    @ApiProperty({example: "Yokohama", description:"Part brand"})
    @Column({ type: DataType.STRING, allowNull: false })
    brand: string;

    @ApiProperty({example: "W.Drive V905 215/65 R16 98H", description:"Unique part factory name"})
    @Column({ type: DataType.STRING, allowNull: false, unique:true })
    name: string;

    @ApiProperty({example: "Tire", description:"Part type"})
    @Column({type:DataType.STRING, allowNull:false})
    type:string;

    @ApiProperty({name:"CarsParts", example: {id:5,carId:1,partId:1},type:CarsParts,description:"CarsParts row"})
    @BelongsToMany(() => Car, () => CarsParts)
    cars: Car[];
}