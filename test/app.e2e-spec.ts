import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { SignInUADto, SignUpUADto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';

describe('App e2e', () => {
    let app: INestApplication;
    let prisma: PrismaService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();
        app = moduleRef.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true
            })
        );
        await app.init();
        await app.listen(3333);

        prisma = app.get(PrismaService);
        await prisma.cleanDB();
        pactum.request.setBaseUrl('http://localhost:3333');
    });

    describe('Auth', () => {
        describe('Sign Up', () => {
            it('should Sign Up', () => {
                const dto: SignUpUADto = {
                    username: 'tester03',
                    full_name: 'Valdimir Testova',
                    passwd: 'test123',
                    title: 'Chánh Thanh tra',
                    sex: 'Female'
                };
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .withBody(dto)
                    .expectStatus(201);
            });
        });

        describe('Sign In', () => {
            it('should Sign In', () => {
                const dto: SignInUADto = {
                    username: 'tester03',
                    passwd: 'test123'
                };
                return pactum
                    .spec()
                    .post('/auth/signin')
                    .withBody(dto)
                    .expectStatus(200)
                    .stores('userAt', 'access_token');
            });
        });
    });

    describe('User e2e', () => {
        describe('Get me', () => {
            it('Should get that owner information', () => {
                return pactum
                    .spec()
                    .get('/user/me')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}'
                    })
                    .expectStatus(200);
            });
        });

        describe('Get all users', () => {
            it('Should get all user information', () => {
                return pactum
                    .spec()
                    .get('/user/all')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}'
                    })
                    .expectStatus(200);
            });
        });

        describe('Edit owner information', () => {
            it('Should eidt information', () => {
                const dto: EditUserDto = {
                    passwd: '12345678',
                    // username: 'tester',
                    email: 'test@gmail.com'
                }
                return pactum
                    .spec()
                    .patch('/user/edit')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}'
                    })
                    .withBody(dto)
                    .expectStatus(200);
            });
        });
    });

    afterAll(() => {
        app.close();
    });

    it.todo('should pass');
});
