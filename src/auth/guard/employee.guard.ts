import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtGuard } from './jwt.guard';

@Injectable()
export class EmployeeGuard extends JwtGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        await super.canActivate(context);  // Verify JWT first

        const request = context.switchToHttp().getRequest();
        const user = request['user'];  // User details added in JwtGuard
        if (!user || (user.sub.role != 'admin' && user.sub.role != 'employee')) {
            throw new ForbiddenException('Access restricted to employees only');
        }
        return true;
    }
}
