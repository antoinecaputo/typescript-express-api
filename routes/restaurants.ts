import {Request, Response, NextFunction} from "express";

export const RestaurantHandler = (req:Request, res:Response, next:NextFunction) => {
    res.json({
        restaurant: req.params.restaurantId
    });
}
