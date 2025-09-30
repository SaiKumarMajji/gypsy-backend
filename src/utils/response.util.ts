import { Response } from "express";
import { keys } from "../constants";
export class SuccessResponse {
  public status: string;
  public status_code: string;
  public data?: object | any;
  public auth_token?: object | any;

  constructor(status_code: string, data: object | any = undefined, auth_token: object | any = undefined) {
    this.status = keys.SUCCESS;
    this.status_code = status_code;
    this.auth_token = auth_token;
    this.data = data;
  }
}

export class ErrorResponse {
  public status: string;
  public status_code: string;
  public message?: string;

  constructor(status_code: string, message: object | any = undefined) {
    this.status = keys.ERROR;
    this.status_code = status_code;
    this.message = message;
  }
}

export const errorResponse = (res: Response, errorCode: string, data?: any, status?: number) => {
  return res.status(status || 400).json(new ErrorResponse(errorCode, data))
}

export const successResponse = (res: Response, successCode: string, data?: any, status?: number) => {
  return res.status(status || 200).json(new SuccessResponse(successCode, data))
}



