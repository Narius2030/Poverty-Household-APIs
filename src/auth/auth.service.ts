import {
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpUADto, SignInUADto } from './dto';
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

    async signUpUserAccount(dto: SignUpUADto) {
        // hash user's password by Argon
        const hashed_passwd = await argon.hash(dto.passwd);

        // save the user to db
        const user = await this.prisma.user_account.create({
            data: {
                username: dto.username,
                passwd: hashed_passwd,
                full_name: dto.full_name,
                title: dto.title,
                sex: dto.sex
            }
        });

        return this.signToken(user.account_id, user.username);
    }

    async signInUserAccount(dto: SignInUADto) {
        const user = await this.prisma.user_account.findFirst({
            where: {
                username: dto.username
            }
        });

        if (!user) {
            throw new UnauthorizedException("User account can't be found");
        }

        const pwdMatch = await argon.verify(user.passwd, dto.passwd);
        if (!pwdMatch) {
            throw new UnauthorizedException("User account can't be found");
        }

        return this.signToken(user.account_id, user.username);
    }

    async signToken(
        userId: string,
        username: string
    ): Promise<{ access_token }> {
        const payload = {
            account_id: userId,
            username: username
        };

        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '1d',
            secret: secret
        });

        return { access_token: token };
    }
}
