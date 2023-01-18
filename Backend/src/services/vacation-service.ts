import { OkPacket } from "mysql";
import imagePaths from "../models/enum";
import UserModel from "../models/user-model";
import VacationModel from "../models/vacation-model";
import dal from "../utils/dal";
import imageHandler from "../utils/image-handler";

async function getAllVacations(user: UserModel): Promise<VacationModel[]> {
  //   const sql = `SELECT * FROM vacations`;

  const sql = `
    SELECT DISTINCT 
            V.*,
            EXISTS(SELECT * FROM following WHERE vacationId = vacationId = F.vacationId AND userId = ?) AS isFollowing,
            COUNT(F.userId) AS followerCount
        FROM vacations AS V LEFT JOIN following AS F
        ON V.vacationId = F.vacationId
        GROUP BY vacationId
        ORDER BY startDate
`;

  const vacations = await dal.execute(sql, user.userId);

  return vacations;
}

async function follow(userId: number, vacationId: number): Promise<void> {
    const sql = `INSERT INTO following VALUES(?, ?)`
    await dal.execute(sql, userId, vacationId);
}

async function unfollow(userId: number, vacationId: number): Promise<void> {
    const sql = `DELETE FROM following WHERE userId = ? AND vacationId = ?`
    await dal.execute(sql, userId, vacationId);
}

// ----------------------------------------------------------------------------------------------------------------------------------------------- //

async function getAllVacationsForAdmin(): Promise<VacationModel[]> {
  //   const sql = `SELECT * FROM vacations`;

  const sql = `SELECT * FROM vacations ORDER BY startDate`;
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
  getAllVacationsForAdmin,
  getVacationById,
  addVacation,
  deleteVacation,
  follow,
  unfollow,
};
