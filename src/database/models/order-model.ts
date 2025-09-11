import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import User from "./user-model.js";
import RestaurantTable from "./restaurant-table-model.js";

@Table({
  tableName: "orders",
  modelName: "Order",
  timestamps: true, // createdAt & updatedAt (will map to created_at, updated_at if DB uses snake_case)
})
class Order extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare userId: number | null;

  @ForeignKey(() => RestaurantTable)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare tableId: number | null;

  @Column({
    type: DataType.ENUM("dine-in", "takeaway", "delivery"),
    defaultValue: "dine-in",
    allowNull: false,
  })
  declare orderType: "dine-in" | "takeaway" | "delivery";

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare totalAmount: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    defaultValue: 0.0,
  })
  declare discount: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare finalAmount: number;

  @Column({
    type: DataType.ENUM("pending", "confirmed", "preparing", "ready", "completed", "cancelled"),
    defaultValue: "pending",
  })
  declare status: "pending" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled";

  @Column({
    type: DataType.ENUM("cash", "esewa", "khalti"),
    defaultValue: "cash",
  })
  declare paymentMethod: "cash" | "esewa" | "khalti";

  @Column({
    type: DataType.ENUM("unpaid", "paid", "refunded"),
    defaultValue: "unpaid",
  })
  declare paymentStatus: "unpaid" | "paid" | "refunded";

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare specialRequest: string | null;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  declare deliveryAddress: string | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare deletedAt: Date | null;
}

export default Order;
