import {
    IsEnum,
    IsNotEmpty,
    IsString,
} from "class-validator";
import { Education, EducationStream } from "../constants/defaultValues";

export class UserDetailDto {
    @IsNotEmpty({ message: "E-10001" })
    @IsString()
    full_name: string;

    @IsNotEmpty({ message: "E-10002" })
    @IsString()
    mobile_number: number;


    @IsNotEmpty({ message: "E-10003" })
    @IsEnum(Education, { each: true })
    education: Education[];

    @IsNotEmpty({ message: "E-10004" })
    @IsEnum(EducationStream, { each: true })
    stream: EducationStream[];

    @IsNotEmpty({ message: "E-10005" })
    @IsString()
    city: string;

    @IsNotEmpty({ message: "E-10006" })
    @IsString()
    help: string;
}
