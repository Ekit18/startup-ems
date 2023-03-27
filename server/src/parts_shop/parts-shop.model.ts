import { Part } from 'src/parts/parts.model';
import { ApiProperty } from "@nestjs/swagger";
import { Matches } from "class-validator";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ShopStockList } from 'src/shop_stock_list/shop-stock-list.model';

@Table({ tableName: 'parts_shop' })
export class PartsShop extends Model<PartsShop> {
    @ApiProperty({ example: "1", description: "Unique shop ID" })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    shopId: number;

    @ApiProperty({ example: "John's parts", description: "Unique shop name" })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @ApiProperty({ example: "https://johnparts.com", description: "Shop URL" })
    // eslint-disable-next-line no-useless-escape
    @Matches(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/)
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    siteLink: string;

    @ApiProperty({ example: "49.6721819;14.2466009", description: "Coordinates of the shop" })
    @Matches(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/)
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    gpsCoords: string;

    @ApiProperty({ description: "Array of parts the shop is selling", type: [Part] })
    @BelongsToMany(() => Part, () => ShopStockList)
    parts: Part[];
}