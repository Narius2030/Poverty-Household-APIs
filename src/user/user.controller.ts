import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    UseGuards
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import { GetUser } from './decorator';
import { EditUserDto } from './dto';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiTags,
    ApiExcludeEndpoint
} from '@nestjs/swagger';

@UseGuards(JwtGuard)
@Controller('user')
@ApiTags('Users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('me')
    @ApiOperation({
        summary: 'User can get their account information',
        description:
            "**Object of use:** \n\n* Only owner's account can use this API \n\n* User must supply `ACCESS_TOKEN:` to retrieve information \n\n**Access token**: User can use `signin API` to get it"
    })
    @ApiBearerAuth()
    getMeUserAccount(@GetUser() info: { id; username }) {
        return this.userService.getMe(info);
    }

    @ApiOperation({
        summary:
            'User can get all account information but *not passwords*',
        description:
            '**Object of use:** \n\n* Everyone can use this API \n\n* User must supply `ACCESS_TOKEN:` to retrieve information \n\n**Access token**: User can use `signin API` to get it'
    })
    @ApiBearerAuth()
    @Get('all')
    getUsers() {
        return this.userService.getUsers();
    }

    @ApiOperation({
        summary: 'User can only edit their account information',
        description:
            "**Object of use:** \n\n* Owner's account can use this API \n\n* User must supply `ACCESS_TOKEN:` to edit information \n\n**Access token**: User can use `signin API` to get it"
    })
    @ApiBearerAuth()
    @ApiBody({
        type: EditUserDto,
        examples: {
            user_1: {
                value: {
                    passwd: '87654321',
                    email: 'testerxautrai@gmail.com',
                    district_code: '661'
                }
            }
        }
    })
    @Patch('edit')
    editMe(
        @GetUser('account_id') userId: string,
        @Body() dto: EditUserDto
    ) {
        return this.userService.editMe(userId, dto);
    }

    @ApiExcludeEndpoint()
    // @ApiOperation({
    //     summary: 'Admin can edit another user accounts',
    //     description:
    //         '**Object of use:** \n\n* Admin can use this API \n\n* User must supply `ACCESS_TOKEN:` to edit information \n\n**Access token**: User can use `signin API` to get it'
    // })
    // @ApiBearerAuth()
    // @ApiBody({
    //     type: EditUserDto,
    //     examples: {
    //         user_1: {
    //             value: {
    //                 passwd: '87654321',
    //                 email: 'testerxautrai@gmail.com',
    //                 district_code: '661'
    //             }
    //         }
    //     }
    // })
    @Patch('edit/:username')
    // @ApiParam({
    //     name: 'username',
    //     type: 'string',
    //     examples: {
    //         user_1: {
    //             value: 'tester03',
    //             description:
    //                 'User Martin Tony Stark Tran, he is Thu ky UBND TPHCM'
    //         }
    //     }
    // })
    editUser(
        @Param('username') userName: string,
        @Body() dto: EditUserDto
    ) {
        return this.userService.editUser(userName, dto);
    }

    @ApiExcludeEndpoint()
    // @ApiOperation({
    //     summary: 'Admin can delete another user accounts',
    //     description:
    //         '**Object of use:** \n\n* Admin can use this API \n\n* User must supply `ACCESS_TOKEN:` to delete an user account \n\n**Access token**: User can use `signin API` to get it'
    // })
    // @ApiBearerAuth()
    @Delete('delete/:accountId')
    // @ApiParam({
    //     name: 'username',
    //     type: 'string',
    //     examples: {
    //         user_1: {
    //             value: 'tester04',
    //             description: 'User Tony Ngong, he is Pho chu tich'
    //         }
    //     }
    // })
    deleteUser(@Param('accountId') accountId: string) {
        return this.userService.deleteUser(accountId);
    }
}
