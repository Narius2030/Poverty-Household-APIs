import {
    IsDate,
    isDate,
    IsOptional
} from 'class-validator';
import { Transform } from 'class-transformer';

export class EditPeriod {
    @IsDate()
    @IsOptional()
    @Transform(({ value }) => {
        const isValidDate = isDate(value);
        if (!isValidDate) {
            value = new Date(value);
        }
        return value;
    })
    start_date?: Date;

    @IsDate()
    @IsOptional()
    @Transform(({ value }) => {
        const isValidDate = isDate(value);
        if (!isValidDate) {
            value = new Date(value);
        }
        return value;
    })
    end_date?: Date;
}