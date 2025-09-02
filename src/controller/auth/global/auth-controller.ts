import type { Request, Response } from "express";
import User from "../../../database/models/user-model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userRegister=async(req:Request,res:Response)=>{
    //taking data from user
    const{userName,userEmail,phoneNumber,password,confirmPassword}=req.body

    //validations
    if(!userName || !userEmail || !phoneNumber || !password || !confirmPassword){
        res.status(400).json({
            message:"Please fill all the fields!"
        })
        return
    }

    //restricting existing user
    const user=await User.findOne({where:{
        userEmail
    }})

    if(user){
        res.status(400).json({
            message:"Email Registered Already!"
        })
        return
    }

    //confirming password
    if(password !==confirmPassword){
        res.status(400).json({
            message:"Password and Confirm Password did not match!"
        })
        return
    }

    await User.create({
        userName,
        userEmail,
        phoneNumber,
        password:bcrypt.hashSync(password,12)
    })

    res.status(201).json({
        message:"User Registered Successfully!"
    })
}


const userLogin=async(req:Request,res:Response)=>{
    //input from user
    const{userEmail,password}=req.body

    //validation
    if(!userEmail || !password){
        res.status(400).json({
            message:"Please provide Email and Password!"
        })
        return
    }

    //confirming if email really exists
    const user=await User.findOne({where:{userEmail}})
    if(!user){
        res.status(400).json({
            message:"Email not registered!"
        })
        return
    }

    const isPasswordMatching=await bcrypt.compare(password,user.password)
    if(!isPasswordMatching){
        res.status(400).json({
            message:"Invalid Email or Password!"
        })
        return
    }
        const token=jwt.sign({id:user.id},process.env.JWT_TOKEN!,{
            expiresIn:"15d"
        })
        res.status(200).json({
        message:"Login Successful!",
        token,
        user:{
            id:user.id,
            userEmail:user.userEmail,
            role:user.role
        }
    }) 

}
export {userRegister,userLogin}