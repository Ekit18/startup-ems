import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, BelongsToMany } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";


interface UserCreationAttrs {
    email: string;
    password: string;

}
@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Unique ID' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
    @ApiProperty({ example: 'evgenkitan@gmail.com', description: 'User email' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;
    @ApiProperty({ example: '12345', description: 'User password' })
    @Column({ type: DataType.STRING, allowNull: true })
    password?: string;
    @ApiProperty({ example: true, description: 'User authentication method' })
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    isRegisteredWithGoogle: boolean;
    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
}
