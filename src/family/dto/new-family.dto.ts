import {
    IsAlpha,
    IsBoolean,
    IsDate,
    IsNumber,
    IsNumberString,
    IsOptional,
    IsString,
    isNumber
} from 'class-validator';
import { Transform } from 'class-transformer';
import { toBoolean, toDate } from 'validator';

const toNumber = (value) => {
    const isValidate = isNumber(value);
    if (!isValidate) {
        value = Number(value);
    }
    return value;
};

export class PersonInfo {
    @IsString()
    full_name: string;

    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => toBoolean(value))
    sex?: Boolean;

    @IsString()
    @IsAlpha()
    @IsOptional()
    nation?: string;

    @IsNumber()
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => toNumber(value))
    year_of_birth?: number;

    @IsNumber()
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => toNumber(value))
    month_of_birth?: number;

    @IsNumber()
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => toNumber(value))
    day_of_birth?: number;

    @IsNumberString()
    @IsOptional()
    identity_card_number?: string;
}

export class FamilyInfo {
    @IsString()
    @IsOptional()
    family_id: string

    @IsString()
    family_code: string;

    @IsNumber()
    @Transform(({ value }) => toNumber(value))
    years: number;

    @IsNumberString()
    province_code: string;

    @IsNumberString()
    district_code: string;

    @IsNumberString()
    ward_code: string;

    @IsNumberString()
    @IsOptional()
    town_code?: string;

    @IsString()
    @IsOptional()
    family_number?: string;

    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => toBoolean(value))
    nation_in_place?: Boolean;

    @IsDate()
    @IsOptional()
    @Transform(({ value }) => toDate(value))
    created_date: Date;

    @IsString()
    family_type: string;
}
