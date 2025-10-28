import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/auth/user.decorator';
import { UserRole } from './user.entity';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {

    constructor(private usersService: UsersService) {
        this.usersService = usersService;
    }

    @Get()
    async getMyProfile(@User() currentUser: any) {
        const me = await this.usersService.findByEmail(currentUser.email);
        return { message: 'Tu perfil', user: me };
    }

    @Get(':id')
    @Roles(UserRole.ADMIN)
    async getProfileById(@Param('id') id: string) {
        const user = await this.usersService.findById(Number(id));
        if (!user) {
            return { message: 'Usuario no encontrado' };
        }
        return { message: 'Perfil del usuario solicitado', user };
    }

}

