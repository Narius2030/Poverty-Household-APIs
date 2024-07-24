import {
    ForbiddenException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PeriodDto } from './dto/create-period.dto';
import { EditPeriod } from './dto/edit-period.dto';

@Injectable()
export class PeriodService {
    constructor(private prisma: PrismaService) {}

    async getPeriods() {
        const periods = await this.prisma.periods.findMany({
            select: {
                years: true,
                start_date: true,
                end_date: true
            }
        });
        return { data: periods };
    }

    async createPeriod(dto: PeriodDto) {
        const hasPeriod = await this.prisma.periods.findFirst({
            where: {
                years: dto.years
            }
        });

        if (hasPeriod) {
            throw new ForbiddenException(
                "The period is existing. Can't create more"
            );
        }

        const period = await this.prisma.periods.create({
            data: {
                years: dto.years,
                start_date: dto.start_date,
                end_date: dto.end_date
            }
        });

        return { data: period };
    }

    async editPeriod(dto: EditPeriod, year: number) {
        let period: EditPeriod;
        try {
            period = await this.prisma.periods.update({
                where: {
                    years: year
                },
                data: {
                    ...dto
                }
            });
        } catch (ex) {
            throw new NotFoundException('Year to update not found');
        }

        return { data: period };
    }

    async deletePeriod(year: number) {
        let period: EditPeriod;
        try {
            period = await this.prisma.periods.delete({
                where: {
                    years: year
                }
            });
        } catch (ex) {
            throw new NotFoundException('Year to delete not found');
        }

        return { data: period };
    }
}
