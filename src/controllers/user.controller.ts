
import { Request, Response } from "express";
import { UserDetailDto } from "../dtos/user.dto";
import { UserDetailService } from "../services/user.service";
import { validatePayload } from "../decorators";
import { errorResponse, successResponse } from "../utils/response.util";

export class UserController {

    public userDetailService = new UserDetailService();

    constructor() {
        this.userDetail = this.userDetail.bind(this);
    }

    @validatePayload(UserDetailDto)
    async userDetail(req: Request, res: Response) {
        const payload: UserDetailDto = req.body;

        const data = await this.userDetailService.userDetail(payload as any);
        if (!data) return errorResponse(res, "E-10001");

        return data
            ? successResponse(res, "S-10164", data)
            : errorResponse(res, "E-10001");
    }
}
