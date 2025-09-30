import mongoose, { Schema } from "mongoose";
import { IUser } from "../interface/user.interface";

const UserSchema: Schema = new Schema<IUser>(
    {
        full_name: { type: String, required: true },
        mobile_number: { type: String, required: true },
        education: { type: [Number], required: true },
        stream: { type: [Number], required: true },
        city: { type: String, required: true },
        help: { type: String, required: true },
        created_at: { type: Date, default: Date.now },
        created_by: { type: Schema.Types.ObjectId, ref: "User" },
        updated_at: { type: Date },
        updated_by: { type: Schema.Types.ObjectId, ref: "User" },
    },

);
const UserDetailModel = mongoose.model<IUser>("User", UserSchema);
export { UserDetailModel };

