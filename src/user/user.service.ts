import {
    ForbiddenException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import * as argon from 'argon2';
import { user_account } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getMe(info: {id, username}) {
        const user = await this.prisma.user_account.findUnique({
            where: {
                account_id: info.id,
                username: info.username
            }
        });

        return user;
    }

    async getUsers() {
        const users = await this.prisma.user_account.findMany({
            select: {
                account_id: true,
                username: true,
                full_name: true,
                title: true,
                sex: true,
                birth_date: true,
                phone: true,
                email: true,
                address: true,
                province_code: true,
                district_code: true,
                ward_code: true,
                is_department_leader: true
            }
        });
        return {data: users};
    }

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
