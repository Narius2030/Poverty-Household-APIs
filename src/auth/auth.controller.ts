import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUADto, SignInUADto } from './dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';



@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    @ApiOperation({
        summary:
            'Admin sign up to create new user accounts (admin role)',
        description:
            '* Only admin can use this API \n\n* Admin create user and receive new `ACCESS TOKEN`'
    })
    @ApiBody({
        type: SignInUADto,
        examples: {
            user_1: {
                value: {
                    username: 'tester03',
                    passwd: '12345678',
                    full_name: 'Martin Tony Stark Tran',
                    title: 'Thu ky UBND TPHCM',
                    sex: 'Male'
                }
            }
        }
    })
    signUpUserAccount(@Body() dto: SignUpUADto) {
        return this.authService.signUpUserAccount(dto);
    }

    @Post('signin')
    @HttpCode(200)
    @ApiOperation({
        summary: 'User sign in to their own accounts (admin role)',
        description:
            "* Owner's account can use this API \n\n* Sign in to account to get `ACCESS TOKEN`"
    })
    @ApiBody({
        type: SignInUADto,
        examples: {
            user_1: {
                value: {
                    username: 'tester03',
                    passwd: '12345678'
                }
            }
        }
    })
    signInUserAccount(@Body() dto: SignInUADto) {
        return this.authService.signInUserAccount(dto);
    }
}
