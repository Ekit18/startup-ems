import { Part } from 'src/parts/parts.model';
import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { PartsShop } from 'src/parts_shop/parts_shop.model';

@Table({ tableName: 'shop_stock_list' })
export class ShopStockList extends Model<ShopStockList> {
    @ApiProperty({ example: "10", description: "ID of connection between a shop and a part" })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;


    @ApiProperty({ example: "28", description: "Shop ID in which part is being sold" })
    @ForeignKey(() => PartsShop)
    @Column({ type: DataType.INTEGER })
    shopId: number;

    @ApiProperty({ example: "1", description: "Part ID which is being sold in a shop" })
    @ForeignKey(() => Part)
    @Column({ type: DataType.INTEGER })
    partId: number;


    @ApiProperty({ example: "100.15", description: "Price of a part in a shop" })
    @Column({ type: DataType.FLOAT })
    price: number;

    @ApiProperty({ example: "true", description: "Is that part available in the shop?" })
    @Column({ type: DataType.BOOLEAN })
    isAvailable: boolean;
}
