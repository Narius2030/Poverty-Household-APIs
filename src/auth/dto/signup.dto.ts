import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class SignUpDWDto {
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    passwd: string

    @IsString()
    @IsNotEmpty()
    district_code: string

    @IsString()
    @IsOptional()
    ward_code?: string
}