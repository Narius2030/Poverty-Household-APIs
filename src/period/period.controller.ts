import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards
} from '@nestjs/common';
import { PeriodService } from './period.service';
import { JwtGuard } from '../auth/guard';
import { PeriodDto } from './dto/create-period.dto';
import { EditPeriod } from './dto/edit-period.dto';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiTags,
    ApiExcludeEndpoint
} from '@nestjs/swagger';



@UseGuards(JwtGuard)
@Controller('period')
@ApiTags('Periods')
export class PeriodController {
    constructor(private periodService: PeriodService) {}

    @ApiOperation({
        summary:
            'User can get all periods of pooring family surveys*',
        description:
            '**Object of use:** \n\n* Everyone can use this API \n\n* User must supply `ACCESS_TOKEN:` to retrieve information \n\n**Access token**: User can use `signin API` to get it'
    })
    @ApiBearerAuth()
    @Get('all')
    getPeriods() {
        return this.periodService.getPeriods();
    }

    @ApiOperation({
        summary: 'Admin can create a new period for survey',
        description:
            '**Object of use:** \n\n* Admin can use this API \n\n* User must supply `ACCESS_TOKEN:` to create a new period information \n\n**Access token**: User can use `signin API` to get it'
    })
    @ApiBearerAuth()
    @ApiBody({
        type: PeriodDto,
        examples: {
            year_1: {
                value: {
                    years: 2020,
                    start_date: '2020-01-01',
                    end_date: '2021-01-01'
                }
            }
        }
    })
    @Post('add')
    createPeriod(@Body() dto: PeriodDto) {
        return this.periodService.createPeriod(dto);
    }

    // @ApiExcludeEndpoint()
    @ApiOperation({
        summary: 'Admin can edit a existing period of survey',
        description:
            '**Object of use:** \n\n* Admin can edit this API \n\n* User must supply `ACCESS_TOKEN:` to edit a existing period information \n\n**Access token**: User can use `signin API` to get it'
    })
    @ApiBearerAuth()
    @ApiBody({
        type: PeriodDto,
        examples: {
            year_1: {
                value: {
                    start_date: '2020-01-01',
                    end_date: '2021-01-01'
                }
            }
        }
    })
    @Patch('edit/:year')
    @ApiParam({
        name: 'year',
        type: 'string',
        examples: {
            year_1: {
                value: 2020,
                description:
                    'This period come from 2020/01/01 to 2021/01/01'
            }
        }
    })
    editPeriod(
        @Body() dto: EditPeriod,
        @Param('year', ParseIntPipe) year: number
    ) {
        // do not allowed to edit year
        return this.periodService.editPeriod(dto, year);
    }

    // @ApiExcludeEndpoint()
    @ApiOperation({
        summary: 'Admin can delete a existing period of survey',
        description:
            '**Object of use:** \n\n* Admin can delete this API \n\n* User must supply `ACCESS_TOKEN:` to delete a existing period information \n\n**Access token**: User can use `signin API` to get it'
    })
    @ApiBearerAuth()
    @Delete('delete/:year')
    @ApiParam({
        name: 'year',
        type: 'string',
        examples: {
            year_1: {
                value: 2020,
                description:
                    'This period come from 2020/01/01 to 2021/01/01'
            }
        }
    })
    deletePeriod(@Param('year', ParseIntPipe) year: number) {
        return this.periodService.deletePeriod(year);
    }
}
