import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/users.model';


@Table
export class UserSignature extends Model<UserSignature> {
    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    signatureData: string;

    @ForeignKey(() => User)
    @Column({
        allowNull: false
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;
}
