import multer from "multer";
import { storage } from "../services/cloudinaryConfig.js";
const upload=multer({storage:storage})

export default upload