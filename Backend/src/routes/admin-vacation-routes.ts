import express, { Request, Response, NextFunction } from "express";
import verifyAdmin from "../middleware/verify-admin";
import VacationModel from "../models/vacation-model";
import adminVacationService from "../services/admin-vacation-service";

const adminRouter = express.Router(); // Capital R

// GET http://localhost:4000/api/admin/vacations
adminRouter.get(
  "/admin/vacations",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacations = await adminVacationService.getAllVacationsForAdmin()
      response.json(vacations)
    } catch (err: any) {
      next(err);
    }
  }
);

// GET http://localhost:4000/api/admin/vacations
adminRouter.get(
  "/admin/vacations/:id([0-9]+)",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id
      const vacation = await adminVacationService.getVacationById(id)
      response.json(vacation)
    } catch (err: any) {
      next(err);
    }
  }
);

adminRouter.post(
  "/admin/vacations",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.image = request.files?.image;
      const vacation = new VacationModel(request.body)
      const addedVacation = await adminVacationService.addVacation(vacation)
      response.status(201).json(addedVacation)
    } catch (err: any) {
      next(err);
    }
  }
);

adminRouter.delete(
  "/admin/vacations",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      await adminVacationService.deleteVacation(id)
      response.sendStatus(204)
    } catch (err: any) {
      next(err);
    }
  }
);

export default adminRouter;