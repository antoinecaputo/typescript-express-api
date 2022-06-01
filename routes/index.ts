import {Request, Response, NextFunction} from "express";
import createError from 'http-errors';

export const IndexHandler = (req:Request, res:Response, next:NextFunction) => {
    res.status(200).json({
        status: `${Date.now()} API is up and running`
    })
}
export const NotFoundHandler = (req:Request, res:Response, next:NextFunction) => {
    res.status(404).json({
        error: "Not found"
    });
}

export const ErrorHandler = (err: any, req: Request, res:Response, next:NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
};
