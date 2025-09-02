import type { Request, Response } from "express";
import User from "../../../database/models/user-model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import generateToken from "../../../services/generateToken.js";
import sendMail from "../../../services/sendMail.js";

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


const forgotPassword=async(req:Request,res:Response)=>{
    const {userEmail}=req.body

    //validation
    if(!userEmail){
        res.status(400).json({
            message:"Please provide Email!"
        })
        return
    }

    //checking if email exists
    const user=await User.findOne({where:{userEmail}})
    if(!user){
        res.status(400).json({
            message:"The Email is not registered!"
        })
        return
    }

    const OTP=generateToken()
    await sendMail({
        to:userEmail,
        subject:"Password Reset Request",
        html:`<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #333;">🔐 Password Reset Request</h2>
      <p>Hi ${user.userName || "User"},</p>
      <p>We received a request to reset your password. Please use the following One-Time Password (OTP) to complete the process:</p>
      <div style="margin: 20px 0; text-align: center;">
        <span style="font-size: 28px; font-weight: bold; color: #2d3748; padding: 10px 20px; background: #f7fafc; border: 1px dashed #ccc; border-radius: 5px;">
          ${OTP}
        </span>
      </div>
      <p><strong>Note:</strong> This OTP is valid for 10 minutes. If you did not request a password reset, please ignore this email or contact support.</p>
      <p style="margin-top: 30px;">Thanks,<br>The 90's Restaurant and Bar</p>
    </div>`
    })

    user.OTP=OTP.toString()
    user.OTPGeneratedTime=new Date().toLocaleString()
    user.OTPExpiry=new Date(Date.now() + 600_000).toLocaleString()
    await user.save()

    res.status(200).json({
        message:"An OTP is sent to the Email if Registered!"
    })

}



export {userRegister,userLogin,forgotPassword}