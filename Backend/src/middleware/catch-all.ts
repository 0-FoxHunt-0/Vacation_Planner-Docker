import { Request, Response, NextFunction } from "express";

function catchAll(err: any, request: Request, response: Response, next: NextFunction): void {

    // Log error to the console:
    console.log(err);

    // Log error to file:
    // ...

    // Take error status code:
    const statusCode = err.status || 500;

    // Return back error:
    response.status(statusCode).send(err.message);
}

export default catchAll;