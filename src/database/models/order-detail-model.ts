import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import Order from "./order-model.js";
import Menu from "./menu-model.js";

@Table({
  tableName: "orderDetails",
  modelName: "OrderDetail",
  timestamps: true
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
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare orderId: number; 

  @ForeignKey(() => Menu)
  @Column({
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
    type: DataType.DATE,
    allowNull: true,
  })
  declare deletedAt: Date | null; 
}

export default OrderItem;
