import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import Order from "./order-model.js";
import Menu from "./menu-model.js";

@Table({
  tableName: "order_items",
  modelName: "OrderItem",
  timestamps: true, // maps to createdAt & updatedAt
})
class OrderItem extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Order)
  @Column({
    field: "order_id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare orderId: number;

  @ForeignKey(() => Menu)
  @Column({
    field: "menu_item_id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare menuItemId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare quantity: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare price: number;

  @Column({
    field: "deleted_at",
    type: DataType.DATE,
    allowNull: true,
  })
  declare deletedAt: Date | null;
}

export default OrderItem;
