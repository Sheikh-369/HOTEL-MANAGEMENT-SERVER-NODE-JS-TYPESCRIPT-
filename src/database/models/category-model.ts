import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "category",
  modelName: "Category",
  timestamps: true
})
class Category extends Model {
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
  declare categoryName: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare categoryDescription: string
}

 
export default Category;
