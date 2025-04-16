export const errorHandler = (statusCode,message)=>{
     const error = new Error(message);
     err.statusCode = statusCode;
     return error;
    }