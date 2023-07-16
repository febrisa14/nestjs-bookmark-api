import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/decorator';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    @Get()
    getProfile(@GetUser() user: User) {
        return user;
    }
}
