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

@UseGuards(JwtGuard)
@Controller('period')
export class PeriodController {
    constructor(private periodService: PeriodService) {}

    @Get('all')
    getPeriods() {
        return this.periodService.getPeriods();
    }

    @Post('create')
    createPeriod(@Body() dto: PeriodDto) {
        return this.periodService.createPeriod(dto);
    }

    @Patch('edit/:year')
    editPeriod(
        @Body() dto: EditPeriod,
        @Param('year', ParseIntPipe) year: number
    ) {
        // do not allowed to edit year
        return this.periodService.editPeriod(dto, year);
    }

    @Delete('delete/:year')
    deletePeriod(@Param('year', ParseIntPipe) year: number) {
        return this.periodService.deletePeriod(year);
    }
}
