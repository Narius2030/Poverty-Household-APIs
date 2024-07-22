import {
    ForbiddenException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';
import * as argon from 'argon2';
import { user_account } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async editMe(userId: string, dto: EditUserDto) {
        dto.passwd = await argon.hash(dto.passwd);
        const user = await this.prisma.user_account.update({
            where: {
                account_id: userId
            },
            data: {
                ...dto
            }
        });

        delete user.passwd;
        return user;
    }

    async editUser(userName: string, dto: EditUserDto) {
        const isUser = await this.prisma.user_account.findFirst({
            where: {
                username: userName
            }
        });

        if (!isUser) {
            throw new ForbiddenException(
                "Not found with username's account supplied"
            );
        }

        dto.passwd = await argon.hash(dto.passwd);
        const user = await this.prisma.user_account.update({
            where: {
                account_id: isUser.account_id
            },
            data: {
                ...dto
            }
        });

        delete user.passwd;
        return user;
    }

    async deleteUser(userName: string) {
        let user: user_account;
        try {
            user = await this.prisma.user_account.delete({
                where: {
                    username: userName
                }
            });
        } catch (exc) {
            throw new NotFoundException(
                'Not found user account supplied'
            );
        }

        delete user.passwd;
        return user;
    }
}
