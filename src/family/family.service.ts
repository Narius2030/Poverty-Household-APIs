import { ForbiddenException, Injectable } from '@nestjs/common';
import { FamilyInfo } from './dto/new-family.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FamilyService {
    constructor(private prisma: PrismaService) {}

    async getFamilyInfo() {
        const families = await this.prisma.family_info.findMany();
        return { data: families };
    }

    async createFamilyInfo(dto: FamilyInfo) {
        const hasFamily = await this.prisma.family_info.findUnique({
            where: {
                family_code: dto.family_code
            }
        });

        if (hasFamily) {
            throw new ForbiddenException(
                "This family is existing. Can't create more"
            );
        }

        const family = await this.prisma.family_info.create({
            data: {
                family_code: dto.family_code,
                years: dto.years,
                province_code: dto.province_code,
                district_code: dto.district_code,
                ward_code: dto.ward_code,
                full_name: dto.full_name,
                town_code: dto.town_code || null,
                family_number: dto.family_number || null,
                nation_in_place: !!dto.nation_in_place || null,
                identity_card_date: dto.identity_card_date || null,
                temporay_place: dto.temporay_place || null,
                sex: !!dto.sex || null,
                nation: dto.nation || null,
                year_of_birth: dto.year_of_birth || null,
                month_of_birth: dto.month_of_birth || null,
                day_of_birth: dto.day_of_birth || null,
                identity_card_number: dto.identity_card_number || null
            }
        });

        return family;
    }
}
