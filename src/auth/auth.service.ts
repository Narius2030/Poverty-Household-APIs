import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDWADto, SignUpDWDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) {}

    async signUpDWAccount(dto: SignUpDWDto) {
        // hash user's password by Argon
        const hashed_passwd = await argon.hash(dto.passwd);

        // save the user to db
        const user = await this.prisma.district_ward_account.create({
            data: {
                username: dto.username,
                passwd: hashed_passwd,
                district_code: dto.district_code,
                ward_code: dto.ward_code
            }
        });

        return this.signToken(user.account_id, user.username);
    }

    async signInDWAccount(dto: SignInDWADto) {
        const user = await this.prisma.district_ward_account.findUnique({
                where: {
                    account_id: dto.account_id
                }
            });

        if (!user) {
            throw new NotFoundException('Not found any users');
        }

        const pwdMatch = await argon.verify(user.passwd, dto.passwd);
        if (!pwdMatch) {
            throw new ForbiddenException("Credential incorrect")
        }

    }

    async signToken(userId: string, username: string) {
        const payload = {
            id: userId,
            username: username
        };

        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '30m',
            secret: secret
        });

        return { access_token: token };
    }
}
