// await queryInterface.createTable('crashes', {
//     id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: Sequelize.INTEGER
//     },
//     userCarId: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'user_cars',
//         key: 'id'
//       },
//       onUpdate: 'CASCADE',
//       onDelete: 'CASCADE'
//     },
//     description: {
//       type: Sequelize.TEXT,
//       allowNull: false
//     },
//     location: {
//       type: Sequelize.STRING,
//       allowNull: false
//     }
//   });

import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, HasMany, ForeignKey } from "sequelize-typescript";
import { Part } from "src/parts/parts.model";
import { RepairsHistory } from "src/repairs-history/repairs-history.model";
import { UserCars } from "src/user-cars/user-cars.model";


@Table({ tableName: 'crashes' })
export class Crashes extends Model<Crashes> {
    @ApiProperty({ example: '1', description: 'Unique ID' })
    @Column({ type: DataType.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
    @ApiProperty({ example: "1", description: "Existing user-car pair id" })
    @ForeignKey(() => UserCars)
    userCarId: number;
    @ApiProperty({ example: 'My engine makes weird sound', description: 'Description of crash' })
    @Column({ type: DataType.TEXT, allowNull: false })
    description: string;
    @ApiProperty({ example: 'My engine makes weird sound', description: 'Description of crash' })
    @Column({ type: DataType.STRING, allowNull: false })
    location: string;
}
