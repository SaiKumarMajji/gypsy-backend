import { IUser } from "../interface";
import { UserDetailModel } from "../models/user.model";

export class UserDetailService {
    public async userDetail(userDetailData: IUser): Promise<any> {
        const newUserDetail = await UserDetailModel.create(userDetailData);
        return newUserDetail;
    }
}
