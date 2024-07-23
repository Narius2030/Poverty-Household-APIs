import {
    IsNumber,
    isNumber,
    IsDate,
    isDate
} from 'class-validator';
import { Transform } from 'class-transformer';

export class PeriodDto {
    @IsNumber()
    @Transform(({ value }) => {
        const isValidate = isNumber(value);
        if (!isValidate) {
            value = Number(value);
        }
        return value;
    })
    years: number;

    @IsDate()
    @Transform(({ value }) => {
        const isValidDate = isDate(value);
        if (!isValidDate) {
            value = new Date(value);
        }
        return value;
    })
    start_date: Date;

    @IsDate()
    @Transform(({ value }) => {
        const isValidDate = isDate(value);
        if (!isValidDate) {
            value = new Date(value);
        }
        return value;
    })
    end_date: Date;
}
