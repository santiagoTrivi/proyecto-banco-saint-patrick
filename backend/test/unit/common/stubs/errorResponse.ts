

export const UnauthorizedErrorReposnse = () => {
    return  {
        message: "Unauthorized",
        statusCode: 401
    };
}

export const usernameExistError = () => {
    return {
        message: "USERNAME_ALREADY_REGISTERED",
        error: "Bad Request",
        statusCode: 400
      };
}