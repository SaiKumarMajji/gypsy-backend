
import { Request, Response } from "express";
import { UserDetailDto } from "../dtos/user.dto";
import { UserDetailService } from "../services/user.service";
import { validatePayload } from "../decorators";
import { errorResponse, successResponse } from "../utils/response.util";
import { getEnumKeysByValues, sendEmail } from "../utils";
import { Education, EducationStream } from "../constants";

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

    

        const emailContent = `
  <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f9fc; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); overflow: hidden;">
      <div style="background-color: #0052cc; color: #ffffff; padding: 15px 20px; text-align: center;">
        <h2 style="margin: 0; font-size: 22px;">🎉 New User Details Submitted</h2>
      </div>
      <div style="padding: 25px; color: #333333;">
        <p style="font-size: 16px; margin-bottom: 15px; color: #333333">
          A new user has submitted their details:
        </p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: 600;">Full Name:</td>
            <td style="padding: 8px 0;">${payload.full_name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600;">Mobile:</td>
            <td style="padding: 8px 0;">${payload.mobile_number}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600;">Education:</td>
            <td style="padding: 8px 0;">${getEnumKeysByValues(Education, payload.education)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600;">Stream:</td>
            <td style="padding: 8px 0;">${getEnumKeysByValues(EducationStream, payload.stream)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600;">City:</td>
            <td style="padding: 8px 0;">${payload.city}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600;">Help:</td>
            <td style="padding: 8px 0;">${payload.help}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
`;

        // Send emails
        await sendEmail(["saikumar170325@gmail.com","hamsalekhayadav@gmail.com"], "New User Details", emailContent);

        return data
            ? successResponse(res, "S-10001", data)
            : errorResponse(res, "E-10007");
    }
}
