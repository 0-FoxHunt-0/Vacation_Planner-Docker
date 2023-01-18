import express, { Request, Response, NextFunction } from "express";
import verifyAdmin from "../middleware/verify-admin";
import verifyLoggedIn from "../middleware/verify-logged-in";
import VacationModel from "../models/vacation-model";
import vacationService from "../services/vacation-service";
import cyber from "../utils/cyber";

const router = express.Router(); // Capital R

// GET http://localhost:4000/api/user/vacations
router.get(
  "/user/vacations",
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

// POST http://localhost:4000/api/user/follow/:vacationId([0-9]+)
router.post(
  "/user/follow/:vacationId([0-9]+)",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = cyber.getUserFromToken(request)
      const vacationId = +request.params.id;
      await vacationService.follow(user.userId, vacationId)
      response.sendStatus(201)
    } catch (err: any) {
      next(err);
    }
  }
);

// DELETE http://localhost:4000/api/user/unfollow/:vacationId([0-9]+)
router.delete(
  "/user/unfollow/:vacationId([0-9]+)",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = cyber.getUserFromToken(request)
      const vacationId = +request.params.id;
      await vacationService.unfollow(user.userId, vacationId)
      response.sendStatus(204)
    } catch (err: any) {
      next(err);
    }
  }
);

// ----------------------------------------------------------------------------------------------------------------------------------------------- //

// GET http://localhost:4000/api/admin/vacations
router.get(
  "/admin/vacations",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacations = await vacationService.getAllVacationsForAdmin()
      response.json(vacations)
    } catch (err: any) {
      next(err);
    }
  }
);

// GET http://localhost:4000/api/admin/vacations
router.get(
  "/admin/vacations/:id([0-9]+)",
  verifyAdmin,
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
  "/admin/vacations",
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
  "/admin/vacations",
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