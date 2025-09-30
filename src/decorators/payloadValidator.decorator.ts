import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ObjectConvert, transformQuery } from '../utils/commonFunction.util';
import { ErrorResponse } from '../utils/response.util';

// function for check nested DTO validation
function checkError(errors: ValidationError[] | any) {
  if (errors.length > 0) {
    if(errors[0].value !== undefined && errors[0].children.length > 0) {
      return checkError(errors[0].children);      
    } else {
      const status_code = Object.values(errors[0].constraints)[0];
      return status_code;
    }
  } else {
    const status_code = Object.values(errors[0].constraints)[0];
    return status_code;
  }
}

export function validatePayload(dtoClass: any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const req = args[0];
      const res = args[1];
      try {
        const payload = req.method === 'GET' ? transformQuery(req.query) : req.body;
        const errors: any[] = await validate(plainToClass(dtoClass, payload), {skipMissingProperties: false});
        if (errors && errors.length > 0) {
          const error: any = errors[0].children.length > 0
            ? checkError(errors[0].children)
            : Object.values(errors[0].constraints)[0];

          if(error) throw new Error(error);
        }        
        return originalMethod.apply(this, args);

      } catch (err: any) {
        console.log(err); // for development purpose
        res.status(400).json(new ErrorResponse(err.message));
      }
    };

    return descriptor;
  };
}

export function validatePayloadForMultipart(dtoClass: any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const req = args[0];
      const res = args[1];
      try {
        const payload = ObjectConvert(req.body);
        const errors : any = await validate(plainToClass(dtoClass, payload), {skipMissingProperties: false});
        if (errors.length > 0) {
          const error: any = errors[0].children.length > 0
            ? checkError(errors[0].children)
            : Object.values(errors[0].constraints)[0];

          if(error) throw new Error(error);
        }        
        return originalMethod.apply(this, args);
      } catch (err: any) {
        console.log(err); // for development purpose
        res.status(400).json(new ErrorResponse(err.message));
      }
    };

    return descriptor;
  };
}
