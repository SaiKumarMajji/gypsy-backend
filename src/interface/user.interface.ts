import { ObjectId } from "mongoose";
import { Education, EducationStream } from "../constants/defaultValues";

export interface IUser {
    full_name: string;
    mobile_number: string;
    education: Education[]
    stream: EducationStream[];
    city: string;
    help: string;
    created_at?: Date;
    created_by?: ObjectId;
    updated_at?: Date;
    updated_by?: ObjectId;
}

