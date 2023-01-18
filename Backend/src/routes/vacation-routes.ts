import express, { Request, Response, NextFunction } from "express";
import verifyAdmin from "../middleware/verify-admin";
import verifyLoggedIn from "../middleware/verify-logged-in";
import VacationModel from "../models/vacation-model";
import vacationService from "../services/vacation-service";
import cyber from "../utils/cyber";

const router = express.Router(); // Capital R

// GET http://localhost:4000/api/vacations
router.get(
  "/vacations",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = cyber.getUserFromToken(request)
      const vacations = await vacationService.getAllVacations(user)
      response.json(vacations)
    } catch (err: any) {
      next(err);
    }
  }
);

// GET http://localhost:4000/api/vacations
router.get(
  "/vacations/:id([0-9]+)",
  verifyLoggedIn,
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
  verifyAdmin,
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
  verifyAdmin,
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