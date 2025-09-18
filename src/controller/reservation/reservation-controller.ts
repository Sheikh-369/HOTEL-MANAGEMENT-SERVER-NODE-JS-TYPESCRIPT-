import type { Request, Response } from "express";
import sequelize from "../../database/connection.js";
import { QueryTypes } from "sequelize";

const createReservation = async (req: Request, res: Response) => {
  const { userId, tableId, tableNumber, numberOfGuests, reservationTime, reservationStatus } = req.body;

  if (!userId || !tableId || !tableNumber || !numberOfGuests || !reservationTime || !reservationStatus) {
    res.status(400).json({
      message: "Please provide all the required information!",
    });
    return;
  }

  // 🔍 Check if the table is already reserved at the given time
  const existing = await sequelize.query(
    `SELECT * FROM reservations 
     WHERE tableId = ? AND reservationTime = ? AND reservationStatus = 'RESERVED'`,
    {
      type: QueryTypes.SELECT,
      replacements: [tableId, reservationTime],
    }
  );

  if (existing.length > 0) {
    res.status(409).json({
      message: "This table is already reserved at the selected time!",
    });
    return;
  }

  await sequelize.query(
    `INSERT INTO reservations (userId, tableId, tableNumber, numberOfGuests, reservationTime, reservationStatus, createdAt, updatedAt) 
     VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    {
      type: QueryTypes.INSERT,
      replacements: [userId, tableId, tableNumber, numberOfGuests, reservationTime, reservationStatus],
    }
  );

  res.status(201).json({
    message: "Reservation Created Successfully!",
  });
};

const editReservation = async (req: Request, res: Response) => {
  const reservationId = req.params.id;
  const { userId, tableId, tableNumber, numberOfGuests, reservationTime, reservationStatus } = req.body;

  if (!userId || !tableId || !tableNumber || !numberOfGuests || !reservationTime || !reservationStatus) {
    res.status(400).json({
      message: "Please provide all the required information!",
    });
    return;
  }

  // 🔍 Check for double-booking (exclude current reservation)
  const existing = await sequelize.query(
    `SELECT * FROM reservations 
     WHERE tableId = ? AND reservationTime = ? AND reservationStatus = 'RESERVED' AND id <> ?`,
    {
      type: QueryTypes.SELECT,
      replacements: [tableId, reservationTime, reservationId],
    }
  );

  if (existing.length > 0) {
    res.status(409).json({
      message: "This table is already reserved at the selected time!",
    });
    return;
  }

  await sequelize.query(
    `UPDATE reservations 
     SET userId=?, tableId=?, tableNumber=?, numberOfGuests=?, reservationTime=?, reservationStatus=?, updatedAt=NOW() 
     WHERE id=?`,
    {
      type: QueryTypes.UPDATE,
      replacements: [userId, tableId, tableNumber, numberOfGuests, reservationTime, reservationStatus, reservationId],
    }
  );

  res.status(200).json({
    message: "Reservation Updated Successfully!",
  });
};

const fetchReservations = async (req: Request, res: Response) => {
  const data = await sequelize.query(
    `
    SELECT 
      r.id,
      r.userId,
      u.userName,
      r.tableNumber,
      t.tableNumber AS tableNo,
      r.numberOfGuests,
      r.reservationTime,
      r.reservationStatus,
      r.createdAt,
      r.updatedAt
    FROM reservations r
    LEFT JOIN users u ON r.userId = u.id
    LEFT JOIN tables t ON r.tableNumber = t.id
    `,
    {
      type: QueryTypes.SELECT,
    }
  );

  res.status(200).json({
    message: "All Reservations Fetched Successfully!",
    data,
  });
};


const fetchSingleReservation = async (req: Request, res: Response) => {
  const reservationId = req.params.id;
  const data = await sequelize.query(`SELECT * FROM reservations WHERE id=?`, {
    type: QueryTypes.SELECT,
    replacements: [reservationId],
  });

  res.status(200).json({
    message: "Single Reservation Fetched Successfully!",
    data,
  });
};

const deleteReservation = async (req: Request, res: Response) => {
  const reservationId = req.params.id;

  await sequelize.query(`DELETE FROM reservations WHERE id=?`, {
    type: QueryTypes.DELETE,
    replacements: [reservationId],
  });

  res.status(200).json({
    message: "Reservation Deleted Successfully!",
  });
};

export { createReservation, editReservation, fetchReservations, fetchSingleReservation, deleteReservation };
