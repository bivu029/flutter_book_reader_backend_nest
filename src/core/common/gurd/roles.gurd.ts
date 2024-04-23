
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/core/enum/role/role.enum';
import { ROLES_KEY } from '../decorators/role.decorator';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,private authservice:AuthService) {}

 async canActivate(context: ExecutionContext): Promise<boolean>{
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    //getting data from jwt and header beacuse in token we user role
    const request = context.switchToHttp().getRequest();
    const token: string = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return false; // No token provided, deny access
    }

    const decodedData = await this.authservice.verifyToken(token);

    if (!decodedData || !decodedData.role) {
      return false; // Invalid token or no role in decoded data, deny access
    }
    console.log(decodedData);
    
    const userRole = decodedData.role;
    console.log(userRole);
    
    return requiredRoles.some((role) => userRole?.includes(role));
  }
}
