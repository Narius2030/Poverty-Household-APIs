import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsNumberString,
    IsOptional,
    IsPhoneNumber,
    IsString
} from 'class-validator';

export class EditUserDto {
    @IsString()
    @IsOptional()
    username?: string;

    @IsString()
    @IsOptional()
    passwd?: string;

    @IsString()
    @IsOptional()
    province_code?: string;

    @IsNumberString()
    @IsOptional()
    district_code?: string;

    @IsNumberString()
    @IsOptional()
    ward_code?: string;

    @IsString()
    @IsOptional()
    full_name?: string;

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    sex?: string;

    @IsDate()
    @IsOptional()
    birth_date?: Date;

    @IsPhoneNumber()
    @IsOptional()
    phone?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsBoolean()
    @IsOptional()
    is_department_leader?: boolean;
}
