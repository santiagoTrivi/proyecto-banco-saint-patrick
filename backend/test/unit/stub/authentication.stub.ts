import { CONFIG_JWT_TIMING } from '../../../src/config/jwt.cofig';
import { IAuthentication } from '../../../src/auth/domain/interface/IAuthentication';

export const AuthenticationStub = (): IAuthentication => {
  return {
    expireIn: CONFIG_JWT_TIMING.access_token_expireIn,
    access_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNjRmM2ZlMDA5YzkyMWRhNTIwMjY4ZGNmIiwidXNlcm5hbWUiOiJzdXNzYW5tZW5kb3phIiwiaWF0IjoxNjk0MjA5MjE5LCJleHAiOjE2OTQyMDkyNzl9.jDmbeB_TcASdc9UewOoU5K4dgLJrK58wNsQehlY99bg',
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNjRmM2ZlMDA5YzkyMWRhNTIwMjY4ZGNmIiwidXNlcm5hbWUiOiJzdXNzYW5tZW5kb3phIiwiaWF0IjoxNjk0MjA5MjE5LCJleHAiOjE2OTQ4MTQwMTl9.jAriWWbqq0Pf0_ypBNhcpVVBi7pnQnNjq3fUIS-lU94',
    refreshExpireIn: CONFIG_JWT_TIMING.refresh_token_expireIn,
  };
};
