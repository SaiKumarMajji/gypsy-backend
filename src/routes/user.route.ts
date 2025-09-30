import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { Routes } from "../interface/routes.interface";

export class UserDetail implements Routes {
    public path = '/user-details';
    public router = Router();
    public controller = new UserController();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(`${this.path}`, this.controller.userDetail);
    }
}