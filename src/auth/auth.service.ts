import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaClient) {}

    async getHello() {
        return 'Hello World!';
    }
}
