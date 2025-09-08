import type { Request, Response } from "express";
import sequelize from "../../database/connection.js";
import { QueryTypes } from "sequelize";

const createCategory=async (req:Request,res:Response)=>{
    const {categoryName}=req.body
    if(!categoryName){
        res.status(400).json({
            message:"Please Provide Category Name!"
        })
        return
    }

    await sequelize.query(`CREATE TABLE IF NOT EXISTS category (
        id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
        categoryName VARCHAR(50) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

        )`)

        await sequelize.query(`INSERT INTO category (categoryName) VALUES(?)`,{
            type:QueryTypes.INSERT,
            replacements:[categoryName]
        })

        res.status(200).json({
            message:"Category Created Successfully!"
        })
}

const editCategory=async (req:Request,res:Response)=>{
    const {categoryName}=req.body
    const categoryId=req.params.id
    if(!categoryName){
        res.status(400).json({
            message:"Please Provide Category Name!"
        })
        return
    }

    await sequelize.query(`UPDATE category SET
        categoryName=? WHERE id=?`,{
            type:QueryTypes.UPDATE,
            replacements:[categoryName,categoryId]
        })

        res.status(200).json({
            message:"Category Updated Successfully!"
        })
}

const deleteCategory = async (req: Request, res: Response) => {
    const categoryId = req.params.id;

    if (!categoryId) {
        res.status(400).json({
            message: "Category ID is required",
        });
        return;
    }

    await sequelize.query(
        `DELETE FROM category WHERE id = ?`,
        {
            type: QueryTypes.DELETE,
            replacements: [categoryId],
        }
    );

    res.status(200).json({
        message: "Category deleted successfully",
    });
};

const fetchCategories=async(req:Request,res:Response)=>{
    const data=await sequelize.query(`SELECT * FROM category`,{
        type:QueryTypes.SELECT
    })

    res.status(200).json({
        message:"All the categories are fetched successfully!",
        data
    })
}

const fetchSingleCategory=async(req:Request,res:Response)=>{
    const categoryId=req.params.id
    const data=await sequelize.query(`SELECT * FROM category WHERE id=?`,{
        type:QueryTypes.SELECT,
        replacements:[categoryId]
    })

    res.status(200).json({
        message:"Category fetched successfully!",
        data
    })
}

export {createCategory,editCategory,deleteCategory,fetchCategories,fetchSingleCategory}