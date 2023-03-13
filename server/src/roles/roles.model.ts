import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, BelongsToMany } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";


interface RoleCreationAttrs {
    value: string;
    description: string;

}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Unique ID' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;


    @ApiProperty({ example: 'Admin', description: 'Role name' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    value: string;


    @ApiProperty({ example: 'Person who can administrate this app', description: 'Description of the role' })
    @Column({ type: DataType.STRING, allowNull: false })
    description: string;


    @BelongsToMany(() => User, () => UserRoles)
    user: User[];
}
