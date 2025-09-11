import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import User from "./user-model.js"; // adjust the path
import RestaurantTable from "./restaurant-table-model.js";

@Table({
  tableName: "reservations",
  modelName: "Reservation",
  timestamps: true
})
class Reservation extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare userId: string;

  @ForeignKey(() => RestaurantTable)
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare tableId: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare tableNumber: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare numberOfGuests: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare reservationTime: Date | null;

  @Column({
    type: DataType.ENUM("RESERVED", "AVAILABLE"),
    defaultValue: "AVAILABLE",
  })
  declare reservationStatus: "RESERVED" | "AVAILABLE";
}

export default Reservation;
