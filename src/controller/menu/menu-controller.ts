import type { Request, Response } from "express";
import sequelize from "../../database/connection.js";
import { QueryTypes } from "sequelize";

const createMenu = async (req: Request, res: Response) => {
  const {
    menuName,
    menuDescription,
    menuPrice,
    categoryId,
    menuIngredients,
    menuStatus,
    menuType,
  } = req.body;

  // Provide defaults if some fields are missing
  const menuImage = req.file
    ? req.file.path
    : "https://cdn.pixabay.com/photo/2021/09/20/06/55/spaghetti-6639970_1280.jpg";

  // Validate required fields
  if (!menuName || !menuDescription || !menuPrice || !categoryId) {
    res.status(400).json({
      message: "Please fill all the required fields!",
    });
    return;
  }

  // Execute raw SQL query
  await sequelize.query(
    `INSERT INTO menu 
      (menuName, menuDescription, menuPrice, menuIngredients, categoryId, menuStatus, menuImage, menuType, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    {
      type: QueryTypes.INSERT,
      replacements: [
        menuName,
        menuDescription,
        menuPrice,
        menuIngredients || null, // optional
        categoryId,
        menuStatus || 'available',
        menuImage,
        menuType || 'veg',
      ],
    }
  );

  res.status(201).json({
    message: "Menu Created Successfully!",
  });
};

const editMenu = async (req: Request, res: Response) => {
  const menuId = req.params.id;
  const {
    menuName,
    menuDescription,
    menuPrice,
    categoryId,
    menuIngredients,
    menuStatus,
    menuType,
  } = req.body;

  // Provide defaults if missing
  const menuImage = req.file
    ? req.file.path
    : "https://cdn.pixabay.com/photo/2021/09/20/06/55/spaghetti-6639970_1280.jpg";

  // Validate required fields
  if (!menuName || !menuDescription || !menuPrice || !categoryId) {
    res.status(400).json({ message: "Please fill all the required fields!" });
    return;
  }

  // Execute raw SQL update
  await sequelize.query(
    `UPDATE menu 
     SET menuName=?, menuDescription=?, menuPrice=?, menuIngredients=?, categoryId=?, menuStatus=?, menuImage=?, menuType=?, updatedAt=NOW()
     WHERE id=?`,
    {
      type: QueryTypes.UPDATE,
      replacements: [
        menuName,
        menuDescription,
        menuPrice,
        menuIngredients || null, // optional
        categoryId,
        menuStatus || null,
        menuImage,
        menuType || null,
        menuId,
      ],
    }
  );

  res.status(200).json({ message: "Menu Updated Successfully!" });
};


const fetchMenu = async (req: Request, res: Response) => {
  const data = await sequelize.query(
    `
    SELECT menu.*, category.categoryName
    FROM menu
    LEFT JOIN category ON menu.categoryId = category.id
    `,
    { type: QueryTypes.SELECT }
  );

  res.status(200).json({ message: "Menu Fetched Successfully!", data });
};



const fetchSingleMenu = async (req: Request, res: Response) => {
  const menuId = req.params.id;
  const data = await sequelize.query(`SELECT * FROM menu WHERE id=?`, {
    type: QueryTypes.SELECT,
    replacements: [menuId],
  });

  res.status(200).json({ message: "Menu Fetched Successfully!", data });
};

const deleteMenu = async (req: Request, res: Response) => {
  const menuId = req.params.id;
  await sequelize.query(`DELETE FROM menu WHERE id=?`, {
    replacements: [menuId],
  });

  res.status(200).json({ message: "Menu Deleted Successfully!" });
};

export { createMenu, editMenu, fetchMenu, fetchSingleMenu, deleteMenu };
