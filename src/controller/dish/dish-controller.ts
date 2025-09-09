import type { Request, Response } from "express";
import sequelize from "../../database/connection.js";
import { QueryTypes } from "sequelize";

const createDish=async(req:Request,res:Response)=>{
    const{dishName,description,price,currency,categoryId,status}=req.body
    const dishImage = req.file ? req.file.path : "https://cdn.pixabay.com/photo/2021/09/20/06/55/spaghetti-6639970_1280.jpg";

    if(!dishName || !description || !price || !categoryId || !status){
        res.status(400).json({
            message:"Please fill all the fields!"
        })
        return
    }

    await sequelize.query(`CREATE TABLE IF NOT EXISTS dish (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        dishName VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'NPR',
        categoryId INT,
        FOREIGN KEY (categoryId) REFERENCES category(id),
        status ENUM('available','unavailable') DEFAULT('available'),
        dishImage VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`)

        await sequelize.query(`INSERT INTO dish (dishName,description,price,currency,categoryId,status,dishImage) VALUES(?,?,?,?,?,?,?)`,{
            type:QueryTypes.INSERT,
            replacements:[dishName,description,price,currency,categoryId,status,dishImage]
        })
}

export {createDish}