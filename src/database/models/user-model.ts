import { Table,Column,Model,DataType } from "sequelize-typescript";

@Table({
    tableName:"users",
    modelName:"User",
    timestamps:true
})

class User extends Model{
    @Column({
        primaryKey:true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4
    })
    declare id:string
    
    @Column({
        type:DataType.STRING
    })
    declare userName:string

    @Column({
        type:DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Must be a valid email address."
            }
        }    
    })
    declare userEmail:string

    @Column({
        type:DataType.STRING,
        allowNull:false,
        validate:{
            len:{
                args:[10,10],//max/min
                msg:"Phone number must be of 10 digits."
            }
        }
    })
    declare phoneNumber:string

    @Column({
        type:DataType.ENUM("admin","customer"),
        defaultValue:"customer"
    })
    declare role:string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare password:string

    @Column({
        type:DataType.STRING,
        allowNull:true
    })
    declare OTP:string | null

    @Column({
        type:DataType.STRING,
        allowNull:true
    })
    declare OTPGeneratedTime:Date | string | null

    @Column({
        type:DataType.STRING,
        allowNull:true
    })
    declare OTPExpiry:Date | string | null


}
export default User