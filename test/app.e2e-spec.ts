import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { SignInUADto, SignUpUADto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';
import * as argon from 'argon2';
import { PeriodDto } from 'src/period/dto';
import { FamilyInfo } from 'src/family/dto';

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

    /*** Authentication e2e tests ***/

    describe('Authentication', () => {
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

    /*** User e2e tests ***/

    describe('User account', () => {
        describe('Get me', () => {
            it('Should get that owner information', () => {
                return pactum
                    .spec()
                    .get('/user/me')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}'
                    })
                    .expectStatus(200)
                    .stores('username', 'data.username');
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
            it('Should edit information', () => {
                const dto: EditUserDto = {
                    passwd: '12345678',
                    email: 'test@gmail.com'
                };
                return pactum
                    .spec()
                    .patch('/user/edit')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}'
                    })
                    .withBody(dto)
                    .expectStatus(200)
                    .expectBodyContains('$S{username}')
                    .expectBodyContains(dto.email);
            });
        });

        describe('Edit other user account', () => {
            it('Should edit information', () => {
                const dto: EditUserDto = {
                    email: 'test0edit@gmail.com',
                    phone: '+84901529332'
                };
                return pactum
                    .spec()
                    .patch('/user/edit/{username}')
                    .withPathParams('username', '$S{username}')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}'
                    })
                    .withBody(dto)
                    .expectStatus(200)
                    .expectBodyContains('$S{username}')
                    .expectBodyContains('+84901529332')
                    .expectBodyContains('test0edit@gmail.com');
            });
        });

        describe('Delete other user account', () => {
            it('Should throw 404 error - Not found that user account', () => {
                return pactum
                    .spec()
                    .delete('/user/delete/{username}')
                    .withPathParams('username', 'test02')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}'
                    })
                    .expectStatus(404);
            });
        });
    });

    /*** Periods e2e tests ***/

    describe('Periods of surveys', () => {
        describe('Get all periods of surveys', () => {
            it('Should return list of periods in database', () => {
                return pactum
                    .spec()
                    .get('/period/all')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}'
                    })
                    .expectStatus(200);
            });
        });

        describe('Create a new period for surving', () => {
            it('Should return information of the new period', () => {
                const dto: PeriodDto = {
                    years: 2020,
                    start_date: new Date('2020-01-01'),
                    end_date: new Date('2021-01-01')
                }
                return pactum
                    .spec()
                    .post('/period/add')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}'
                    })
                    .withBody(dto)
                    .expectStatus(201)
                    .expectBodyContains(2020)
                    .stores('year', 'data.years');
            });
        });

        describe('Delete a period', () => {
            it('Delete the specific period by year', () => {
                return pactum
                    .spec()
                    .delete('/period/delete/{year}')
                    .withPathParams('year', '$S{year}')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}'
                    })
                    .expectStatus(200);
            });
        });
    });

    describe('Families take part in survey', () => {
        describe('Create a new family', () => {
            it('Throw a 500 error - Conflict with foreign keys with referencing columns', () => {
                const dto: FamilyInfo = {
                    family_code: '68-09-662',
                    years: 2021,
                    province_code: '67',
                    district_code: '999',
                    ward_code: '24643',
                    full_name: 'Hung A Ti',
                    year_of_birth: 1990
                }
                return pactum
                    .spec()
                    .post('/family/add')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}'
                    })
                    .withBody(dto)
                    .expectStatus(500)
                    .expectBodyContains('Internal server error');
            })
        });

        describe('Create a new family', () => {
            it('Create and return information of a new family', () => {
                const dto: FamilyInfo = {
                    family_code: '68-09-662',
                    years: 2021,
                    province_code: '67',
                    district_code: '662',
                    ward_code: '24643',
                    full_name: 'Hung A Ti',
                    year_of_birth: 1990
                }
                return pactum
                    .spec()
                    .post('/family/add')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}'
                    })
                    .withBody(dto)
                    .expectStatus(201)
                    .expectBodyContains('68-09-662')
                    .expectBodyContains(2021)
                    .inspect();
            })
        });
    });

    afterAll(() => {
        app.close();
    });

    it.todo('should pass');
});
