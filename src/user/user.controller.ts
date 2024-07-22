import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    UseGuards
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { district_ward_account, user_account } from '@prisma/client';
import { GetUser } from './decorator';
import { EditUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('me')
    getMeUserAccount(@GetUser() dto: user_account) {
        return { data: dto };
    }

    // Get all users
    /*
        ...code her...
    */

    @Patch('edit')
    editMe(
        @GetUser('account_id') userId: string,
        @Body() dto: EditUserDto
    ) {
        return this.userService.editMe(userId, dto);
    }

    @Patch('edit/:username')
    editUser(
        @Param('username') userName: string,
        @Body() dto: EditUserDto
    ) {
        return this.userService.editUser(userName, dto);
    }

    @Delete('delete/:username')
    deleteUser(@Param('username') userName: string) {
        return this.userService.deleteUser(userName);
    }
}
