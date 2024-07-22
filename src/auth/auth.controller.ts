import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUADto, SignInUADto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup/useraccount')
    signUpUserAccount(@Body() dto: SignUpUADto) {
        return this.authService.signUpUserAccount(dto);
    }

    @Post('signin/useraccount')
    signInUserAccount(@Body() dto: SignInUADto) {
        return this.authService.signInUserAccount(dto);
    }
}