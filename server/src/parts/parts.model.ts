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
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    partId: number;
    @Column({ type: DataType.STRING, allowNull: false })
    brand: string;
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({type:DataType.STRING, allowNull:false})
    type:string;

    @ForeignKey(()=>Car)
    carId:number;

    @BelongsToMany(() => Car, () => CarsParts)
    cars: Car[];
}