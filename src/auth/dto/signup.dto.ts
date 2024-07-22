import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsNumberString,
    IsDate,
    IsPhoneNumber,
    IsEmail,
    IsBoolean
} from 'class-validator';

export class SignUpDWDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    passwd: string;

    @IsString()
    @IsNotEmpty()
    district_code: string;

    @IsString()
    @IsOptional()
    ward_code?: string;
}

export class SignUpUADto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    passwd: string;

    @IsString()
    @IsNotEmpty()
    full_name: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    sex: string;

    @IsString()
    @IsOptional()
    province_code?: string;

    @IsNumberString()
    @IsOptional()
    district_code?: string;

    @IsNumberString()
    @IsOptional()
    ward_code?: string;

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
