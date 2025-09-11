import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import Category from "./category-model.js";

@Table({
  tableName: "menu",
  modelName:"Menu",
  timestamps: true, // adds createdAt & updatedAt automatically
})
class Menu extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare menuName: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare menuDescription: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare menuPrice: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare categoryId: number | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare menuIngredients: string | null;

  @Column({
    type: DataType.ENUM("available", "unavailable"),
    defaultValue: "available",
  })
  declare menuStatus: "available" | "unavailable";

  @Column({
    type: DataType.ENUM("veg", "non-veg"),
    defaultValue: "veg",
  })
  declare menuType: "veg" | "non-veg";

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  declare menuImage: string | null;
}

export default Menu;
