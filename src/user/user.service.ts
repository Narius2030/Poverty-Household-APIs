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

    async getMe(info: any) {
        const user = await this.prisma.user_account.findUnique({
            where: {
                account_id: info.account_id
            }
        });

        return { data: user };
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
                province: true,
                district: true,
                ward: true,
                is_department_leader: true
            }
        });
        return { data: users };
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

        return { data: user };
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

        if (dto.passwd) {
            dto.passwd = await argon.hash(dto.passwd);
        }
        
        const user = await this.prisma.user_account.update({
            where: {
                account_id: isUser.account_id
            },
            data: {
                ...dto
            }
        });

        delete user.passwd;
        return { data: user };
    }

    async deleteUser(accountId: string) {
        let user: user_account;
        try {
            user = await this.prisma.user_account.delete({
                where: {
                    account_id: accountId
                }
            });
        } catch (exc) {
            throw new NotFoundException(
                'Not found user account supplied'
            );
        }

        delete user.passwd;
        return { data: user };
    }
}
