import { ForbiddenException, Injectable } from '@nestjs/common';
import { FamilyInfo } from './dto/new-family.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class FamilyService {
    constructor(private prisma: PrismaService) {}

    async getFamilyInfo() {
        const families = await this.prisma.family_info.findMany();
        return { data: families };
    }

    async createFamilyInfo(dto: FamilyInfo) {
        const hasFamily = await this.prisma.family_info.findFirst({
            where: {
                family_code: dto.family_code
            }
        });

        if (hasFamily) {
            throw new ForbiddenException(
                "This family is existing. Can't create more"
            );
        }

        let family: FamilyInfo;
        try {
            family = await this.prisma.family_info.create({
                data: {
                    family_code: dto.family_code,
                    years: dto.years,
                    province_code: dto.province_code,
                    district_code: dto.district_code,
                    ward_code: dto.ward_code,
                    town_code: dto.town_code || null,
                    family_number: dto.family_number || null,
                    nation_in_place: !!dto.nation_in_place || null,
                    created_date: new Date(),
                    family_type: dto.family_type
                }
            });
        } catch (ex) {
            throw new Error(ex);
        }

        return family;
    }

    async deleteFamilyInfo(familyId: string) {
        let family: FamilyInfo;
        try {
            family = await this.prisma.family_info.delete({
                where: {
                    family_id: familyId
                }
            });
        } catch (ex) {
            throw new ForbiddenException(
                'Your family information to delete not found'
            );
        }

        return { data: family };
    }

    /* Service for Data warehouse */

    async getStageDimFamily() {
        const stgDimFamily =
            await this.prisma.vw_stgdimfamily.findMany({});
        return stgDimFamily;
    }

    async getStageDimFamilyMember() {
        const stgDimFamilyMem =
            this.prisma.vw_stgdimfamilymember.findMany({});
        return stgDimFamilyMem;
    }

    async getStageDimSurvey() {
        const stgDimSurvey =
            await this.prisma.vw_stgmembersurveyfact.findMany({});
        return stgDimSurvey;
    }

    async getStagePovertyFact() {
        const stgPovertyFact =
            await this.prisma.vw_stgpovertystatusfact.findMany({});
        return stgPovertyFact;
    }

    async getStageMemberSurveyFact() {
        const stgMemberSurveyFact =
            await this.prisma.vw_stgmembersurveyfact.findMany({});
        return stgMemberSurveyFact
    }
}
