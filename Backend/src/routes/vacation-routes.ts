import express, { Request, Response, NextFunction } from "express";
import VacationModel from "../models/vacation-model";
import vacationService from "../services/vacation-service";

const router = express.Router(); // Capital R

// GET http://localhost:4000/api/vacations
router.get(
  "/vacations",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacations = await vacationService.getAllVacations()
      response.json(vacations)
    } catch (err: any) {
      next(err);
    }
  }
);

// GET http://localhost:4000/api/vacations
router.get(
  "/vacations/:id([0-9]+)",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id
      const vacation = await vacationService.getVacationById(id)
      response.json(vacation)
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/vacations",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.image = request.files?.image;
      const vacation = new VacationModel(request.body)
      const addedVacation = await vacationService.addVacation(vacation)
      response.status(201).json(addedVacation)
    } catch (err: any) {
      next(err);
    }
  }
);

router.delete(
  "/vacations",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      await vacationService.deleteVacation(id)
      response.sendStatus(204)
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;