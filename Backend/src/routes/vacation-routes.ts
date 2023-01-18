import express, { Request, Response, NextFunction } from "express";
import productsService from "../services/auth-service";

const router = express.Router(); // Capital R

// GET http://localhost:4000/api/___
router.get(
  "/vacations",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const sql = 
      `
        SELECT * FROM vacations
      `
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;