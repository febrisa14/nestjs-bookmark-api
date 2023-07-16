import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthRegisterDto, AuthLoginDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    register(@Body() dto: AuthRegisterDto) {
        return this.authService.register(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() dto: AuthLoginDto) {
        return this.authService.login(dto)
    }
}