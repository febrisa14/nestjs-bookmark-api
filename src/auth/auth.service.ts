import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDto, AuthLoginDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }

    async register(dto: AuthRegisterDto) {
        const hash = await argon.hash(dto.password);
        try {
            //create user
            const user = await this.prisma.user.create({
                data: {
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    email: dto.email,
                    password: hash
                },
                select: {
                    id: true,
                    email: true,
                    password: false,
                    firstName: true,
                    lastName: true
                }
            })

            const access_token = await this.signToken(user.id, user.email)

            return {
                data: user,
                access_token,
                message: "Register successfully"
            }
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ForbiddenException(
                        "Credential taken"
                    )
                }
                throw error;
            }
        }
    }

    async login(dto: AuthLoginDto) {
        //find user
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        //if user not found
        if (!user) throw new ForbiddenException("Credential incorrect")

        //compare password
        const passwordMatches = await argon.verify(user.password, dto.password)

        //if password incorrect
        if (!passwordMatches) throw new ForbiddenException("Credential incorrect")

        delete user.password

        const access_token = await this.signToken(user.id, user.email)

        return {
            data: user,
            access_token,
            message: "Successfully authentication"
        }
    }

    async signToken(userId: number, email: string): Promise<string> {
        const payload = {
            sub: userId,
            email
        }

        const secret = this.config.get('JWT_SECRET')

        const token = await this.jwt.signAsync(payload, {
            expiresIn: "15min",
            secret: secret
        })

        return token
    }
}