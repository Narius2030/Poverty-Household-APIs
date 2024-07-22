import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDWADto, SignUpDWDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup/uesraccount')
    signUpDWAccount(@Body() dto: SignUpDWDto) {
        return this.authService.signUpDWAccount(dto);
    }

    @Post('signin/uesraccount')
    signInDWAccount(@Body() dto: SignInDWADto) {

    }
}
