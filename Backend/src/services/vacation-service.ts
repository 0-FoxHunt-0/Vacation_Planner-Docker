import { OkPacket } from "mysql";
import imagePaths from "../models/enum";
import VacationModel from "../models/vacation-model";
import dal from "../utils/dal";
import imageHandler from "../utils/image-handler";

async function getAllVacations(): Promise<VacationModel[]> {
  const sql = `SELECT * FROM vacations`;

  const vacations = await dal.execute(sql);

  return vacations;
}

async function getVacationById(id: number): Promise<VacationModel> {
  const sql = `SELECT * FROM vacations WHERE vacationId = ?`;

  const vacations = await dal.execute(sql, id);

  return vacations;
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {
  // Save image to disk and get back its name
  vacation.imageName = await imageHandler.saveImage(
    vacation.image,
    imagePaths.vacations
  );

  const sql = `INSERT INTO vacations VALUES (DEFAULT, ?, ?, ?, ?, ?, ?)`;

  // Execute query:
  const result: OkPacket = await dal.execute(
    sql,
    vacation.destination,
    vacation.destination,
    vacation.startDate,
    vacation.endDate,
    vacation.price,
    vacation.imageName
  );
  vacation.vacationId = result.insertId;

  // Delete image file from vacation object:
  delete vacation.image;

  // Return data:
  return vacation;
}

async function deleteVacation(id: number): Promise<void> {
  const sql = `DELETE FROM vacations WHERE vacationId = ?`;

  await dal.execute(sql, id);
}

export default {
  getAllVacations,
  getVacationById,
  addVacation,
  deleteVacation,
};
