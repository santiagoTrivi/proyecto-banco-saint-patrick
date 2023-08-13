import { AuthGuard } from "@nestjs/passport";


export class RefreshJwtGuard extends AuthGuard('refresh_token'){}