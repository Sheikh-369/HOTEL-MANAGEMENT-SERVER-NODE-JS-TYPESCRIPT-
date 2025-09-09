import {v2 as cloudinary} from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const storage= new CloudinaryStorage({
    cloudinary,
    params:async(req,file)=>({
        folder:"The Restaurant of 90's"
    })
})

export {cloudinary,storage}