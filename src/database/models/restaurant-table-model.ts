import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "tables",
  modelName: "RestaurantTable", // optional
  timestamps: true,
})
class RestaurantTable extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare tableNumber: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare seats: number;

  @Column({
    type: DataType.ENUM("available", "unavailable"),
    defaultValue: "available",
    allowNull: false,
  })
  declare tableStatus: "available" | "unavailable";
}

export default RestaurantTable;
