import type { Request, Response } from "express";
import sequelize from "../../database/connection.js";
import { QueryTypes } from "sequelize";

// Create a new table
const createTable = async (req: Request, res: Response) => {
  const { tableNumber, seats, tableStatus } = req.body;

  if (!tableNumber || !seats) {
    res.status(400).json({ message: "Please provide tableNumber and seats!" });
    return;
  }

  await sequelize.query(
    `INSERT INTO tables (tableNumber, seats, tableStatus, createdAt, updatedAt) 
     VALUES (?, ?, ?, NOW(), NOW())`,
    {
      type: QueryTypes.INSERT,
      replacements: [tableNumber, seats, tableStatus || 'available']
    }
  );

  res.status(201).json({ message: "Table Created Successfully!" });
};


// Edit an existing table
const editTable = async (req: Request, res: Response) => {
  const tableId = req.params.id;
  const { tableNumber, seats, tableStatus } = req.body;

  if (!tableNumber || !seats) {
    res.status(400).json({ message: "Please provide tableNumber and seats!" });
    return;
  }

  await sequelize.query(
    `UPDATE tables SET tableNumber=?, seats=?, tableStatus=?, updatedAt=NOW() WHERE id=?`,
    {
      type: QueryTypes.UPDATE,
      replacements: [tableNumber, seats, tableStatus || "available", tableId],
    }
  );

  res.status(200).json({ message: "Table Updated Successfully!" });
};


// Fetch all tables
const fetchTables = async (req: Request, res: Response) => {
  const data = await sequelize.query(`SELECT * FROM tables`, { type: QueryTypes.SELECT });
  res.status(200).json({ message: "All Tables Fetched Successfully!", data });
};


// Fetch a single table by ID
const fetchSingleTable = async (req: Request, res: Response) => {
  const tableId = req.params.id;
  const data = await sequelize.query(`SELECT * FROM tables WHERE id=?`, {
    type: QueryTypes.SELECT,
    replacements: [tableId],
  });
  res.status(200).json({ message: "Single Table Fetched Successfully!", data });
};


// Delete a table by ID
const deleteTable = async (req: Request, res: Response) => {
  const tableId = req.params.id;
  await sequelize.query(`DELETE FROM tables WHERE id=?`, {
    type: QueryTypes.DELETE,
    replacements: [tableId],
  });
  res.status(200).json({ message: "Table Deleted Successfully!" });
};


export { createTable, editTable, fetchTables, fetchSingleTable, deleteTable };
