import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtGuard } from './jwt.guard';  // Assuming JwtGuard is in the same directory

@Injectable()
export class AdminGuard extends JwtGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        await super.canActivate(context);  // Verify JWT first

        const request = context.switchToHttp().getRequest();
        const user = request['user'];  // User details added in JwtGuard

        if (!user || user.sub.role !== 'admin') {
            throw new ForbiddenException('Access restricted to admins only');
        }
        return true;
    }
}