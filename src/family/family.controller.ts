import { Body, Controller, Post, Get } from '@nestjs/common';
import { FamilyInfo } from './dto/new-family.dto';
import { FamilyService } from './family.service';

@Controller('family')
export class FamilyController {
    constructor(private familyService: FamilyService) {};

    @Get('all')
    getFamilyInfo() {
        return this.familyService.getFamilyInfo();
    }

    @Post('add')
    createFamilyInfo(@Body() dto: FamilyInfo) {
        return this.familyService.createFamilyInfo(dto);
    }
}
