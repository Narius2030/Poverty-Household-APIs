import {
    Body,
    Controller,
    Post,
    Get,
    Delete,
    Param
} from '@nestjs/common';
import { FamilyInfo } from './dto/new-family.dto';
import { FamilyService } from './family.service';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiTags
} from '@nestjs/swagger';



@Controller('family')
@ApiTags('Families')
export class FamilyController {
    constructor(private familyService: FamilyService) {}

    @ApiOperation({
        summary:
            'User can get all information of family participating in survey*',
        description:
            '**Object of use:** \n\n* Everyone can use this API \n\n* User must supply `ACCESS_TOKEN:` to retrieve information \n\n**Access token**: User can use `signin API` to get it'
    })
    @ApiBearerAuth()
    @Get('all')
    getFamilyInfo() {
        return this.familyService.getFamilyInfo();
    }

    @ApiOperation({
        summary: 'Admin can create a new period for survey',
        description:
            '**Object of use:** \n\n* Admin can use this API \n\n* User must supply `ACCESS_TOKEN:` to create a new period information \n\n**Access token**: User can use `signin API` to get it'
    })
    @ApiBearerAuth()
    @ApiBody({
        type: FamilyInfo,
        examples: {
            family_1: {
                value: {
                    family_code: '68-09-662',
                    years: 2021,
                    province_code: '67',
                    district_code: '662',
                    ward_code: '24643',
                    full_name: 'Hung A Ti',
                    year_of_birth: 1990
                }
            }
        }
    })
    @Post('add')
    createFamilyInfo(@Body() dto: FamilyInfo) {
        return this.familyService.createFamilyInfo(dto);
    }

    @ApiOperation({
        summary: 'Admin can delete a existing period of survey',
        description:
            '**Object of use:** \n\n* Admin can delete this API \n\n* User must supply `ACCESS_TOKEN:` to delete a existing period information \n\n**Access token**: User can use `signin API` to get it'
    })
    @ApiBearerAuth()
    @Delete('delete/:family_code')
    @ApiParam({
        name: 'family_code',
        type: 'string',
        examples: {
            family_1: {
                value: "70-09-662",
                description:
                    'This period come from 2020/01/01 to 2021/01/01'
            }
        }
    })
    deleteFamilyInfo(@Param('family_code') familyCode: string) {
        return this.familyService.deleteFamilyInfo(familyCode);
    }
}
